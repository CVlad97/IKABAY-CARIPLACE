import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Store, 
  TrendingUp, 
  Truck, 
  Wallet, 
  Globe, 
  ArrowRight,
  DollarSign,
  Zap
} from 'lucide-react';

const ZendropFeature = () => {
  const features = [
    {
      icon: <Store className="w-8 h-8 text-white" />,
      title: "Dropshipping Automatisé",
      description: "Vendez des produits sans stock avec expédition directe depuis nos fournisseurs",
      color: "from-coral-500 to-sunset-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: "Marge Personnalisable",
      description: "Définissez votre propre marge et maximisez vos profits sur chaque vente",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Wallet className="w-8 h-8 text-white" />,
      title: "Paiements Automatiques",
      description: "Recevez vos profits directement sur votre wallet crypto ou compte bancaire",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Truck className="w-8 h-8 text-white" />,
      title: "Livraison Mondiale",
      description: "Expédition vers plus de 200 pays avec suivi en temps réel pour vos clients",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-coral-100 rounded-full px-4 py-2 mb-6">
            <Store className="w-5 h-5 text-coral-600" />
            <span className="text-coral-600 font-semibold">Zendrop</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Lancez votre 
            <span className="bg-caribbean-gradient bg-clip-text text-transparent"> E-commerce </span>
            sans stock
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Vendez des produits tendance sans investissement initial. Nous gérons l'inventaire, 
            l'emballage et l'expédition pendant que vous encaissez les profits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
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
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-caribbean-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {feature.description}
                </p>

                <Link 
                  to="/zendrop"
                  className="inline-flex items-center font-medium text-caribbean-600 hover:text-caribbean-700 transition-colors"
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-coral-500 to-sunset-500 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Commencez à vendre dès aujourd'hui
              </h3>
              <p className="text-white/90 text-lg mb-6">
                Rejoignez des milliers de vendeurs qui utilisent Zendrop pour générer des revenus passifs
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Marge de 30%+</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <Zap className="w-5 h-5" />
                  <span>Paiements Crypto</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <Globe className="w-5 h-5" />
                  <span>Livraison Mondiale</span>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/zendrop"
                  className="inline-flex items-center space-x-3 bg-white text-coral-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <span>Commencer Maintenant</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Zendrop E-commerce" 
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ZendropFeature;