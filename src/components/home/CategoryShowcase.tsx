import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ChevronRight, 
  Star, 
  TrendingUp,
  Eye
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

const CategoryShowcase = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'electronics',
      name: 'Électronique',
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800',
      productCount: 156
    },
    {
      id: 'fashion',
      name: 'Mode',
      image: 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=800',
      productCount: 124
    },
    {
      id: 'home',
      name: 'Maison',
      image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
      productCount: 98
    },
    {
      id: 'beauty',
      name: 'Beauté',
      image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=800',
      productCount: 87
    },
    {
      id: 'sports',
      name: 'Sports',
      image: 'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=800',
      productCount: 76
    },
    {
      id: 'toys',
      name: 'Jouets',
      image: 'https://images.pexels.com/photos/163696/toy-car-toy-box-mini-163696.jpeg?auto=compress&cs=tinysrgb&w=800',
      productCount: 65
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
          <div className="inline-flex items-center space-x-2 bg-caribbean-100 rounded-full px-4 py-2 mb-6">
            <ShoppingBag className="w-5 h-5 text-caribbean-600" />
            <span className="text-caribbean-600 font-semibold">Catégories</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explorez Notre 
            <span className="bg-caribbean-gradient bg-clip-text text-transparent"> Boutique </span>
            par Catégorie
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Découvrez notre vaste sélection de produits de qualité organisés par catégories
            pour faciliter votre shopping.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredCategory(category.id)}
              onHoverEnd={() => setHoveredCategory(null)}
              className="group relative overflow-hidden rounded-3xl shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
              
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-white/80 mb-4">{category.productCount} produits</p>
                
                <Link 
                  to={`/boutique?category=${category.id}`}
                  className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors w-max"
                >
                  <span>Explorer</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/boutique"
            className="inline-flex items-center space-x-2 bg-caribbean-gradient text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>Voir Toutes les Catégories</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryShowcase;