import Link from 'next/link'
import Image from 'next/image'
import { supabaseServer } from '@/lib/supabaseServer'
import ProductCard from '@/components/ProductCard'
import ShareButtons from '@/components/ShareButtons'

async function getFeaturedProducts() {
  const supabase = supabaseServer()
  if (!supabase) return []

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(6)
    .order('created_at', { ascending: false })

  return products || []
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1920"
            alt="Paysage caribéen"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-caribbean-dark/70 to-caribbean-blue/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Ikabay
            <span className="block text-caribbean-yellow">Marketplace Caraïbe</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            La première marketplace qui connecte les Antilles. 
            Produits locaux authentiques et imports de qualité.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/products" className="btn btn-primary text-lg px-8 py-4">
              🛍️ Voir la boutique
            </Link>
            <Link href="/vendors" className="btn btn-secondary text-lg px-8 py-4">
              🏪 Devenir vendeur
            </Link>
          </div>
          
          <ShareButtons 
            url="/" 
            title="Ikabay - Marketplace Caraïbe" 
            className="justify-center"
          />
        </div>
      </section>

      {/* USP Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-caribbean-dark mb-4">
              Pourquoi choisir Ikabay ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expérience d'achat unique qui valorise nos producteurs locaux 
              tout en offrant un accès aux meilleurs produits internationaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-caribbean-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🌴</span>
              </div>
              <h3 className="text-2xl font-bold text-caribbean-dark mb-4">Produits Locaux</h3>
              <p className="text-gray-600">
                Épices, cosmétiques, artisanat... Découvrez le meilleur de nos îles 
                directement chez les producteurs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-caribbean-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🚚</span>
              </div>
              <h3 className="text-2xl font-bold text-caribbean-dark mb-4">Livraison Rapide</h3>
              <p className="text-gray-600">
                Livraison en 24-48h en Martinique et Guadeloupe. 
                Suivi en temps réel de vos commandes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-caribbean-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💳</span>
              </div>
              <h3 className="text-2xl font-bold text-caribbean-dark mb-4">Paiements Sécurisés</h3>
              <p className="text-gray-600">
                Crypto, virement bancaire ou carte. 
                Choisissez le mode de paiement qui vous convient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-caribbean-dark mb-4">
                Produits Populaires
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez nos coups de cœur sélectionnés par la communauté
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/products" className="btn btn-primary">
                Voir tous les produits
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-caribbean-dark text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-caribbean-yellow mb-2">500+</div>
              <div className="text-gray-300">Produits</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-caribbean-green mb-2">50+</div>
              <div className="text-gray-300">Vendeurs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-caribbean-blue mb-2">2000+</div>
              <div className="text-gray-300">Commandes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-caribbean-yellow mb-2">4.8/5</div>
              <div className="text-gray-300">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-caribbean-blue to-caribbean-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Rejoignez la révolution du commerce caribéen
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Que vous soyez consommateur ou producteur, 
            Ikabay vous offre une plateforme moderne et sécurisée.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn bg-white text-caribbean-blue hover:bg-gray-100 text-lg px-8 py-4">
              🛒 Commencer mes achats
            </Link>
            <Link href="/vendors" className="btn border-2 border-white text-white hover:bg-white hover:text-caribbean-blue text-lg px-8 py-4">
              🏪 Vendre mes produits
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}