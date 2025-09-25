'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const categories = [
  { slug: '', title: 'Toutes les catégories' },
  { slug: 'epicerie', title: 'Épicerie' },
  { slug: 'cosmetique', title: 'Cosmétique' },
  { slug: 'maison', title: 'Maison & Jardin' },
  { slug: 'mode', title: 'Mode' },
  { slug: 'hightech', title: 'High-Tech' }
]

const sortOptions = [
  { value: '', label: 'Tri par défaut' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'newest', label: 'Plus récents' }
]

export default function Filters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || '',
    q: searchParams.get('q') || ''
  })

  useEffect(() => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      }
    })
    
    const queryString = params.toString()
    const newUrl = queryString ? `/products?${queryString}` : '/products'
    
    router.push(newUrl, { scroll: false })
  }, [filters, router])

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie
          </label>
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="select"
          >
            {categories.map(cat => (
              <option key={cat.slug} value={cat.slug}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* Tri */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trier par
          </label>
          <select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Recherche */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recherche
          </label>
          <input
            type="text"
            placeholder="Rechercher..."
            value={filters.q}
            onChange={(e) => updateFilter('q', e.target.value)}
            className="input"
          />
        </div>
      </div>
      
      {/* Tags actifs */}
      {(filters.category || filters.q) && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          {filters.category && (
            <span className="badge bg-caribbean-blue/10 text-caribbean-blue flex items-center gap-2">
              {categories.find(c => c.slug === filters.category)?.title}
              <button
                onClick={() => updateFilter('category', '')}
                className="hover:text-red-500"
              >
                ×
              </button>
            </span>
          )}
          {filters.q && (
            <span className="badge bg-caribbean-green/10 text-caribbean-green flex items-center gap-2">
              "{filters.q}"
              <button
                onClick={() => updateFilter('q', '')}
                className="hover:text-red-500"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}