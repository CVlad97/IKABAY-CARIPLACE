"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  TrendingUp, 
  TrendingDown, 
  Pause, 
  Play, 
  Settings,
  AlertCircle,
  CheckCircle,
  DollarSign
} from "lucide-react";

const BotStatusOverview = () => {
  const [isActive, setIsActive] = useState(true);
  const [currentGains, setCurrentGains] = useState(127.45);
  const [todayTrades, setTodayTrades] = useState(23);
  const [successRate, setSuccessRate] = useState(87);

  const toggleBot = () => {
    setIsActive(!isActive);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
          }`}>
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Bot Trading MEXC</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <span className={`text-sm font-medium ${
                isActive ? 'text-green-600' : 'text-gray-500'
              }`}>
                {isActive ? 'Actif' : 'Inactif'}
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
              isActive 
                ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                : 'bg-green-100 hover:bg-green-200 text-green-600'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
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
  );
};

export default BotStatusOverview;