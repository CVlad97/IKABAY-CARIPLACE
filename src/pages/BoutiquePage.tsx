import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  Heart, 
  ShoppingCart,
  MapPin,
  Zap,
  TrendingUp,
  Eye,
  Grid,
  List,
  ChevronDown,
  Tag,
  Truck
} from 'lucide-react';

const BoutiquePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    document.title = 'Boutique - IKABAY';
  }, []);

  const categories = [
    { id: 'all', name: 'Tous les Produits', count: 156 },
    { id: 'electronics', name: 'Électronique', count: 45 },
    { id: 'fashion', name: 'Mode & Accessoires', count: 38 },
    { id: 'home', name: 'Maison & Déco', count: 29 },
    { id: 'beauty', name: 'Beauté & Bien-être', count: 22 },
    { id: 'sports', name: 'Sports & Loisirs', count: 22 },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Popularité' },
    { id: 'price-low', name: 'Prix: Croissant' },
    { id: 'price-high', name: 'Prix: Décroissant' },
    { id: 'newest', name: 'Nouveautés' },
    { id: 'rating', name: 'Meilleures notes' },
  ];

  const products = [
    {
      id: '1',
      name: 'Écouteurs Bluetooth Sans Fil',
      price: 59.99,
      originalPrice: 79.99,
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'electronics',
      rating: 4.7,
      reviews: 128,
      location: 'France',
      seller: 'TechStore',
      discount: 25,
      inStock: true,
      description: 'Écouteurs sans fil avec réduction de bruit active et autonomie de 24h',
      shippingTime: '3-5 jours'
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
      location: 'Allemagne',
      seller: 'SportTech',
      discount: 20,
      inStock: true,
      description: 'Montre intelligente avec suivi fitness, notifications et étanchéité',
      shippingTime: '3-5 jours'
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
      location: 'Italie',
      seller: 'BagWorld',
      discount: 25,
      inStock: true,
      description: 'Sac à dos avec port de chargement USB, compartiment pour ordinateur portable et protection antivol',
      shippingTime: '4-7 jours'
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
      location: 'Espagne',
      seller: 'HomeDecor',
      discount: 30,
      inStock: true,
      description: 'Lampe de bureau LED avec 3 modes d\'éclairage et port de chargement USB',
      shippingTime: '3-5 jours'
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
      location: 'France',
      seller: 'WellnessStore',
      discount: 25,
      inStock: true,
      description: 'Diffuseur d\'arômes avec 7 couleurs LED et arrêt automatique',
      shippingTime: '2-4 jours'
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
      location: 'Royaume-Uni',
      seller: 'BeautyBox',
      discount: 27,
      inStock: true,
      description: 'Boîte de rangement pour cosmétiques avec tiroirs et compartiments',
      shippingTime: '4-7 jours'
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
      location: 'Suisse',
      seller: 'EcoLife',
      discount: 20,
      inStock: true,
      description: 'Bouteille en acier inoxydable qui maintient les boissons chaudes ou froides',
      shippingTime: '3-6 jours'
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
      location: 'France',
      seller: 'PhoneAccessories',
      discount: 17,
      inStock: true,
      description: 'Coque de protection avec support magnétique pour voiture',
      shippingTime: '2-4 jours'
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        return (b.rating * b.reviews) - (a.rating * a.reviews);
    }
  });

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-caribbean-gradient text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Boutique IKABAY
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Découvrez notre sélection de produits de qualité avec livraison mondiale et paiement crypto.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-caribbean-600" />
                Catégories
              </h3>
              
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-caribbean-gradient text-white shadow-caribbean'
                        : 'bg-gray-50 text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Price Range */}
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Prix</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="price-all"
                      type="radio"
                      name="price"
                      defaultChecked
                      className="h-4 w-4 text-caribbean-600 focus:ring-caribbean-500"
                    />
                    <label htmlFor="price-all" className="ml-2 text-gray-700">
                      Tous les prix
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-under-25"
                      type="radio"
                      name="price"
                      className="h-4 w-4 text-caribbean-600 focus:ring-caribbean-500"
                    />
                    <label htmlFor="price-under-25" className="ml-2 text-gray-700">
                      Moins de 25€
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-25-50"
                      type="radio"
                      name="price"
                      className="h-4 w-4 text-caribbean-600 focus:ring-caribbean-500"
                    />
                    <label htmlFor="price-25-50" className="ml-2 text-gray-700">
                      25€ - 50€
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-50-100"
                      type="radio"
                      name="price"
                      className="h-4 w-4 text-caribbean-600 focus:ring-caribbean-500"
                    />
                    <label htmlFor="price-50-100" className="ml-2 text-gray-700">
                      50€ - 100€
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-over-100"
                      type="radio"
                      name="price"
                      className="h-4 w-4 text-caribbean-600 focus:ring-caribbean-500"
                    />
                    <label htmlFor="price-over-100" className="ml-2 text-gray-700">
                      Plus de 100€
                    </label>
                  </div>
                </div>
              </div>

              {/* Ratings */}
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Évaluation</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input
                        id={`rating-${rating}`}
                        type="checkbox"
                        className="h-4 w-4 text-caribbean-600 focus:ring-caribbean-500 rounded"
                      />
                      <label htmlFor={`rating-${rating}`} className="ml-2 flex items-center text-gray-700">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        <span className="ml-1">& plus</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crypto Payment Info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <h4 className="font-bold text-orange-800">Paiement Crypto</h4>
                </div>
                <p className="text-sm text-orange-700">
                  Payez avec BTC, ETH ou IKC et gagnez jusqu'à 5% de cashback !
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <span className="text-gray-600">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-caribbean-100 text-caribbean-600' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-caribbean-100 text-caribbean-600' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500 bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </motion.div>

            {/* Products Grid/List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-6'
              }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                  }`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {product.discount && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{product.discount}%
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Rupture
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(product.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
                          favorites.includes(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-gray-700 hover:text-red-500'
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
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1">
                    {/* Location & Seller */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{product.location}</span>
                      </div>
                      <span>{product.seller}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-caribbean-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Description (List view only) */}
                    {viewMode === 'list' && (
                      <p className="text-gray-600 mb-4">{product.description}</p>
                    )}

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

                    {/* Shipping */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                      <Truck className="w-4 h-4" />
                      <span>Livraison: {product.shippingTime}</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-green-600">
                        <Tag className="w-4 h-4" />
                        <span className="text-sm font-medium">En stock</span>
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

            {/* Load More */}
            {filteredProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-caribbean-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl border-2 border-caribbean-200 hover:border-caribbean-300 transition-all duration-300"
                >
                  Charger Plus de Produits
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoutiquePage;