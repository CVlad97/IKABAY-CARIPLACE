'use client'

'use client'

import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal, getItemCount } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-caribbean-dark mb-4">
            Votre panier est vide
          </h1>
          <p className="text-gray-600 mb-8">
            Découvrez nos produits et ajoutez-les à votre panier
          </p>
          <Link href="/products" className="btn btn-primary">
            <ShoppingBag size={20} />
            Continuer mes achats
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-caribbean-dark mb-2">
          Mon panier
        </h1>
        <p className="text-gray-600">
          {getItemCount()} article{getItemCount() > 1 ? 's' : ''} dans votre panier
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Articles */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="card p-6">
              <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-caribbean-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-caribbean-blue font-bold mb-4">
                    {formatPrice(item.price)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    {/* Quantité */}
                    <div className="flex items-center border border-gray-200 rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 rounded-l-xl"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 font-semibold min-w-[60px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 rounded-r-xl"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    {/* Supprimer */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg text-caribbean-dark">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Actions */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Vider le panier
            </button>
            
            <Link href="/products" className="btn btn-outline">
              Continuer mes achats
            </Link>
          </div>
        </div>

        {/* Résumé */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold text-caribbean-dark mb-6">
              Résumé de la commande
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Livraison</span>
                <span className="text-caribbean-green">
                  {getTotal() >= 50 ? 'Gratuite' : formatPrice(5)}
                </span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-caribbean-blue">
                    {formatPrice(getTotal() + (getTotal() >= 50 ? 0 : 5))}
                  </span>
                </div>
              </div>
            </div>
            
            {getTotal() < 50 && (
              <div className="bg-caribbean-yellow/10 text-caribbean-dark p-4 rounded-xl mb-6 text-sm">
                <p className="font-semibold mb-1">🚚 Livraison gratuite</p>
                <p>
                  Ajoutez {formatPrice(50 - getTotal())} pour bénéficier 
                  de la livraison gratuite !
                </p>
              </div>
            )}
            
            <Link href="/checkout" className="btn btn-primary w-full">
              Passer la commande
            </Link>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>🔒 Paiement 100% sécurisé</p>
              <p>💳 Crypto • Virement • Carte</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}