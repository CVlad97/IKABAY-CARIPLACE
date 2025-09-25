import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Wallet,
  BarChart3,
  RefreshCw,
  Eye,
  EyeOff,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
  Zap
} from 'lucide-react';

const PortfolioPage = () => {
  const [hideBalances, setHideBalances] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [portfolioValue, setPortfolioValue] = useState(12847.32);

  useEffect(() => {
    document.title = 'Portfolio - IKABAY CARAÏBEEN';
  }, []);

  const timeframes = [
    { id: '1h', name: '1H' },
    { id: '24h', name: '24H' },
    { id: '7d', name: '7J' },
    { id: '30d', name: '30J' },
    { id: '1y', name: '1A' },
  ];

  const portfolioStats = [
    {
      title: 'Valeur Totale',
      value: portfolioValue,
      change: '+24.7%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'P&L 24h',
      value: 1247.89,
      change: '+12.3%',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Positions Actives',
      value: 8,
      change: '+2',
      trend: 'up',
      icon: <Target className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'ROI Total',
      value: '87.2%',
      change: '+5.1%',
      trend: 'up',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const holdings = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.2847,
      value: 12250.45,
      price: 43025.67,
      change24h: '+2.34%',
      trend: 'up',
      allocation: 45.2,
      color: '#F7931A'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 4.567,
      value: 8934.21,
      price: 2680.50,
      change24h: '+1.87%',
      trend: 'up',
      allocation: 32.8,
      color: '#627EEA'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      amount: 45.23,
      value: 4467.89,
      price: 98.75,
      change24h: '-0.45%',
      trend: 'down',
      allocation: 16.4,
      color: '#9945FF'
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      amount: 2847.12,
      value: 1380.65,
      price: 0.485,
      change24h: '+3.21%',
      trend: 'up',
      allocation: 5.1,
      color: '#0033AD'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      amount: 156.78,
      value: 156.78,
      price: 1.00,
      change24h: '0.00%',
      trend: 'neutral',
      allocation: 0.5,
      color: '#26A17B'
    }
  ];

  const recentTransactions = [
    {
      id: '1',
      type: 'buy',
      symbol: 'BTC',
      amount: 0.0234,
      price: 42980.00,
      value: 1005.73,
      time: '2 min ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'sell',
      symbol: 'ETH',
      amount: 0.5,
      price: 2675.30,
      value: 1337.65,
      time: '15 min ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'swap',
      symbol: 'USDT→SOL',
      amount: 500,
      price: 98.90,
      value: 500.00,
      time: '1h ago',
      status: 'completed'
    },
    {
      id: '4',
      type: 'buy',
      symbol: 'ADA',
      amount: 1000,
      price: 0.483,
      value: 483.00,
      time: '3h ago',
      status: 'completed'
    }
  ];

  const formatValue = (value: number) => {
    if (hideBalances) return '****';
    return `€${value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatAmount = (amount: number, decimals: number = 4) => {
    if (hideBalances) return '****';
    return amount.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
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
                Mon Portfolio
              </h1>
              <p className="text-gray-600">
                Suivez vos investissements crypto en temps réel
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setHideBalances(!hideBalances)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                {hideBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{hideBalances ? 'Afficher' : 'Masquer'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-caribbean-gradient text-white rounded-xl hover:shadow-caribbean transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Actualiser</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Portfolio Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {portfolioStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
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
                {typeof stat.value === 'number' ? formatValue(stat.value) : stat.value}
              </h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Holdings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Allocation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <PieChart className="w-6 h-6 mr-2 text-caribbean-600" />
                  Répartition du Portfolio
                </h3>
                
                <div className="flex items-center space-x-2">
                  {timeframes.map((timeframe) => (
                    <button
                      key={timeframe.id}
                      onClick={() => setSelectedTimeframe(timeframe.id)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedTimeframe === timeframe.id
                          ? 'bg-caribbean-100 text-caribbean-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {timeframe.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {holdings.map((holding, index) => (
                  <motion.div
                    key={holding.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: holding.color }}
                      >
                        {holding.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{holding.symbol}</h4>
                        <p className="text-sm text-gray-500">{holding.name}</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="font-bold text-gray-900">{formatAmount(holding.amount)}</p>
                      <p className="text-sm text-gray-500">{formatValue(holding.value)}</p>
                    </div>

                    <div className="text-center">
                      <p className="font-bold text-gray-900">{formatValue(holding.price)}</p>
                      <div className={`flex items-center space-x-1 text-sm ${
                        holding.trend === 'up' ? 'text-green-600' : 
                        holding.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {holding.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> :
                         holding.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> : null}
                        <span>{holding.change24h}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900">{holding.allocation}%</p>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${holding.allocation}%`,
                            backgroundColor: holding.color
                          }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-purple-600" />
                Transactions Récentes
              </h3>

              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-caribbean-300 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'buy' ? 'bg-green-100 text-green-600' :
                        transaction.type === 'sell' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {transaction.type === 'buy' ? <Plus className="w-5 h-5" /> :
                         transaction.type === 'sell' ? <Minus className="w-5 h-5" /> :
                         <Zap className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.type === 'buy' ? 'Achat' :
                           transaction.type === 'sell' ? 'Vente' : 'Swap'} {transaction.symbol}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.time}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {formatAmount(transaction.amount)} {transaction.symbol.split('→')[0]}
                      </p>
                      <p className="text-sm text-gray-500">{formatValue(transaction.value)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-orange-600" />
                Actions Rapides
              </h3>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-50 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Acheter Crypto</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <Minus className="w-4 h-4" />
                  <span>Vendre Crypto</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Swap Tokens</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Portfolio Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-caribbean-gradient rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Performance
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Gain Total:</span>
                  <span className="text-xl font-bold">{formatValue(2847.32)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">ROI:</span>
                  <span className="text-xl font-bold">+87.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Meilleur Asset:</span>
                  <span className="text-xl font-bold">BTC (+45%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Trades Gagnants:</span>
                  <span className="text-xl font-bold">89%</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/20 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4" />
                  <span className="font-medium">Objectif Mensuel</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm opacity-90">€15,000</span>
                  <span className="text-sm font-bold">85.6%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: '85.6%' }}></div>
                </div>
              </div>
            </motion.div>

            {/* Market Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">Résumé Marché</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fear & Greed Index:</span>
                  <span className="font-bold text-green-600">72 (Greed)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">BTC Dominance:</span>
                  <span className="font-bold text-gray-900">42.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Market Cap:</span>
                  <span className="font-bold text-gray-900">$2.1T</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">24h Volume:</span>
                  <span className="font-bold text-gray-900">$89.4B</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;