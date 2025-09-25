import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Copy, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Star,
  DollarSign,
  Target,
  BarChart3,
  Play,
  Pause,
  Settings,
  Award,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  Filter,
  Search
} from 'lucide-react';

const CopyTradingPage = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    document.title = 'Copy Trading - IKABAY CARAÏBEEN';
  }, []);

  const tabs = [
    { id: 'discover', name: 'Découvrir', icon: <Search className="w-4 h-4" /> },
    { id: 'following', name: 'Mes Copies', icon: <Copy className="w-4 h-4" /> },
    { id: 'performance', name: 'Performance', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const filters = [
    { id: 'all', name: 'Tous' },
    { id: 'top-performers', name: 'Top Performers' },
    { id: 'conservative', name: 'Conservateur' },
    { id: 'aggressive', name: 'Agressif' },
    { id: 'verified', name: 'Vérifiés' },
  ];

  const traders = [
    {
      id: '1',
      name: 'CryptoKing',
      avatar: '👑',
      verified: true,
      followers: 15600,
      copiers: 2340,
      totalReturn: 187.5,
      monthlyReturn: 24.7,
      winRate: 89.2,
      maxDrawdown: 8.5,
      tradingStyle: 'Swing Trading',
      riskLevel: 'Moyen',
      avgHoldTime: '3.2 jours',
      totalTrades: 456,
      description: 'Trader professionnel avec 8 ans d\'expérience. Spécialisé dans l\'analyse technique et les altcoins.',
      topAssets: ['BTC', 'ETH', 'SOL'],
      rating: 4.9,
      minCopyAmount: 100,
      fee: 20,
      status: 'active'
    },
    {
      id: '2',
      name: 'AITradeBot',
      avatar: '🤖',
      verified: true,
      followers: 12400,
      copiers: 1890,
      totalReturn: 234.8,
      monthlyReturn: 32.1,
      winRate: 92.5,
      maxDrawdown: 12.3,
      tradingStyle: 'Scalping',
      riskLevel: 'Élevé',
      avgHoldTime: '4.5 heures',
      totalTrades: 1245,
      description: 'Système de trading algorithmique basé sur l\'IA. Trades automatisés 24/7 avec gestion de risque avancée.',
      topAssets: ['BTC', 'ETH', 'BNB'],
      rating: 4.8,
      minCopyAmount: 250,
      fee: 25,
      status: 'active'
    },
    {
      id: '3',
      name: 'SafeHaven',
      avatar: '🛡️',
      verified: true,
      followers: 9800,
      copiers: 1450,
      totalReturn: 124.3,
      monthlyReturn: 12.8,
      winRate: 87.1,
      maxDrawdown: 5.2,
      tradingStyle: 'Position Trading',
      riskLevel: 'Faible',
      avgHoldTime: '12.5 jours',
      totalTrades: 189,
      description: 'Stratégie de trading conservatrice avec priorité à la préservation du capital. Idéal pour débutants.',
      topAssets: ['BTC', 'ETH', 'USDC'],
      rating: 4.7,
      minCopyAmount: 50,
      fee: 15,
      status: 'active'
    },
    {
      id: '4',
      name: 'AltcoinHunter',
      avatar: '🔍',
      verified: false,
      followers: 7500,
      copiers: 980,
      totalReturn: 312.4,
      monthlyReturn: 45.2,
      winRate: 76.8,
      maxDrawdown: 28.5,
      tradingStyle: 'Momentum Trading',
      riskLevel: 'Très Élevé',
      avgHoldTime: '2.1 jours',
      totalTrades: 345,
      description: 'Spécialiste des altcoins à fort potentiel. Recherche de gems x10 et x100 avec analyse fondamentale.',
      topAssets: ['SOL', 'AVAX', 'MATIC'],
      rating: 4.2,
      minCopyAmount: 200,
      fee: 30,
      status: 'active'
    }
  ];

  const myTraders = [
    {
      id: '1',
      name: 'CryptoKing',
      avatar: '👑',
      copyAmount: 500,
      startDate: '2024-01-01',
      profit: 123.45,
      profitPercent: 24.7,
      status: 'active',
      lastTrade: '2 heures',
      openPositions: 3
    },
    {
      id: '3',
      name: 'SafeHaven',
      avatar: '🛡️',
      copyAmount: 250,
      startDate: '2024-01-05',
      profit: 32.10,
      profitPercent: 12.8,
      status: 'active',
      lastTrade: '1 jour',
      openPositions: 2
    }
  ];

  const recentTrades = [
    {
      id: '1',
      trader: 'CryptoKing',
      pair: 'BTC/USDT',
      type: 'BUY',
      entry: 43250,
      exit: 44500,
      profit: 2.89,
      time: '2 heures',
      status: 'completed'
    },
    {
      id: '2',
      trader: 'SafeHaven',
      pair: 'ETH/USDT',
      type: 'BUY',
      entry: 2680,
      exit: 2750,
      profit: 2.61,
      time: '1 jour',
      status: 'completed'
    },
    {
      id: '3',
      trader: 'CryptoKing',
      pair: 'SOL/USDT',
      type: 'SELL',
      entry: 98.50,
      exit: null,
      profit: 1.78,
      time: 'En cours',
      status: 'active'
    }
  ];

  const performanceStats = [
    {
      title: 'Profit Total',
      value: '€155.55',
      change: '+18.7%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'ROI Moyen',
      value: '21.2%',
      change: '+3.4%',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Trades Copiés',
      value: '47',
      change: '+12',
      trend: 'up',
      icon: <Copy className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Traders Suivis',
      value: '2',
      change: '0',
      trend: 'neutral',
      icon: <Users className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const filteredTraders = traders.filter(trader => {
    const matchesSearch = trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trader.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'top-performers' && trader.monthlyReturn > 20) ||
                         (selectedFilter === 'conservative' && trader.riskLevel === 'Faible') ||
                         (selectedFilter === 'aggressive' && trader.riskLevel === 'Élevé' || trader.riskLevel === 'Très Élevé') ||
                         (selectedFilter === 'verified' && trader.verified);
    
    return matchesSearch && matchesFilter;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Faible': return 'bg-green-100 text-green-600';
      case 'Moyen': return 'bg-yellow-100 text-yellow-600';
      case 'Élevé': return 'bg-orange-100 text-orange-600';
      case 'Très Élevé': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
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
                Copy Trading
              </h1>
              <p className="text-gray-600">
                Copiez automatiquement les trades des meilleurs experts
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Paramètres</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-caribbean-gradient text-white rounded-xl hover:shadow-caribbean transition-all duration-300"
              >
                <Zap className="w-4 h-4" />
                <span>Devenir Trader</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-caribbean-gradient text-white shadow-caribbean'
                  : 'bg-white text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600 shadow-sm'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Discover Tab */}
        {activeTab === 'discover' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Search & Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un trader..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedFilter === filter.id
                          ? 'bg-caribbean-100 text-caribbean-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Traders List */}
            <div className="space-y-6">
              {filteredTraders.map((trader, index) => (
                <motion.div
                  key={trader.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    {/* Trader Info */}
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-16 h-16 bg-caribbean-gradient rounded-xl flex items-center justify-center text-white text-3xl">
                          {trader.avatar}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-bold text-gray-900">{trader.rating}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{trader.name}</h3>
                          {trader.verified && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{trader.followers.toLocaleString()} followers</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Copy className="w-4 h-4" />
                            <span>{trader.copiers.toLocaleString()} copieurs</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{trader.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(trader.riskLevel)}`}>
                            Risque: {trader.riskLevel}
                          </span>
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                            Style: {trader.tradingStyle}
                          </span>
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                            Durée: {trader.avgHoldTime}
                          </span>
                          {trader.topAssets.map((asset, i) => (
                            <span key={i} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                              {asset}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="flex flex-col justify-between md:items-end">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <p className="text-sm text-gray-600 mb-1">Retour Total</p>
                          <p className="text-xl font-bold text-green-600">+{trader.totalReturn}%</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <p className="text-sm text-gray-600 mb-1">Mensuel</p>
                          <p className="text-xl font-bold text-blue-600">+{trader.monthlyReturn}%</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 text-center">
                          <p className="text-sm text-gray-600 mb-1">Win Rate</p>
                          <p className="text-xl font-bold text-purple-600">{trader.winRate}%</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3 text-center">
                          <p className="text-sm text-gray-600 mb-1">Drawdown</p>
                          <p className="text-xl font-bold text-orange-600">-{trader.maxDrawdown}%</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <div className="text-sm text-gray-600">
                          Min: <span className="font-bold text-gray-900">€{trader.minCopyAmount}</span> • 
                          Frais: <span className="font-bold text-gray-900">{trader.fee}%</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-caribbean-gradient text-white px-6 py-3 rounded-xl font-bold hover:shadow-caribbean transition-all duration-300"
                        >
                          Copier Trader
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Following Tab */}
        {activeTab === 'following' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* My Traders */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mes Traders Copiés</h3>
              
              {myTraders.map((trader, index) => (
                <motion.div
                  key={trader.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-caribbean-gradient rounded-xl flex items-center justify-center text-white text-2xl">
                        {trader.avatar}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{trader.name}</h4>
                        <p className="text-sm text-gray-500">Depuis {trader.startDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                        {trader.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                      <button className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        trader.status === 'active' ? 'bg-caribbean-600' : 'bg-gray-200'
                      }`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          trader.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-600 mb-1">Montant</p>
                      <p className="text-lg font-bold text-gray-900">€{trader.copyAmount}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-600 mb-1">Profit</p>
                      <p className="text-lg font-bold text-green-600">€{trader.profit}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-600 mb-1">ROI</p>
                      <p className="text-lg font-bold text-blue-600">+{trader.profitPercent}%</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-600 mb-1">Positions</p>
                      <p className="text-lg font-bold text-purple-600">{trader.openPositions}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Dernier trade: <span className="font-medium">il y a {trader.lastTrade}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Arrêter
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Trades */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-caribbean-600" />
                  Trades Récents
                </h3>
                
                <div className="space-y-4">
                  {recentTrades.map((trade, index) => (
                    <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            trade.type === 'BUY' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {trade.type}
                          </span>
                          <span className="font-medium text-gray-900">{trade.pair}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <span>{trade.trader}</span>
                          <span>•</span>
                          <span>{trade.time}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`font-bold ${
                          trade.profit >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {trade.profit >= 0 ? '+' : ''}{trade.profit}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {trade.exit ? `${trade.entry} → ${trade.exit}` : `Entrée: ${trade.entry}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-caribbean-gradient rounded-2xl p-6 text-white"
              >
                <h3 className="text-lg font-bold mb-6 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Statistiques
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="opacity-90">Montant Total Copié:</span>
                    <span className="text-xl font-bold">€750.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-90">Profit Total:</span>
                    <span className="text-xl font-bold">€155.55</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-90">ROI Moyen:</span>
                    <span className="text-xl font-bold">+20.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-90">Trades Copiés:</span>
                    <span className="text-xl font-bold">47</span>
                  </div>
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Recommandés
                </h3>
                
                <div className="space-y-4">
                  {traders.slice(0, 2).map((trader, index) => (
                    <div key={trader.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{trader.avatar}</span>
                        <div>
                          <p className="font-medium text-gray-900">{trader.name}</p>
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="text-green-600">+{trader.monthlyReturn}%</span>
                            <span className="text-gray-500">{trader.followers.toLocaleString()} followers</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-caribbean-100 text-caribbean-600 rounded-lg text-sm font-medium hover:bg-caribbean-200 transition-colors"
                      >
                        Voir
                      </motion.button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceStats.map((stat, index) => (
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
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : 
                       stat.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </motion.div>
              ))}
            </div>

            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Évolution du Portfolio</h3>
                <div className="flex items-center space-x-2">
                  {timeframes.map((timeframe) => (
                    <button
                      key={timeframe.id}
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

              {/* Simplified Chart Visualization */}
              <div className="h-64 flex items-end space-x-2 p-4 bg-gray-50 rounded-xl">
                {[...Array(12)].map((_, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-caribbean-gradient rounded-t-lg transition-all duration-500 hover:opacity-80"
                    style={{ 
                      height: `${Math.random() * 60 + 20}%`,
                      minHeight: '20px'
                    }}
                  />
                ))}
              </div>

              <div className="flex justify-between text-sm text-gray-500 mt-4">
                <span>Il y a 30 jours</span>
                <span>Aujourd'hui</span>
              </div>
            </motion.div>

            {/* Detailed Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* By Trader */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-6">Performance par Trader</h3>
                
                <div className="space-y-4">
                  {myTraders.map((trader) => (
                    <div key={trader.id} className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{trader.avatar}</span>
                          <span className="font-bold text-gray-900">{trader.name}</span>
                        </div>
                        <span className="text-green-600 font-bold">+{trader.profitPercent}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-caribbean-gradient h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(trader.profitPercent * 2, 100)}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Montant: €{trader.copyAmount}</span>
                        <span>Profit: €{trader.profit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* By Asset */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-6">Performance par Asset</h3>
                
                <div className="space-y-4">
                  {['BTC', 'ETH', 'SOL', 'ADA'].map((asset, index) => (
                    <div key={asset} className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: ['#F7931A', '#627EEA', '#9945FF', '#0033AD'][index] }}
                          >
                            {asset.slice(0, 2)}
                          </div>
                          <span className="font-bold text-gray-900">{asset}</span>
                        </div>
                        <span className="text-green-600 font-bold">+{[24.7, 18.3, 32.1, 12.8][index]}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min([24.7, 18.3, 32.1, 12.8][index] * 2, 100)}%`,
                            backgroundColor: ['#F7931A', '#627EEA', '#9945FF', '#0033AD'][index]
                          }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Trades: {[12, 8, 15, 6][index]}</span>
                        <span>Profit: €{[67.45, 42.30, 34.80, 11.00][index]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CopyTradingPage;