"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Zap, 
  Clock, 
  CheckCircle
} from "lucide-react";

const SwapStats = () => {
  const stats = [
    {
      title: 'Swaps Aujourd\'hui',
      value: '8',
      icon: <Zap className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Taux de Réussite',
      value: '99.2%',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Temps Moyen',
      value: '2.3s',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Commission',
      value: '10%',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-6">Statistiques</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-xl p-4`}>
            <div className="flex items-center space-x-2 mb-2">
              <div className={`${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">{stat.title}</span>
            </div>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-purple-gradient rounded-xl p-4 text-white">
        <h4 className="font-medium mb-2">Jupiter API</h4>
        <p className="text-sm opacity-90">
          Les swaps sont exécutés via Jupiter API sur Solana pour garantir les meilleurs taux et une exécution rapide.
        </p>
        <div className="mt-2 text-xs opacity-80">
          Une commission de 10% est automatiquement envoyée vers notre wallet TRC20.
        </div>
      </div>
    </motion.div>
  );
};

export default SwapStats;