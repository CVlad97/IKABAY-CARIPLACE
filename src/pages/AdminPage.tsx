import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Settings, 
  BarChart3, 
  Database,
  Bell,
  Key,
  Globe,
  Monitor,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Activity,
  UserCheck,
  FileText,
  Zap
} from 'lucide-react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemStatus, setSystemStatus] = useState('operational');

  useEffect(() => {
    document.title = 'Administration - IKABAY CARAÏBEEN';
  }, []);

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'users', name: 'Utilisateurs', icon: <Users className="w-4 h-4" /> },
    { id: 'trading', name: 'Trading', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'system', name: 'Système', icon: <Monitor className="w-4 h-4" /> },
    { id: 'security', name: 'Sécurité', icon: <Shield className="w-4 h-4" /> },
    { id: 'settings', name: 'Paramètres', icon: <Settings className="w-4 h-4" /> },
  ];

  const systemMetrics = [
    {
      title: 'Utilisateurs Actifs',
      value: '2,847',
      change: '+12.3%',
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Volume Trading',
      value: '€127.4K',
      change: '+24.7%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Uptime Système',
      value: '99.9%',
      change: '+0.1%',
      icon: <Activity className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Revenus',
      value: '€45.2K',
      change: '+18.5%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentUsers = [
    { id: '1', name: 'Marie Dubois', email: 'marie@example.com', status: 'active', joined: '2024-01-15', country: 'Martinique' },
    { id: '2', name: 'Jean Martin', email: 'jean@example.com', status: 'pending', joined: '2024-01-14', country: 'Guadeloupe' },
    { id: '3', name: 'Sophie Blanc', email: 'sophie@example.com', status: 'active', joined: '2024-01-13', country: 'Barbade' },
    { id: '4', name: 'Marcus Johnson', email: 'marcus@example.com', status: 'suspended', joined: '2024-01-12', country: 'Jamaïque' },
  ];

  const systemAlerts = [
    { id: '1', type: 'warning', message: 'Pic de trafic détecté sur l\'API trading', time: '5 min ago' },
    { id: '2', type: 'info', message: 'Mise à jour système programmée pour 02:00', time: '1h ago' },
    { id: '3', type: 'success', message: 'Sauvegarde automatique terminée avec succès', time: '2h ago' },
    { id: '4', type: 'error', message: 'Tentative de connexion suspecte bloquée', time: '3h ago' },
  ];

  const tradingStats = [
    { pair: 'BTC/USDT', volume: '€45.2K', trades: 234, success: '87%' },
    { pair: 'ETH/USDT', volume: '€32.1K', trades: 189, success: '91%' },
    { pair: 'SOL/USDT', volume: '€28.7K', trades: 156, success: '89%' },
    { pair: 'ADA/USDT', volume: '€21.4K', trades: 123, success: '85%' },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'suspended': return 'bg-red-100 text-red-600';
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <Shield className="w-8 h-8 mr-3 text-caribbean-600" />
                Administration
              </h1>
              <p className="text-gray-600">
                Panneau de contrôle et gestion de la plateforme IKABAY
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
                systemStatus === 'operational' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  systemStatus === 'operational' ? 'bg-green-500' : 'bg-red-500'
                } animate-pulse`}></div>
                <span className="font-medium">
                  {systemStatus === 'operational' ? 'Système Opérationnel' : 'Problème Détecté'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Navigation Tabs */}
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${metric.bgColor} ${metric.color} p-3 rounded-xl`}>
                      {metric.icon}
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {metric.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </h3>
                  <p className="text-gray-600 text-sm">{metric.title}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Users */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                  Nouveaux Utilisateurs
                </h3>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400">{user.country} • {user.joined}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Alerts */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-orange-600" />
                  Alertes Système
                </h3>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Gestion des Utilisateurs</h3>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-caribbean-gradient text-white px-4 py-2 rounded-xl font-medium"
                >
                  Ajouter Utilisateur
                </motion.button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Utilisateur</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Pays</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Inscription</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Statut</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-caribbean-gradient rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{user.email}</td>
                      <td className="py-3 px-4 text-gray-700">{user.country}</td>
                      <td className="py-3 px-4 text-gray-700">{user.joined}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                            <FileText className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Trading Tab */}
        {activeTab === 'trading' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Statistiques de Trading
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tradingStats.map((stat, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-2">{stat.pair}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Volume:</span>
                        <span className="font-medium">{stat.volume}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Trades:</span>
                        <span className="font-medium">{stat.trades}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Succès:</span>
                        <span className="font-medium text-green-600">{stat.success}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contrôles Bot</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-900">Bot Principal</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 text-sm">Actif</span>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
                        Arrêter
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-900">Bot Backup</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 text-sm">Inactif</span>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">
                        Démarrer
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Paramètres Trading</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capital Maximum (€)
                    </label>
                    <input
                      type="number"
                      defaultValue="10000"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stop Loss Global (%)
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-caribbean-gradient text-white py-3 rounded-xl font-bold"
                  >
                    Sauvegarder
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Monitor className="w-5 h-5 mr-2 text-blue-600" />
                  Serveurs
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">API Principal</span>
                    <span className="text-green-600 font-medium">Opérationnel</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Base de Données</span>
                    <span className="text-green-600 font-medium">Opérationnel</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cache Redis</span>
                    <span className="text-yellow-600 font-medium">Maintenance</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-purple-600" />
                  Base de Données
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Utilisateurs</span>
                    <span className="font-medium">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Transactions</span>
                    <span className="font-medium">45,231</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taille DB</span>
                    <span className="font-medium">2.4 GB</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                  Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">CPU</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">RAM</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Stockage</span>
                    <span className="font-medium">23%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Actions Système</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-50 text-blue-600 p-4 rounded-xl font-medium hover:bg-blue-100 transition-colors"
                >
                  Redémarrer API
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-50 text-green-600 p-4 rounded-xl font-medium hover:bg-green-100 transition-colors"
                >
                  Sauvegarde DB
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-50 text-yellow-600 p-4 rounded-xl font-medium hover:bg-yellow-100 transition-colors"
                >
                  Vider Cache
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-50 text-purple-600 p-4 rounded-xl font-medium hover:bg-purple-100 transition-colors"
                >
                  Logs Système
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-red-600" />
                Sécurité & Accès
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Authentification</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">2FA Obligatoire</span>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Sessions Multiples</span>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Géolocalisation</span>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Clés API</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">MEXC API</span>
                        <p className="text-sm text-gray-500">Dernière utilisation: 2 min ago</p>
                      </div>
                      <span className="text-green-600 text-sm">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">Jupiter API</span>
                        <p className="text-sm text-gray-500">Dernière utilisation: 5 min ago</p>
                      </div>
                      <span className="text-green-600 text-sm">Active</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-caribbean-gradient text-white py-2 rounded-lg font-medium"
                    >
                      Régénérer Clés
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Zone de Danger
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-red-800">Réinitialiser Système</span>
                    <p className="text-sm text-red-600">Supprime toutes les données non critiques</p>
                  </div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700">
                    Réinitialiser
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-red-800">Mode Maintenance</span>
                    <p className="text-sm text-red-600">Désactive l'accès utilisateur</p>
                  </div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700">
                    Activer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-600" />
                  Configuration Générale
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de la Plateforme
                    </label>
                    <input
                      type="text"
                      defaultValue="IKABAY CARAÏBEEN"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Support
                    </label>
                    <input
                      type="email"
                      defaultValue="support@ikabay.com"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Langue par Défaut
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500">
                      <option>Français</option>
                      <option>English</option>
                      <option>Español</option>
                      <option>Kreyòl</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-orange-600" />
                  Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Alertes Système</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Nouveaux Utilisateurs</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Erreurs Trading</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Rapports Quotidiens</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Sauvegarder Configuration</h3>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-caribbean-gradient text-white px-6 py-3 rounded-xl font-bold"
                >
                  Sauvegarder
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200"
                >
                  Réinitialiser
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-100 text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-200"
                >
                  Exporter Config
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;