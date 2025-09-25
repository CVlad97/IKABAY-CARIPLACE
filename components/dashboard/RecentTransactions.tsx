"use client";

import { motion } from "framer-motion";
import { 
  Clock, 
  TrendingUp, 
  Zap, 
  Users, 
  CheckCircle
} from "lucide-react";

const RecentTransactions = () => {
  const transactions = [
    {
      id: '1',
      type: 'bot',
      description: 'Bot Trading MEXC',
      amount: '+€45.67',
      time: '2 min ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'swap',
      description: 'USDT → SOL Swap',
      amount: '2.34 SOL',
      time: '15 min ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'referral',
      description: 'Commission Référral',
      amount: '+€12.30',
      time: '1h ago',
      status: 'completed'
    },
    {
      id: '4',
      type: 'bot',
      description: 'Bot Trading MEXC',
      amount: '+€78.90',
      time: '2h ago',
      status: 'completed'
    },
    {
      id: '5',
      type: 'swap',
      description: 'SOL → USDT Swap',
      amount: '64.20 USDT',
      time: '3h ago',
      status: 'completed'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bot':
        return <TrendingUp className="w-5 h-5" />;
      case 'swap':
        return <Zap className="w-5 h-5" />;
      case 'referral':
        return <Users className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bot':
        return 'bg-blue-100 text-blue-600';
      case 'swap':
        return 'bg-purple-100 text-purple-600';
      case 'referral':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <Clock className="w-6 h-6 mr-2 text-gray-600" />
        Transactions Récentes
      </h3>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(transaction.type)}`}>
                {getTypeIcon(transaction.type)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">{transaction.amount}</p>
              <div className="flex items-center space-x-1 justify-end">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600">Complété</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-caribbean-600 font-medium hover:text-caribbean-700 transition-colors">
          Voir toutes les transactions
        </button>
      </div>
    </motion.div>
  );
};

export default RecentTransactions;