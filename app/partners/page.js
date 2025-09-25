import { Truck, Anchor, Package, Handshake } from 'lucide-react'

export const metadata = {
  title: 'Partenaires - Ikabay',
  description: 'Devenez partenaire Ikabay : transport, douane, groupage, intégration',
}

export default function PartnersPage() {
  const partnerTypes = [
    {
      icon: Truck,
      title: 'Transporteurs',
      description: 'Rejoignez notre réseau de livraison express et maritime',
      benefits: [
        'Flux régulier de commandes',
        'Zones de livraison définies',
        'Paiement rapide et sécurisé',
        'Interface de gestion dédiée'
      ],
      contact: 'transport@ikabay.com'
    },
    {
      icon: Anchor,
      title: 'Agents en Douane',
      description: 'Facilitez les imports avec votre expertise douanière',
      benefits: [
        'Partenariat privilégié',
        'Volume d\'imports croissant',
        'Procédures simplifiées',
        'Tarifs préférentiels'
      ],
      contact: 'douane@ikabay.com'
    },
    {
      icon: Package,
      title: 'Groupage & Logistique',
      description: 'Optimisez les coûts avec nos solutions de groupage',
      benefits: [
        'Consolidation des envois',
        'Réduction des coûts',
        'Suivi temps réel',
        'Assurance incluse'
      ],
      contact: 'logistique@ikabay.com'
    },
    {
      icon: Handshake,
      title: 'Intégrateurs Tech',
      description: 'Connectez vos systèmes ERP/CRM à notre plateforme',
      benefits: [
        'API complète et documentée',
        'Support technique dédié',
        'Commissions attractives',
        'Certification partenaire'
      ],
      contact: 'tech@ikabay.com'
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-caribbean-dark to-caribbean-blue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Partenaires Ikabay
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Rejoignez l'écosystème Ikabay et développez votre activité 
            avec la première marketplace caribéenne
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Package size={20} />
              <span>Logistique</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={20} />
              <span>Transport</span>
            </div>
            <div className="flex items-center gap-2">
              <Handshake size={20} />
              <span>Intégration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Types de partenaires */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-caribbean-dark mb-4">
              Opportunités de Partenariat
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Différentes façons de collaborer avec Ikabay
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {partnerTypes.map((partner, index) => {
              const IconComponent = partner.icon
              return (
                <div key={index} className="card p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-caribbean-blue/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="text-caribbean-blue" size={32} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-caribbean-dark mb-3">
                        {partner.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {partner.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-caribbean-dark mb-3">
                          Avantages :
                        </h4>
                        <ul className="space-y-2">
                          {partner.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-600">
                              <span className="w-2 h-2 bg-caribbean-green rounded-full"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <a
                        href={`mailto:${partner.contact}?subject=Partenariat ${partner.title}`}
                        className="btn btn-primary"
                      >
                        Nous contacter
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-caribbean-dark mb-4">
              Comment devenir partenaire ?
            </h2>
            <p className="text-xl text-gray-600">
              Un processus simple et transparent
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-caribbean-blue rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-caribbean-dark mb-4">
                  Premier Contact
                </h3>
                <p className="text-gray-600">
                  Contactez-nous par email selon votre domaine d'expertise. 
                  Présentez votre entreprise et vos services.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-caribbean-green rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-caribbean-dark mb-4">
                  Évaluation
                </h3>
                <p className="text-gray-600">
                  Notre équipe évalue votre candidature et organise 
                  un entretien pour définir les modalités de collaboration.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-caribbean-yellow rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-caribbean-dark mb-4">
                  Intégration
                </h3>
                <p className="text-gray-600">
                  Signature du contrat de partenariat et intégration 
                  dans notre écosystème avec formation dédiée.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-caribbean-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à nous rejoindre ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter des opportunités 
            de partenariat qui correspondent à votre activité.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:partenaires@ikabay.com?subject=Demande de partenariat"
              className="btn bg-white text-caribbean-blue hover:bg-gray-100"
            >
              📧 partenaires@ikabay.com
            </a>
            <a
              href="tel:+596696XXXXXX"
              className="btn border-2 border-white text-white hover:bg-white hover:text-caribbean-blue"
            >
              📞 +596 696 XX XX XX
            </a>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-caribbean-dark mb-4">
              Ils nous font confiance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-caribbean-yellow">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "Partenariat très professionnel. Les volumes sont au rendez-vous 
                  et les paiements toujours à l'heure."
                </p>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-caribbean-dark">Express Caraïbe</div>
                <div className="text-gray-500">Transporteur partenaire</div>
              </div>
            </div>

            <div className="card p-6">
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-caribbean-yellow">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "L'API est bien documentée et l'intégration s'est faite 
                  sans problème. Support technique réactif."
                </p>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-caribbean-dark">TechSolutions</div>
                <div className="text-gray-500">Intégrateur technique</div>
              </div>
            </div>

            <div className="card p-6">
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-caribbean-yellow">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "Excellent partenariat pour nos opérations de groupage. 
                  Volumes en constante augmentation."
                </p>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-caribbean-dark">Cargo Plus</div>
                <div className="text-gray-500">Logistique maritime</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}