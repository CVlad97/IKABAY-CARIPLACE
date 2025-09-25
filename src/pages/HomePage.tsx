import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryShowcase from '../components/home/CategoryShowcase';
import TopProducts from '../components/home/TopProducts';
import ZendropFeature from '../components/home/ZendropFeature';
import BotStatus from '../components/BotStatus';
import SwapModule from '../components/SwapModule';
import { 
  Bot, 
  TrendingUp, 
  Zap, 
  Shield, 
  BarChart3, 
  Users,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  ShoppingBag,
  Briefcase,
  Gamepad2,
  Newspaper,
  GraduationCap,
  Store
} from 'lucide-react';
import { supabase } from '../utils/supabase';

const HomePage = () => {
  const [user, setUser] = React.useState<any>(null);

  useEffect(() => {
    document.title = 'IKABAY - Plateforme Trading & Marketplace';
    
    // Check for user session
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };
    
    getUser();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const mainFeatures = [
    {
      icon: <Store className="w-8 h-8" />,
      title: 'Zendrop',
      description: 'Dropshipping automatisé avec marge personnalisable et paiements directs',
      color: 'from-coral-500 to-sunset-500',
      path: '/zendrop'
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: 'Boutique',
      description: 'Produits authentiques avec paiement crypto',
      color: 'from-coral-500 to-sunset-500',
      path: '/boutique'
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'Bot Trading MEXC',
      description: 'Copy trading automatique avec 15% de commission sur les gains',
      color: 'from-blue-500 to-cyan-500',
      path: '/trading'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Swap Automatique',
      description: 'Échanges USDT ⇄ SOL via Jupiter API en temps réel',
      color: 'from-purple-500 to-pink-500',
      path: '/swap'
    }
  ];

  const secondaryFeatures = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Emplois',
      description: 'Offres d\'emploi dans toutes les îles des Antilles',
      color: 'from-amber-500 to-yellow-500',
      path: '/emplois'
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Jeux Éducatifs',
      description: 'Apprenez la culture caribéenne tout en gagnant des tokens',
      color: 'from-orange-500 to-red-500',
      path: '/jeux'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Formation',
      description: 'Cours de trading, crypto et développement personnel',
      color: 'from-teal-500 to-green-500',
      path: '/formation'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics',
      description: 'Suivi des gains, historique et analytics en temps réel',
      color: 'from-indigo-500 to-blue-500',
      path: '/analytics'
    }
  ];

  const stats = [
    { number: '€2.5M+', label: 'Volume Tradé', icon: <TrendingUp className="w-6 h-6" /> },
    { number: '10K+', label: 'Utilisateurs Actifs', icon: <Users className="w-6 h-6" /> },
    { number: '99.9%', label: 'Uptime', icon: <CheckCircle className="w-6 h-6" /> },
    { number: '4.9/5', label: 'Satisfaction', icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Top Products Section */}
      <TopProducts />

      {/* Zendrop Feature Section */}
      <ZendropFeature />

      {/* Main Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Une Plateforme 
              <span className="bg-caribbean-gradient bg-clip-text text-transparent"> Complète </span>
              pour vos besoins
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Découvrez un écosystème unique qui combine commerce, technologie blockchain, 
              éducation et opportunités professionnelles dans un seul endroit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-gray-600">{feature.icon}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-caribbean-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <Link 
                    to={feature.path}
                    className="inline-flex items-center font-medium text-caribbean-600 hover:text-caribbean-700 transition-colors"
                  >
                    <span>Découvrir</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4`}>
                  <span className="text-gray-600">{feature.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-caribbean-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {feature.description}
                </p>

                <Link 
                  to={feature.path}
                  className="inline-flex items-center text-sm font-medium text-caribbean-600 hover:text-caribbean-700 transition-colors"
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Tools Section */}
      {user && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Outils de 
                <span className="bg-caribbean-gradient bg-clip-text text-transparent"> Trading </span>
                Avancés
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Maximisez vos gains avec nos outils de trading automatisés et notre technologie blockchain
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bot Status */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <BotStatus />
              </motion.div>

              {/* Swap Module */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <SwapModule />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-caribbean-gradient rounded-3xl p-8 md:p-12 text-white text-center"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à Rejoindre la Révolution ?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui profitent déjà de notre écosystème complet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/zendrop"
                  className="inline-flex items-center space-x-3 bg-white text-caribbean-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Store className="w-5 h-5" />
                  <span>Découvrir Zendrop</span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {user ? (
                  <Link
                    to="/trading"
                    className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span>Commencer le Trading</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span>Créer un Compte</span>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;