import { NextRequest, NextResponse } from 'next/server';
import { RevolutMerchantAdapter } from '@/integrations/revolut/RevolutMerchantAdapter';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('revolut-signature') || '';
    const payload = await request.text();

    const revolutAdapter = new RevolutMerchantAdapter();
    
    // Vérifier la signature
    if (!revolutAdapter.verifyWebhook(signature, payload)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(payload);

    // Logger le webhook
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE!
    );

    await supabase
      .from('webhook_logs')
      .insert({
        provider: 'revolut',
        event_type: event.event,
        payload: event,
        signature,
        processed: false
      });

    // Traiter l'événement
    if (event.event === 'ORDER_COMPLETED' && event.data?.merchant_order_ext_ref) {
      const reference = event.data.merchant_order_ext_ref;
      
      // Mettre à jour le statut de la commande
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'paid',
          payment_method: 'card'
        })
        .eq('reference', reference);

      if (error) {
        console.error('Failed to update order status:', error);
      } else {
        // Marquer le webhook comme traité
        await supabase
          .from('webhook_logs')
          .update({ processed: true })
          .eq('provider', 'revolut')
          .eq('event_type', event.event)
          .order('created_at', { ascending: false })
          .limit(1);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Revolut webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}