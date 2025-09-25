"use client";

import { motion } from "framer-motion";
import { 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle,
  RefreshCw
} from "lucide-react";

const RecentTrades = () => {
  const trades = [
    {
      id: '1',
      pair: 'BTC/USDT',
      type: 'BUY',
      entry: 43180,
      exit: 44500,
      profit: '+€23.45',
      profitPercent: '+3.06%',
      time: '2 min ago',
      status: 'completed'
    },
    {
      id: '2',
      pair: 'ETH/USDT',
      type: 'SELL',
      entry: 2675.30,
      exit: 2650.20,
      profit: '+€18.90',
      profitPercent: '+0.94%',
      time: '5 min ago',
      status: 'completed'
    },
    {
      id: '3',
      pair: 'SOL/USDT',
      type: 'BUY',
      entry: 98.90,
      exit: 97.80,
      profit: '-€5.20',
      profitPercent: '-1.11%',
      time: '8 min ago',
      status: 'completed'
    },
    {
      id: '4',
      pair: 'ADA/USDT',
      type: 'SELL',
      entry: 0.483,
      exit: 0.495,
      profit: '+€12.30',
      profitPercent: '+2.48%',
      time: '12 min ago',
      status: 'completed'
    },
    {
      id: '5',
      pair: 'BNB/USDT',
      type: 'BUY',
      entry: 567.80,
      exit: 572.40,
      profit: '+€9.75',
      profitPercent: '+0.81%',
      time: '15 min ago',
      status: 'completed'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <Clock className="w-6 h-6 mr-2 text-gray-600" />
          Trades Récents
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Paire</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Prix Entrée</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Prix Sortie</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Profit</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Temps</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">{trade.pair}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    trade.type === 'BUY' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {trade.type}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">${trade.entry.toLocaleString()}</td>
                <td className="py-3 px-4 text-gray-700">${trade.exit.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <div className={`font-medium ${
                    trade.profit.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trade.profit}
                  </div>
                  <div className={`text-xs ${
                    trade.profitPercent.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trade.profitPercent}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-500 text-sm">{trade.time}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">Complété</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <button className="text-caribbean-600 font-medium hover:text-caribbean-700 transition-colors">
          Voir tous les trades
        </button>
      </div>
    </motion.div>
  );
};

export default RecentTrades;