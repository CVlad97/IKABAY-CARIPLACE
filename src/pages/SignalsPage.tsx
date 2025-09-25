import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock,
  Star,
  Bell,
  Filter,
  Search,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Zap,
  BarChart3,
  Users,
  Award
} from 'lucide-react';

const SignalsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    document.title = 'Signaux Trading - IKABAY CARAÏBEEN';
  }, []);

  const filters = [
    { id: 'all', name: 'Tous les Signaux', count: 24 },
    { id: 'active', name: 'Actifs', count: 8 },
    { id: 'completed', name: 'Terminés', count: 12 },
    { id: 'premium', name: 'Premium', count: 4 },
  ];

  const signalProviders = [
    {
      id: '1',
      name: 'CryptoMaster Pro',
      avatar: '🤖',
      rating: 4.8,
      followers: 12500,
      winRate: 87.3,
      totalSignals: 156,
      verified: true,
      premium: true
    },
    {
      id: '2',
      name: 'Caribbean Trader',
      avatar: '🏝️',
      rating: 4.6,
      followers: 8900,
      winRate: 82.1,
      totalSignals: 89,
      verified: true,
      premium: false
    },
    {
      id: '3',
      name: 'AI Signal Bot',
      avatar: '🔮',
      rating: 4.9,
      followers: 15600,
      winRate: 91.2,
      totalSignals: 234,
      verified: true,
      premium: true
    }
  ];

  const signals = [
    {
      id: '1',
      provider: 'CryptoMaster Pro',
      providerId: '1',
      pair: 'BTC/USDT',
      type: 'LONG',
      entry: 43250,
      targets: [44500, 45800, 47200],
      stopLoss: 41800,
      status: 'active',
      confidence: 85,
      timeframe: '4H',
      timestamp: '2024-01-15T10:30:00Z',
      followers: 234,
      premium: true,
      analysis: 'Formation de triangle ascendant avec volume croissant. RSI en zone neutre.',
      currentPrice: 43180,
      pnl: -0.16
    },
    {
      id: '2',
      provider: 'Caribbean Trader',
      providerId: '2',
      pair: 'ETH/USDT',
      type: 'LONG',
      entry: 2680,
      targets: [2750, 2820, 2900],
      stopLoss: 2580,
      status: 'completed',
      confidence: 78,
      timeframe: '1D',
      timestamp: '2024-01-14T15:45:00Z',
      followers: 189,
      premium: false,
      analysis: 'Cassure de résistance majeure avec confirmation volume.',
      finalPrice: 2785,
      pnl: +3.92
    },
    {
      id: '3',
      provider: 'AI Signal Bot',
      providerId: '3',
      pair: 'SOL/USDT',
      type: 'SHORT',
      entry: 98.50,
      targets: [95.20, 92.80, 89.50],
      stopLoss: 102.30,
      status: 'active',
      confidence: 92,
      timeframe: '2H',
      timestamp: '2024-01-15T08:20:00Z',
      followers: 456,
      premium: true,
      analysis: 'Divergence baissière RSI + MACD. Rejet de résistance clé.',
      currentPrice: 96.75,
      pnl: +1.78
    },
    {
      id: '4',
      provider: 'CryptoMaster Pro',
      providerId: '1',
      pair: 'ADA/USDT',
      type: 'LONG',
      entry: 0.485,
      targets: [0.520, 0.550, 0.580],
      stopLoss: 0.460,
      status: 'completed',
      confidence: 73,
      timeframe: '6H',
      timestamp: '2024-01-13T12:15:00Z',
      followers: 167,
      premium: false,
      analysis: 'Support technique solide + accumulation institutionnelle.',
      finalPrice: 0.535,
      pnl: +10.31
    },
    {
      id: '5',
      provider: 'AI Signal Bot',
      providerId: '3',
      pair: 'MATIC/USDT',
      type: 'LONG',
      entry: 0.892,
      targets: [0.920, 0.950, 0.985],
      stopLoss: 0.865,
      status: 'stopped',
      confidence: 68,
      timeframe: '1H',
      timestamp: '2024-01-12T16:30:00Z',
      followers: 98,
      premium: true,
      analysis: 'Tentative de cassure de triangle. Signal invalidé.',
      finalPrice: 0.865,
      pnl: -3.03
    }
  ];

  const filteredSignals = signals.filter(signal => {
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'active' && signal.status === 'active') ||
                         (activeFilter === 'completed' && signal.status === 'completed') ||
                         (activeFilter === 'premium' && signal.premium);
    
    const matchesSearch = signal.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         signal.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-600';
      case 'completed': return 'bg-green-100 text-green-600';
      case 'stopped': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'stopped': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a moins d\'une heure';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
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
                Signaux Trading
              </h1>
              <p className="text-gray-600">
                Suivez les meilleurs signaux de trading crypto en temps réel
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Notifications:</span>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-caribbean-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-caribbean-gradient text-white rounded-xl hover:shadow-caribbean transition-all duration-300"
              >
                <Bell className="w-4 h-4" />
                <span>Mes Alertes</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80 flex-shrink-0 space-y-6"
          >
            {/* Search & Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher signaux..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-caribbean-600" />
                Filtres
              </h3>
              
              <div className="space-y-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                      activeFilter === filter.id
                        ? 'bg-caribbean-gradient text-white shadow-caribbean'
                        : 'bg-gray-50 text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600'
                    }`}
                  >
                    <span className="font-medium">{filter.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      activeFilter === filter.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Top Providers */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Top Providers
              </h3>
              
              <div className="space-y-4">
                {signalProviders.map((provider, index) => (
                  <div key={provider.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{provider.avatar}</span>
                      {provider.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-gray-900 text-sm">{provider.name}</h4>
                        {provider.premium && (
                          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-bold">
                            PRO
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{provider.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{provider.followers.toLocaleString()}</span>
                        </div>
                        <span className="text-green-600 font-medium">{provider.winRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Signals List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {filteredSignals.map((signal, index) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">
                          {signalProviders.find(p => p.id === signal.providerId)?.avatar}
                        </span>
                        <div>
                          <h3 className="font-bold text-gray-900">{signal.provider}</h3>
                          <p className="text-sm text-gray-500">{formatTimeAgo(signal.timestamp)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(signal.status)}`}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(signal.status)}
                            <span className="capitalize">{signal.status}</span>
                          </div>
                        </span>
                        
                        {signal.premium && (
                          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-bold">
                            PREMIUM
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-2xl font-bold text-gray-900">{signal.pair}</span>
                        <span className={`px-2 py-1 rounded-lg text-sm font-bold ${
                          signal.type === 'LONG' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {signal.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{signal.timeframe}</span>
                        <Target className="w-4 h-4" />
                        <span>{signal.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Entrée</h4>
                      <p className="text-xl font-bold text-gray-900">${signal.entry.toLocaleString()}</p>
                      {signal.currentPrice && (
                        <p className="text-sm text-gray-500">
                          Actuel: ${signal.currentPrice.toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Objectifs</h4>
                      <div className="space-y-1">
                        {signal.targets.map((target, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">TP{i + 1}:</span>
                            <span className="font-medium">${target.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Stop Loss</h4>
                      <p className="text-lg font-bold text-red-600">${signal.stopLoss.toLocaleString()}</p>
                      {signal.pnl !== undefined && (
                        <div className={`text-sm font-medium ${
                          signal.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          P&L: {signal.pnl >= 0 ? '+' : ''}{signal.pnl.toFixed(2)}%
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Analyse</h4>
                    <p className="text-gray-600">{signal.analysis}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{signal.followers} suiveurs</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BarChart3 className="w-4 h-4" />
                        <span>Confiance {signal.confidence}%</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Analyser
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-caribbean-gradient text-white rounded-lg hover:shadow-caribbean transition-all duration-300"
                      >
                        Copier Signal
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-caribbean-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl border-2 border-caribbean-200 hover:border-caribbean-300 transition-all duration-300"
              >
                Charger Plus de Signaux
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalsPage;