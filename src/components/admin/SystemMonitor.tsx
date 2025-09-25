import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  HardDrive,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Download,
  Upload,
  Users,
  Zap
} from 'lucide-react';
import { monitoring } from '../../utils/monitoring';
import { backupSystem } from '../../utils/backup';

const SystemMonitor = () => {
  const [systemStatus, setSystemStatus] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    uptime: 0,
    activeUsers: 0,
    requestsPerMinute: 0,
    lastBackup: null,
    services: {
      api: { status: 'operational', latency: 45 },
      database: { status: 'operational', latency: 12 },
      auth: { status: 'operational', latency: 87 },
      storage: { status: 'operational', latency: 34 }
    }
  });
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [backupDescription, setBackupDescription] = useState('');
  const [creatingBackup, setCreatingBackup] = useState(false);

  useEffect(() => {
    fetchSystemStatus();
    
    if (autoRefresh) {
      const interval = setInterval(fetchSystemStatus, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const fetchSystemStatus = async () => {
    try {
      setRefreshing(true);
      
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/system/status');
      // const data = await response.json();
      
      // For demo purposes, we'll generate random data
      const data = {
        cpu: Math.floor(Math.random() * 60) + 20, // 20-80%
        memory: Math.floor(Math.random() * 50) + 30, // 30-80%
        disk: Math.floor(Math.random() * 30) + 10, // 10-40%
        uptime: Math.floor(Math.random() * 30) + 1, // 1-30 days
        activeUsers: Math.floor(Math.random() * 100) + 50, // 50-150 users
        requestsPerMinute: Math.floor(Math.random() * 200) + 100, // 100-300 requests
        lastBackup: backupSystem.getLastBackupTime(),
        services: {
          api: { 
            status: Math.random() > 0.95 ? 'degraded' : 'operational', 
            latency: Math.floor(Math.random() * 100) + 10
          },
          database: { 
            status: Math.random() > 0.98 ? 'down' : 'operational', 
            latency: Math.floor(Math.random() * 30) + 5
          },
          auth: { 
            status: 'operational', 
            latency: Math.floor(Math.random() * 150) + 50
          },
          storage: { 
            status: Math.random() > 0.97 ? 'degraded' : 'operational', 
            latency: Math.floor(Math.random() * 50) + 20
          }
        }
      };
      
      setSystemStatus(data);
      
      // Log system status for monitoring
      monitoring.logEvent('system_status_check', {
        cpu: data.cpu,
        memory: data.memory,
        disk: data.disk,
        services: Object.entries(data.services).map(([name, service]) => ({
          name,
          status: service.status,
          latency: service.latency
        }))
      });
      
      // Check for critical issues
      const criticalIssues = Object.entries(data.services)
        .filter(([_, service]) => service.status === 'down')
        .map(([name]) => name);
        
      if (criticalIssues.length > 0) {
        monitoring.logCriticalEvent('service_down', {
          services: criticalIssues,
          timestamp: new Date()
        });
      }
      
      // Check for high resource usage
      if (data.cpu > 80 || data.memory > 80 || data.disk > 80) {
        monitoring.logCriticalEvent('high_resource_usage', {
          cpu: data.cpu,
          memory: data.memory,
          disk: data.disk,
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('Error fetching system status:', error);
      
      monitoring.logEvent('system_status_check_error', {
        error: error.toString(),
        timestamp: new Date()
      });
    } finally {
      setRefreshing(false);
    }
  };

  const createBackup = async () => {
    try {
      setCreatingBackup(true);
      
      await backupSystem.createBackup(backupDescription || 'Manual backup');
      
      setShowBackupModal(false);
      setBackupDescription('');
      
      // Refresh system status to show new backup time
      fetchSystemStatus();
    } catch (error) {
      console.error('Error creating backup:', error);
    } finally {
      setCreatingBackup(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'down':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-4 h-4" />;
      case 'degraded':
        return <AlertCircle className="w-4 h-4" />;
      case 'down':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getResourceColor = (value: number) => {
    if (value >= 80) return 'text-red-500';
    if (value >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6" />
            <h2 className="text-xl font-bold">Moniteur Système</h2>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">Auto-refresh:</span>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoRefresh ? 'bg-caribbean-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoRefresh ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchSystemStatus}
              disabled={refreshing}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Actualiser</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBackupModal(true)}
              className="flex items-center space-x-2 bg-caribbean-gradient px-3 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              <span>Backup</span>
            </motion.button>
          </div>
        </div>
        <p className="text-gray-300">
          Surveillez l'état du système et des services en temps réel
        </p>
      </div>

      {/* System Overview */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Vue d'ensemble</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CPU Usage */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">CPU</span>
              </div>
              <span className={`font-bold text-xl ${getResourceColor(systemStatus.cpu)}`}>
                {systemStatus.cpu}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  systemStatus.cpu >= 80 ? 'bg-red-500' :
                  systemStatus.cpu >= 60 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${systemStatus.cpu}%` }}
              ></div>
            </div>
          </div>

          {/* Memory Usage */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Mémoire</span>
              </div>
              <span className={`font-bold text-xl ${getResourceColor(systemStatus.memory)}`}>
                {systemStatus.memory}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  systemStatus.memory >= 80 ? 'bg-red-500' :
                  systemStatus.memory >= 60 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${systemStatus.memory}%` }}
              ></div>
            </div>
          </div>

          {/* Disk Usage */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <HardDrive className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Disque</span>
              </div>
              <span className={`font-bold text-xl ${getResourceColor(systemStatus.disk)}`}>
                {systemStatus.disk}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  systemStatus.disk >= 80 ? 'bg-red-500' :
                  systemStatus.disk >= 60 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${systemStatus.disk}%` }}
              ></div>
            </div>
          </div>

          {/* Uptime */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Uptime</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                {systemStatus.uptime} jours
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Dernier redémarrage:</span>
              <span>{new Date(Date.now() - systemStatus.uptime * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Status */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">État des Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(systemStatus.services).map(([name, service]) => (
            <div key={name} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {name === 'api' && <Zap className="w-5 h-5 text-gray-500" />}
                  {name === 'database' && <Database className="w-5 h-5 text-gray-500" />}
                  {name === 'auth' && <Users className="w-5 h-5 text-gray-500" />}
                  {name === 'storage' && <HardDrive className="w-5 h-5 text-gray-500" />}
                  <span className="font-medium text-gray-700 capitalize">{name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(service.status)}`}>
                  {getStatusIcon(service.status)}
                  <span className="capitalize">{service.status}</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Latence:</span>
                <span className={`font-medium ${
                  service.latency > 100 ? 'text-red-600' :
                  service.latency > 50 ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {service.latency} ms
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Metrics */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Métriques Système</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Users */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Utilisateurs Actifs</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {systemStatus.activeUsers}
            </div>
            <div className="text-sm text-gray-500">
              En ce moment
            </div>
          </div>

          {/* Requests Per Minute */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Requêtes/Minute</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {systemStatus.requestsPerMinute}
            </div>
            <div className="text-sm text-gray-500">
              Moyenne sur 5 minutes
            </div>
          </div>

          {/* Last Backup */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Download className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Dernière Sauvegarde</span>
            </div>
            <div className="text-xl font-bold text-gray-900 mb-2">
              {systemStatus.lastBackup 
                ? new Date(systemStatus.lastBackup).toLocaleString()
                : 'Jamais'}
            </div>
            <div className="text-sm text-gray-500">
              {systemStatus.lastBackup 
                ? `Il y a ${Math.floor((Date.now() - new Date(systemStatus.lastBackup).getTime()) / (1000 * 60 * 60))} heures`
                : 'Aucune sauvegarde'}
            </div>
          </div>
        </div>
      </div>

      {/* Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Créer une Sauvegarde</h3>
              <button
                onClick={() => setShowBackupModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={backupDescription}
                onChange={(e) => setBackupDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                placeholder="Ex: Sauvegarde manuelle avant mise à jour"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowBackupModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={createBackup}
                disabled={creatingBackup}
                className="px-4 py-2 bg-caribbean-gradient text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center space-x-2"
              >
                {creatingBackup ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Création...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Créer Sauvegarde</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SystemMonitor;