import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Bot, 
  Zap, 
  Wallet, 
  Users,
  Copy,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  DollarSign,
  BarChart3
} from 'lucide-react';

const DashboardPage = () => {
  const [botStatus, setBotStatus] = useState('active');
  const [walletBalance, setWalletBalance] = useState({
    USDT: 2847.32,
    SOL: 12.45,
    BTC: 0.0234
  });
  const [todayGains, setTodayGains] = useState(127.45);
  const [totalGains, setTotalGains] = useState(2847.32);
  const [referralLink] = useState('https://ikabay.com/ref/user123');

  useEffect(() => {
    document.title = 'Dashboard - IKABAY';
  }, []);

  const stats = [
    {
      title: 'Gains Aujourd\'hui',
      value: `€${todayGains.toFixed(2)}`,
      change: '+12.3%',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Gains Total',
      value: `€${totalGains.toFixed(2)}`,
      change: '+24.7%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Swaps Exécutés',
      value: '47',
      change: '+8',
      trend: 'up',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Référrals Actifs',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'trade',
      description: 'Bot Trading MEXC',
      amount: '+€45.67',
      time: '2 min ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'swap',
      description: 'USDT → SOL Swap',
      amount: '2.34 SOL',
      time: '15 min ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'referral',
      description: 'Commission Référral',
      amount: '+€12.30',
      time: '1h ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'trade',
      description: 'Bot Trading MEXC',
      amount: '+€78.90',
      time: '2h ago',
      status: 'completed'
    }
  ];

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    // Vous pourriez ajouter une notification ici
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Suivez vos gains et gérez vos bots de trading en temps réel
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bot Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Status du Bot</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Bot MEXC</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-600">Actif</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Trades aujourd'hui:</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taux de réussite:</span>
                      <span className="font-medium text-green-600">87%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Swap Auto</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-purple-600">Actif</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Swaps aujourd'hui:</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Dernier swap:</span>
                      <span className="font-medium text-purple-600">15 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Transactions Récentes</h2>
                <button className="text-caribbean-600 hover:text-caribbean-700 font-medium text-sm">
                  Voir tout
                </button>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'trade' ? 'bg-blue-100 text-blue-600' :
                        transaction.type === 'swap' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {transaction.type === 'trade' ? <TrendingUp className="w-5 h-5" /> :
                         transaction.type === 'swap' ? <Zap className="w-5 h-5" /> :
                         <Users className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{transaction.amount}</p>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600">Complété</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Wallet Balance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-caribbean-gradient rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Solde Wallet</h2>
              </div>

              <div className="space-y-4">
                {Object.entries(walletBalance).map(([currency, balance]) => (
                  <div key={currency} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">{currency}</span>
                      </div>
                      <span className="font-medium text-gray-900">{currency}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {typeof balance === 'number' ? balance.toFixed(currency === 'BTC' ? 4 : 2) : balance}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 bg-caribbean-gradient text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Gérer le Wallet
              </motion.button>
            </motion.div>

            {/* Referral Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-orange-gradient rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Référencement</h2>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-orange-800 mb-2">
                  Gagnez 5% sur les gains de vos référrals !
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">12</span>
                  <span className="text-sm text-orange-600">Référrals actifs</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Votre lien de parrainage:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyReferralLink}
                    className="p-2 bg-caribbean-600 text-white rounded-lg hover:bg-caribbean-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 bg-orange-gradient text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Partager le Lien</span>
              </motion.button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Actions Rapides</h2>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <Bot className="w-4 h-4" />
                  <span>Configurer Bot</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-purple-50 text-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Swap Manuel</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-50 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Voir Analytics</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;