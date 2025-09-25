import { supabaseServer } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import { Store, Truck, Globe, Users } from 'lucide-react'

async function submitVendorForm(formData) {
  'use server'
  
  const supabase = supabaseServer()
  if (!supabase) return { error: 'Supabase non configuré' }

  const name = formData.get('name')
  const email = formData.get('email')
  const description = formData.get('description')
  
  // Honeypot check
  if (formData.get('website')) {
    return { error: 'Spam détecté' }
  }

  try {
    const { error } = await supabase
      .from('partners')
      .insert({
        type: 'vendor',
        name,
        email,
        description
      })

    if (error) {
      return { error: error.message }
    }

    // Log de l'événement
    await supabase
      .from('event_logs')
      .insert({
        event: 'vendor_application',
        payload: { name, email }
      })

    redirect('/vendors?success=true')
  } catch (error) {
    return { error: 'Erreur lors de l\'envoi' }
  }
}

export const metadata = {
  title: 'Devenir Vendeur - Ikabay',
  description: 'Rejoignez la première marketplace caribéenne et vendez vos produits locaux',
}

export default function VendorsPage({ searchParams }) {
  const success = searchParams.success === 'true'

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-caribbean-blue to-caribbean-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Devenez Vendeur Ikabay
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Rejoignez la première marketplace caribéenne et développez votre business 
            avec des milliers de clients aux Antilles
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Store size={20} />
              <span>Boutique en ligne</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={20} />
              <span>Logistique intégrée</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={20} />
              <span>Visibilité maximale</span>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-caribbean-dark mb-4">
              Pourquoi vendre sur Ikabay ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme conçue pour les entrepreneurs caribéens
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-caribbean-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Store className="text-caribbean-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold text-caribbean-dark mb-4">
                Boutique Clé en Main
              </h3>
              <p className="text-gray-600">
                Créez votre boutique en ligne en quelques clics. 
                Gestion des stocks, commandes et paiements incluse.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-caribbean-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck className="text-caribbean-green" size={32} />
              </div>
              <h3 className="text-xl font-bold text-caribbean-dark mb-4">
                Livraison Simplifiée
              </h3>
              <p className="text-gray-600">
                Nous gérons la logistique pour vous. 
                Livraison 24-48h en Martinique et Guadeloupe.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-caribbean-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-caribbean-yellow" size={32} />
              </div>
              <h3 className="text-xl font-bold text-caribbean-dark mb-4">
                Communauté Active
              </h3>
              <p className="text-gray-600">
                Accédez à des milliers de clients fidèles 
                qui privilégient les produits locaux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {success ? (
              <div className="card p-8 text-center">
                <div className="w-20 h-20 bg-caribbean-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✅</span>
                </div>
                <h2 className="text-2xl font-bold text-caribbean-dark mb-4">
                  Candidature envoyée !
                </h2>
                <p className="text-gray-600 mb-8">
                  Merci pour votre intérêt. Notre équipe va étudier votre candidature 
                  et vous recontacter sous 48h.
                </p>
                <a href="/" className="btn btn-primary">
                  Retour à l'accueil
                </a>
              </div>
            ) : (
              <div className="card p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-caribbean-dark mb-4">
                    Rejoignez-nous
                  </h2>
                  <p className="text-gray-600">
                    Remplissez ce formulaire pour devenir vendeur partenaire
                  </p>
                </div>

                <form action={submitVendorForm} className="space-y-6">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    className="honeypot"
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de votre entreprise *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="input"
                      placeholder="Ex: Atelier Caraïbe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de contact *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="input"
                      placeholder="contact@votre-entreprise.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Décrivez vos produits
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      className="input"
                      placeholder="Quels types de produits souhaitez-vous vendre ? Parlez-nous de votre activité..."
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full">
                    Envoyer ma candidature
                  </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600">
                  <p>
                    En soumettant ce formulaire, vous acceptez d'être contacté 
                    par notre équipe pour discuter de votre candidature.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-caribbean-dark mb-4">
                Questions Fréquentes
              </h2>
            </div>

            <div className="space-y-8">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-caribbean-dark mb-3">
                  Quels sont les frais pour vendre sur Ikabay ?
                </h3>
                <p className="text-gray-600">
                  Pas de frais d'inscription ! Nous prenons une commission de 8% 
                  uniquement sur les ventes réalisées. Vous ne payez que si vous vendez.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-caribbean-dark mb-3">
                  Comment fonctionne la livraison ?
                </h3>
                <p className="text-gray-600">
                  Vous préparez vos commandes, nous nous occupons du reste. 
                  Notre réseau de livreurs assure la livraison en 24-48h.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-caribbean-dark mb-3">
                  Quand suis-je payé ?
                </h3>
                <p className="text-gray-600">
                  Paiement hebdomadaire tous les vendredis par virement bancaire. 
                  Suivi transparent de tous vos gains dans votre espace vendeur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}