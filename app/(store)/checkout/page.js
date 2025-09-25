'use client'

'use client'

import { useState } from 'react'
import { useCartStore, useLoyaltyStore } from '@/lib/store'
import { formatPrice, generateReference, logEvent } from '@/lib/utils'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { CreditCard, Smartphone, Building } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart, referralCode } = useCartStore()
  const { setPoints } = useLoyaltyStore()
  
  const [formData, setFormData] = useState({
    email: '',
    paymentMethod: 'crypto',
    // Honeypot
    website: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const total = getTotal()
  const shipping = total >= 50 ? 0 : 5
  const finalTotal = total + shipping

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Honeypot check
    if (formData.website) {
      return
    }
    
    if (!formData.email || items.length === 0) {
      setError('Veuillez remplir tous les champs requis')
      return
    }
    
    setIsSubmitting(true)
    setError('')
    
    try {
      const reference = generateReference()
      
      // Créer la commande
      const orderData = {
        email: formData.email,
        items: items.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
        })),
        total: finalTotal,
        payment_method: formData.paymentMethod,
        reference,
        status: 'pending'
      }
      
      if (supabase) {
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert(orderData)
          .select()
          .single()
        
        if (orderError) throw orderError
        
        // Upsert loyalty points (1€ = 1 IKB)
        const points = Math.ceil(finalTotal)
        await supabase
          .from('loyalty')
          .upsert({
            email: formData.email,
            points
          }, {
            onConflict: 'email',
            ignoreDuplicates: false
          })
        
        // Gérer le parrainage
        if (referralCode) {
          const { data: referral } = await supabase
            .from('referrals')
            .select('*')
            .eq('code', referralCode)
            .single()
          
          if (referral) {
            // +10 points au parrain
            await supabase.rpc('increment_loyalty_points', {
              user_email: referral.referred_email,
              points_to_add: 10
            })
            
            // Log du parrainage
            await supabase
              .from('event_logs')
              .insert({
                event: 'referral_reward',
                payload: {
                  referrer: referral.referred_email,
                  referee: formData.email,
                  order_reference: reference,
                  reward_points: 10
                }
              })
          }
        }
        
        // Mettre à jour les points localement
        setPoints(points, formData.email)
        
        // Log de la commande
        logEvent('place_order', {
          reference,
          total: finalTotal,
          payment_method: formData.paymentMethod,
          items_count: items.length
        })
        
        // Vider le panier
        clearCart()
        
        // Rediriger vers la page de paiement
        router.push(`/pay/${order.id}`)
      } else {
        // Mode démo sans Supabase
        const orderId = Date.now().toString()
        clearCart()
        router.push(`/pay/${orderId}`)
      }
      
    } catch (error) {
      console.error('Erreur commande:', error)
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-caribbean-dark mb-2">
            Finaliser ma commande
          </h1>
          <p className="text-gray-600">
            Dernière étape avant le paiement
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            className="honeypot"
            tabIndex="-1"
            autoComplete="off"
          />

          {/* Email */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-caribbean-dark mb-4">
              Informations de contact
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="input"
                placeholder="votre@email.com"
              />
              <p className="text-sm text-gray-600 mt-2">
                Vous recevrez la confirmation et le suivi de votre commande
              </p>
            </div>
          </div>

          {/* Méthode de paiement */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-caribbean-dark mb-4">
              Méthode de paiement
            </h2>
            
            <div className="space-y-4">
              {/* Crypto */}
              <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="crypto"
                  checked={formData.paymentMethod === 'crypto'}
                  onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  className="mr-4"
                />
                <Smartphone className="mr-3 text-caribbean-blue" size={24} />
                <div className="flex-1">
                  <div className="font-semibold">Cryptomonnaie</div>
                  <div className="text-sm text-gray-600">Bitcoin, USDT (ERC20/EVM)</div>
                </div>
                <div className="text-caribbean-green font-semibold">Recommandé</div>
              </label>

              {/* Virement */}
              <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={formData.paymentMethod === 'bank'}
                  onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  className="mr-4"
                />
                <Building className="mr-3 text-caribbean-blue" size={24} />
                <div className="flex-1">
                  <div className="font-semibold">Virement bancaire</div>
                  <div className="text-sm text-gray-600">Revolut - Traitement sous 24h</div>
                </div>
              </label>

              {/* Carte (désactivé si pas de clés Stripe) */}
              <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
                  ? 'hover:bg-gray-50' 
                  : 'opacity-50 cursor-not-allowed bg-gray-100'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  disabled={!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
                  className="mr-4"
                />
                <CreditCard className="mr-3 text-caribbean-blue" size={24} />
                <div className="flex-1">
                  <div className="font-semibold">Carte bancaire</div>
                  <div className="text-sm text-gray-600">
                    {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
                      ? 'Visa, Mastercard, American Express'
                      : 'Bientôt disponible'
                    }
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Résumé */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-caribbean-dark mb-4">
              Résumé de la commande
            </h2>
            
            <div className="space-y-3 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.title} × {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className={shipping === 0 ? 'text-caribbean-green' : ''}>
                    {shipping === 0 ? 'Gratuite' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-caribbean-blue">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-caribbean-yellow/10 p-4 rounded-xl mb-6">
              <p className="text-sm text-caribbean-dark">
                <strong>🎁 Points de fidélité:</strong> Vous gagnerez {Math.ceil(finalTotal)} points IKB avec cette commande !
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full text-lg py-4"
          >
            {isSubmitting ? 'Traitement...' : `Payer ${formatPrice(finalTotal)}`}
          </button>
        </form>
      </div>
    </div>
  )
}