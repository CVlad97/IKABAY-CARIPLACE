"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3,
  RefreshCw
} from "lucide-react";

const RevenueChart = () => {
  const [timeframe, setTimeframe] = useState('7d');
  const [loading, setLoading] = useState(false);

  const timeframes = [
    { id: '24h', name: '24H' },
    { id: '7d', name: '7J' },
    { id: '30d', name: '30J' },
    { id: '90d', name: '3M' },
    { id: 'all', name: 'Tout' },
  ];

  // Mock data for chart
  const chartData = {
    '24h': [100, 120, 95, 130, 110, 150, 140, 160, 140, 180, 170, 190],
    '7d': [1200, 1350, 1280, 1420, 1500, 1650, 1700],
    '30d': [5200, 5500, 5300, 5800, 6100, 5900, 6300, 6500, 6400, 6800, 7000, 7200, 7500, 7300, 7600, 7800, 8000, 8200, 8500, 8300, 8600, 8800, 9000, 9200, 9500, 9300, 9600, 9800, 10000, 10200],
    '90d': [15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000, 26000],
    'all': [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000]
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
          Évolution des Revenus
        </h3>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  timeframe === tf.id
                    ? 'bg-white text-caribbean-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tf.name}
              </button>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshData}
            disabled={loading}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 flex items-end space-x-2">
        {chartData[timeframe].map((value, index) => (
          <div
            key={index}
            className="flex-1 bg-gradient-to-t from-caribbean-500 to-caribbean-400 rounded-t-lg hover:opacity-80 transition-opacity relative group"
            style={{ height: `${(value / Math.max(...chartData[timeframe])) * 100}%` }}
          >
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              €{value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4 text-sm text-gray-500">
        {timeframe === '24h' && (
          <>
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:59</span>
          </>
        )}
        {timeframe === '7d' && (
          <>
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </>
        )}
        {timeframe === '30d' && (
          <>
            <span>1 Mai</span>
            <span>10 Mai</span>
            <span>20 Mai</span>
            <span>30 Mai</span>
          </>
        )}
        {timeframe === '90d' && (
          <>
            <span>Mars</span>
            <span>Avril</span>
            <span>Mai</span>
          </>
        )}
        {timeframe === 'all' && (
          <>
            <span>2023</span>
            <span>2024</span>
            <span>2025</span>
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-green-50 rounded-xl p-3">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-xl font-bold text-green-600">€10,247.32</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-sm text-gray-600 mb-1">Moyenne</p>
          <p className="text-xl font-bold text-blue-600">€341.58/jour</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-3">
          <p className="text-sm text-gray-600 mb-1">Croissance</p>
          <p className="text-xl font-bold text-purple-600">+24.7%</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueChart;