'use client';

import { useState, useEffect } from 'react';
import { Search, Package, Truck, Ship } from 'lucide-react';

interface Shipment {
  id: string;
  order_id: string;
  provider: 'dhl' | 'ttom';
  mode: 'air' | 'sea';
  tracking_number: string;
  status: string;
  cost: number;
  currency: string;
  created_at: string;
}

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const filteredShipments = shipments.filter(shipment =>
    shipment.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.order_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trackShipment = async () => {
    if (!trackingNumber.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/shipments/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber: trackingNumber.trim() })
      });

      const data = await response.json();
      setTrackingResult(data);
    } catch (error) {
      console.error('Tracking error:', error);
      setTrackingResult({ success: false, error: 'Erreur lors du suivi' });
    } finally {
      setLoading(false);
    }
  };

  const getProviderIcon = (provider: string, mode: string) => {
    if (provider === 'dhl' || mode === 'air') {
      return <Package className="w-5 h-5 text-blue-500" />;
    } else if (provider === 'ttom' || mode === 'sea') {
      return <Ship className="w-5 h-5 text-green-500" />;
    }
    return <Truck className="w-5 h-5 text-gray-500" />;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in_transit':
      case 'on_water':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      case 'booked':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Expéditions
        </h1>
        <p className="text-gray-600">
          Gestion des expéditions DHL et TTOM
        </p>
      </div>

      {/* Suivi */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Suivi d'Expédition
        </h2>
        
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Numéro de suivi..."
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={trackShipment}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Recherche...' : 'Suivre'}
          </button>
        </div>

        {trackingResult && (
          <div className="border border-gray-200 rounded-xl p-4">
            {trackingResult.success ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {getProviderIcon(trackingResult.provider, '')}
                  <div>
                    <h3 className="font-semibold">
                      {trackingResult.tracking.trackingNumber}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {trackingResult.provider.toUpperCase()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trackingResult.tracking.status)}`}>
                    {trackingResult.tracking.status}
                  </span>
                </div>

                {trackingResult.tracking.location && (
                  <p className="text-sm text-gray-600 mb-4">
                    📍 {trackingResult.tracking.location}
                  </p>
                )}

                <div className="space-y-3">
                  <h4 className="font-medium">Historique:</h4>
                  {trackingResult.tracking.events.map((event: any, index: number) => (
                    <div key={index} className="flex gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">{event.description}</p>
                        <p className="text-gray-600">
                          {event.location} • {new Date(event.timestamp).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-red-600">
                Erreur: {trackingResult.error}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Liste des expéditions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Expéditions Récentes
          </h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {filteredShipments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Aucune expédition trouvée</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Expédition</th>
                  <th className="text-left py-3 px-4">Commande</th>
                  <th className="text-left py-3 px-4">Mode</th>
                  <th className="text-left py-3 px-4">Statut</th>
                  <th className="text-left py-3 px-4">Coût</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {getProviderIcon(shipment.provider, shipment.mode)}
                        <div>
                          <p className="font-medium">{shipment.tracking_number}</p>
                          <p className="text-sm text-gray-600">
                            {shipment.provider.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <code className="text-sm">{shipment.order_id}</code>
                    </td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1">
                        {shipment.mode === 'air' ? '✈️' : '🚢'}
                        {shipment.mode}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      €{shipment.cost.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(shipment.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          setTrackingNumber(shipment.tracking_number);
                          trackShipment();
                        }}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Suivre
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}