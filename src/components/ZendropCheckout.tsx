import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Wallet, 
  ShoppingCart, 
  Truck, 
  CheckCircle, 
  ChevronRight,
  Shield,
  DollarSign,
  User,
  Mail,
  Home,
  MapPin,
  Phone
} from 'lucide-react';
import { supabase } from '../utils/supabase';
import { sendProfitWebhook } from './ZendropWebhook';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ZendropCheckoutProps {
  products: Product[];
  onClose: () => void;
  onSuccess: () => void;
  marginPercentage: number;
  walletAddress: string;
}

const ZendropCheckout: React.FC<ZendropCheckoutProps> = ({ 
  products, 
  onClose, 
  onSuccess,
  marginPercentage,
  walletAddress
}) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });

  // Get user data
  React.useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
        
        // Get user profile data
        const { data: profileData } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
          
        if (profileData) {
          setFormData(prev => ({
            ...prev,
            name: profileData.full_name || '',
            email: profileData.email || '',
            // Add other fields if available in your user profile
          }));
        }
      }
    };
    
    getUser();
  }, []);

  // Calculate totals
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const shipping = 4.99;
  const tax = subtotal * 0.2; // 20% VAT
  const total = subtotal + shipping + tax;

  // Calculate profit
  const profit = subtotal * (marginPercentage / 100);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          total: total,
          currency: 'EUR',
          status: 'paid',
          shipping_address: {
            name: formData.name,
            address: formData.address,
            city: formData.city,
            postal_code: formData.postalCode,
            country: formData.country,
            phone: formData.phone
          },
          payment_method: paymentMethod
        })
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // 2. Create order items
      const orderItems = products.map(product => ({
        order_id: orderData.id,
        product_id: product.id,
        quantity: product.quantity,
        price: product.price
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (itemsError) throw itemsError;
      
      // 3. Send profit to wallet via webhook
      await sendProfitWebhook({
        orderId: orderData.id,
        productId: products[0].id, // Just using the first product for simplicity
        productName: products[0].name,
        basePrice: subtotal / (1 + marginPercentage/100),
        sellingPrice: subtotal,
        profit: profit,
        walletAddress: walletAddress,
        timestamp: new Date().toISOString()
      });
      
      // 4. Clear cart from database
      if (user) {
        await supabase
          .from('shopping_carts')
          .update({ cart_items: [] })
          .eq('user_id', user.id);
      }
      
      // 5. Success!
      setLoading(false);
      setStep(3); // Success step
    } catch (error) {
      console.error('Error processing order:', error);
      setLoading(false);
      // You would typically show an error message here
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Finaliser votre commande</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center w-full max-w-xs">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-caribbean-gradient text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <div className={`flex-1 h-1 ${
                step >= 2 ? 'bg-caribbean-gradient' : 'bg-gray-200'
              }`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-caribbean-gradient text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <div className={`flex-1 h-1 ${
                step >= 3 ? 'bg-caribbean-gradient' : 'bg-gray-200'
              }`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-caribbean-gradient text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Récapitulatif de la commande</h3>
                
                <div className="space-y-4 mb-6">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center space-x-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500">Quantité: {product.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{formatPrice(product.price * product.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>TVA (20%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                
                <div className="mt-6 bg-green-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-green-800">Votre profit</h4>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Marge ({marginPercentage}%)</span>
                    <span className="font-bold text-green-700">{formatPrice(profit)}</span>
                  </div>
                </div>
              </div>
              
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informations client</h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                          placeholder="Jean Dupont"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                          placeholder="jean@example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                        placeholder="123 Rue de Paris"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ville
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                        placeholder="Paris"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Code postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                        placeholder="75001"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pays
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                          placeholder="France"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                          placeholder="+33 6 12 34 56 78"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Methods */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Méthode de paiement</h3>
                
                <div className="space-y-4 mb-6">
                  <div 
                    className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      paymentMethod === 'card' 
                        ? 'border-caribbean-500 bg-caribbean-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Carte bancaire</p>
                        <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {paymentMethod === 'card' && (
                        <div className="w-3 h-3 rounded-full bg-caribbean-500"></div>
                      )}
                    </div>
                  </div>
                  
                  <div 
                    className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      paymentMethod === 'crypto' 
                        ? 'border-caribbean-500 bg-caribbean-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('crypto')}
                  >
                    <div className="flex items-center space-x-3">
                      <Wallet className="w-6 h-6 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Crypto</p>
                        <p className="text-sm text-gray-500">BTC, ETH, SOL, USDT</p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {paymentMethod === 'crypto' && (
                        <div className="w-3 h-3 rounded-full bg-caribbean-500"></div>
                      )}
                    </div>
                  </div>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Numéro de carte
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date d'expiration
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'crypto' && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-700 mb-4">
                      Vous serez redirigé vers notre passerelle de paiement crypto pour finaliser votre achat.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-600">Paiement sécurisé via notre partenaire</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Récapitulatif</h3>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="space-y-4 mb-6">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center space-x-4">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-500">Quantité: {product.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{formatPrice(product.price * product.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Sous-total</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Livraison</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>TVA (20%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Truck className="w-5 h-5" />
                      <span>Livraison estimée: 7-14 jours</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Shield className="w-5 h-5" />
                      <span>Paiement sécurisé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Commande confirmée !</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Merci pour votre achat. Votre commande a été traitée avec succès et sera expédiée sous peu.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 max-w-md mx-auto mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Numéro de commande:</span>
                  <span className="font-medium text-gray-900">#ZD{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profit généré:</span>
                  <span className="font-medium text-green-600">{formatPrice(profit)}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSuccess}
                className="bg-caribbean-gradient text-white px-8 py-3 rounded-xl font-bold hover:shadow-caribbean transition-all duration-300"
              >
                Continuer mes achats
              </motion.button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          {step < 3 && (
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {step > 1 ? 'Retour' : 'Annuler'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => step < 2 ? setStep(step + 1) : handleSubmit}
                disabled={loading}
                className="bg-caribbean-gradient text-white px-8 py-3 rounded-xl font-bold hover:shadow-caribbean transition-all duration-300 disabled:opacity-70 flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Traitement...</span>
                  </>
                ) : (
                  <>
                    <span>{step === 1 ? 'Continuer' : 'Payer'}</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ZendropCheckout;