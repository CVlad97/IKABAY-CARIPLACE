"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  CheckCircle, 
  ArrowUpDown,
  RefreshCw
} from "lucide-react";

const SwapHistory = () => {
  const [swaps, setSwaps] = useState([
    {
      id: '1',
      fromToken: 'USDT',
      toToken: 'SOL',
      fromAmount: '100.00',
      toAmount: '2.34',
      rate: '42.74',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      status: 'completed',
      txHash: '0xabc123...',
    },
    {
      id: '2',
      fromToken: 'SOL',
      toToken: 'USDT',
      fromAmount: '1.50',
      toAmount: '64.20',
      rate: '42.80',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      txHash: '0xdef456...',
    },
    {
      id: '3',
      fromToken: 'USDT',
      toToken: 'BTC',
      fromAmount: '500.00',
      toAmount: '0.0115',
      rate: '43,478',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      txHash: '0xghi789...',
    }
  ]);
  const [loading, setLoading] = useState(false);

  const refreshSwaps = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-gray-600" />
          Historique des Swaps
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refreshSwaps}
          disabled={loading}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      <div className="space-y-4">
        {swaps.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Aucun swap effectué</p>
          </div>
        ) : (
          swaps.map((swap) => (
            <motion.div
              key={swap.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ArrowUpDown className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {swap.fromAmount} {swap.fromToken} → {swap.toAmount} {swap.toToken}
                  </div>
                  <div className="text-sm text-gray-500">{formatTimeAgo(swap.timestamp)}</div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">Réussi</span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {swaps.length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors">
            Voir tout l'historique
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default SwapHistory;