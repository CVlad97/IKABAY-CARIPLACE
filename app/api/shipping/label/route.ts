import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { DhlExpressAdapter } from '@/integrations/dhl/DhlExpressAdapter';
import { createClient } from '@supabase/supabase-js';

const LabelRequestSchema = z.object({
  orderId: z.string().uuid(),
  from: z.object({
    countryCode: z.string(),
    postalCode: z.string(),
    cityName: z.string(),
    addressLine1: z.string(),
    name: z.string(),
    phone: z.string(),
    email: z.string()
  }),
  to: z.object({
    countryCode: z.string(),
    postalCode: z.string(),
    cityName: z.string(),
    addressLine1: z.string(),
    name: z.string(),
    phone: z.string(),
    email: z.string()
  }),
  packages: z.array(z.object({
    weight: z.number(),
    length: z.number(),
    width: z.number(),
    height: z.number(),
    description: z.string()
  })),
  reference: z.string(),
  labelFormat: z.enum(['PDF', 'PNG', 'ZPL']).default('PDF')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedRequest = LabelRequestSchema.parse(body);

    const dhlAdapter = new DhlExpressAdapter();
    
    // Créer l'expédition DHL
    const shipment = await dhlAdapter.createShipment(validatedRequest);

    // Sauvegarder dans Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE!
    );

    const { error } = await supabase
      .from('shipments')
      .insert({
        order_id: validatedRequest.orderId,
        provider: 'dhl',
        mode: 'air',
        tracking_number: shipment.trackingNumber,
        label_url: shipment.labelUrl,
        cost: shipment.cost,
        currency: shipment.currency,
        status: 'created',
        provider_data: {
          reference: validatedRequest.reference,
          label_format: validatedRequest.labelFormat
        }
      });

    if (error) {
      console.error('Failed to save shipment:', error);
    }

    return NextResponse.json({
      success: true,
      shipment: {
        trackingNumber: shipment.trackingNumber,
        labelUrl: shipment.labelUrl,
        cost: shipment.cost,
        currency: shipment.currency
      }
    });

  } catch (error) {
    console.error('Label creation error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to create shipping label'
    }, { status: 500 });
  }
}