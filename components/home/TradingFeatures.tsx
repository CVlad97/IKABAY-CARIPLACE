"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  TrendingUp, 
  Bot, 
  Zap, 
  ArrowRight,
  BarChart3,
  DollarSign
} from "lucide-react";
import { useSupabase } from "@/lib/supabase-provider";

const TradingFeatures = () => {
  const { user } = useSupabase();

  const tradingFeatures = [
    {
      title: "Bot Trading MEXC",
      description: "Notre bot de trading automatisé sur MEXC génère des profits constants avec une stratégie éprouvée.",
      icon: <Bot className="w-12 h-12 text-white" />,
      stats: "+24.7% mensuel",
      color: "from-blue-500 to-purple-500",
      path: "/bot-status"
    },
    {
      title: "Swap Automatique",
      description: "Échangez automatiquement vos cryptos via Jupiter API avec des frais réduits et une exécution rapide.",
      icon: <Zap className="w-12 h-12 text-white" />,
      stats: "10% de commission",
      color: "from-green-500 to-teal-500",
      path: "/swap"
    },
    {
      title: "Dashboard Analytique",
      description: "Suivez vos performances, revenus et statistiques en temps réel avec notre dashboard interactif.",
      icon: <BarChart3 className="w-12 h-12 text-white" />,
      stats: "Données en temps réel",
      color: "from-orange-500 to-red-500",
      path: "/dashboard"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 font-semibold">Trading Automatisé</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Maximisez vos 
            <span className="bg-caribbean-gradient bg-clip-text text-transparent"> Revenus </span>
            Crypto
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Notre plateforme combine des outils de trading avancés pour générer des revenus passifs
            sans intervention humaine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tradingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <div className={`bg-gradient-to-r ${feature.color} p-6`}>
                <div className="flex justify-between items-start">
                  {feature.icon}
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {feature.stats}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <Link href={user ? feature.path : "/login"}>
                  <button className="flex items-center space-x-2 text-caribbean-600 font-medium hover:text-caribbean-700 transition-colors group">
                    <span>En savoir plus</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-caribbean-gradient rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Revenus Automatisés
              </h3>
              <p className="text-white/90 text-lg mb-6">
                Notre système génère des revenus 24/7 sans intervention humaine grâce à nos bots de trading et swaps automatisés.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Commission de 10%</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <Bot className="w-5 h-5" />
                  <span>Bot 24/7</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <Zap className="w-5 h-5" />
                  <span>Swaps Instantanés</span>
                </div>
              </div>
              <Link href={user ? "/dashboard" : "/login"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-3 bg-white text-caribbean-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <span>Commencer Maintenant</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Trading Dashboard" 
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TradingFeatures;