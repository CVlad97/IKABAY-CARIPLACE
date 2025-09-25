export function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

export function generateReference() {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `IKB-${timestamp}${random}`.toUpperCase()
}

export function generateReferralCode() {
  return Math.random().toString(36).substr(2, 8).toUpperCase()
}

export function logEvent(event, payload = {}) {
  if (typeof window !== 'undefined' && navigator.sendBeacon) {
    const data = JSON.stringify({ event, payload, timestamp: new Date().toISOString() })
    navigator.sendBeacon('/api/log', data)
  }
}

export function getTimeAgo(date) {
  const now = new Date()
  const diff = now - new Date(date)
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return 'à l\'instant'
  if (minutes < 60) return `il y a ${minutes} min`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `il y a ${hours}h`
  
  const days = Math.floor(hours / 24)
  return `il y a ${days}j`
}