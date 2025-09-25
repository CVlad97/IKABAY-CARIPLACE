import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Eye, 
  TrendingUp, 
  Zap, 
  Filter, 
  Search,
  ArrowUpDown,
  Star,
  DollarSign,
  Tag,
  Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  supplier: string;
  shippingTime: string;
  profit: number;
}

interface ZendropProductListProps {
  className?: string;
  marginPercentage?: number;
}

const ZendropProductList: React.FC<ZendropProductListProps> = ({ 
  className = '',
  marginPercentage = 30 // Default margin percentage
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'Tous les Produits' },
    { id: 'electronics', name: 'Électronique' },
    { id: 'fashion', name: 'Mode' },
    { id: 'home', name: 'Maison' },
    { id: 'beauty', name: 'Beauté' },
    { id: 'sports', name: 'Sports' },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Popularité' },
    { id: 'price-low', name: 'Prix: Croissant' },
    { id: 'price-high', name: 'Prix: Décroissant' },
    { id: 'profit', name: 'Marge: Décroissant' },
    { id: 'newest', name: 'Nouveautés' },
  ];

  // Calculate the selling price with margin
  const calculateSellingPrice = (basePrice: number) => {
    const margin = basePrice * (marginPercentage / 100);
    return basePrice + margin;
  };

  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would be a fetch to your API
        // const response = await fetch('/api/zendrop');
        // const data = await response.json();
        
        // For demo purposes, we'll use mock data
        const mockData: Product[] = [
          {
            id: '1',
            name: 'Écouteurs Bluetooth Sans Fil',
            description: 'Écouteurs sans fil avec réduction de bruit active et autonomie de 24h',
            price: 39.99,
            originalPrice: 59.99,
            image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'electronics',
            rating: 4.7,
            reviews: 128,
            inStock: true,
            supplier: 'ZendropSupplier',
            shippingTime: '7-14 jours',
            profit: 12.00
          },
          {
            id: '2',
            name: 'Montre Connectée Sport',
            description: 'Montre intelligente avec suivi fitness, notifications et étanchéité',
            price: 49.99,
            originalPrice: 79.99,
            image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'electronics',
            rating: 4.5,
            reviews: 94,
            inStock: true,
            supplier: 'ZendropSupplier',
            shippingTime: '7-14 jours',
            profit: 15.00
          },
          {
            id: '3',
            name: 'Sac à Dos Antivol USB',
            description: 'Sac à dos avec port de chargement USB, compartiment pour ordinateur portable et protection antivol',
            price: 29.99,
            originalPrice: 44.99,
            image: 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'fashion',
            rating: 4.8,
            reviews: 76,
            inStock: true,
            supplier: 'ZendropSupplier',
            shippingTime: '10-15 jours',
            profit: 9.00
          },
          {
            id: '4',
            name: 'Lampe LED Pliable',
            description: 'Lampe de bureau LED avec 3 modes d\'éclairage et port de chargement USB',
            price: 24.99,
            originalPrice: 34.99,
            image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'home',
            rating: 4.6,
            reviews: 52,
            inStock: true,
            supplier: 'ZendropSupplier',
            shippingTime: '7-14 jours',
            profit: 7.50
          },
          {
            id: '5',
            name: 'Diffuseur d\'Huiles Essentielles',
            description: 'Diffuseur d\'arômes avec 7 couleurs LED et arrêt automatique',
            price: 19.99,
            originalPrice: 29.99,
            image: 'https://images.pexels.com/photos/4046718/pexels-photo-4046718.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'home',
            rating: 4.4,
            reviews: 38,
            inStock: true,
            supplier: 'ZendropSupplier',
            shippingTime: '7-14 jours',
            profit: 6.00
          },
          {
            id: '6',
            name: 'Organisateur de Maquillage',
            description: 'Boîte de rangement pour cosmétiques avec tiroirs et compartiments',
            price: 22.99,
            originalPrice: 32.99,
            image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'beauty',
            rating: 4.3,
            reviews: 45,
            inStock: true,
            supplier: 'ZendropSupplier',
            shippingTime: '7-14 jours',
            profit: 6.90
          },
          {
            id: '7',
            name: 'Bouteille Isotherme',
            description: 'Bouteille en acier inoxydable qui maintient les boissons chaudes ou froides',
            price: 18.99,
            originalPrice: 27.99,
            image: 'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'sports',
            rating: 4.7,
            reviews: 67,
            inStock: true,
            supplier: 'ZendropSupplier',
            shippingTime: '7-14 jours',
            profit: 5.70
          },
          {
            id: '8',
            name: 'Coque de Téléphone Magnétique',
            description: 'Coque de protection avec support magnétique pour voiture',
            price: 14.99,
            originalPrice: 24.99,
            image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'electronics',
            rating: 4.2,
            reviews: 83,
            inStock: true,
            supplier: 'ZendropSupplier',
            shippingTime: '7-14 jours',
            profit: 4.50
          }
        ];

        // Apply selling price with margin to each product
        const productsWithMargin = mockData.map(product => ({
          ...product,
          sellingPrice: calculateSellingPrice(product.price)
        }));

        setProducts(productsWithMargin);
        setFilteredProducts(productsWithMargin);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des produits');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [marginPercentage]);

  useEffect(() => {
    // Filter and sort products when dependencies change
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.sellingPrice || a.price) - (b.sellingPrice || b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.sellingPrice || b.price) - (a.sellingPrice || a.price));
        break;
      case 'profit':
        result.sort((a, b) => b.profit - a.profit);
        break;
      case 'newest':
        // In a real app, you'd sort by date
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle purchase - in a real app, this would add to cart or checkout
  const handlePurchase = (product: any) => {
    // Calculate profit
    const profit = product.sellingPrice - product.price;
    
    // Log the purchase and profit (in a real app, this would be sent to your backend)
    console.log('Purchase:', {
      productId: product.id,
      productName: product.name,
      basePrice: product.price,
      sellingPrice: product.sellingPrice,
      profit: profit,
      timestamp: new Date().toISOString()
    });
    
    // In a real implementation, you would:
    // 1. Add the item to cart
    // 2. When checkout completes, send the profit to your wallet/account
    // 3. Forward the order to Zendrop
    
    alert(`Produit ajouté au panier: ${product.name}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-caribbean-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
        <p>{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des produits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500 bg-white"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500 bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun produit trouvé</h3>
          <p className="text-gray-600 mb-4">Essayez de modifier vos filtres ou votre recherche</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSortBy('popular');
            }}
            className="px-4 py-2 bg-caribbean-gradient text-white rounded-xl font-medium hover:shadow-caribbean transition-all duration-300"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
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
                  {product.originalPrice && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
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

                {/* Profit Indicator */}
                <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{formatPrice(product.profit)}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Supplier */}
                <div className="flex items-center space-x-1 text-gray-500 text-sm mb-2">
                  <Truck className="w-4 h-4" />
                  <span>{product.supplier} • {product.shippingTime}</span>
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
                      {formatPrice(product.sellingPrice || calculateSellingPrice(product.price))}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(calculateSellingPrice(product.originalPrice))}
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
                  onClick={() => handlePurchase(product)}
                  className="w-full bg-caribbean-gradient text-white py-3 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:shadow-caribbean transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Ajouter au Panier</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Load More Button */}
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
  );
};

export default ZendropProductList;