import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  TrendingUp, 
  Eye,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: number;
  badge?: string;
  badgeColor?: string;
}

const TopProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'electronics', name: 'Électronique' },
    { id: 'fashion', name: 'Mode' },
    { id: 'home', name: 'Maison' },
    { id: 'beauty', name: 'Beauté' }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Écouteurs Bluetooth Sans Fil',
      price: 59.99,
      originalPrice: 79.99,
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'electronics',
      rating: 4.7,
      reviews: 128,
      discount: 25,
      badge: 'Best-seller',
      badgeColor: 'bg-yellow-500'
    },
    {
      id: '2',
      name: 'Montre Connectée Sport',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'electronics',
      rating: 4.5,
      reviews: 94,
      discount: 20,
      badge: 'Populaire',
      badgeColor: 'bg-blue-500'
    },
    {
      id: '3',
      name: 'Sac à Dos Antivol USB',
      price: 44.99,
      originalPrice: 59.99,
      image: 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'fashion',
      rating: 4.8,
      reviews: 76,
      discount: 25
    },
    {
      id: '4',
      name: 'Lampe LED Pliable',
      price: 34.99,
      originalPrice: 49.99,
      image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'home',
      rating: 4.6,
      reviews: 52,
      discount: 30,
      badge: 'Nouveau',
      badgeColor: 'bg-green-500'
    },
    {
      id: '5',
      name: 'Diffuseur d\'Huiles Essentielles',
      price: 29.99,
      originalPrice: 39.99,
      image: 'https://images.pexels.com/photos/4046718/pexels-photo-4046718.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'home',
      rating: 4.4,
      reviews: 38,
      discount: 25
    },
    {
      id: '6',
      name: 'Organisateur de Maquillage',
      price: 32.99,
      originalPrice: 44.99,
      image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'beauty',
      rating: 4.3,
      reviews: 45,
      discount: 27
    },
    {
      id: '7',
      name: 'Bouteille Isotherme',
      price: 27.99,
      originalPrice: 34.99,
      image: 'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'sports',
      rating: 4.7,
      reviews: 67,
      discount: 20
    },
    {
      id: '8',
      name: 'Coque de Téléphone Magnétique',
      price: 24.99,
      originalPrice: 29.99,
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'electronics',
      rating: 4.2,
      reviews: 83,
      discount: 17
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-yellow-100 rounded-full px-4 py-2 mb-6">
            <Award className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-600 font-semibold">Top Produits</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos Produits 
            <span className="bg-caribbean-gradient bg-clip-text text-transparent"> Les Plus Populaires </span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Découvrez notre sélection des produits les plus vendus et les mieux notés par nos clients.
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
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
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
                  {product.badge && (
                    <span className={`${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                      {product.badge}
                    </span>
                  )}
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
                    onClick={() => toggleFavorite(product.id)}
                    className={`w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 transition-colors ${
                      favorites.includes(product.id) ? 'text-red-500' : ''
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-caribbean-600 transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Trending */}
                <div className="absolute bottom-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Tendance</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
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

export default TopProducts;