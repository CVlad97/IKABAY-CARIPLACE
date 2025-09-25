import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BotStatus from '../components/BotStatus';
import { 
  TrendingUp, 
  TrendingDown, 
  Bot, 
  Settings, 
  Play, 
  Pause,
  BarChart3,
  DollarSign,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

const TradingPage = () => {
  const [botActive, setBotActive] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState('conservative');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    document.title = 'Trading Bot - IKABAY CARAÏBEEN';
  }, []);

  const strategies = [
    {
      id: 'conservative',
      name: 'Conservateur',
      description: 'Stratégie à faible risque avec gains réguliers',
      risk: 'Faible',
      expectedReturn: '5-15%',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'balanced',
      name: 'Équilibré',
      description: 'Équilibre entre risque et rendement',
      risk: 'Moyen',
      expectedReturn: '15-30%',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'aggressive',
      name: 'Agressif',
      description: 'Stratégie à haut rendement et haut risque',
      risk: 'Élevé',
      expectedReturn: '30-60%',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const tradingPairs = [
    { pair: 'BTC/USDT', price: '43,250.00', change: '+2.34%', trend: 'up', volume: '2.4B' },
    { pair: 'ETH/USDT', price: '2,680.50', change: '+1.87%', trend: 'up', volume: '1.8B' },
    { pair: 'SOL/USDT', price: '98.75', change: '-0.45%', trend: 'down', volume: '456M' },
    { pair: 'ADA/USDT', price: '0.485', change: '+3.21%', trend: 'up', volume: '234M' },
  ];

  const recentTrades = [
    {
      id: '1',
      pair: 'BTC/USDT',
      type: 'BUY',
      amount: '0.0023',
      price: '43,180.00',
      profit: '+€23.45',
      time: '2 min ago',
      status: 'completed'
    },
    {
      id: '2',
      pair: 'ETH/USDT',
      type: 'SELL',
      amount: '0.15',
      price: '2,675.30',
      profit: '+€18.90',
      time: '5 min ago',
      status: 'completed'
    },
    {
      id: '3',
      pair: 'SOL/USDT',
      type: 'BUY',
      amount: '2.5',
      price: '98.90',
      profit: '-€5.20',
      time: '8 min ago',
      status: 'completed'
    },
    {
      id: '4',
      pair: 'ADA/USDT',
      type: 'SELL',
      amount: '1000',
      price: '0.483',
      profit: '+€12.30',
      time: '12 min ago',
      status: 'completed'
    }
  ];

  const toggleBot = () => {
    setBotActive(!botActive);
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
                Trading Bot MEXC
              </h1>
              <p className="text-gray-600">
                Automatisez vos trades et maximisez vos profits avec notre bot intelligent
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Auto-refresh:</span>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoRefresh ? 'bg-caribbean-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoRefresh ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleBot}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  botActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {botActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{botActive ? 'Arrêter le Bot' : 'Démarrer le Bot'}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bot Status */}
            <BotStatus />

            {/* Trading Pairs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-caribbean-600" />
                  Paires de Trading
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tradingPairs.map((pair, index) => (
                  <motion.div
                    key={pair.pair}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-xl hover:border-caribbean-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{pair.pair}</h4>
                      <div className={`flex items-center space-x-1 ${
                        pair.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {pair.trend === 'up' ? 
                          <TrendingUp className="w-4 h-4" /> : 
                          <TrendingDown className="w-4 h-4" />
                        }
                        <span className="font-medium">{pair.change}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="text-lg font-semibold text-gray-900">${pair.price}</span>
                      <span>Vol: {pair.volume}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Trades */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-purple-600" />
                Trades Récents
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Paire</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Montant</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Prix</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Profit</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Temps</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrades.map((trade) => (
                      <tr key={trade.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2 font-medium text-gray-900">{trade.pair}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            trade.type === 'BUY' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {trade.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-700">{trade.amount}</td>
                        <td className="py-3 px-2 text-gray-700">${trade.price}</td>
                        <td className="py-3 px-2">
                          <span className={`font-medium ${
                            trade.profit.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {trade.profit}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-500 text-sm">{trade.time}</td>
                        <td className="py-3 px-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
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
            {/* Strategy Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-caribbean-600" />
                Stratégie de Trading
              </h3>

              <div className="space-y-4">
                {strategies.map((strategy) => (
                  <motion.div
                    key={strategy.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedStrategy === strategy.id
                        ? 'border-caribbean-500 bg-caribbean-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedStrategy(strategy.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{strategy.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${strategy.bgColor} ${strategy.color}`}>
                        {strategy.risk}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{strategy.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Rendement attendu:</span>
                      <span className="font-semibold text-gray-900">{strategy.expectedReturn}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 bg-caribbean-gradient text-white py-3 rounded-xl font-bold hover:shadow-caribbean transition-all duration-300"
              >
                Appliquer la Stratégie
              </motion.button>
            </motion.div>

            {/* Bot Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Bot className="w-5 h-5 mr-2 text-purple-600" />
                Paramètres du Bot
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capital de Trading (€)
                  </label>
                  <input
                    type="number"
                    defaultValue="1000"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stop Loss (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Take Profit (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="10"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Notifications</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-caribbean-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Sauvegarder les Paramètres
              </motion.button>
            </motion.div>

            {/* Performance Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-caribbean-gradient rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Performance Globale
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Profit Total:</span>
                  <span className="text-xl font-bold">€2,847.32</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">ROI:</span>
                  <span className="text-xl font-bold">+24.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Trades Gagnants:</span>
                  <span className="text-xl font-bold">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Drawdown Max:</span>
                  <span className="text-xl font-bold">-3.2%</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/20 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">Statut Actuel</span>
                </div>
                <p className="text-sm opacity-90">
                  {botActive 
                    ? 'Bot actif - Surveillance des opportunités de trading'
                    : 'Bot en pause - Aucune nouvelle position ouverte'
                  }
                </p>
              </div>
            </motion.div>

            {/* Risk Warning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6"
            >
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-yellow-800 mb-2">Avertissement sur les Risques</h4>
                  <p className="text-sm text-yellow-700">
                    Le trading de cryptomonnaies comporte des risques importants. 
                    Ne tradez que ce que vous pouvez vous permettre de perdre. 
                    Les performances passées ne garantissent pas les résultats futurs.
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

export default TradingPage;