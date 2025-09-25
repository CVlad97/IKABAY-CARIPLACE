import { supabaseServer } from '@/lib/supabaseServer'
import ProductCard from '@/components/ProductCard'
import Filters from '@/components/Filters'
import { DropshippingManager } from '@/lib/dropshipping/DropshippingManager'
import { Suspense } from 'react'

export const revalidate = 0
async function getProducts(searchParams) {
  // Récupérer les produits locaux depuis Supabase
  const canQuery = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  let localProducts = []
  
  if (canQuery) {
    const supabase = supabaseServer()
    if (supabase) {
      let query = supabase.from('products').select('*')

      // Filtres
      if (searchParams.category) {
        query = query.eq('category', searchParams.category)
      }

      if (searchParams.q) {
        query = query.or(`title.ilike.%${searchParams.q}%,description.ilike.%${searchParams.q}%`)
      }

      // Tri
      switch (searchParams.sort) {
        case 'price_asc':
          query = query.order('price', { ascending: true })
          break
        case 'price_desc':
          query = query.order('price', { ascending: false })
          break
        case 'newest':
          query = query.order('created_at', { ascending: false })
          break
        default:
          query = query.order('created_at', { ascending: false })
      }

      const { data: products } = await query
      localProducts = products || []
    }
  }

  // Récupérer les produits dropshipping
  let dropshippingProducts = []
  try {
    const manager = new DropshippingManager()
    dropshippingProducts = await manager.getAllProducts()
  } catch (error) {
    console.error('Erreur produits dropshipping:', error)
  }

  // Combiner tous les produits
  const allProducts = [...localProducts, ...dropshippingProducts]
  
  // Appliquer les filtres sur l'ensemble
  let filteredProducts = allProducts
  
  if (searchParams.category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category === searchParams.category
    )
  }
  
  if (searchParams.q) {
    const query = searchParams.q.toLowerCase()
    filteredProducts = filteredProducts.filter(p => 
      p.title?.toLowerCase().includes(query) || 
      p.description?.toLowerCase().includes(query)
    )
  }
  
  // Appliquer le tri
  switch (searchParams.sort) {
    case 'price_asc':
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      filteredProducts.sort((a, b) => 
        new Date(b.created_at || Date.now()) - new Date(a.created_at || Date.now())
      )
      break
  }

  return filteredProducts
}

export const metadata = {
  title: 'Boutique - Ikabay',
  description: 'Découvrez tous nos produits caribéens authentiques et imports de qualité.',
}

export default async function ProductsPage({ searchParams }) {
  const products = await getProducts(searchParams)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-caribbean-dark mb-4">
          Boutique Ikabay
        </h1>
        <p className="text-xl text-gray-600">
          {products.length} produit{products.length > 1 ? 's' : ''} disponible{products.length > 1 ? 's' : ''}
        </p>
      </div>

      <Suspense fallback={<div>Chargement des filtres...</div>}>
        <Filters />
      }
      </Suspense>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Aucun produit trouvé
          </h2>
          <p className="text-gray-600 mb-8">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}