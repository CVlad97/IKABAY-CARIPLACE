import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Plus,
  Search,
  Filter,
  TrendingUp,
  Calendar,
  MapPin,
  Eye,
  ThumbsUp,
  MessageSquare,
  User,
  Send,
  Image,
  Smile,
  Hash,
  Bell
} from 'lucide-react';

const CommunautePage = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('general');

  useEffect(() => {
    document.title = 'Communauté - IKABAY CARAÏBEEN';
  }, []);

  const tabs = [
    { id: 'feed', name: 'Fil d\'Actualité', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'channels', name: 'Canaux', icon: <Hash className="w-4 h-4" /> },
    { id: 'events', name: 'Événements', icon: <Calendar className="w-4 h-4" /> },
    { id: 'members', name: 'Membres', icon: <Users className="w-4 h-4" /> },
  ];

  const channels = [
    { id: 'general', name: 'Général', members: 2847, description: 'Discussions générales sur IKABAY' },
    { id: 'trading', name: 'Trading', members: 1234, description: 'Stratégies et conseils de trading' },
    { id: 'boutique', name: 'Boutique', members: 892, description: 'Produits et recommandations' },
    { id: 'emplois', name: 'Emplois', members: 567, description: 'Opportunités professionnelles' },
    { id: 'culture', name: 'Culture Caribéenne', members: 445, description: 'Patrimoine et traditions' },
    { id: 'tech', name: 'Technologie', members: 334, description: 'Innovations et développement' },
  ];

  const posts = [
    {
      id: '1',
      author: {
        name: 'Marie Dubois',
        avatar: '👩🏽‍💼',
        location: 'Martinique',
        verified: true
      },
      content: 'Excellents résultats avec le bot de trading cette semaine ! +24% de gains. Merci IKABAY pour cette technologie révolutionnaire 🚀',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600',
      timestamp: '2024-01-15T10:30:00Z',
      likes: 47,
      comments: 12,
      shares: 8,
      trending: true,
      channel: 'trading'
    },
    {
      id: '2',
      author: {
        name: 'Jean-Claude Martin',
        avatar: '👨🏾‍🎨',
        location: 'Guadeloupe',
        verified: false
      },
      content: 'Qui participe au Festival de Jazz de Sainte-Lucie cette année ? On pourrait organiser un meetup IKABAY ! 🎷🎵',
      timestamp: '2024-01-14T15:45:00Z',
      likes: 23,
      comments: 18,
      shares: 5,
      trending: false,
      channel: 'culture'
    },
    {
      id: '3',
      author: {
        name: 'Sophie Leblanc',
        avatar: '👩🏻‍💻',
        location: 'Barbade',
        verified: true
      },
      content: 'Nouveau produit ajouté à la boutique : Rhum agricole premium de Martinique ! Les premières commandes bénéficient de 20% de réduction 🥃',
      image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=600',
      timestamp: '2024-01-13T09:20:00Z',
      likes: 89,
      comments: 34,
      shares: 15,
      trending: true,
      channel: 'boutique'
    },
    {
      id: '4',
      author: {
        name: 'Marcus Johnson',
        avatar: '👨🏿‍🔬',
        location: 'Jamaïque',
        verified: false
      },
      content: 'Recherche développeur React Native pour startup fintech à Kingston. Salaire compétitif + equity. DM si intéressé ! 💼',
      timestamp: '2024-01-12T14:10:00Z',
      likes: 15,
      comments: 7,
      shares: 12,
      trending: false,
      channel: 'emplois'
    },
  ];

  const events = [
    {
      id: '1',
      title: 'Meetup IKABAY Martinique',
      description: 'Rencontre mensuelle des utilisateurs IKABAY en Martinique',
      date: '2024-02-15T18:00:00Z',
      location: 'Fort-de-France, Martinique',
      attendees: 45,
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Webinaire Trading Crypto',
      description: 'Stratégies avancées de trading automatisé',
      date: '2024-02-20T20:00:00Z',
      location: 'En ligne',
      attendees: 234,
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Festival Culturel Caribéen',
      description: 'Célébration de la culture des Antilles',
      date: '2024-03-10T14:00:00Z',
      location: 'Pointe-à-Pitre, Guadeloupe',
      attendees: 156,
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const topMembers = [
    { name: 'Marie Dubois', avatar: '👩🏽‍💼', points: 4850, location: 'Martinique', verified: true },
    { name: 'Jean-Claude Martin', avatar: '👨🏾‍🎨', points: 4320, location: 'Guadeloupe', verified: false },
    { name: 'Sophie Leblanc', avatar: '👩🏻‍💻', points: 3890, location: 'Barbade', verified: true },
    { name: 'Marcus Johnson', avatar: '👨🏿‍🔬', points: 3450, location: 'Jamaïque', verified: false },
    { name: 'Patricia Green', avatar: '👩🏾‍⚕️', points: 3120, location: 'Trinidad', verified: true },
  ];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a moins d\'une heure';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      console.log('Nouveau post:', newPost);
      setNewPost('');
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
              Communauté IKABAY
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Connectez-vous avec des milliers d'utilisateurs à travers les Antilles. 
              Partagez, apprenez et grandissez ensemble !
            </p>
            
            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-bold">2.8K</span>
                </div>
                <p className="text-sm opacity-90">Membres</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-2xl font-bold">1.2K</span>
                </div>
                <p className="text-sm opacity-90">Messages</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-2xl font-bold">24</span>
                </div>
                <p className="text-sm opacity-90">Événements</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-2xl font-bold">15</span>
                </div>
                <p className="text-sm opacity-90">Îles</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-caribbean-gradient text-white shadow-caribbean'
                  : 'bg-white text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600 shadow-sm'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'feed' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Create Post */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-caribbean-gradient rounded-full flex items-center justify-center text-white text-xl">
                      👤
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Partagez quelque chose avec la communauté..."
                        className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                        rows={3}
                      />
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-caribbean-600 transition-colors">
                            <Image className="w-5 h-5" />
                            <span>Photo</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-caribbean-600 transition-colors">
                            <Smile className="w-5 h-5" />
                            <span>Emoji</span>
                          </button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePostSubmit}
                          disabled={!newPost.trim()}
                          className="bg-caribbean-gradient text-white px-6 py-2 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-caribbean transition-all duration-300"
                        >
                          Publier
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posts Feed */}
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                        {post.author.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-bold text-gray-900">{post.author.name}</h4>
                          {post.author.verified && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                          {post.trending && (
                            <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Tendance
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{post.author.location}</span>
                          </div>
                          <span>{formatTimeAgo(post.timestamp)}</span>
                          <span className="bg-caribbean-100 text-caribbean-600 px-2 py-1 rounded-full text-xs">
                            #{post.channel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-900 mb-4 leading-relaxed">{post.content}</p>

                    {post.image && (
                      <div className="mb-4 rounded-xl overflow-hidden">
                        <img
                          src={post.image}
                          alt="Post image"
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-caribbean-600 transition-colors">
                          <MessageSquare className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span>{post.likes + post.comments * 3} vues</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'channels' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {channels.map((channel, index) => (
                  <motion.div
                    key={channel.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedChannel(channel.id)}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-caribbean-gradient rounded-xl flex items-center justify-center text-white font-bold">
                        #{channel.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">#{channel.name}</h3>
                        <p className="text-sm text-gray-500">{channel.members} membres</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{channel.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-caribbean-gradient text-white py-2 rounded-xl font-medium hover:shadow-caribbean transition-all duration-300"
                    >
                      Rejoindre
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'events' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-48 h-32 object-cover"
                      />
                      <div className="p-6 flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} participants</span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-caribbean-gradient text-white px-6 py-2 rounded-xl font-medium hover:shadow-caribbean transition-all duration-300"
                        >
                          Participer
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'members' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Membres Actifs</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un membre..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {topMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-gray-900">{member.name}</h4>
                            {member.verified && (
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{member.location}</span>
                            </div>
                            <span>{member.points} points</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-caribbean-gradient text-white px-4 py-2 rounded-lg font-medium hover:shadow-caribbean transition-all duration-300"
                      >
                        Suivre
                      </motion.button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions Rapides</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-caribbean-gradient text-white py-3 rounded-xl font-medium hover:shadow-caribbean transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Créer un Événement</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white border-2 border-caribbean-200 text-caribbean-600 py-3 rounded-xl font-medium hover:bg-caribbean-50 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Inviter des Amis</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                Sujets Tendance
              </h3>
              <div className="space-y-3">
                {['#TradingBot', '#CultureCaribéenne', '#CryptoRewards', '#MeetupMartinique', '#JeuxÉducatifs'].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <span className="text-caribbean-600 font-medium">{topic}</span>
                    <span className="text-sm text-gray-500">{Math.floor(Math.random() * 100) + 10} posts</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Online Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                En Ligne (47)
              </h3>
              <div className="space-y-3">
                {topMembers.slice(0, 5).map((member, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                        {member.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunautePage;