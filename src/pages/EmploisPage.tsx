import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Search, 
  Filter,
  Building,
  Calendar,
  Users,
  TrendingUp,
  Heart,
  ExternalLink,
  Star,
  Award
} from 'lucide-react';

const EmploisPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    document.title = 'Emplois - IKABAY CARAÏBEEN';
  }, []);

  const categories = [
    { id: 'all', name: 'Tous les Emplois', count: 89 },
    { id: 'tech', name: 'Technologie', count: 23 },
    { id: 'tourisme', name: 'Tourisme & Hôtellerie', count: 18 },
    { id: 'finance', name: 'Finance & Banque', count: 12 },
    { id: 'sante', name: 'Santé', count: 10 },
    { id: 'education', name: 'Éducation', count: 8 },
    { id: 'commerce', name: 'Commerce & Vente', count: 7 },
    { id: 'agriculture', name: 'Agriculture', count: 6 },
    { id: 'transport', name: 'Transport & Logistique', count: 5 },
  ];

  const locations = [
    { id: 'all', name: 'Toutes les Îles' },
    { id: 'martinique', name: 'Martinique' },
    { id: 'guadeloupe', name: 'Guadeloupe' },
    { id: 'jamaique', name: 'Jamaïque' },
    { id: 'barbade', name: 'Barbade' },
    { id: 'trinidad', name: 'Trinidad & Tobago' },
    { id: 'sainte-lucie', name: 'Sainte-Lucie' },
    { id: 'dominique', name: 'Dominique' },
  ];

  const jobTypes = [
    { id: 'all', name: 'Tous les Types' },
    { id: 'cdi', name: 'CDI' },
    { id: 'cdd', name: 'CDD' },
    { id: 'freelance', name: 'Freelance' },
    { id: 'stage', name: 'Stage' },
    { id: 'temps-partiel', name: 'Temps Partiel' },
  ];

  const jobs = [
    {
      id: '1',
      title: 'Développeur Full Stack',
      company: 'TechCarib Solutions',
      location: 'Fort-de-France, Martinique',
      type: 'cdi',
      category: 'tech',
      salary: { min: 35000, max: 50000, currency: 'EUR' },
      description: 'Rejoignez notre équipe dynamique pour développer des solutions innovantes pour les entreprises caribéennes.',
      requirements: ['React/Node.js', '3+ ans d\'expérience', 'Anglais courant'],
      benefits: ['Télétravail possible', 'Formation continue', 'Assurance santé'],
      publishedAt: '2024-01-15T10:00:00Z',
      featured: true,
      urgent: false,
      remote: true,
      companyLogo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
      applicants: 12
    },
    {
      id: '2',
      title: 'Chef de Cuisine',
      company: 'Resort Paradise',
      location: 'Bridgetown, Barbade',
      type: 'cdi',
      category: 'tourisme',
      salary: { min: 28000, max: 40000, currency: 'USD' },
      description: 'Dirigez notre équipe culinaire dans un resort 5 étoiles et créez des expériences gastronomiques exceptionnelles.',
      requirements: ['10+ ans d\'expérience', 'Cuisine internationale', 'Management d\'équipe'],
      benefits: ['Logement fourni', 'Repas inclus', 'Congés payés'],
      publishedAt: '2024-01-14T14:30:00Z',
      featured: true,
      urgent: true,
      remote: false,
      companyLogo: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=100',
      applicants: 8
    },
    {
      id: '3',
      title: 'Analyste Financier',
      company: 'Caribbean Bank',
      location: 'Kingston, Jamaïque',
      type: 'cdi',
      category: 'finance',
      salary: { min: 32000, max: 45000, currency: 'USD' },
      description: 'Analysez les marchés financiers régionaux et conseillez nos clients institutionnels.',
      requirements: ['Master en Finance', 'CFA souhaité', 'Analyse de risque'],
      benefits: ['Bonus performance', 'Plan retraite', 'Formation CFA'],
      publishedAt: '2024-01-13T09:15:00Z',
      featured: false,
      urgent: false,
      remote: false,
      companyLogo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100',
      applicants: 15
    },
    {
      id: '4',
      title: 'Infirmier(ère) Spécialisé(e)',
      company: 'Hôpital Universitaire',
      location: 'Pointe-à-Pitre, Guadeloupe',
      type: 'cdi',
      category: 'sante',
      salary: { min: 30000, max: 38000, currency: 'EUR' },
      description: 'Rejoignez notre service de cardiologie et participez aux soins de pointe.',
      requirements: ['Diplôme d\'État', 'Spécialisation cardiologie', '2+ ans d\'expérience'],
      benefits: ['Horaires flexibles', 'Formation continue', 'Mutuelle'],
      publishedAt: '2024-01-12T16:45:00Z',
      featured: false,
      urgent: true,
      remote: false,
      companyLogo: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=100',
      applicants: 6
    },
    {
      id: '5',
      title: 'Professeur d\'Anglais',
      company: 'École Internationale',
      location: 'Castries, Sainte-Lucie',
      type: 'cdd',
      category: 'education',
      salary: { min: 25000, max: 32000, currency: 'USD' },
      description: 'Enseignez l\'anglais à des élèves de niveau secondaire dans un environnement multiculturel.',
      requirements: ['Licence en Anglais', 'CAPES ou équivalent', 'Expérience internationale'],
      benefits: ['Vacances scolaires', 'Développement professionnel', 'Environnement international'],
      publishedAt: '2024-01-11T11:20:00Z',
      featured: false,
      urgent: false,
      remote: false,
      companyLogo: 'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=100',
      applicants: 9
    },
    {
      id: '6',
      title: 'Consultant Marketing Digital',
      company: 'Digital Antilles',
      location: 'Remote - Caraïbes',
      type: 'freelance',
      category: 'tech',
      salary: { min: 400, max: 800, currency: 'EUR', period: 'jour' },
      description: 'Aidez les entreprises caribéennes à développer leur présence digitale.',
      requirements: ['Google Ads certifié', 'Social Media expert', 'Portfolio requis'],
      benefits: ['100% remote', 'Projets variés', 'Tarifs attractifs'],
      publishedAt: '2024-01-10T13:10:00Z',
      featured: false,
      urgent: false,
      remote: true,
      companyLogo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100',
      applicants: 18
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || job.location.toLowerCase().includes(selectedLocation);
    const matchesType = selectedType === 'all' || job.type === selectedType;
    return matchesSearch && matchesCategory && matchesLocation && matchesType;
  });

  const featuredJobs = filteredJobs.filter(job => job.featured);
  const regularJobs = filteredJobs.filter(job => !job.featured);

  const toggleFavorite = (jobId: string) => {
    setFavorites(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const formatSalary = (salary: any) => {
    const period = salary.period || 'an';
    if (salary.min === salary.max) {
      return `${salary.min.toLocaleString()} ${salary.currency}/${period}`;
    }
    return `${salary.min.toLocaleString()} - ${salary.max.toLocaleString()} ${salary.currency}/${period}`;
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
              Emplois dans les Antilles
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Trouvez votre prochaine opportunité professionnelle dans les îles des Caraïbes. 
              Des postes locaux aux opportunités internationales.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un emploi, entreprise, compétence..."
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

              {/* Locations */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Localisation</h4>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Types */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Type de Contrat</h4>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                >
                  {jobTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Stats */}
              <div className="p-4 bg-gradient-to-r from-caribbean-50 to-ocean-50 rounded-xl border border-caribbean-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-caribbean-600" />
                  <h4 className="font-bold text-caribbean-800">Marché de l'Emploi</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-caribbean-700">Nouveaux emplois:</span>
                    <span className="font-semibold text-caribbean-600">+15 cette semaine</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-caribbean-700">Secteur en croissance:</span>
                    <span className="font-semibold text-caribbean-600">Tech (+32%)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white rounded-2xl p-6 shadow-sm"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {filteredJobs.length} emploi{filteredJobs.length > 1 ? 's' : ''} trouvé{filteredJobs.length > 1 ? 's' : ''}
                </h2>
                <p className="text-gray-600">
                  Opportunités dans toute la région caribéenne
                </p>
              </div>
              
              <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500">
                <option>Plus récents</option>
                <option>Salaire croissant</option>
                <option>Salaire décroissant</option>
                <option>Pertinence</option>
              </select>
            </motion.div>

            {/* Featured Jobs */}
            {featuredJobs.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Emplois Recommandés
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-yellow-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={job.companyLogo}
                            alt={job.company}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-caribbean-600 transition-colors">
                              {job.title}
                            </h4>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {job.urgent && (
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                              Urgent
                            </span>
                          )}
                          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-bold">
                            Recommandé
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span className="capitalize">{job.type}</span>
                          </div>
                          {job.remote && (
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                              Remote
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-1 text-caribbean-600">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold">{formatSalary(job.salary)}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{job.applicants} candidats</span>
                          </div>
                          <span>{getTimeAgo(job.publishedAt)}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleFavorite(job.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              favorites.includes(job.id)
                                ? 'bg-red-100 text-red-600'
                                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                            }`}
                          >
                            <Heart className="w-4 h-4" fill={favorites.includes(job.id) ? 'currentColor' : 'none'} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-caribbean-gradient text-white px-4 py-2 rounded-lg font-medium hover:shadow-caribbean transition-all duration-300"
                          >
                            Postuler
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Regular Jobs */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Tous les Emplois</h3>
              <div className="space-y-4">
                {regularJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900 group-hover:text-caribbean-600 transition-colors">
                                {job.title}
                              </h4>
                              <p className="text-gray-600 font-medium">{job.company}</p>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {job.urgent && (
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                                  Urgent
                                </span>
                              )}
                              <span className="bg-caribbean-100 text-caribbean-600 px-2 py-1 rounded-full text-xs font-medium">
                                {categories.find(c => c.id === job.category)?.name}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span className="capitalize">{job.type}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span className="font-medium text-caribbean-600">{formatSalary(job.salary)}</span>
                            </div>
                            {job.remote && (
                              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                                Remote
                              </span>
                            )}
                          </div>

                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {job.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{job.applicants} candidats</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{getTimeAgo(job.publishedAt)}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleFavorite(job.id)}
                                className={`p-2 rounded-lg transition-colors ${
                                  favorites.includes(job.id)
                                    ? 'bg-red-100 text-red-600'
                                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                }`}
                              >
                                <Heart className="w-4 h-4" fill={favorites.includes(job.id) ? 'currentColor' : 'none'} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-lg text-gray-400 hover:text-caribbean-600 hover:bg-caribbean-50 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-caribbean-gradient text-white px-6 py-2 rounded-lg font-medium hover:shadow-caribbean transition-all duration-300"
                              >
                                Postuler
                              </motion.button>
                            </div>
                          </div>
                        </div>
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
                  Charger Plus d'Emplois
                </motion.button>
              </motion.div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploisPage;