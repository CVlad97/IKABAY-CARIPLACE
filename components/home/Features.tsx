"use client";

import { motion } from "framer-motion";
import { 
  Coins, 
  Shield, 
  Bot, 
  Wallet,
  Globe,
  TrendingUp,
  Zap,
  Award,
  Sparkles
} from "lucide-react";

const Features = () => {
  const mainFeatures = [
    {
      title: 'Bot Trading MEXC',
      description: 'Bot de trading automatisé avec 15% de commission sur les gains',
      icon: <Bot className="w-8 h-8" />,
      color: 'from-ocean-500 to-caribbean-500',
      bgColor: 'bg-ocean-50',
      textColor: 'text-ocean-600',
      stats: '+24.7% mensuel'
    },
    {
      title: 'Swap Automatique',
      description: 'Échanges USDT ⇄ SOL via Jupiter API en temps réel',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-palm-500 to-caribbean-500',
      bgColor: 'bg-palm-50',
      textColor: 'text-palm-600',
      stats: '10% de commission'
    },
    {
      title: 'Multi-Wallet',
      description: 'Support pour Solana et TRC20 avec connexion sécurisée',
      icon: <Wallet className="w-8 h-8" />,
      color: 'from-sunset-500 to-coral-500',
      bgColor: 'bg-sunset-50',
      textColor: 'text-sunset-600',
      stats: 'Solana & TRC20'
    },
    {
      title: 'Sécurité Renforcée',
      description: 'Protection avancée avec authentification OAuth2 et monitoring',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-coral-500 to-sunset-500',
      bgColor: 'bg-coral-50',
      textColor: 'text-coral-600',
      stats: '99.9% uptime'
    },
  ];

  const additionalFeatures = [
    { icon: <Globe className="w-6 h-6" />, title: 'API Ouverte', desc: 'Documentation interactive' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Analytics', desc: 'Suivi en temps réel' },
    { icon: <Coins className="w-6 h-6" />, title: 'Revenus Passifs', desc: 'Automatisés 24/7' },
    { icon: <Zap className="w-6 h-6" />, title: 'Performance', desc: 'Chargement ultra-rapide' },
    { icon: <Award className="w-6 h-6" />, title: 'Fiabilité', desc: 'Système redondant' },
    { icon: <Shield className="w-6 h-6" />, title: 'Sécurité', desc: 'Monitoring avancé' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-caribbean-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-coral-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-palm-50 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center space-x-2 bg-caribbean-100 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-caribbean-600" />
            <span className="text-caribbean-600 font-semibold">Fonctionnalités Avancées</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Une Plateforme 
            <span className="bg-caribbean-gradient bg-clip-text text-transparent"> Révolutionnaire </span>
            pour vos Cryptos
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Découvrez un écosystème complet qui combine trading automatisé, 
            swaps crypto et sécurité avancée dans un seul endroit.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`${feature.bgColor} ${feature.textColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-caribbean-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Stats */}
              <div className={`inline-flex items-center space-x-2 ${feature.bgColor} ${feature.textColor} px-4 py-2 rounded-full text-sm font-semibold`}>
                <TrendingUp className="w-4 h-4" />
                <span>{feature.stats}</span>
              </div>

              {/* Hover Effect */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`w-3 h-3 ${feature.textColor.replace('text-', 'bg-')} rounded-full animate-pulse`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-caribbean-50 to-ocean-50 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Et Bien Plus Encore...
            </h3>
            <p className="text-lg text-gray-600">
              Une suite complète d'outils pour une expérience utilisateur exceptionnelle
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:bg-caribbean-50">
                  <span className="text-caribbean-600 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;