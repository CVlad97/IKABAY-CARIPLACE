'use client'

import Link from 'next/link'
import { ShoppingCart, User, Search } from 'lucide-react'
import { useCartStore, useLoyaltyStore } from '@/lib/store'
import { useState } from 'react'

export default function Header() {
  const itemCount = useCartStore(state => state.getItemCount())
  const points = useLoyaltyStore(state => state.points)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-caribbean-dark text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>📱 WhatsApp: +596 696 XX XX XX</span>
            <span>📧 contact@ikabay.com</span>
          </div>
          <div className="flex items-center gap-2">
            {points > 0 && (
              <span className="bg-caribbean-yellow text-caribbean-dark px-2 py-1 rounded-full font-semibold">
                IKB: {points}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-caribbean-blue to-caribbean-green rounded-xl flex items-center justify-center text-white font-bold text-xl">
              IK
            </div>
            <div>
              <h1 className="text-2xl font-bold text-caribbean-dark">Ikabay</h1>
              <p className="text-sm text-gray-600">Marketplace Caraïbe</p>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pr-12"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-caribbean-blue"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ShoppingCart size={24} className="text-caribbean-dark" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-caribbean-blue text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <User size={24} className="text-caribbean-dark" />
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 border-t pt-4">
          <div className="flex items-center gap-8">
            <Link href="/products" className="text-caribbean-dark hover:text-caribbean-blue font-medium transition-colors">
              Boutique
            </Link>
            <Link href="/tracking" className="text-caribbean-dark hover:text-caribbean-blue font-medium transition-colors">
              Suivi
            </Link>
            <Link href="/vendors" className="text-caribbean-dark hover:text-caribbean-blue font-medium transition-colors">
              Devenir vendeur
            </Link>
            <Link href="/partners" className="text-caribbean-dark hover:text-caribbean-blue font-medium transition-colors">
              Partenaires
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-caribbean-green rounded-full animate-pulse"></div>
              <span>Livraison Martinique & Guadeloupe</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}