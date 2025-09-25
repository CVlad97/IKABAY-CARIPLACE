'use client'

import { useState } from 'react'
import { Search, Package, Truck, MapPin, Clock } from 'lucide-react'

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingResult, setTrackingResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrack = async (e) => {
    e.preventDefault()
    
    if (!trackingNumber.trim()) {
      setError('Veuillez saisir un numéro de suivi')
      return
    }
    
    setIsLoading(true)
    setError('')
    setTrackingResult(null)
    
    try {
      const response = await fetch(`/api/dropshipping/tracking/${trackingNumber.trim()}`)
      const data = await response.json()
      
      if (data.success) {
        setTrackingResult(data.tracking)
      } else {
        setError(data.error || 'Numéro de suivi non trouvé')
      }
    } catch (err) {
      setError('Erreur lors de la recherche. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    const normalizedStatus = status.toLowerCase()
    if (normalizedStatus.includes('préparation')) return '📦'
    if (normalizedStatus.includes('expédié')) return '🚚'
    if (normalizedStatus.includes('transit')) return '✈️'
    if (normalizedStatus.includes('livraison')) return '🚛'
    if (normalizedStatus.includes('livré')) return '✅'
    return '📋'
  }

  const getStatusColor = (status) => {
    const normalizedStatus = status.toLowerCase()
    if (normalizedStatus.includes('livré')) return 'text-caribbean-green'
    if (normalizedStatus.includes('transit')) return 'text-caribbean-blue'
    if (normalizedStatus.includes('expédié')) return 'text-caribbean-yellow'
    return 'text-gray-600'
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-caribbean-dark mb-4">
            Suivi de livraison
          </h1>
          <p className="text-xl text-gray-600">
            Suivez votre commande en temps réel
          </p>
        </div>

        {/* Formulaire de recherche */}
        <div className="card p-6 mb-8">
          <form onSubmit={handleTrack} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Entrez votre numéro de suivi (ex: EU12345678, INT87654321)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="input pr-12"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary px-8"
            >
              {isLoading ? 'Recherche...' : 'Suivre'}
            </button>
          </form>
          
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
              {error}
            </div>
          )}
        </div>

        {/* Résultat du suivi */}
        {trackingResult && (
          <div className="space-y-6">
            {/* Statut principal */}
            <div className="card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{getStatusIcon(trackingResult.status)}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-caribbean-dark">
                    {trackingResult.tracking_number}
                  </h2>
                  <p className={`text-lg font-semibold ${getStatusColor(trackingResult.status)}`}>
                    {trackingResult.status}
                  </p>
                  {trackingResult.location && (
                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                      <MapPin size={16} />
                      <span>{trackingResult.location}</span>
                    </div>
                  )}
                </div>
                {trackingResult.last_update && (
                  <div className="text-right text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>Dernière mise à jour</span>
                    </div>
                    <div className="font-medium">
                      {new Date(trackingResult.last_update).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Historique */}
            {trackingResult.events && trackingResult.events.length > 0 && (
              <div className="card p-6">
                <h3 className="text-xl font-bold text-caribbean-dark mb-6">
                  Historique de livraison
                </h3>
                
                <div className="space-y-4">
                  {trackingResult.events.map((event, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                      <div className="flex-shrink-0 w-8 h-8 bg-caribbean-blue/10 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-caribbean-blue rounded-full"></div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-caribbean-dark">
                            {event.status}
                          </h4>
                          <span className="text-sm text-gray-600">
                            {new Date(event.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        
                        {event.location && (
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <MapPin size={14} />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        )}
                        
                        {event.description && (
                          <p className="text-sm text-gray-700">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Informations utiles */}
            <div className="card p-6 bg-caribbean-blue/5">
              <h3 className="text-lg font-bold text-caribbean-dark mb-4">
                Informations utiles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-2">📞 Besoin d'aide ?</p>
                  <p>Contactez notre service client :</p>
                  <p>Email: support@ikabay.com</p>
                  <p>Tél: +596 696 XX XX XX</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">🕐 Délais de livraison</p>
                  <p>Martinique / Guadeloupe: 7-14 jours</p>
                  <p>Import international: 10-21 jours</p>
                  <p>Les délais peuvent varier selon les conditions</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions d'aide */}
        {!trackingResult && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-caribbean-dark mb-4">
                Comment suivre ma commande ?
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>1. Récupérez votre numéro de suivi dans l'email de confirmation</p>
                <p>2. Saisissez-le dans le champ de recherche ci-dessus</p>
                <p>3. Consultez l'état d'avancement en temps réel</p>
              </div>
            </div>

            <div className="card p-6">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-caribbean-dark mb-4">
                Types de numéros de suivi
              </h3>
              <div className="space-y-3 text-gray-600">
                <p><strong>EU...</strong> - Fournisseur Européen (7-14 jours)</p>
                <p><strong>INT...</strong> - Import International (10-21 jours)</p>
                <p><strong>IKB...</strong> - Produits locaux (24-48h)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}