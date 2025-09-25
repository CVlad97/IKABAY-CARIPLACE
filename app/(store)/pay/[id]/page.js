'use client'

'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { formatPrice } from '@/lib/utils'
import { Copy, Check, CreditCard } from 'lucide-react'

export default function PayPage({ params }) {
  const [order, setOrder] = useState(null)
  const [txid, setTxid] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    loadOrder()
  }, [params.id])

  const loadOrder = async () => {
    if (!supabase) {
      // Mode démo
      setOrder({
        id: params.id,
        reference: 'IKB-DEMO123',
        total: 29.90,
        payment_method: 'crypto',
        email: 'demo@ikabay.com'
      })
      return
    }

    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .eq('id', params.id)
      .single()

    setOrder(order)
  }

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(''), 2000)
    } catch (err) {
      console.error('Erreur copie:', err)
    }
  }

  const updateTxid = async () => {
    if (!txid.trim() || !supabase) return

    setIsUpdating(true)
    
    try {
      await supabase
        .from('orders')
        .update({ txid: txid.trim() })
        .eq('id', params.id)
      
      alert('Transaction ID enregistré ! Nous vérifierons le paiement sous peu.')
    } catch (error) {
      console.error('Erreur mise à jour TXID:', error)
      alert('Erreur lors de l\'enregistrement')
    } finally {
      setIsUpdating(false)
    }
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-caribbean-blue border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Chargement de votre commande...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-caribbean-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-3xl font-bold text-caribbean-dark mb-2">
            Commande confirmée !
          </h1>
          <p className="text-gray-600">
            Référence: <strong>{order.reference}</strong>
          </p>
        </div>

        {/* Instructions de paiement */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-caribbean-dark mb-6">
            Instructions de paiement
          </h2>

          {order.payment_method === 'crypto' && (
            <div className="space-y-6">
              <div className="bg-caribbean-blue/5 p-4 rounded-xl">
                <p className="text-sm text-caribbean-dark mb-4">
                  <strong>💰 Montant à payer:</strong> {formatPrice(order.total)}
                </p>
                <p className="text-sm text-gray-600">
                  Envoyez le montant exact à l'une des adresses ci-dessous et 
                  ajoutez votre référence <strong>{order.reference}</strong> dans le message de la transaction.
                </p>
              </div>

              {/* Bitcoin */}
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-caribbean-dark">Bitcoin (BTC)</h3>
                  <button
                    onClick={() => copyToClipboard('3393qWwf1ENgFhaCE4tEZUhHAnGeHU6C5e', 'btc')}
                    className="btn-outline px-3 py-1 text-sm"
                  >
                    {copied === 'btc' ? <Check size={16} /> : <Copy size={16} />}
                    {copied === 'btc' ? 'Copié' : 'Copier'}
                  </button>
                </div>
                <code className="block bg-gray-100 p-3 rounded-lg text-sm break-all">
                  3393qWwf1ENgFhaCE4tEZUhHAnGeHU6C5e
                </code>
              </div>

              {/* USDT ERC20 */}
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-caribbean-dark">USDT (ERC20)</h3>
                  <button
                    onClick={() => copyToClipboard('0xc0c6dc4af2632f2cf8e04ec489638bbddd2528b5', 'usdt-erc20')}
                    className="btn-outline px-3 py-1 text-sm"
                  >
                    {copied === 'usdt-erc20' ? <Check size={16} /> : <Copy size={16} />}
                    {copied === 'usdt-erc20' ? 'Copié' : 'Copier'}
                  </button>
                </div>
                <code className="block bg-gray-100 p-3 rounded-lg text-sm break-all">
                  0xc0c6dc4af2632f2cf8e04ec489638bbddd2528b5
                </code>
              </div>

              {/* USDT EVM */}
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-caribbean-dark">USDT (EVM)</h3>
                  <button
                    onClick={() => copyToClipboard('0x7f4658b1d3B5530670b83C340fec604c0611559c', 'usdt-evm')}
                    className="btn-outline px-3 py-1 text-sm"
                  >
                    {copied === 'usdt-evm' ? <Check size={16} /> : <Copy size={16} />}
                    {copied === 'usdt-evm' ? 'Copié' : 'Copier'}
                  </button>
                </div>
                <code className="block bg-gray-100 p-3 rounded-lg text-sm break-all">
                  0x7f4658b1d3B5530670b83C340fec604c0611559c
                </code>
              </div>

              {/* TXID */}
              <div className="bg-caribbean-yellow/10 p-4 rounded-xl">
                <h3 className="font-semibold text-caribbean-dark mb-3">
                  Confirmer votre paiement
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Après avoir effectué le paiement, collez votre Transaction ID (TXID) ci-dessous:
                </p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Transaction ID (TXID)"
                    value={txid}
                    onChange={(e) => setTxid(e.target.value)}
                    className="input flex-1"
                  />
                  <button
                    onClick={updateTxid}
                    disabled={!txid.trim() || isUpdating}
                    className="btn btn-primary"
                  >
                    {isUpdating ? 'Envoi...' : 'Envoyer'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {order.payment_method === 'bank' && (
            <div className="space-y-6">
              <div className="bg-caribbean-blue/5 p-4 rounded-xl">
                <p className="text-sm text-caribbean-dark mb-4">
                  <strong>💰 Montant à virer:</strong> {formatPrice(order.total)}
                </p>
                <p className="text-sm text-gray-600">
                  Effectuez un virement vers le compte ci-dessous en indiquant 
                  votre référence <strong>{order.reference}</strong> dans le libellé.
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-caribbean-dark mb-4">
                  Coordonnées bancaires Revolut
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bénéficiaire:</span>
                    <div className="flex items-center gap-2">
                      <strong>Vladimir Claveau</strong>
                      <button
                        onClick={() => copyToClipboard('Vladimir Claveau', 'beneficiaire')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {copied === 'beneficiaire' ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">IBAN:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm">FR76 2823 3000 0118 2979 7129 825</code>
                      <button
                        onClick={() => copyToClipboard('FR76 2823 3000 0118 2979 7129 825', 'iban')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {copied === 'iban' ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">BIC:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm">REVOFRP2</code>
                      <button
                        onClick={() => copyToClipboard('REVOFRP2', 'bic')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {copied === 'bic' ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Référence:</span>
                    <div className="flex items-center gap-2">
                      <strong className="text-caribbean-blue">{order.reference}</strong>
                      <button
                        onClick={() => copyToClipboard(order.reference, 'reference')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {copied === 'reference' ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-caribbean-yellow/10 p-4 rounded-xl">
                <p className="text-sm text-caribbean-dark">
                  <strong>⏱️ Délai de traitement:</strong> Votre commande sera traitée 
                  dans les 24h suivant la réception du virement.
                </p>
              </div>
            </div>
          )}

          {order.payment_method === 'card' && (
            <div className="text-center py-8">
              <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">
                Le paiement par carte sera bientôt disponible
              </p>
              <button className="btn bg-gray-300 text-gray-500 cursor-not-allowed">
                Paiement par carte (bientôt)
              </button>
            </div>
          )}
        </div>

        {/* Informations importantes */}
        <div className="card p-6">
          <h3 className="font-semibold text-caribbean-dark mb-4">
            📋 Informations importantes
          </h3>
          
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Votre commande sera expédiée dès réception du paiement</p>
            <p>• Vous recevrez un email de confirmation à {order.email}</p>
            <p>• Livraison sous 24-48h en Martinique et Guadeloupe</p>
            <p>• Support client: contact@ikabay.com ou +596 696 XX XX XX</p>
          </div>
        </div>
      </div>
    </div>
  )
}