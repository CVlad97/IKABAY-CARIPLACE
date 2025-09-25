import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Newspaper, 
  Calendar, 
  User, 
  Eye, 
  Share2, 
  Bookmark,
  TrendingUp,
  MapPin,
  Clock,
  Search,
  Filter
} from 'lucide-react';

const ActualitesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  useEffect(() => {
    document.title = 'Actualités - IKABAY CARAÏBEEN';
  }, []);

  const categories = [
    { id: 'all', name: 'Toutes les Actualités', count: 45 },
    { id: 'economie', name: 'Économie', count: 12 },
    { id: 'culture', name: 'Culture', count: 8 },
    { id: 'politique', name: 'Politique', count: 7 },
    { id: 'sport', name: 'Sport', count: 6 },
    { id: 'environnement', name: 'Environnement', count: 5 },
    { id: 'technologie', name: 'Technologie', count: 4 },
    { id: 'tourisme', name: 'Tourisme', count: 3 },
  ];

  const articles = [
    {
      id: '1',
      title: 'La Martinique lance sa première monnaie numérique locale',
      excerpt: 'Une initiative révolutionnaire pour dynamiser l\'économie locale et faciliter les échanges entre les entreprises caribéennes.',
      content: 'La Martinique devient pionnière dans l\'adoption des cryptomonnaies locales...',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'economie',
      author: 'Marie Dubois',
      location: 'Fort-de-France, Martinique',
      publishedAt: '2024-01-15T10:30:00Z',
      readTime: 5,
      views: 1250,
      trending: true,
      featured: true
    },
    {
      id: '2',
      title: 'Festival de Jazz de Sainte-Lucie : Une édition exceptionnelle',
      excerpt: 'Les plus grands noms du jazz international se donnent rendez-vous pour célébrer la musique caribéenne.',
      content: 'Le festival annuel de jazz de Sainte-Lucie promet une programmation exceptionnelle...',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'culture',
      author: 'Jean-Claude Martin',
      location: 'Castries, Sainte-Lucie',
      publishedAt: '2024-01-14T15:45:00Z',
      readTime: 3,
      views: 890,
      trending: false,
      featured: true
    },
    {
      id: '3',
      title: 'Nouvelle route commerciale entre la Guadeloupe et la Dominique',
      excerpt: 'Un accord historique facilite les échanges commerciaux et renforce les liens économiques régionaux.',
      content: 'Les gouvernements de Guadeloupe et de Dominique signent un accord...',
      image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'economie',
      author: 'Sophie Leblanc',
      location: 'Pointe-à-Pitre, Guadeloupe',
      publishedAt: '2024-01-13T09:20:00Z',
      readTime: 4,
      views: 675,
      trending: true,
      featured: false
    },
    {
      id: '4',
      title: 'Protection des récifs coralliens : Initiative régionale',
      excerpt: 'Les îles des Caraïbes s\'unissent pour préserver leur patrimoine naturel exceptionnel.',
      content: 'Une coalition de pays caribéens lance un programme ambitieux...',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'environnement',
      author: 'Dr. Patricia Green',
      location: 'Bridgetown, Barbade',
      publishedAt: '2024-01-12T14:10:00Z',
      readTime: 6,
      views: 543,
      trending: false,
      featured: false
    },
    {
      id: '5',
      title: 'Championnat de Cricket des Antilles : Résultats et classements',
      excerpt: 'La Jamaïque prend la tête du championnat après une victoire éclatante contre Trinidad.',
      content: 'Le championnat de cricket des Antilles bat son plein...',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'sport',
      author: 'Marcus Johnson',
      location: 'Kingston, Jamaïque',
      publishedAt: '2024-01-11T18:30:00Z',
      readTime: 2,
      views: 432,
      trending: false,
      featured: false
    },
    {
      id: '6',
      title: 'Innovation technologique : Startup caribéenne primée',
      excerpt: 'Une jeune entreprise de la Barbade révolutionne l\'agriculture avec l\'IA.',
      content: 'AgriTech Caribbean remporte le prix de l\'innovation...',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'technologie',
      author: 'David Williams',
      location: 'Bridgetown, Barbade',
      publishedAt: '2024-01-10T11:15:00Z',
      readTime: 4,
      views: 321,
      trending: true,
      featured: false
    },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const toggleBookmark = (articleId: string) => {
    setBookmarked(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a moins d\'une heure';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
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
              Actualités des Antilles
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Restez informé des dernières nouvelles économiques, culturelles et sociales 
              de toute la région caribéenne.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans les actualités..."
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
          {/* Sidebar */}
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

              {/* Trending Topics */}
              <div className="mt-8">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                  Tendances
                </h4>
                <div className="space-y-3">
                  {articles.filter(a => a.trending).slice(0, 3).map((article) => (
                    <div key={article.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <h5 className="font-medium text-gray-900 text-sm mb-1">{article.title}</h5>
                      <div className="flex items-center text-xs text-orange-600">
                        <Eye className="w-3 h-3 mr-1" />
                        <span>{article.views} vues</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Articles */}
            {featuredArticles.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">À la Une</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredArticles.map((article, index) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <div className="relative">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex space-x-2">
                          <span className="bg-caribbean-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            À la Une
                          </span>
                          {article.trending && (
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Tendance
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleBookmark(article.id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
                              bookmarked.includes(article.id)
                                ? 'bg-yellow-500 text-white'
                                : 'bg-white/90 text-gray-700 hover:text-yellow-500'
                            }`}
                          >
                            <Bookmark className="w-5 h-5" fill={bookmarked.includes(article.id) ? 'currentColor' : 'none'} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-caribbean-600 transition-colors"
                          >
                            <Share2 className="w-5 h-5" />
                          </motion.button>
                        </div>

                        {/* Category */}
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                            {categories.find(c => c.id === article.category)?.name}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{article.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{getTimeAgo(article.publishedAt)}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-caribbean-600 transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <User className="w-4 h-4" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Eye className="w-4 h-4" />
                              <span>{article.views}</span>
                            </div>
                          </div>
                          <span className="text-sm text-caribbean-600 font-medium">
                            {article.readTime} min de lecture
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Regular Articles */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dernières Actualités</h2>
              <div className="space-y-6">
                {regularArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex"
                  >
                    <div className="w-48 flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6 flex-1">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span className="bg-caribbean-100 text-caribbean-600 px-2 py-1 rounded-full text-xs font-medium">
                          {categories.find(c => c.id === article.category)?.name}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                        {article.trending && (
                          <div className="flex items-center space-x-1 text-orange-600">
                            <TrendingUp className="w-4 h-4" />
                            <span className="font-medium">Tendance</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-caribbean-600 transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{article.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleBookmark(article.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              bookmarked.includes(article.id)
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                            }`}
                          >
                            <Bookmark className="w-4 h-4" fill={bookmarked.includes(article.id) ? 'currentColor' : 'none'} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg text-gray-400 hover:text-caribbean-600 hover:bg-caribbean-50 transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Load More */}
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
                  Charger Plus d'Articles
                </motion.button>
              </motion.div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualitesPage;