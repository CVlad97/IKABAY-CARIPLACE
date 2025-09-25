import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Play, 
  Clock, 
  Users, 
  Star,
  Award,
  BookOpen,
  Video,
  FileText,
  CheckCircle,
  TrendingUp,
  Target,
  Zap,
  Download,
  Search,
  Filter
} from 'lucide-react';

const FormationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = 'Formation - IKABAY CARAÏBEEN';
  }, []);

  const categories = [
    { id: 'all', name: 'Toutes les Formations', count: 24 },
    { id: 'trading', name: 'Trading & Crypto', count: 8 },
    { id: 'business', name: 'Business & Entrepreneuriat', count: 6 },
    { id: 'tech', name: 'Technologie', count: 5 },
    { id: 'culture', name: 'Culture Caribéenne', count: 3 },
    { id: 'langues', name: 'Langues', count: 2 },
  ];

  const levels = [
    { id: 'all', name: 'Tous Niveaux' },
    { id: 'debutant', name: 'Débutant' },
    { id: 'intermediaire', name: 'Intermédiaire' },
    { id: 'avance', name: 'Avancé' },
    { id: 'expert', name: 'Expert' },
  ];

  const courses = [
    {
      id: '1',
      title: 'Trading Automatisé avec IKABAY',
      description: 'Maîtrisez les bots de trading et les stratégies d\'investissement automatisées',
      instructor: 'Marie Dubois',
      instructorAvatar: '👩🏽‍💼',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'trading',
      level: 'intermediaire',
      duration: '6 heures',
      lessons: 24,
      students: 1247,
      rating: 4.9,
      reviews: 156,
      price: 149,
      originalPrice: 199,
      featured: true,
      bestseller: true,
      completion: 0,
      skills: ['Bot Trading', 'Analyse Technique', 'Gestion des Risques', 'Crypto-monnaies'],
      preview: 'https://example.com/preview1'
    },
    {
      id: '2',
      title: 'Créer sa Startup dans les Antilles',
      description: 'Guide complet pour lancer et développer son entreprise dans l\'écosystème caribéen',
      instructor: 'Jean-Claude Martin',
      instructorAvatar: '👨🏾‍💼',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'business',
      level: 'debutant',
      duration: '8 heures',
      lessons: 32,
      students: 892,
      rating: 4.7,
      reviews: 89,
      price: 99,
      featured: true,
      bestseller: false,
      completion: 0,
      skills: ['Business Plan', 'Financement', 'Marketing Local', 'Réglementation'],
      preview: 'https://example.com/preview2'
    },
    {
      id: '3',
      title: 'Développement Web Moderne',
      description: 'React, Node.js et les technologies web pour créer des applications modernes',
      instructor: 'Sophie Leblanc',
      instructorAvatar: '👩🏻‍💻',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'tech',
      level: 'intermediaire',
      duration: '12 heures',
      lessons: 48,
      students: 634,
      rating: 4.8,
      reviews: 67,
      price: 179,
      featured: false,
      bestseller: true,
      completion: 0,
      skills: ['React', 'Node.js', 'MongoDB', 'API REST'],
      preview: 'https://example.com/preview3'
    },
    {
      id: '4',
      title: 'Histoire et Culture des Antilles',
      description: 'Découvrez le riche patrimoine culturel et historique des îles caribéennes',
      instructor: 'Dr. Patricia Green',
      instructorAvatar: '👩🏾‍🏫',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'culture',
      level: 'debutant',
      duration: '4 heures',
      lessons: 16,
      students: 456,
      rating: 4.6,
      reviews: 42,
      price: 59,
      featured: false,
      bestseller: false,
      completion: 0,
      skills: ['Histoire', 'Traditions', 'Art', 'Musique'],
      preview: 'https://example.com/preview4'
    },
    {
      id: '5',
      title: 'Analyse Technique Avancée',
      description: 'Techniques professionnelles d\'analyse des marchés financiers',
      instructor: 'Marcus Johnson',
      instructorAvatar: '👨🏿‍💼',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'trading',
      level: 'avance',
      duration: '10 heures',
      lessons: 40,
      students: 289,
      rating: 4.9,
      reviews: 34,
      price: 249,
      featured: false,
      bestseller: false,
      completion: 0,
      skills: ['Chartisme', 'Indicateurs', 'Fibonacci', 'Elliott Wave'],
      preview: 'https://example.com/preview5'
    },
    {
      id: '6',
      title: 'Créole pour Débutants',
      description: 'Apprenez les bases du créole antillais avec des méthodes interactives',
      instructor: 'Lucie Moreau',
      instructorAvatar: '👩🏽‍🏫',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'langues',
      level: 'debutant',
      duration: '5 heures',
      lessons: 20,
      students: 723,
      rating: 4.5,
      reviews: 78,
      price: 79,
      featured: false,
      bestseller: false,
      completion: 0,
      skills: ['Vocabulaire', 'Grammaire', 'Prononciation', 'Conversation'],
      preview: 'https://example.com/preview6'
    },
  ];

  const myProgress = [
    { courseId: '1', progress: 65, lastAccessed: '2024-01-15' },
    { courseId: '2', progress: 30, lastAccessed: '2024-01-10' },
    { courseId: '4', progress: 100, lastAccessed: '2024-01-05' },
  ];

  const achievements = [
    { id: '1', name: 'Premier Cours', description: 'Terminer votre premier cours', icon: '🎓', unlocked: true },
    { id: '2', name: 'Trader Débutant', description: 'Compléter un cours de trading', icon: '📈', unlocked: true },
    { id: '3', name: 'Étudiant Assidu', description: 'Étudier 10 heures', icon: '📚', unlocked: false },
    { id: '4', name: 'Expert Caribéen', description: 'Terminer tous les cours de culture', icon: '🏆', unlocked: false },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const featuredCourses = filteredCourses.filter(course => course.featured);
  const regularCourses = filteredCourses.filter(course => !course.featured);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'debutant': return 'bg-green-100 text-green-600';
      case 'intermediaire': return 'bg-yellow-100 text-yellow-600';
      case 'avance': return 'bg-orange-100 text-orange-600';
      case 'expert': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getCourseProgress = (courseId: string) => {
    const progress = myProgress.find(p => p.courseId === courseId);
    return progress ? progress.progress : 0;
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
              Formation & Éducation
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Développez vos compétences avec nos formations expertes. 
              Trading, business, technologie et culture caribéenne.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une formation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Learning Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-2xl font-bold">24</span>
                </div>
                <p className="text-sm opacity-90">Formations</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-bold">3.2K</span>
                </div>
                <p className="text-sm opacity-90">Étudiants</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Award className="w-5 h-5" />
                  <span className="text-2xl font-bold">156</span>
                </div>
                <p className="text-sm opacity-90">Certificats</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="w-5 h-5" />
                  <span className="text-2xl font-bold">4.8</span>
                </div>
                <p className="text-sm opacity-90">Note Moyenne</p>
              </div>
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
            className="lg:w-80 flex-shrink-0 space-y-6"
          >
            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-caribbean-600" />
                Filtres
              </h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Catégories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-300 text-sm ${
                        selectedCategory === category.id
                          ? 'bg-caribbean-100 text-caribbean-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Niveau</h4>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                >
                  {levels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* My Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Mon Progrès
              </h3>
              <div className="space-y-4">
                {myProgress.map((progress) => {
                  const course = courses.find(c => c.id === progress.courseId);
                  if (!course) return null;
                  
                  return (
                    <div key={progress.courseId} className="p-3 bg-gray-50 rounded-xl">
                      <h4 className="font-medium text-gray-900 mb-2">{course.title}</h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{progress.progress}% complété</span>
                        {progress.progress === 100 && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-caribbean-gradient h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Succès
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-xl border ${
                      achievement.unlocked
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Courses */}
            {featuredCourses.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-500" />
                  Formations Recommandées
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <div className="relative">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex space-x-2">
                          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            Recommandé
                          </span>
                          {course.bestseller && (
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                              Best-seller
                            </span>
                          )}
                        </div>

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-caribbean-600 hover:bg-white transition-colors"
                          >
                            <Play className="w-8 h-8 ml-1" />
                          </motion.button>
                        </div>

                        {/* Progress Bar */}
                        {getCourseProgress(course.id) > 0 && (
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full h-2">
                              <div 
                                className="bg-white h-2 rounded-full transition-all duration-500"
                                style={{ width: `${getCourseProgress(course.id)}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{course.rating}</span>
                            <span className="text-sm text-gray-500">({course.reviews})</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-caribbean-600 transition-colors">
                          {course.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Video className="w-4 h-4" />
                            <span>{course.lessons} leçons</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{course.students} étudiants</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gray-900">€{course.price}</span>
                            {course.originalPrice && (
                              <span className="text-lg text-gray-500 line-through">€{course.originalPrice}</span>
                            )}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-caribbean-gradient text-white px-6 py-2 rounded-xl font-medium hover:shadow-caribbean transition-all duration-300"
                          >
                            {getCourseProgress(course.id) > 0 ? 'Continuer' : 'Commencer'}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* All Courses */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Toutes les Formations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {regularCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {course.bestseller && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            Best-seller
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-caribbean-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Play className="w-6 h-6 ml-1" />
                        </motion.button>
                      </div>

                      {getCourseProgress(course.id) > 0 && (
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full h-1.5">
                            <div 
                              className="bg-white h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${getCourseProgress(course.id)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs">{course.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-caribbean-600 transition-colors line-clamp-2">
                        {course.title}
                      </h3>

                      <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Video className="w-3 h-3" />
                          <span>{course.lessons}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span className="text-lg font-bold text-gray-900">€{course.price}</span>
                          {course.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">€{course.originalPrice}</span>
                          )}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-caribbean-gradient text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-caribbean transition-all duration-300"
                        >
                          {getCourseProgress(course.id) > 0 ? 'Continuer' : 'Voir'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
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
                  Charger Plus de Formations
                </motion.button>
              </motion.div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationPage;