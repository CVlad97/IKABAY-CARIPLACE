import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SwapModule from '../components/SwapModule';
import { 
  Zap, 
  ArrowUpDown, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Settings,
  BarChart3,
  DollarSign
} from 'lucide-react';

const SwapPage = () => {
  const [swapHistory, setSwapHistory] = useState([]);
  const [autoSwapEnabled, setAutoSwapEnabled] = useState(true);

  useEffect(() => {
    document.title = 'Swap Automatique - IKABAY CARAÏBEEN';
  }, []);

  const swapStats = [
    {
      title: 'Swaps Aujourd\'hui',
      value: '8',
      change: '+2',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Volume Total',
      value: '€12,450',
      change: '+15.3%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Taux de Réussite',
      value: '99.2%',
      change: '+0.1%',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Temps Moyen',
      value: '2.3s',
      change: '-0.2s',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentSwaps = [
    {
      id: '1',
      fromToken: 'USDT',
      toToken: 'SOL',
      fromAmount: '100.00',
      toAmount: '2.34',
      rate: '42.74',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'completed',
      txHash: '0xabc123...',
      slippage: '0.3%',
      fee: '0.25%'
    },
    {
      id: '2',
      fromToken: 'SOL',
      toToken: 'USDT',
      fromAmount: '1.50',
      toAmount: '64.20',
      rate: '42.80',
      timestamp: '2024-01-15T09:15:00Z',
      status: 'completed',
      txHash: '0xdef456...',
      slippage: '0.2%',
      fee: '0.25%'
    },
    {
      id: '3',
      fromToken: 'USDT',
      toToken: 'BTC',
      fromAmount: '500.00',
      toAmount: '0.0115',
      rate: '43,478',
      timestamp: '2024-01-15T08:45:00Z',
      status: 'completed',
      txHash: '0xghi789...',
      slippage: '0.4%',
      fee: '0.25%'
    },
    {
      id: '4',
      fromToken: 'BTC',
      toToken: 'ETH',
      fromAmount: '0.0050',
      toAmount: '0.081',
      rate: '16.2',
      timestamp: '2024-01-15T07:20:00Z',
      status: 'completed',
      txHash: '0xjkl012...',
      slippage: '0.5%',
      fee: '0.25%'
    }
  ];

  const autoSwapSettings = [
    {
      name: 'USDT → SOL',
      enabled: true,
      trigger: 'Prix < 42.50',
      amount: '100 USDT',
      frequency: 'Quotidien'
    },
    {
      name: 'SOL → USDT',
      enabled: true,
      trigger: 'Prix > 45.00',
      amount: '2 SOL',
      frequency: 'Hebdomadaire'
    },
    {
      name: 'BTC → ETH',
      enabled: false,
      trigger: 'Ratio < 16.0',
      amount: '0.01 BTC',
      frequency: 'Manuel'
    }
  ];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}j ago`;
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Swap Automatique
              </h1>
              <p className="text-gray-600">
                Échangez vos cryptomonnaies automatiquement via Jupiter API
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Auto-swap:</span>
                <button
                  onClick={() => setAutoSwapEnabled(!autoSwapEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoSwapEnabled ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoSwapEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Paramètres</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {swapStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Swap Interface */}
          <div className="lg:col-span-2 space-y-8">
            {/* Swap Module */}
            <SwapModule />

            {/* Swap History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-purple-600" />
                  Historique des Swaps
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
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Échange</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Montant</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Taux</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Slippage</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Temps</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSwaps.map((swap) => (
                      <tr key={swap.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{swap.fromToken}</span>
                            <ArrowUpDown className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{swap.toToken}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{swap.fromAmount} {swap.fromToken}</div>
                            <div className="text-gray-500">{swap.toAmount} {swap.toToken}</div>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-gray-700">{swap.rate}</td>
                        <td className="py-3 px-2">
                          <span className="text-sm text-green-600">{swap.slippage}</span>
                        </td>
                        <td className="py-3 px-2 text-gray-500 text-sm">
                          {formatTimeAgo(swap.timestamp)}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600">Réussi</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Auto-Swap Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-600" />
                Swaps Automatiques
              </h3>

              <div className="space-y-4">
                {autoSwapSettings.map((setting, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{setting.name}</h4>
                      <button
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          setting.enabled ? 'bg-purple-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            setting.enabled ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>Déclencheur: {setting.trigger}</div>
                      <div>Montant: {setting.amount}</div>
                      <div>Fréquence: {setting.frequency}</div>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 bg-purple-gradient text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
              >
                Ajouter un Swap Auto
              </motion.button>
            </motion.div>

            {/* Market Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Prix du Marché
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">SOL/USDT</div>
                    <div className="text-sm text-green-600">+2.34%</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">$42.74</div>
                    <div className="text-sm text-gray-500">24h</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">BTC/USDT</div>
                    <div className="text-sm text-green-600">+1.87%</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">$43,250</div>
                    <div className="text-sm text-gray-500">24h</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">ETH/USDT</div>
                    <div className="text-sm text-red-600">-0.45%</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">$2,680</div>
                    <div className="text-sm text-gray-500">24h</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Swap Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-purple-gradient rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Analytics Swap
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Volume ce mois:</span>
                  <span className="text-xl font-bold">€47,230</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Économies frais:</span>
                  <span className="text-xl font-bold">€234.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Meilleur taux:</span>
                  <span className="text-xl font-bold">0.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Temps moyen:</span>
                  <span className="text-xl font-bold">2.3s</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/20 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">Jupiter API</span>
                </div>
                <p className="text-sm opacity-90">
                  Meilleurs taux garantis via l'agrégateur Jupiter sur Solana
                </p>
              </div>
            </motion.div>

            {/* Risk Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6"
            >
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-yellow-800 mb-2">Information Importante</h4>
                  <p className="text-sm text-yellow-700">
                    Les swaps automatiques sont exécutés selon vos paramètres. 
                    Vérifiez toujours les conditions de marché avant d'activer 
                    les swaps automatiques.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapPage;