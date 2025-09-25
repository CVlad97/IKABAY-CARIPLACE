import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/lib/store'
import { ShoppingCart } from 'lucide-react'
import Stars from './Stars'

export default function ProductCard({ product }) {
  const addItem = useCartStore(state => state.addItem)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <Link href={`/product/${product.slug}`} className="card group">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.tag && (
          <span className={`badge absolute top-3 left-3 ${
            product.tag === 'local' ? 'badge-local' : 'badge-import'
          }`}>
            {product.tag === 'local' ? '🌴 Local' : 
             product.supplier?.name || '🌍 Import'}
          </span>
        )}
        <button
          onClick={handleAddToCart}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <ShoppingCart size={18} className="text-caribbean-blue" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-caribbean-dark mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <Stars rating={4.5} size={16} />
          <span className="text-sm text-gray-600">(12 avis)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-caribbean-blue">
            {formatPrice(product.price)}
          </span>
          
          <span className="text-sm text-gray-600">
            Stock: {product.stock}
          </span>
        </div>
      </div>
    </Link>
  )
}