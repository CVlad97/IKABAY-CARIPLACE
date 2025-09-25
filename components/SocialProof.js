'use client'

import { useState, useEffect } from 'react'

export default function SocialProof() {
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const showNotification = () => {
      const locations = [
        'Fort-de-France', 'Pointe-à-Pitre', 'Le Lamentin', 'Schoelcher', 
        'Sainte-Anne', 'Le Gosier', 'Baie-Mahault', 'Saint-Pierre'
      ]

      const products = [
        'Épices Colombo Premium', 'Huile de Coco Bio', 'Casque Bluetooth',
        'Rhum Agricole', 'Savon Coco', 'Café Guadeloupe'
      ]
      
      const location = locations[Math.floor(Math.random() * locations.length)]
      const product = products[Math.floor(Math.random() * products.length)]
      const timeAgo = Math.floor(Math.random() * 30) + 1
      
      setNotification({
        location,
        product,
        timeAgo: `il y a ${timeAgo} min`
      })

      setTimeout(() => setNotification(null), 5000)
    }

    const interval = setInterval(showNotification, 8000)
    showNotification() // Show immediately

    return () => clearInterval(interval)
  }, [])

  if (!notification) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-xl p-4 max-w-sm border border-caribbean-green/20">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-caribbean-green rounded-full animate-pulse"></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              Commande à {notification.location}
            </p>
            <p className="text-xs text-gray-600">
              {notification.product} • {notification.timeAgo}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}