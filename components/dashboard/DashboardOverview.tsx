"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Wallet,
  Bot,
  Zap
} from "lucide-react";
import { useSupabase } from "@/lib/supabase-provider";

const DashboardOverview = () => {
  const { user } = useSupabase();
  const [hideBalances, setHideBalances] = useState(false);

  const stats = [
    {
      title: 'Solde Total',
      value: '€2,847.32',
      change: '+24.7%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Gains Bot',
      value: '€1,247.89',
      change: '+12.3%',
      trend: 'up',
      icon: <Bot className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Commissions Swap',
      value: '€845.67',
      change: '+8.5%',
      trend: 'up',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Commissions Référrals',
      value: '€753.76',
      change: '+15.2%',
      trend: 'up',
      icon: <Wallet className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const formatValue = (value: string) => {
    if (hideBalances) return '****';
    return value;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Vue d'ensemble</h3>
        <button
          onClick={() => setHideBalances(!hideBalances)}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          {hideBalances ? 'Afficher les soldes' : 'Masquer les soldes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
                {stat.icon}
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatValue(stat.value)}
            </h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Wallet className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Wallet TRC20</h4>
            <p className="text-sm text-blue-700">
              Vos commissions sont automatiquement envoyées vers le wallet TRC20: 
              <span className="font-mono ml-1">TWDiBSMEgsDHVRwEcFNiPVWZVPjXGZ9JiE</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardOverview;