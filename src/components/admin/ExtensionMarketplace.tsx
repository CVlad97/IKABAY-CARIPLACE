import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Puzzle, 
  Download, 
  Check, 
  X, 
  Search,
  Filter,
  Star,
  Clock,
  User,
  Settings,
  Shield,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

// Mock extensions data
const EXTENSIONS = [
  {
    id: 'analytics-pro',
    name: 'Analytics Pro',
    description: 'Advanced analytics and reporting tools with custom dashboards',
    author: 'IKABAY Team',
    version: '1.2.0',
    rating: 4.8,
    reviews: 124,
    price: 0,
    category: 'analytics',
    tags: ['reporting', 'dashboard', 'charts'],
    installed: true,
    verified: true,
    lastUpdated: '2025-03-15',
    icon: '📊'
  },
  {
    id: 'payment-gateway',
    name: 'Multi-Payment Gateway',
    description: 'Support for multiple payment providers including Stripe, PayPal, and more',
    author: 'Finance Solutions',
    version: '2.1.3',
    rating: 4.6,
    reviews: 89,
    price: 29.99,
    category: 'payment',
    tags: ['stripe', 'paypal', 'checkout'],
    installed: false,
    verified: true,
    lastUpdated: '2025-04-02',
    icon: '💳'
  },
  {
    id: 'seo-toolkit',
    name: 'SEO Toolkit',
    description: 'Comprehensive SEO tools to optimize your product listings and content',
    author: 'Digital Marketing Pros',
    version: '1.0.5',
    rating: 4.3,
    reviews: 56,
    price: 19.99,
    category: 'marketing',
    tags: ['seo', 'optimization', 'keywords'],
    installed: false,
    verified: true,
    lastUpdated: '2025-03-28',
    icon: '🔍'
  },
  {
    id: 'inventory-manager',
    name: 'Advanced Inventory',
    description: 'Powerful inventory management with forecasting and auto-ordering',
    author: 'Supply Chain Solutions',
    version: '3.2.1',
    rating: 4.9,
    reviews: 112,
    price: 39.99,
    category: 'inventory',
    tags: ['stock', 'forecasting', 'automation'],
    installed: true,
    verified: true,
    lastUpdated: '2025-04-10',
    icon: '📦'
  },
  {
    id: 'social-integrations',
    name: 'Social Media Connect',
    description: 'Integrate with all major social platforms for sharing and marketing',
    author: 'Social Tech',
    version: '2.4.0',
    rating: 4.2,
    reviews: 78,
    price: 0,
    category: 'marketing',
    tags: ['social', 'sharing', 'marketing'],
    installed: false,
    verified: true,
    lastUpdated: '2025-03-20',
    icon: '🌐'
  },
  {
    id: 'customer-insights',
    name: 'Customer Insights',
    description: 'Advanced customer analytics and behavior tracking',
    author: 'Data Analytics Inc',
    version: '1.5.2',
    rating: 4.7,
    reviews: 93,
    price: 24.99,
    category: 'analytics',
    tags: ['customers', 'behavior', 'insights'],
    installed: false,
    verified: true,
    lastUpdated: '2025-04-05',
    icon: '👥'
  },
  {
    id: 'shipping-calculator',
    name: 'Advanced Shipping',
    description: 'Real-time shipping rates and delivery time estimates',
    author: 'Logistics Pro',
    version: '2.0.1',
    rating: 4.5,
    reviews: 67,
    price: 14.99,
    category: 'shipping',
    tags: ['rates', 'delivery', 'logistics'],
    installed: false,
    verified: false,
    lastUpdated: '2025-03-25',
    icon: '🚚'
  },
  {
    id: 'email-marketing',
    name: 'Email Campaigns',
    description: 'Create and manage email marketing campaigns with templates and automation',
    author: 'Marketing Solutions',
    version: '3.1.0',
    rating: 4.4,
    reviews: 102,
    price: 29.99,
    category: 'marketing',
    tags: ['email', 'campaigns', 'automation'],
    installed: false,
    verified: true,
    lastUpdated: '2025-04-08',
    icon: '📧'
  }
];

const ExtensionMarketplace = () => {
  const [extensions, setExtensions] = useState(EXTENSIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedExtension, setSelectedExtension] = useState<any>(null);
  const [installing, setInstalling] = useState<string | null>(null);
  const [uninstalling, setUninstalling] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'payment', name: 'Payment' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'inventory', name: 'Inventory' },
    { id: 'shipping', name: 'Shipping' }
  ];

  const filteredExtensions = extensions.filter(ext => {
    // Apply search filter
    if (searchTerm && !ext.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !ext.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !ext.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Apply category filter
    if (categoryFilter !== 'all' && ext.category !== categoryFilter) {
      return false;
    }
    
    // Apply status filter
    if (statusFilter === 'installed' && !ext.installed) {
      return false;
    }
    if (statusFilter === 'not-installed' && ext.installed) {
      return false;
    }
    
    return true;
  });

  const installExtension = (id: string) => {
    setInstalling(id);
    
    // Simulate installation
    setTimeout(() => {
      setExtensions(extensions.map(ext => 
        ext.id === id ? { ...ext, installed: true } : ext
      ));
      setInstalling(null);
      
      // Update selected extension if it's the one being installed
      if (selectedExtension && selectedExtension.id === id) {
        setSelectedExtension({ ...selectedExtension, installed: true });
      }
    }, 2000);
  };

  const uninstallExtension = (id: string) => {
    setUninstalling(id);
    
    // Simulate uninstallation
    setTimeout(() => {
      setExtensions(extensions.map(ext => 
        ext.id === id ? { ...ext, installed: false } : ext
      ));
      setUninstalling(null);
      
      // Update selected extension if it's the one being uninstalled
      if (selectedExtension && selectedExtension.id === id) {
        setSelectedExtension({ ...selectedExtension, installed: false });
      }
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Puzzle className="w-6 h-6" />
            <h2 className="text-xl font-bold">Marketplace d'Extensions</h2>
          </div>
        </div>
        <p className="text-gray-300 mb-6">
          Découvrez et installez des extensions certifiées pour étendre les fonctionnalités de votre plateforme
        </p>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher des extensions..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500 appearance-none"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-4 pr-8 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="installed">Installed</option>
              <option value="not-installed">Not Installed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Extensions Grid */}
      <div className="p-6">
        {filteredExtensions.length === 0 ? (
          <div className="text-center py-12">
            <Puzzle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune extension trouvée</h3>
            <p className="text-gray-500">
              Aucune extension ne correspond à vos critères de recherche
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExtensions.map((extension) => (
              <motion.div
                key={extension.id}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {extension.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{extension.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>v{extension.version}</span>
                          <span>•</span>
                          <span>{extension.author}</span>
                        </div>
                      </div>
                    </div>
                    {extension.verified && (
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>Vérifié</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {extension.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{extension.rating}</span>
                      <span className="text-sm text-gray-500">({extension.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Mis à jour le {new Date(extension.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      {extension.price > 0 ? (
                        <span className="font-bold text-gray-900">${extension.price}</span>
                      ) : (
                        <span className="text-green-600 font-medium">Gratuit</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedExtension(extension)}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Détails
                      </motion.button>
                      
                      {extension.installed ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => uninstallExtension(extension.id)}
                          disabled={uninstalling === extension.id}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 flex items-center space-x-1"
                        >
                          {uninstalling === extension.id ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Désinstallation...</span>
                            </>
                          ) : (
                            <>
                              <X className="w-4 h-4" />
                              <span>Désinstaller</span>
                            </>
                          )}
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => installExtension(extension.id)}
                          disabled={installing === extension.id}
                          className="px-3 py-1 bg-caribbean-gradient text-white rounded-lg hover:shadow-sm transition-all duration-300 disabled:opacity-50 flex items-center space-x-1"
                        >
                          {installing === extension.id ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Installation...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              <span>Installer</span>
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Extension Details Modal */}
      {selectedExtension && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                  {selectedExtension.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedExtension.name}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span>v{selectedExtension.version}</span>
                    <span>•</span>
                    <span>{selectedExtension.author}</span>
                    {selectedExtension.verified && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>Vérifié</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedExtension(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedExtension.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-900">{selectedExtension.rating}</span>
                  <span className="text-gray-500">({selectedExtension.reviews} avis)</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Mis à jour le {new Date(selectedExtension.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExtension.tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Fonctionnalités</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Intégration transparente avec IKABAY</li>
                  <li>Installation en un clic</li>
                  <li>Support technique inclus</li>
                  <li>Mises à jour régulières</li>
                  <li>Documentation complète</li>
                </ul>
              </div>
              
              {!selectedExtension.verified && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Extension non vérifiée</h4>
                      <p className="text-sm text-yellow-700">
                        Cette extension n'a pas été vérifiée par l'équipe IKABAY. Installez-la à vos propres risques.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex items-center justify-between">
              <div>
                {selectedExtension.price > 0 ? (
                  <span className="text-xl font-bold text-gray-900">${selectedExtension.price}</span>
                ) : (
                  <span className="text-lg text-green-600 font-medium">Gratuit</span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-caribbean-600 hover:text-caribbean-700"
                >
                  <span>Documentation</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                
                {selectedExtension.installed ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => uninstallExtension(selectedExtension.id)}
                    disabled={uninstalling === selectedExtension.id}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {uninstalling === selectedExtension.id ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Désinstallation...</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4" />
                        <span>Désinstaller</span>
                      </>
                    )}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => installExtension(selectedExtension.id)}
                    disabled={installing === selectedExtension.id}
                    className="px-4 py-2 bg-caribbean-gradient text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center space-x-2"
                  >
                    {installing === selectedExtension.id ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Installation...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Installer</span>
                      </>
                    )}
                  </motion.button>
                )}
                
                {selectedExtension.installed && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configurer</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ExtensionMarketplace;