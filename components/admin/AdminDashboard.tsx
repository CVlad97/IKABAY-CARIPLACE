"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  DollarSign, 
  Activity, 
  Shield, 
  Database,
  Server,
  Settings,
  FileText,
  Key
} from "lucide-react";
import Link from "next/link";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: <Activity className="w-4 h-4" /> },
    { id: 'users', name: 'Utilisateurs', icon: <Users className="w-4 h-4" /> },
    { id: 'transactions', name: 'Transactions', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'system', name: 'Système', icon: <Server className="w-4 h-4" /> },
    { id: 'security', name: 'Sécurité', icon: <Shield className="w-4 h-4" /> },
    { id: 'settings', name: 'Paramètres', icon: <Settings className="w-4 h-4" /> },
  ];

  const adminModules = [
    {
      title: "Gestion des Rôles",
      description: "Gérez les rôles et permissions des utilisateurs",
      icon: <Key className="w-8 h-8 text-white" />,
      color: "from-blue-500 to-purple-500",
      path: "/admin/roles"
    },
    {
      title: "Documentation API",
      description: "Documentation interactive des API exposées",
      icon: <FileText className="w-8 h-8 text-white" />,
      color: "from-green-500 to-teal-500",
      path: "/admin/api-docs"
    },
    {
      title: "Monitoring Système",
      description: "Surveillance en temps réel des performances",
      icon: <Server className="w-8 h-8 text-white" />,
      color: "from-orange-500 to-red-500",
      path: "/admin/system"
    },
    {
      title: "Extensions",
      description: "Marketplace d'extensions certifiées",
      icon: <Database className="w-8 h-8 text-white" />,
      color: "from-purple-500 to-pink-500",
      path: "/admin/extensions"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Admin Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminModules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
          >
            <div className={`bg-gradient-to-r ${module.color} p-6`}>
              <div className="flex justify-between items-start">
                {module.icon}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
              <p className="text-gray-600 mb-6">{module.description}</p>
              
              <Link href={module.path}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-caribbean-gradient text-white py-2 rounded-xl font-medium hover:shadow-caribbean transition-all duration-300"
                >
                  Accéder
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Vue d'ensemble du système</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Utilisateurs</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">2,847</div>
            <div className="text-sm text-blue-500">+124 ce mois</div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Revenus</span>
            </div>
            <div className="text-2xl font-bold text-green-600">€45,230</div>
            <div className="text-sm text-green-500">+18.5% ce mois</div>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Uptime</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">99.9%</div>
            <div className="text-sm text-purple-500">30 derniers jours</div>
          </div>
          
          <div className="bg-orange-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Sécurité</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">Optimale</div>
            <div className="text-sm text-orange-500">0 incidents</div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Activité Récente</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Nouvel utilisateur inscrit</p>
                <p className="text-sm text-gray-500">Il y a 5 minutes</p>
              </div>
            </div>
            <span className="text-blue-600 font-medium">Marie D.</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Commission swap reçue</p>
                <p className="text-sm text-gray-500">Il y a 12 minutes</p>
              </div>
            </div>
            <span className="text-green-600 font-medium">+€12.45</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Sauvegarde automatique</p>
                <p className="text-sm text-gray-500">Il y a 30 minutes</p>
              </div>
            </div>
            <span className="text-purple-600 font-medium">Réussie</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Tentative de connexion suspecte</p>
                <p className="text-sm text-gray-500">Il y a 45 minutes</p>
              </div>
            </div>
            <span className="text-orange-600 font-medium">Bloquée</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;