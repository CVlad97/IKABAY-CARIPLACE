import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  Play, 
  Users, 
  Clock,
  Zap,
  Award,
  Target,
  Brain,
  Globe,
  Gift,
  TrendingUp,
  Medal
} from 'lucide-react';

const JeuxPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userStats, setUserStats] = useState({
    totalPoints: 2450,
    gamesPlayed: 23,
    achievements: 8,
    rank: 'Expert Caribéen'
  });

  useEffect(() => {
    document.title = 'Jeux Éducatifs - IKABAY CARAÏBEEN';
  }, []);

  const categories = [
    { id: 'all', name: 'Tous les Jeux', icon: <Gamepad2 className="w-4 h-4" />, count: 24 },
    { id: 'culture', name: 'Culture Caribéenne', icon: <Globe className="w-4 h-4" />, count: 8 },
    { id: 'histoire', name: 'Histoire', icon: <Award className="w-4 h-4" />, count: 6 },
    { id: 'geographie', name: 'Géographie', icon: <Target className="w-4 h-4" />, count: 5 },
    { id: 'langue', name: 'Langues', icon: <Brain className="w-4 h-4" />, count: 3 },
    { id: 'economie', name: 'Économie', icon: <TrendingUp className="w-4 h-4" />, count: 2 },
  ];

  const games = [
    {
      id: '1',
      title: 'Quiz Culture Caribéenne',
      description: 'Testez vos connaissances sur les traditions, la musique et l\'art des Antilles',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'culture',
      difficulty: 'Moyen',
      duration: 15,
      players: 1247,
      rating: 4.8,
      rewards: 150,
      featured: true,
      new: false,
      achievements: ['Maître de la Culture', 'Expert Musical', 'Connaisseur des Arts']
    },
    {
      id: '2',
      title: 'Géographie des Îles',
      description: 'Explorez et apprenez la géographie de toutes les îles des Caraïbes',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'geographie',
      difficulty: 'Facile',
      duration: 10,
      players: 892,
      rating: 4.6,
      rewards: 100,
      featured: true,
      new: true,
      achievements: ['Explorateur', 'Cartographe', 'Navigateur']
    },
    {
      id: '3',
      title: 'Histoire des Antilles',
      description: 'Découvrez l\'histoire fascinante des peuples caribéens',
      image: 'https://images.pexels.com/photos/261154/pexels-photo-261154.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'histoire',
      difficulty: 'Difficile',
      duration: 20,
      players: 634,
      rating: 4.9,
      rewards: 200,
      featured: false,
      new: false,
      achievements: ['Historien', 'Chroniqueur', 'Sage']
    },
    {
      id: '4',
      title: 'Créole Challenge',
      description: 'Apprenez et pratiquez le créole avec des mini-jeux interactifs',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'langue',
      difficulty: 'Moyen',
      duration: 12,
      players: 456,
      rating: 4.7,
      rewards: 120,
      featured: false,
      new: true,
      achievements: ['Polyglotte', 'Maître des Mots', 'Communicateur']
    },
    {
      id: '5',
      title: 'Économie Caribéenne',
      description: 'Comprenez les enjeux économiques de la région',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'economie',
      difficulty: 'Difficile',
      duration: 25,
      players: 289,
      rating: 4.5,
      rewards: 250,
      featured: false,
      new: false,
      achievements: ['Économiste', 'Analyste', 'Stratège']
    },
    {
      id: '6',
      title: 'Cuisine des Îles',
      description: 'Découvrez les recettes traditionnelles et leurs origines',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'culture',
      difficulty: 'Facile',
      duration: 8,
      players: 723,
      rating: 4.4,
      rewards: 80,
      featured: false,
      new: false,
      achievements: ['Chef Créole', 'Gourmet', 'Maître des Épices']
    },
  ];

  const achievements = [
    { id: '1', name: 'Premier Pas', description: 'Jouer à votre premier jeu', icon: '🎮', unlocked: true },
    { id: '2', name: 'Explorateur', description: 'Terminer 5 jeux différents', icon: '🗺️', unlocked: true },
    { id: '3', name: 'Érudit', description: 'Obtenir 1000 points', icon: '📚', unlocked: true },
    { id: '4', name: 'Maître Caribéen', description: 'Terminer tous les jeux de culture', icon: '🏆', unlocked: false },
    { id: '5', name: 'Perfectionniste', description: 'Obtenir 100% dans un jeu', icon: '⭐', unlocked: true },
    { id: '6', name: 'Collectionneur', description: 'Débloquer 10 succès', icon: '💎', unlocked: false },
  ];

  const leaderboard = [
    { rank: 1, name: 'Marie Dubois', points: 4850, avatar: '👩🏽‍🎓' },
    { rank: 2, name: 'Jean-Claude Martin', points: 4320, avatar: '👨🏾‍🏫' },
    { rank: 3, name: 'Sophie Leblanc', points: 3890, avatar: '👩🏻‍💼' },
    { rank: 4, name: 'Vous', points: userStats.totalPoints, avatar: '👤' },
    { rank: 5, name: 'Marcus Johnson', points: 2180, avatar: '👨🏿‍🎨' },
  ];

  const filteredGames = games.filter(game => 
    selectedCategory === 'all' || game.category === selectedCategory
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-100 text-green-600';
      case 'Moyen': return 'bg-yellow-100 text-yellow-600';
      case 'Difficile': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
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
              Jeux Éducatifs Caribéens
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Apprenez en vous amusant ! Découvrez la culture, l'histoire et les traditions 
              des Antilles tout en gagnant des récompenses crypto.
            </p>
            
            {/* User Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-2xl font-bold">{userStats.totalPoints}</span>
                </div>
                <p className="text-sm opacity-90">Points IKC</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Gamepad2 className="w-5 h-5" />
                  <span className="text-2xl font-bold">{userStats.gamesPlayed}</span>
                </div>
                <p className="text-sm opacity-90">Jeux Joués</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Trophy className="w-5 h-5" />
                  <span className="text-2xl font-bold">{userStats.achievements}</span>
                </div>
                <p className="text-sm opacity-90">Succès</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Medal className="w-5 h-5" />
                  <span className="text-lg font-bold">#4</span>
                </div>
                <p className="text-sm opacity-90">Classement</p>
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
            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Catégories</h3>
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
                    <div className="flex items-center space-x-3">
                      {category.icon}
                      <span className="font-medium">{category.name}</span>
                    </div>
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
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Succès
              </h3>
              <div className="space-y-3">
                {achievements.slice(0, 4).map((achievement) => (
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

            {/* Leaderboard */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Medal className="w-5 h-5 mr-2 text-orange-500" />
                Classement
              </h3>
              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center space-x-3 p-3 rounded-xl ${
                      player.name === 'Vous'
                        ? 'bg-caribbean-50 border border-caribbean-200'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      player.rank === 1 ? 'bg-yellow-500 text-white' :
                      player.rank === 2 ? 'bg-gray-400 text-white' :
                      player.rank === 3 ? 'bg-orange-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {player.rank}
                    </div>
                    <span className="text-lg">{player.avatar}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.points} points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Games */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                Jeux Recommandés
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredGames.filter(game => game.featured).map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex space-x-2">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Recommandé
                        </span>
                        {game.new && (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            Nouveau
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

                      {/* Rewards */}
                      <div className="absolute bottom-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                        <Gift className="w-4 h-4" />
                        <span>{game.rewards} IKC</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(game.difficulty)}`}>
                          {game.difficulty}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{game.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-caribbean-600 transition-colors">
                        {game.title}
                      </h3>

                      <p className="text-gray-600 mb-4">
                        {game.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{game.duration} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{game.players} joueurs</span>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-caribbean-gradient text-white py-3 rounded-xl font-bold hover:shadow-caribbean transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Play className="w-5 h-5" />
                        <span>Jouer Maintenant</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* All Games */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tous les Jeux</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredGames.filter(game => !game.featured).map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {game.new && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            Nouveau
                          </span>
                        </div>
                      )}

                      <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                        <Gift className="w-3 h-3" />
                        <span>{game.rewards}</span>
                      </div>

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-caribbean-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Play className="w-6 h-6 ml-1" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                          {game.difficulty}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs">{game.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-caribbean-600 transition-colors">
                        {game.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {game.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{game.duration} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{game.players}</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-caribbean-gradient text-white py-2 rounded-lg font-medium text-sm hover:shadow-caribbean transition-all duration-300"
                      >
                        Jouer
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JeuxPage;