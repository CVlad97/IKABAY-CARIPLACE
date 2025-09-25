import { supabaseServer } from '@/lib/supabaseServer'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { formatPrice, logEvent } from '@/lib/utils'
import AddToCartButton from './AddToCartButton'
import ShareButtons from '@/components/ShareButtons'
import Stars from '@/components/Stars'

async function getProduct(slug) {
  const supabase = supabaseServer()
  if (!supabase) return null

  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      vendors (
        name,
        rating
      )
    `)
    .eq('slug', slug)
    .single()

  return product
}

async function getReviews(productId) {
  const supabase = createServerClient()
  if (!supabase) return []

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
    .limit(10)

  return reviews || []
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug)
  
  if (!product) {
    return {
      title: 'Produit non trouvé - Ikabay'
    }
  }

  return {
    title: `${product.title} - Ikabay`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug)
  
  if (!product) {
    notFound()
  }

  const reviews = await getReviews(product.id)
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 4.5

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Ikabay'
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      reviewCount: reviews.length
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {product.tag && (
                <span className={`badge absolute top-4 left-4 ${
                  product.tag === 'local' ? 'badge-local' : 'badge-import'
                }`}>
                  {product.tag === 'local' ? '🌴 Local' : '🌍 Import'}
                </span>
              )}
            </div>
          </div>

          {/* Informations */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-caribbean-dark mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <Stars rating={averageRating} />
                <span className="text-gray-600">
                  ({reviews.length} avis)
                </span>
                {product.vendors && (
                  <span className="text-sm text-gray-500">
                    par {product.vendors.name}
                  </span>
                )}
              </div>

              <div className="text-4xl font-bold text-caribbean-blue mb-6">
                {formatPrice(product.price)}
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                📦 Stock: {product.stock} disponibles
              </span>
              <span className="flex items-center gap-2">
                🏷️ Catégorie: {product.category}
              </span>
            </div>

            <div className="space-y-4">
              <AddToCartButton product={product} />
              
              <ShareButtons 
                url={`/product/${product.slug}`}
                title={product.title}
              />
            </div>

            {/* Informations de livraison */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-caribbean-dark mb-4">
                🚚 Informations de livraison
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Livraison gratuite dès 50€ d'achat</p>
                <p>• Expédition sous 24-48h</p>
                <p>• Martinique & Guadeloupe</p>
                <p>• Suivi de commande en temps réel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Avis clients */}
        {reviews.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-caribbean-dark mb-8">
              Avis clients ({reviews.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 6).map(review => (
                <div key={review.id} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-caribbean-dark">
                      {review.author}
                    </span>
                    <Stars rating={review.rating} size={16} />
                  </div>
                  <p className="text-gray-700">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}