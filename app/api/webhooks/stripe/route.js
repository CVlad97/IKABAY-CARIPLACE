import { createServerClient } from '@/lib/supabaseServer'
import { headers } from 'next/headers'

export async function POST(request) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature')
    
    // Vérifier la signature Stripe si configuré
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    
    if (webhookSecret && signature) {
      // TODO: Implémenter la vérification de signature Stripe
      // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
      // const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
      console.log('Webhook Stripe reçu avec signature')
    }

    const event = JSON.parse(body)
    
    const supabase = createServerClient()
    if (!supabase) {
      return Response.json({ error: 'Supabase non configuré' }, { status: 500 })
    }

    // Gérer les événements Stripe
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        const reference = session.metadata?.reference
        
        if (reference) {
          // Mettre à jour le statut de la commande
          const { error } = await supabase
            .from('orders')
            .update({ 
              status: 'paid',
              txid: session.payment_intent 
            })
            .eq('reference', reference)

          if (error) {
            console.error('Erreur mise à jour commande:', error)
          }

          // Log de l'événement
          await supabase
            .from('event_logs')
            .insert({
              event: 'stripe_payment_completed',
              payload: {
                reference,
                session_id: session.id,
                amount: session.amount_total
              }
            })
        }
        break

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object
        
        // Log de l'échec
        await supabase
          .from('event_logs')
          .insert({
            event: 'stripe_payment_failed',
            payload: {
              payment_intent_id: paymentIntent.id,
              error: paymentIntent.last_payment_error
            }
          })
        break

      default:
        console.log(`Événement Stripe non géré: ${event.type}`)
    }

    return Response.json({ received: true })

  } catch (error) {
    console.error('Erreur webhook Stripe:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}