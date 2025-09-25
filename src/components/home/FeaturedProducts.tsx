import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Eye,
  TrendingUp,
  Zap,
  Award,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'Tous les Produits', icon: <Award className="w-4 h-4" /> },
    { id: 'local', name: 'Produits Locaux', icon: <MapPin className="w-4 h-4" /> },
    { id: 'trending', name: 'Tendances', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'crypto', name: 'Crypto Rewards', icon: <Zap className="w-4 h-4" /> },
  ];

  const products = [
    {
      id: 1,
      name: 'Rhum Agricole Premium',
      price: 45.99,
      originalPrice: 59.99,
      image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'local',
      rating: 4.8,
      reviews: 124,
      badge: 'Produit Local',
      badgeColor: 'bg-palm-500',
      location: 'Martinique',
      cryptoReward: 2.5,
      discount: 23,
    },
    {
      id: 2,
      name: 'Épices Créoles Bio',
      price: 18.50,
      image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'trending',
      rating: 4.9,
      reviews: 89,
      badge: 'Tendance',
      badgeColor: 'bg-coral-500',
      location: 'Guadeloupe',
      cryptoReward: 1.2,
    },
    {
      id: 3,
      name: 'Artisanat Bambou',
      price: 32.00,
      image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'local',
      rating: 4.7,
      reviews: 67,
      badge: 'Éco-responsable',
      badgeColor: 'bg-palm-600',
      location: 'Dominique',
      cryptoReward: 1.8,
    },
    {
      id: 4,
      name: 'Café Blue Mountain',
      price: 28.99,
      originalPrice: 35.99,
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'crypto',
      rating: 4.9,
      reviews: 156,
      badge: 'Crypto Boost',
      badgeColor: 'bg-ocean-500',
      location: 'Jamaïque',
      cryptoReward: 5.0,
      discount: 19,
    },
    {
      id: 5,
      name: 'Bijoux Corail',
      price: 89.99,
      image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'trending',
      rating: 4.8,
      reviews: 203,
      badge: 'Artisan',
      badgeColor: 'bg-sunset-500',
      location: 'Barbade',
      cryptoReward: 4.5,
    },
    {
      id: 6,
      name: 'Huile de Coco Vierge',
      price: 15.99,
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'local',
      rating: 4.6,
      reviews: 78,
      badge: 'Bio',
      badgeColor: 'bg-palm-500',
      location: 'Sainte-Lucie',
      cryptoReward: 0.8,
    },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-caribbean-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-caribbean-100 rounded-full px-4 py-2 mb-6">
            <Award className="w-5 h-5 text-caribbean-600" />
            <span className="text-caribbean-600 font-semibold">Produits Vedettes</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Découvrez les 
            <span className="bg-caribbean-gradient bg-clip-text text-transparent"> Trésors </span>
            des Antilles
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Des produits authentiques, des artisans locaux et des récompenses crypto 
            pour chaque achat. Explorez le meilleur de la culture caribéenne.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-caribbean-gradient text-white shadow-caribbean'
                  : 'bg-white text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600 shadow-sm'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <span className={`${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                      {product.badge}
                    </span>
                    {product.discount && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-caribbean-600 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Crypto Reward */}
                  <div className="absolute bottom-4 left-4 bg-ocean-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>+{product.cryptoReward} IKC</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Location */}
                  <div className="flex items-center space-x-1 text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{product.location}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-caribbean-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} avis)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        €{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          €{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-caribbean-gradient text-white py-3 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:shadow-caribbean transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Ajouter au Panier</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/boutique"
              className="inline-flex items-center space-x-3 bg-white text-caribbean-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl border-2 border-caribbean-200 hover:border-caribbean-300 transition-all duration-300"
            >
              <span>Voir Tous les Produits</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Eye className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;