import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ChevronRight,
  DollarSign
} from 'lucide-react';
import ZendropCheckout from './ZendropCheckout';
import { supabase } from '../utils/supabase';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ZendropCartProps {
  className?: string;
  marginPercentage?: number;
  walletAddress?: string;
}

const ZendropCart: React.FC<ZendropCartProps> = ({ 
  className = '',
  marginPercentage = 30,
  walletAddress = 'TWDiBSMEgsDHVRwEcFNiPVWZVPjXGZ9JiE'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [profit, setProfit] = useState(0);
  const [user, setUser] = useState<any>(null);

  // Get user session
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };
    
    getUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Load cart from localStorage or database
  useEffect(() => {
    const loadCart = async () => {
      // First try to get from localStorage
      const savedCart = localStorage.getItem('zendropCart');
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } else if (user) {
        // If user is logged in, try to get from database
        const { data, error } = await supabase
          .from('shopping_carts')
          .select('cart_items')
          .eq('user_id', user.id)
          .single();
          
        if (data && !error) {
          setCartItems(data.cart_items || []);
        }
      }
    };
    
    loadCart();
  }, [user]);

  // Save cart to localStorage and database if user is logged in
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('zendropCart', JSON.stringify(cartItems));
    
    // Save to database if user is logged in
    if (user) {
      const saveCart = async () => {
        const { error } = await supabase
          .from('shopping_carts')
          .upsert({
            user_id: user.id,
            cart_items: cartItems,
            updated_at: new Date()
          });
          
        if (error) {
          console.error('Error saving cart:', error);
        }
      };
      
      saveCart();
    }
    
    // Calculate cart count and total
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const calculatedProfit = total * (marginPercentage / (100 + marginPercentage));
    
    setCartCount(count);
    setCartTotal(total);
    setProfit(calculatedProfit);
  }, [cartItems, marginPercentage, user]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const handleCheckoutSuccess = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setIsOpen(false);
    
    // Record the sale in the database
    if (user) {
      const recordSale = async () => {
        const { error } = await supabase
          .from('sales')
          .insert({
            user_id: user.id,
            items: cartItems,
            total: cartTotal,
            profit: profit,
            wallet_address: walletAddress,
            status: 'completed',
            created_at: new Date()
          });
          
        if (error) {
          console.error('Error recording sale:', error);
        }
      };
      
      recordSale();
    }
  };

  return (
    <>
      {/* Cart Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-caribbean-gradient rounded-full shadow-lg flex items-center justify-center text-white z-40 ${className}`}
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {cartCount}
            </div>
          )}
        </div>
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Votre Panier</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Votre panier est vide</h4>
                    <p className="text-gray-500 mb-6">Ajoutez des produits pour commencer vos achats</p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-2 bg-caribbean-gradient text-white rounded-xl font-medium hover:shadow-caribbean transition-all duration-300"
                    >
                      Parcourir les produits
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500 mb-2">{formatPrice(item.price)}</p>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-gray-900 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-gray-200">
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Sous-total</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    
                    <div className="bg-green-50 rounded-xl p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Votre profit</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700">Marge ({marginPercentage}%)</span>
                        <span className="font-bold text-green-700">{formatPrice(profit)}</span>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (!user) {
                          // Redirect to login if not logged in
                          setIsOpen(false);
                          window.location.href = '/login';
                          return;
                        }
                        setIsCheckoutOpen(true);
                      }}
                      className="w-full bg-caribbean-gradient text-white py-3 rounded-xl font-bold hover:shadow-caribbean transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Passer la commande</span>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <ZendropCheckout 
          products={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={handleCheckoutSuccess}
          marginPercentage={marginPercentage}
          walletAddress={walletAddress}
        />
      )}
    </>
  );
};

export default ZendropCart;