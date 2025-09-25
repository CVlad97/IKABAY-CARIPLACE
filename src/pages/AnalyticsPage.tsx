import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Zap,
  Target,
  Award
} from 'lucide-react';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Analytics - IKABAY';
  }, []);

  const timeRanges = [
    { id: '24h', name: '24 Heures' },
    { id: '7d', name: '7 Jours' },
    { id: '30d', name: '30 Jours' },
    { id: '90d', name: '3 Mois' },
    { id: '1y', name: '1 Année' },
  ];

  const metrics = [
    { id: 'revenue', name: 'Revenus', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'users', name: 'Utilisateurs', icon: <Users className="w-4 h-4" /> },
    { id: 'trades', name: 'Trades', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'swaps', name: 'Swaps', icon: <Zap className="w-4 h-4" /> },
  ];

  const kpiData = [
    {
      title: 'Revenus Totaux',
      value: '€127,450',
      change: '+24.7%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'vs mois précédent'
    },
    {
      title: 'Utilisateurs Actifs',
      value: '2,847',
      change: '+12.3%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'utilisateurs ce mois'
    },
    {
      title: 'Trades Exécutés',
      value: '1,234',
      change: '+8.9%',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'trades réussis'
    },
    {
      title: 'Taux de Conversion',
      value: '87.2%',
      change: '-2.1%',
      trend: 'down',
      icon: <Target className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'taux de réussite'
    },
  ];

  const chartData = {
    revenue: [
      { date: '2024-01-01', value: 12500 },
      { date: '2024-01-02', value: 15200 },
      { date: '2024-01-03', value: 18900 },
      { date: '2024-01-04', value: 16700 },
      { date: '2024-01-05', value: 21300 },
      { date: '2024-01-06', value: 19800 },
      { date: '2024-01-07', value: 23100 },
    ],
    users: [
      { date: '2024-01-01', value: 2100 },
      { date: '2024-01-02', value: 2250 },
      { date: '2024-01-03', value: 2400 },
      { date: '2024-01-04', value: 2350 },
      { date: '2024-01-05', value: 2600 },
      { date: '2024-01-06', value: 2750 },
      { date: '2024-01-07', value: 2847 },
    ],
  };

  const topPerformers = [
    { name: 'Bot Trading MEXC', value: '€45,230', change: '+18.5%', icon: '🤖' },
    { name: 'Swap Automatique', value: '€32,180', change: '+12.3%', icon: '⚡' },
    { name: 'Commissions Référrals', value: '€28,940', change: '+25.7%', icon: '👥' },
    { name: 'Boutique', value: '€21,100', change: '+8.9%', icon: '🛍️' },
  ];

  const recentActivity = [
    { type: 'trade', description: 'Trade BTC/USDT réussi', amount: '+€234.50', time: '2 min', status: 'success' },
    { type: 'swap', description: 'Swap USDT → SOL', amount: '2.34 SOL', time: '5 min', status: 'success' },
    { type: 'user', description: 'Nouvel utilisateur inscrit', amount: 'Marie D.', time: '8 min', status: 'info' },
    { type: 'trade', description: 'Trade ETH/USDT réussi', amount: '+€189.20', time: '12 min', status: 'success' },
    { type: 'referral', description: 'Commission référral', amount: '+€45.80', time: '15 min', status: 'success' },
  ];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const exportData = () => {
    // Simulation d'export
    console.log('Exporting data...');
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
                Analytics & Rapports
              </h1>
              <p className="text-gray-600">
                Suivez les performances de votre plateforme en temps réel
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshData}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Actualiser</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportData}
                className="flex items-center space-x-2 px-4 py-2 bg-caribbean-gradient text-white rounded-xl hover:shadow-caribbean transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                timeRange === range.id
                  ? 'bg-caribbean-gradient text-white shadow-caribbean'
                  : 'bg-white text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600 shadow-sm'
              }`}
            >
              {range.name}
            </button>
          ))}
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {kpiData.map((kpi, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${kpi.bgColor} ${kpi.color} p-3 rounded-xl`}>
                  {kpi.icon}
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{kpi.change}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {kpi.value}
              </h3>
              <p className="text-gray-600 text-sm">{kpi.title}</p>
              <p className="text-gray-500 text-xs mt-1">{kpi.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Évolution des Métriques</h3>
              <div className="flex items-center space-x-2">
                {metrics.map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedMetric === metric.id
                        ? 'bg-caribbean-100 text-caribbean-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {metric.icon}
                    <span>{metric.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simplified Chart Visualization */}
            <div className="h-80 flex items-end space-x-2 p-4 bg-gray-50 rounded-xl">
              {chartData[selectedMetric as keyof typeof chartData]?.map((point, index) => (
                <div
                  key={index}
                  className="flex-1 bg-caribbean-gradient rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{ 
                    height: `${(point.value / Math.max(...chartData[selectedMetric as keyof typeof chartData].map(p => p.value))) * 100}%`,
                    minHeight: '20px'
                  }}
                  title={`${point.date}: ${point.value.toLocaleString()}`}
                />
              ))}
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <span>Il y a 7 jours</span>
              <span>Aujourd'hui</span>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Performers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Top Performances
              </h3>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{performer.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{performer.name}</p>
                        <p className="text-sm text-green-600 font-medium">{performer.change}</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">{performer.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-caribbean-600" />
                Activité Récente
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activity.status === 'success' ? 'bg-green-100 text-green-600' :
                        activity.status === 'info' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {activity.type === 'trade' ? <TrendingUp className="w-4 h-4" /> :
                         activity.type === 'swap' ? <Zap className="w-4 h-4" /> :
                         activity.type === 'user' ? <Users className="w-4 h-4" /> :
                         <DollarSign className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${
                      activity.status === 'success' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {activity.amount}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-caribbean-gradient rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-6">Statistiques Rapides</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Temps de réponse moyen</span>
                  <span className="font-bold">0.8s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Uptime</span>
                  <span className="font-bold">99.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Transactions/min</span>
                  <span className="font-bold">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Erreurs</span>
                  <span className="font-bold">0.1%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Detailed Tables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Rapport Détaillé</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-caribbean-500">
                  <option>Tous les types</option>
                  <option>Trades</option>
                  <option>Swaps</option>
                  <option>Utilisateurs</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <input
                  type="date"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Montant</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date().toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize text-sm font-medium text-gray-900">
                        {activity.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {activity.description}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-green-600">
                      {activity.amount}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'success' ? 'bg-green-100 text-green-600' :
                        activity.status === 'info' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {activity.status === 'success' ? 'Réussi' : 'Info'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;