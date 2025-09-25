'use client';

import { useState } from 'react';
import { Package, Truck, Ship, CreditCard } from 'lucide-react';

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  time: string;
  mode: 'air' | 'sea';
  provider: string;
  icon: React.ReactNode;
}

export default function DemoCheckoutPage() {
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  const [selectedShipping, setSelectedShipping] = useState<string>('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [loading, setLoading] = useState(false);

  const demoItems = [
    { name: 'Épices Colombo Premium', price: 8.90, quantity: 2 },
    { name: 'Huile de Coco Bio', price: 12.90, quantity: 1 }
  ];

  const subtotal = demoItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getShippingQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: {
            countryCode: 'FR',
            postalCode: '75001',
            cityName: 'Paris'
          },
          to: {
            countryCode: 'MQ',
            postalCode: '97200',
            cityName: 'Fort-de-France'
          },
          packages: [{
            weight: 1.5,
            length: 20,
            width: 15,
            height: 10
          }]
        })
      });

      const data = await response.json();
      
      if (data.success) {
        const options: ShippingOption[] = [];
        
        if (data.options.fastest) {
          options.push({
            id: 'fastest',
            name: data.options.fastest.productName || 'Express Aérien',
            price: data.options.fastest.totalPrice,
            time: data.options.fastest.deliveryTime,
            mode: 'air',
            provider: 'DHL',
            icon: <Package className="w-5 h-5" />
          });
        }
        
        if (data.options.cheapest && data.options.cheapest.mode === 'sea') {
          options.push({
            id: 'cheapest',
            name: 'Maritime Standard',
            price: data.options.cheapest.totalPrice,
            time: data.options.cheapest.deliveryTime,
            mode: 'sea',
            provider: 'TTOM',
            icon: <Ship className="w-5 h-5" />
          });
        }

        setShippingOptions(options);
        setStep('shipping');
      }
    } catch (error) {
      console.error('Quote error:', error);
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async () => {
    const selectedOption = shippingOptions.find(opt => opt.id === selectedShipping);
    if (!selectedOption) return;

    const total = subtotal + selectedOption.price;

    try {
      const response = await fetch('/api/pay/revolut/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'EUR',
          customer: { email: 'demo@ikabay.com', name: 'Demo User' },
          reference: 'DEMO-' + Date.now(),
          success_url: window.location.origin + '/demo/checkout?step=success',
          cancel_url: window.location.origin + '/demo/checkout?step=payment',
          description: 'Commande démo IKABAY'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        window.location.href = data.checkout.checkout_url;
      } else {
        alert('Erreur: ' + data.error);
      }
    } catch (error) {
      alert('Erreur lors du paiement');
    }
  };

  // Vérifier si on revient du paiement
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('step') === 'success' && step !== 'success') {
      setStep('success');
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Démo Checkout
          </h1>
          <p className="text-gray-600">
            Test des intégrations shipping et paiement
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {['cart', 'shipping', 'payment', 'success'].map((s, index) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s ? 'bg-blue-500 text-white' : 
                ['cart', 'shipping', 'payment', 'success'].indexOf(step) > index ? 'bg-green-500 text-white' : 
                'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              {index < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  ['cart', 'shipping', 'payment', 'success'].indexOf(step) > index ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Cart Step */}
        {step === 'cart' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Panier</h2>
            
            <div className="space-y-4 mb-6">
              {demoItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Sous-total:</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={getShippingQuotes}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Calcul des frais...' : 'Continuer'}
            </button>
          </div>
        )}

        {/* Shipping Step */}
        {step === 'shipping' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Livraison</h2>
            
            <div className="space-y-4 mb-6">
              {shippingOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    selectedShipping === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={selectedShipping === option.id}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="mr-4"
                  />
                  
                  <div className="flex items-center gap-3 flex-1">
                    {option.icon}
                    <div className="flex-1">
                      <h3 className="font-semibold">{option.name}</h3>
                      <p className="text-sm text-gray-600">
                        {option.provider} • {option.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">€{option.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">
                        {option.mode === 'air' ? '✈️ Aérien' : '🚢 Maritime'}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('cart')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300"
              >
                Retour
              </button>
              <button
                onClick={() => setStep('payment')}
                disabled={!selectedShipping}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50"
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Paiement</h2>
            
            {selectedShipping && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold mb-2">Récapitulatif</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sous-total:</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison:</span>
                    <span>€{shippingOptions.find(opt => opt.id === selectedShipping)?.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base border-t pt-2">
                    <span>Total:</span>
                    <span>€{(subtotal + (shippingOptions.find(opt => opt.id === selectedShipping)?.price || 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <button
                onClick={processPayment}
                className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600"
              >
                <CreditCard className="w-5 h-5" />
                Payer avec Revolut
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('shipping')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300"
              >
                Retour
              </button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Paiement Réussi !
            </h2>
            
            <p className="text-gray-600 mb-6">
              Votre commande démo a été traitée avec succès. 
              Les intégrations DHL, TTOM et Revolut fonctionnent parfaitement.
            </p>

            <button
              onClick={() => {
                setStep('cart');
                setSelectedShipping('');
                setShippingOptions([]);
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600"
            >
              Nouvelle Démo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}