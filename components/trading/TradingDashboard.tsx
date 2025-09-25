"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  RefreshCw,
  Clock
} from "lucide-react";
import BotPerformance from "@/components/bot/BotPerformance";
import WithdrawPanel from "@/components/bot/WithdrawPanel";

const TradingDashboard = () => {
  const [botActive, setBotActive] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState('conservative');
  const [currentGains, setCurrentGains] = useState(127.45);
  const [todayTrades, setTodayTrades] = useState(23);
  const [successRate, setSuccessRate] = useState(87);

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Bot Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                botActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Bot Trading MEXC</h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    botActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  <span className={`text-sm font-medium ${
                    botActive ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {botActive ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleBot}
                className={`p-2 rounded-lg transition-colors ${
                  botActive 
                    ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                    : 'bg-green-100 hover:bg-green-200 text-green-600'
                }`}
              >
                {botActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">Gains Aujourd'hui</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-600">
                  €{currentGains.toFixed(2)}
                </span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+12.3%</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Trades</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">{todayTrades}</span>
                <span className="text-sm text-blue-500">aujourd'hui</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Taux de Réussite</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-purple-600">{successRate}%</span>
                <span className="text-sm text-purple-500">ce mois</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Activité Récente</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Trade BTC/USDT réussi</span>
                </div>
                <span className="text-green-600 font-medium">+€23.45</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Trade ETH/USDT réussi</span>
                </div>
                <span className="text-green-600 font-medium">+€18.90</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Trade SOL/USDT fermé</span>
                </div>
                <span className="text-red-600 font-medium">-€5.20</span>
              </div>
            </div>
          </div>

          {/* Performance Indicator */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Performance</span>
              <span className="text-sm text-green-600">Excellente</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

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
            <Clock className="w-6 h-6 mr-2 text-purple-600" />
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

        {/* Performance Summary */}
        <BotPerformance />

        {/* Withdraw Panel */}
        <WithdrawPanel />
      </div>
    </div>
  );
};

export default TradingDashboard;