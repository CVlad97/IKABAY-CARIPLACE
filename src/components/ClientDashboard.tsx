import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  LogOut,
  ShoppingBag,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  Calendar,
  CreditCard,
  Home,
  Mail,
  Phone
} from 'lucide-react';

interface ClientDashboardProps {
  className?: string;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('orders');
  
  // Mock user data
  const user = {
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de Paris, 75001 Paris, France',
    joinDate: '2024-01-15'
  };
  
  // Mock orders data
  const orders = [
    {
      id: 'ZD12345678',
      date: '2025-04-28',
      status: 'delivered',
      total: 89.97,
      items: [
        { name: 'Écouteurs Bluetooth Sans Fil', quantity: 1, price: 59.99 },
        { name: 'Coque de Téléphone Magnétique', quantity: 1, price: 24.99 }
      ],
      tracking: 'TRK987654321'
    },
    {
      id: 'ZD87654321',
      date: '2025-04-15',
      status: 'in_transit',
      total: 44.99,
      items: [
        { name: 'Sac à Dos Antivol USB', quantity: 1, price: 44.99 }
      ],
      tracking: 'TRK123456789'
    },
    {
      id: 'ZD24681357',
      date: '2025-03-30',
      status: 'delivered',
      total: 79.99,
      items: [
        { name: 'Montre Connectée Sport', quantity: 1, price: 79.99 }
      ],
      tracking: 'TRK456789123'
    }
  ];
  
  // Mock wishlist data
  const wishlist = [
    {
      id: '4',
      name: 'Lampe LED Pliable',
      price: 34.99,
      image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '7',
      name: 'Bouteille Isotherme',
      price: 27.99,
      image: 'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'out_for_delivery':
        return 'bg-blue-100 text-blue-800';
      case 'in_transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'processed':
        return 'bg-purple-100 text-purple-800';
      case 'order_placed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Livré';
      case 'out_for_delivery':
        return 'En cours de livraison';
      case 'in_transit':
        return 'En transit';
      case 'processed':
        return 'Traité';
      case 'order_placed':
        return 'Commande passée';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'out_for_delivery':
        return <Truck className="w-5 h-5" />;
      case 'in_transit':
        return <Truck className="w-5 h-5" />;
      case 'processed':
        return <Package className="w-5 h-5" />;
      case 'order_placed':
        return <ShoppingBag className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-caribbean-gradient text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{user.name}</h3>
            <p className="opacity-90">Client depuis {formatDate(user.joinDate)}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
            activeTab === 'orders'
              ? 'text-caribbean-600 border-b-2 border-caribbean-500'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Package className="w-5 h-5" />
          <span>Mes Commandes</span>
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
            activeTab === 'wishlist'
              ? 'text-caribbean-600 border-b-2 border-caribbean-500'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>Liste de Souhaits</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
            activeTab === 'profile'
              ? 'text-caribbean-600 border-b-2 border-caribbean-500'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Mon Profil</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mes Commandes</h3>
            
            {orders.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Aucune commande</h4>
                <p className="text-gray-500 mb-6">Vous n'avez pas encore passé de commande</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-caribbean-gradient text-white rounded-xl font-medium hover:shadow-caribbean transition-all duration-300"
                >
                  Commencer vos achats
                </motion.button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ y: -5 }}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    {/* Order Header */}
                    <div className="bg-gray-50 p-4 border-b border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">Commande #{order.id}</span>
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span>{getStatusText(order.status)}</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(order.date)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{formatPrice(order.total)}</div>
                          <div className="flex items-center justify-end space-x-1 text-sm text-gray-500">
                            <Truck className="w-4 h-4" />
                            <span>Suivi: {order.tracking}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Order Items */}
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Articles</h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <div>
                              <span className="text-gray-900">{item.name}</span>
                              <span className="text-gray-500 text-sm"> x{item.quantity}</span>
                            </div>
                            <span className="font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Order Actions */}
                    <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-caribbean-600 font-medium hover:text-caribbean-700 transition-colors"
                      >
                        Voir les détails
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-caribbean-600 font-medium hover:text-caribbean-700 transition-colors"
                      >
                        Suivre la livraison
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ma Liste de Souhaits</h3>
            
            {wishlist.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Liste de souhaits vide</h4>
                <p className="text-gray-500 mb-6">Vous n'avez pas encore ajouté d'articles à votre liste de souhaits</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-caribbean-gradient text-white rounded-xl font-medium hover:shadow-caribbean transition-all duration-300"
                >
                  Explorer les produits
                </motion.button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {wishlist.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -5 }}
                    className="flex border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-caribbean-600 font-bold">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex justify-between">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          Retirer
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-caribbean-gradient text-white px-3 py-1 rounded-lg text-sm font-medium hover:shadow-caribbean transition-all duration-300"
                        >
                          Ajouter au panier
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mon Profil</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <User className="w-5 h-5 text-caribbean-600" />
                  <span>Informations Personnelles</span>
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Nom complet</p>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <p className="font-medium text-gray-900">{user.name}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="font-medium text-gray-900">{user.phone}</p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-caribbean-600 font-medium hover:text-caribbean-700 transition-colors"
                  >
                    Modifier mes informations
                  </motion.button>
                </div>
              </div>
              
              {/* Address */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <Home className="w-5 h-5 text-caribbean-600" />
                  <span>Adresse de Livraison</span>
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-900">{user.address}</p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-caribbean-600 font-medium hover:text-caribbean-700 transition-colors"
                  >
                    Modifier mon adresse
                  </motion.button>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-caribbean-600" />
                  <span>Moyens de Paiement</span>
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-blue-600 rounded"></div>
                      <span className="font-medium text-gray-900">•••• •••• •••• 4242</span>
                    </div>
                    <span className="text-sm text-gray-500">Expire 12/25</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-caribbean-600 font-medium hover:text-caribbean-700 transition-colors"
                  >
                    Ajouter un moyen de paiement
                  </motion.button>
                </div>
              </div>
              
              {/* Account Settings */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-caribbean-600" />
                  <span>Paramètres du Compte</span>
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Notifications email</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-caribbean-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Notifications SMS</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                    </button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2 text-red-600 font-medium hover:text-red-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Déconnexion</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;