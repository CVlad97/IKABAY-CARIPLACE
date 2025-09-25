import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ZendropProductList from '../components/ZendropProductList';
import OrderTracking from '../components/OrderTracking';
import ClientDashboard from '../components/ClientDashboard';
import { 
  ShoppingBag, 
  TrendingUp, 
  Wallet, 
  Settings, 
  DollarSign,
  Truck,
  BarChart3,
  Zap,
  Globe,
  ArrowRight,
  Sliders,
  Percent,
  User,
  Package
} from 'lucide-react';

const ZendropPage = () => {
  const [marginPercentage, setMarginPercentage] = useState(30);
  const [estimatedProfit, setEstimatedProfit] = useState(0);
  const [walletAddress, setWalletAddress] = useState('0x1234...5678');
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    document.title = 'Zendrop - IKABAY';
    
    // Calculate estimated profit based on average order value and margin
    const averageOrderValue = 50; // Example value
    const estimatedMonthlyOrders = 100; // Example value
    const calculatedProfit = averageOrderValue * (marginPercentage / 100) * estimatedMonthlyOrders;
    setEstimatedProfit(calculatedProfit);
  }, [marginPercentage]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-caribbean-gradient text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Boutique IKABAY
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Explorez notre sélection de produits de qualité avec livraison mondiale et paiement crypto.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-2xl font-bold">1000+</span>
                </div>
                <p className="text-sm opacity-90">Produits</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Truck className="w-5 h-5" />
                  <span className="text-2xl font-bold">7-14j</span>
                </div>
                <p className="text-sm opacity-90">Livraison</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-2xl font-bold">4.9/5</span>
                </div>
                <p className="text-sm opacity-90">Satisfaction</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Globe className="w-5 h-5" />
                  <span className="text-2xl font-bold">Mondial</span>
                </div>
                <p className="text-sm opacity-90">Expédition</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === 'products'
                ? 'bg-caribbean-gradient text-white shadow-caribbean'
                : 'bg-white text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600 shadow-sm'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Produits</span>
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === 'tracking'
                ? 'bg-caribbean-gradient text-white shadow-caribbean'
                : 'bg-white text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600 shadow-sm'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Suivi de Commande</span>
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === 'account'
                ? 'bg-caribbean-gradient text-white shadow-caribbean'
                : 'bg-white text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600 shadow-sm'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Mon Compte</span>
          </button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80 flex-shrink-0 space-y-6"
          >
            {/* Profit Dashboard */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Dashboard</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>

              <div className="space-y-6">
                {/* Stats */}
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-green-800">Commandes</h4>
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    12
                  </div>
                  <p className="text-sm text-green-700">
                    3 en cours de livraison
                  </p>
                </div>

                {/* Wallet */}
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-purple-800">Wallet</h4>
                  </div>
                  <div className="bg-white rounded-lg p-2 mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 truncate">{walletAddress}</span>
                    <button className="text-purple-600 hover:text-purple-800">
                      <Zap className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-purple-700">
                    Paiements automatiques activés
                  </p>
                </div>

                {/* Settings */}
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-50 rounded-xl p-4"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Percent className="w-5 h-5 text-gray-600" />
                      <h4 className="font-bold text-gray-800">Marge</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Pourcentage de marge</span>
                          <span className="text-sm font-bold text-gray-900">{marginPercentage}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={marginPercentage}
                          onChange={(e) => setMarginPercentage(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>10%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adresse Wallet
                        </label>
                        <input
                          type="text"
                          value={walletAddress}
                          onChange={(e) => setWalletAddress(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                          placeholder="0x..."
                        />
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-caribbean-gradient text-white py-2 rounded-xl font-medium hover:shadow-caribbean transition-all duration-300"
                      >
                        Sauvegarder
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Quick Actions */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-caribbean-gradient text-white py-3 rounded-xl font-bold hover:shadow-caribbean transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Tableau de Bord</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white border-2 border-caribbean-200 text-caribbean-600 py-3 rounded-xl font-bold hover:bg-caribbean-50 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Sliders className="w-5 h-5" />
                    <span>Paramètres Avancés</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'products' && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Catalogue de Produits
                  </h2>
                  <p className="text-gray-600">
                    Explorez notre sélection de produits de qualité avec livraison mondiale.
                  </p>
                </motion.div>

                {/* Product List */}
                <ZendropProductList marginPercentage={marginPercentage} />
              </>
            )}

            {activeTab === 'tracking' && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Suivi de Commande
                  </h2>
                  <p className="text-gray-600">
                    Suivez l'état de vos commandes en temps réel et consultez l'historique de livraison.
                  </p>
                </motion.div>

                <OrderTracking />
              </>
            )}

            {activeTab === 'account' && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Mon Compte Client
                  </h2>
                  <p className="text-gray-600">
                    Gérez vos informations personnelles, commandes et préférences.
                  </p>
                </motion.div>

                <ClientDashboard />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZendropPage;