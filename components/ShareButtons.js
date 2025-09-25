'use client'

import { MessageCircle, Send } from 'lucide-react'

export default function ShareButtons({ url, title, className = '' }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikabay.com'
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`
  
  const message = `🌴 Découvre ${title} sur Ikabay - Marketplace Caraïbe ! ${fullUrl}`

  const shareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const shareTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`
    window.open(telegramUrl, '_blank')
  }

  return (
    <div className={`flex gap-3 ${className}`}>
      <button
        onClick={shareWhatsApp}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
      >
        <MessageCircle size={18} />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>
      
      <button
        onClick={shareTelegram}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
      >
        <Send size={18} />
        <span className="hidden sm:inline">Telegram</span>
      </button>
    </div>
  )
}