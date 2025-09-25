import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Handshake, 
  Building, 
  Globe, 
  TrendingUp, 
  Users,
  Award,
  Target,
  Zap,
  Mail,
  Phone,
  ExternalLink,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Plus
} from 'lucide-react';

const PartenairesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPartnerForm, setShowPartnerForm] = useState(false);

  useEffect(() => {
    document.title = 'Partenaires - IKABAY CARAÏBEEN';
  }, []);

  const categories = [
    { id: 'all', name: 'Tous les Partenaires', count: 45 },
    { id: 'fintech', name: 'Fintech & Crypto', count: 12 },
    { id: 'commerce', name: 'E-commerce', count: 10 },
    { id: 'education', name: 'Éducation', count: 8 },
    { id: 'tourisme', name: 'Tourisme', count: 7 },
    { id: 'tech', name: 'Technologie', count: 5 },
    { id: 'media', name: 'Médias', count: 3 },
  ];

  const partners = [
    {
      id: '1',
      name: 'Caribbean Bank',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'fintech',
      location: 'Barbade',
      description: 'Première banque digitale des Antilles, spécialisée dans les services financiers innovants',
      partnership: 'Intégration API bancaire et services de paiement',
      since: '2023',
      status: 'active',
      tier: 'premium',
      website: 'https://caribbeanbank.com',
      contact: 'partnerships@caribbeanbank.com',
      benefits: ['API Banking', 'Paiements instantanés', 'Cartes virtuelles'],
      stats: { users: '50K+', volume: '€2M+', satisfaction: '4.8' }
    },
    {
      id: '2',
      name: 'TechCarib Solutions',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'tech',
      location: 'Martinique',
      description: 'Agence de développement web et mobile spécialisée dans les solutions caribéennes',
      partnership: 'Développement technique et maintenance plateforme',
      since: '2022',
      status: 'active',
      tier: 'gold',
      website: 'https://techcarib.com',
      contact: 'hello@techcarib.com',
      benefits: ['Support technique', 'Développement custom', 'Formation équipe'],
      stats: { projects: '25+', uptime: '99.9%', satisfaction: '4.9' }
    },
    {
      id: '3',
      name: 'Caribbean University',
      logo: 'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'education',
      location: 'Jamaïque',
      description: 'Université leader dans l\'enseignement supérieur et la recherche caribéenne',
      partnership: 'Programmes de formation et certification',
      since: '2023',
      status: 'active',
      tier: 'premium',
      website: 'https://caribu.edu',
      contact: 'partnerships@caribu.edu',
      benefits: ['Formations certifiées', 'Recherche & développement', 'Stages étudiants'],
      stats: { students: '15K+', courses: '120+', satisfaction: '4.7' }
    },
    {
      id: '4',
      name: 'Island Commerce',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'commerce',
      location: 'Guadeloupe',
      description: 'Plateforme e-commerce spécialisée dans les produits locaux des Antilles',
      partnership: 'Intégration marketplace et logistique',
      since: '2023',
      status: 'active',
      tier: 'gold',
      website: 'https://islandcommerce.com',
      contact: 'partners@islandcommerce.com',
      benefits: ['Catalogue produits', 'Logistique', 'Marketing digital'],
      stats: { products: '5K+', orders: '100K+', satisfaction: '4.6' }
    },
    {
      id: '5',
      name: 'Paradise Tourism',
      logo: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'tourisme',
      location: 'Sainte-Lucie',
      description: 'Agence de voyage premium spécialisée dans le tourisme durable caribéen',
      partnership: 'Offres exclusives et expériences touristiques',
      since: '2022',
      status: 'active',
      tier: 'silver',
      website: 'https://paradisetourism.com',
      contact: 'info@paradisetourism.com',
      benefits: ['Réductions exclusives', 'Packages sur mesure', 'Guides locaux'],
      stats: { destinations: '50+', clients: '10K+', satisfaction: '4.8' }
    },
    {
      id: '6',
      name: 'Crypto Caribbean',
      logo: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'fintech',
      location: 'Trinidad & Tobago',
      description: 'Exchange de cryptomonnaies leader dans la région caribéenne',
      partnership: 'Services de trading et échange crypto',
      since: '2023',
      status: 'active',
      tier: 'premium',
      website: 'https://cryptocarib.com',
      contact: 'business@cryptocarib.com',
      benefits: ['Trading API', 'Liquidité', 'Support 24/7'],
      stats: { volume: '€10M+', pairs: '100+', satisfaction: '4.5' }
    },
  ];

  const partnershipTiers = [
    {
      name: 'Silver',
      color: 'bg-gray-100 text-gray-600',
      benefits: ['Listing partenaire', 'Support email', 'Documentation API'],
      price: 'Gratuit'
    },
    {
      name: 'Gold',
      color: 'bg-yellow-100 text-yellow-600',
      benefits: ['Intégration prioritaire', 'Support dédié', 'Co-marketing', 'Analytics avancées'],
      price: '€500/mois'
    },
    {
      name: 'Premium',
      color: 'bg-purple-100 text-purple-600',
      benefits: ['Partenariat stratégique', 'Account manager', 'Développement custom', 'Revenue sharing'],
      price: 'Sur mesure'
    },
  ];

  const benefits = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Expansion Régionale',
      description: 'Accédez à tout l\'écosystème caribéen avec plus de 15 îles connectées'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Base Utilisateurs',
      description: 'Touchez notre communauté de 10K+ utilisateurs actifs'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Intégration Rapide',
      description: 'APIs modernes et documentation complète pour une intégration en 48h'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Croissance Mutuelle',
      description: 'Modèles de revenue sharing et opportunités de co-développement'
    },
  ];

  const filteredPartners = partners.filter(partner => 
    selectedCategory === 'all' || partner.category === selectedCategory
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'silver': return 'bg-gray-100 text-gray-600';
      case 'gold': return 'bg-yellow-100 text-yellow-600';
      case 'premium': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'silver': return '🥈';
      case 'gold': return '🥇';
      case 'premium': return '💎';
      default: return '⭐';
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
              Nos Partenaires
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Découvrez l'écosystème IKABAY et rejoignez notre réseau de partenaires 
              pour développer ensemble l'économie numérique caribéenne.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPartnerForm(true)}
              className="bg-white text-caribbean-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <Handshake className="w-6 h-6" />
              <span>Devenir Partenaire</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Partnership Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi Devenir Partenaire ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rejoignez l'écosystème IKABAY et bénéficiez d'opportunités uniques 
              de croissance dans la région caribéenne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-caribbean-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Partnership Tiers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Niveaux de Partenariat
            </h2>
            <p className="text-xl text-gray-600">
              Choisissez le niveau qui correspond à vos besoins et objectifs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  tier.name === 'Gold' ? 'border-2 border-yellow-300 relative' : ''
                }`}
              >
                {tier.name === 'Gold' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      Populaire
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${tier.color} mb-4`}>
                    <span className="text-2xl">{getTierIcon(tier.name.toLowerCase())}</span>
                    <span className="font-bold">{tier.name}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{tier.price}</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                    tier.name === 'Gold'
                      ? 'bg-caribbean-gradient text-white hover:shadow-caribbean'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Choisir {tier.name}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Partners Directory */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              Nos Partenaires Actuels
            </h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-caribbean-gradient text-white shadow-caribbean'
                      : 'bg-white text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600 shadow-sm'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{partner.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{partner.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTierColor(partner.tier)}`}>
                      {getTierIcon(partner.tier)} {partner.tier.charAt(0).toUpperCase() + partner.tier.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">Depuis {partner.since}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{partner.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Partenariat:</h4>
                  <p className="text-sm text-gray-600">{partner.partnership}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Avantages:</h4>
                  <div className="flex flex-wrap gap-1">
                    {partner.benefits.slice(0, 3).map((benefit, i) => (
                      <span key={i} className="bg-caribbean-100 text-caribbean-600 px-2 py-1 rounded-full text-xs">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  {Object.entries(partner.stats).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-2">
                      <div className="font-bold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <a
                      href={`mailto:${partner.contact}`}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gray-600" />
                    </a>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                    </a>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-caribbean-gradient text-white px-4 py-2 rounded-lg font-medium hover:shadow-caribbean transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Contacter</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-caribbean-gradient rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à Rejoindre l'Écosystème ?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Développons ensemble l'avenir de l'économie numérique caribéenne. 
              Contactez notre équipe partenariats dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPartnerForm(true)}
                className="bg-white text-caribbean-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Devenir Partenaire</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Nous Contacter</span>
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Partner Application Form Modal */}
      {showPartnerForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPartnerForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Candidature Partenaire</h3>
              <button
                onClick={() => setShowPartnerForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'entreprise *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    placeholder="Votre entreprise"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site web
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    placeholder="https://votre-site.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secteur d'activité *
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500">
                    <option>Sélectionner un secteur</option>
                    <option>Fintech & Crypto</option>
                    <option>E-commerce</option>
                    <option>Éducation</option>
                    <option>Tourisme</option>
                    <option>Technologie</option>
                    <option>Médias</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation *
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500">
                    <option>Sélectionner une île</option>
                    <option>Martinique</option>
                    <option>Guadeloupe</option>
                    <option>Jamaïque</option>
                    <option>Barbade</option>
                    <option>Trinidad & Tobago</option>
                    <option>Sainte-Lucie</option>
                    <option>Dominique</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description de votre entreprise *
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  placeholder="Décrivez votre entreprise et vos activités..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de partenariat souhaité *
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  placeholder="Décrivez le type de collaboration que vous envisagez..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact principal *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    placeholder="Nom et prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                    placeholder="contact@entreprise.com"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-caribbean-600 border-gray-300 rounded focus:ring-caribbean-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  J'accepte les conditions générales et la politique de confidentialité
                </label>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-1 bg-caribbean-gradient text-white py-3 rounded-xl font-bold hover:shadow-caribbean transition-all duration-300"
                >
                  Envoyer la Candidature
                </motion.button>
                <button
                  type="button"
                  onClick={() => setShowPartnerForm(false)}
                  className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PartenairesPage;