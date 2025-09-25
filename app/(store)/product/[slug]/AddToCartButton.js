'use client'

'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { logEvent } from '@/lib/utils'

export default function AddToCartButton({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore(state => state.addItem)

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    try {
      addItem(product, quantity)
      
      // Log event
      logEvent('add_to_cart', {
        product_id: product.id,
        product_title: product.title,
        quantity,
        price: product.price
      })
      
      // Feedback visuel
      setTimeout(() => setIsAdding(false), 1000)
    } catch (error) {
      console.error('Erreur ajout panier:', error)
      setIsAdding(false)
    }
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(q => q + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1)
    }
  }

  if (product.stock === 0) {
    return (
      <div className="bg-gray-100 text-gray-500 px-8 py-4 rounded-2xl text-center font-semibold">
        Rupture de stock
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Sélecteur de quantité */}
      <div className="flex items-center gap-4">
        <span className="font-medium text-caribbean-dark">Quantité:</span>
        <div className="flex items-center border border-gray-200 rounded-xl">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-xl"
          >
            <Minus size={18} />
          </button>
          <span className="px-4 py-2 font-semibold min-w-[60px] text-center">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            disabled={quantity >= product.stock}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-xl"
          >
            <Plus size={18} />
          </button>
        </div>
        <span className="text-sm text-gray-500">
          (max: {product.stock})
        </span>
      </div>

      {/* Bouton d'ajout */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`btn w-full text-lg py-4 ${
          isAdding 
            ? 'bg-caribbean-green text-white' 
            : 'btn-primary'
        }`}
      >
        {isAdding ? (
          <>
            ✓ Ajouté au panier !
          </>
        ) : (
          <>
            <ShoppingCart size={20} />
            Ajouter au panier
          </>
        )}
      </button>
    </div>
  )
}