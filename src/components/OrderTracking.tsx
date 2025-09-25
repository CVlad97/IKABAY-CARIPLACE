import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Package, 
  CheckCircle, 
  Clock, 
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface OrderTrackingProps {
  className?: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ className = '' }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock tracking data
  const mockTrackingData = {
    orderNumber: 'ZD12345678',
    trackingNumber: 'TRK987654321',
    status: 'in_transit',
    estimatedDelivery: '2025-05-15',
    currentLocation: 'Centre de tri, Paris',
    recipient: {
      name: 'Jean Dupont',
      address: '123 Rue de Paris, 75001 Paris, France'
    },
    updates: [
      { 
        status: 'delivered', 
        location: 'Adresse de livraison', 
        timestamp: '2025-05-15T14:30:00Z',
        description: 'Colis livré'
      },
      { 
        status: 'out_for_delivery', 
        location: 'Centre de distribution local', 
        timestamp: '2025-05-15T08:15:00Z',
        description: 'En cours de livraison'
      },
      { 
        status: 'in_transit', 
        location: 'Centre de tri, Paris', 
        timestamp: '2025-05-14T18:45:00Z',
        description: 'Colis en transit'
      },
      { 
        status: 'processed', 
        location: 'Centre logistique', 
        timestamp: '2025-05-13T10:20:00Z',
        description: 'Colis traité'
      },
      { 
        status: 'order_placed', 
        location: 'Boutique en ligne', 
        timestamp: '2025-05-12T15:30:00Z',
        description: 'Commande passée'
      }
    ]
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      setError('Veuillez entrer un numéro de suivi');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/tracking/${trackingNumber}`);
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, we'll use mock data
      setTrackingResult(mockTrackingData);
    } catch (err) {
      setError('Erreur lors de la recherche. Veuillez réessayer.');
      console.error('Tracking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleTimeString('fr-FR', options);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'out_for_delivery':
        return <Truck className="w-6 h-6 text-blue-500" />;
      case 'in_transit':
        return <Truck className="w-6 h-6 text-yellow-500" />;
      case 'processed':
        return <Package className="w-6 h-6 text-purple-500" />;
      case 'order_placed':
        return <CheckCircle className="w-6 h-6 text-gray-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
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

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-caribbean-gradient rounded-xl flex items-center justify-center">
          <Truck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Suivi de Commande</h3>
          <p className="text-gray-600">Suivez l'état de votre commande en temps réel</p>
        </div>
      </div>

      <form onSubmit={handleTrackOrder} className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Entrez votre numéro de suivi"
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-caribbean-gradient text-white px-4 py-2 rounded-lg font-medium hover:shadow-caribbean transition-all duration-300 disabled:opacity-70"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </motion.button>
        </div>
        {error && (
          <p className="mt-2 text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </p>
        )}
      </form>

      {trackingResult ? (
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Numéro de commande</p>
                <p className="font-medium text-gray-900">{trackingResult.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Numéro de suivi</p>
                <p className="font-medium text-gray-900">{trackingResult.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <p className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trackingResult.status)}`}>
                  {getStatusIcon(trackingResult.status)}
                  <span>{getStatusText(trackingResult.status)}</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Livraison estimée</p>
                <p className="font-medium text-gray-900">{formatDate(trackingResult.estimatedDelivery)}</p>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-caribbean-50 rounded-xl p-4 border border-caribbean-200">
            <div className="flex items-start space-x-3">
              <div className="bg-caribbean-100 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-caribbean-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Localisation actuelle</h4>
                <p className="text-caribbean-600">{trackingResult.currentLocation}</p>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Historique de suivi</h4>
            <div className="space-y-6">
              {trackingResult.updates.map((update: any, index: number) => (
                <div key={index} className="relative">
                  {/* Vertical line */}
                  {index < trackingResult.updates.length - 1 && (
                    <div className="absolute top-6 bottom-0 left-3 w-0.5 bg-gray-200"></div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className="relative z-10">
                      {getStatusIcon(update.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                        <h5 className="font-medium text-gray-900">{update.description}</h5>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(update.timestamp)}</span>
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(update.timestamp)}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{update.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">Adresse de livraison</h4>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-gray-900">{trackingResult.recipient.name}</p>
                <p className="text-gray-600">{trackingResult.recipient.address}</p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 mb-2">
              Besoin d'aide avec votre commande ?
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-caribbean-600 font-medium hover:text-caribbean-700 transition-colors"
            >
              Contacter le support
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-xl font-medium text-gray-900 mb-2">Suivez votre commande</h4>
          <p className="text-gray-600 mb-4">
            Entrez votre numéro de suivi pour connaître l'état de votre livraison
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Truck className="w-4 h-4" />
              <span>Livraison mondiale</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Mise à jour en temps réel</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;