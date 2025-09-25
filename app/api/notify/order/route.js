import { createServerClient } from '@/lib/supabaseServer'
import { z } from 'zod'

const NotifySchema = z.object({
  email: z.string().email(),
  reference: z.string().min(1),
  status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'refunded'])
})

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Valider les données
    const { email, reference, status } = NotifySchema.parse(body)
    
    const supabase = createServerClient()
    if (!supabase) {
      return Response.json({ error: 'Supabase non configuré' }, { status: 500 })
    }

    // Log de la notification
    await supabase
      .from('event_logs')
      .insert({
        event: 'order_notification',
        payload: {
          email,
          reference,
          status,
          timestamp: new Date().toISOString()
        }
      })

    // TODO: Intégrer un service d'email (SendGrid, Resend, etc.)
    // Exemple avec SendGrid:
    /*
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    const msg = {
      to: email,
      from: 'noreply@ikabay.com',
      subject: `Mise à jour de votre commande ${reference}`,
      html: getEmailTemplate(reference, status)
    }
    
    await sgMail.send(msg)
    */

    // Pour l'instant, on simule l'envoi
    console.log(`Notification email simulée:`, {
      to: email,
      subject: `Commande ${reference} - Statut: ${status}`,
      status
    })

    return Response.json({
      success: true,
      message: 'Notification envoyée'
    })

  } catch (error) {
    console.error('Erreur notification:', error)
    
    if (error.name === 'ZodError') {
      return Response.json({ 
        error: 'Données invalides',
        details: error.errors 
      }, { status: 400 })
    }

    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// Template d'email (à personnaliser)
function getEmailTemplate(reference, status) {
  const statusMessages = {
    pending: 'Votre commande est en attente de paiement',
    paid: 'Votre paiement a été confirmé',
    shipped: 'Votre commande a été expédiée',
    delivered: 'Votre commande a été livrée',
    refunded: 'Votre commande a été remboursée'
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #17c0eb;">Ikabay - Marketplace Caraïbe</h1>
      <h2>Mise à jour de votre commande</h2>
      <p><strong>Référence:</strong> ${reference}</p>
      <p><strong>Statut:</strong> ${statusMessages[status] || status}</p>
      <p>Merci de votre confiance !</p>
      <hr>
      <p style="color: #666; font-size: 12px;">
        Cet email a été envoyé automatiquement, merci de ne pas y répondre.
      </p>
    </div>
  `
}