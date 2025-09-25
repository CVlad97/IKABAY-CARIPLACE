import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle, 
  X, 
  Bell, 
  Shield, 
  Clock,
  RefreshCw,
  Eye,
  EyeOff,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { monitoring } from '../../utils/monitoring';

interface SecurityMonitorProps {
  showNotifications?: boolean;
}

const SecurityMonitor: React.FC<SecurityMonitorProps> = ({ 
  showNotifications = true 
}) => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isMinimized, setIsMinimized] = useState(true);
  const [securityStatus, setSecurityStatus] = useState<'good' | 'warning' | 'critical'>('good');
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Subscribe to alerts from monitoring system
    const handleAlert = (alert: any) => {
      setAlerts(prev => [alert, ...prev].slice(0, 10));
      
      // Update security status based on alert type
      if (alert.type === 'critical') {
        setSecurityStatus('critical');
      } else if (alert.type === 'warning' && securityStatus !== 'critical') {
        setSecurityStatus('warning');
      }
    };
    
    monitoring.subscribeToAlerts(handleAlert);
    
    // Simulate security checks
    const interval = setInterval(() => {
      setLastChecked(new Date());
      
      // Simulate random security events (for demo purposes)
      if (Math.random() < 0.1) {
        const eventTypes = ['warning', 'info', 'critical'];
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        const messages = {
          warning: [
            'Unusual login attempt detected',
            'Multiple failed login attempts',
            'API rate limit approaching threshold'
          ],
          info: [
            'Security scan completed',
            'System update available',
            'New device logged in'
          ],
          critical: [
            'Potential data breach detected',
            'Unauthorized access attempt',
            'Critical system error'
          ]
        };
        
        const message = messages[eventType][Math.floor(Math.random() * messages[eventType].length)];
        
        handleAlert({
          type: eventType,
          message,
          timestamp: new Date(),
          details: {
            location: 'System',
            ip: '192.168.1.1',
            user: 'system'
          }
        });
      }
    }, 30000); // Check every 30 seconds
    
    return () => {
      monitoring.unsubscribeFromAlerts(handleAlert);
      clearInterval(interval);
    };
  }, [securityStatus]);

  const getStatusIcon = () => {
    switch (securityStatus) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (securityStatus) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Bell className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString();
  };

  if (!showNotifications) {
    return null;
  }

  return (
    <>
      {/* Floating Status Indicator */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-20 right-6 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMinimized(!isMinimized)}
          className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center ${getStatusColor()} text-white`}
        >
          <Shield className="w-6 h-6" />
          {alerts.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {alerts.length}
            </span>
          )}
        </motion.button>
      </motion.div>

      {/* Security Monitor Panel */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-20 w-80 bg-white rounded-2xl shadow-2xl z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gray-900 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <h3 className="font-bold">Moniteur de Sécurité</h3>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2 text-sm">
                <div className="flex items-center space-x-2">
                  {getStatusIcon()}
                  <span>
                    {securityStatus === 'good' && 'Sécurité optimale'}
                    {securityStatus === 'warning' && 'Attention requise'}
                    {securityStatus === 'critical' && 'Alerte critique'}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-300">
                  <Clock className="w-3 h-3" />
                  <span>Vérifié à {formatTime(lastChecked)}</span>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="max-h-60 overflow-y-auto p-4 space-y-3">
              {alerts.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p>Aucune alerte de sécurité</p>
                </div>
              ) : (
                alerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-3 rounded-lg ${
                      alert.type === 'critical' ? 'bg-red-50' :
                      alert.type === 'warning' ? 'bg-yellow-50' :
                      'bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className={`font-medium ${
                          alert.type === 'critical' ? 'text-red-700' :
                          alert.type === 'warning' ? 'text-yellow-700' :
                          'text-blue-700'
                        }`}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(alert.timestamp)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm text-gray-600 flex items-center space-x-1"
                >
                  {showDetails ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Masquer détails</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Voir détails</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setLastChecked(new Date());
                    if (securityStatus !== 'critical') {
                      setSecurityStatus('good');
                    }
                  }}
                  className="text-sm text-gray-600 flex items-center space-x-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Actualiser</span>
                </button>
              </div>
            </div>

            {/* Security Details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-200 overflow-hidden"
                >
                  <div className="p-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Authentification 2FA</span>
                      <span className="text-green-600 font-medium">Activée</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Dernière connexion</span>
                      <span className="text-gray-900">Il y a 2 heures</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Appareils connectés</span>
                      <span className="text-gray-900">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Niveau de sécurité</span>
                      <span className="text-green-600 font-medium">Élevé</span>
                    </div>
                    <button className="w-full mt-2 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition-colors">
                      <Lock className="w-4 h-4" />
                      <span>Paramètres de sécurité</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SecurityMonitor;