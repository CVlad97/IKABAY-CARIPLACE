import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  Zap,
  TrendingUp
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Plateforme',
      links: [
        { name: 'Trading Bot', path: '/trading' },
        { name: 'Swap Automatique', path: '/swap' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'API Documentation', path: '/api-docs' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Copy Trading', path: '/copy-trading' },
        { name: 'Gestion de Liens', path: '/links' },
        { name: 'Analytics', path: '/analytics' },
        { name: 'Notifications', path: '/notifications' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Centre d\'Aide', path: '/aide' },
        { name: 'Contact', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Communauté', path: '/communaute' },
      ],
    },
    {
      title: 'Entreprise',
      links: [
        { name: 'À Propos', path: '/a-propos' },
        { name: 'Partenaires', path: '/partenaires' },
        { name: 'Sécurité', path: '/securite' },
        { name: 'Carrières', path: '/carrieres' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, url: 'https://facebook.com/ikabay', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: <Instagram className="w-5 h-5" />, url: 'https://instagram.com/ikabay', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: <Twitter className="w-5 h-5" />, url: 'https://twitter.com/ikabay', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: <Youtube className="w-5 h-5" />, url: 'https://youtube.com/ikabay', label: 'YouTube', color: 'hover:text-red-600' },
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com/company/ikabay', label: 'LinkedIn', color: 'hover:text-blue-700' },
  ];

  const stats = [
    { number: '10K+', label: 'Utilisateurs Actifs', icon: <TrendingUp className="w-5 h-5" /> },
    { number: '€2M+', label: 'Volume Tradé', icon: <Zap className="w-5 h-5" /> },
    { number: '99.9%', label: 'Uptime', icon: <Bot className="w-5 h-5" /> },
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-tropical-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-caribbean-400">{stat.icon}</span>
                <span className="text-3xl font-bold text-white">{stat.number}</span>
              </div>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <img src="/IKABAY.png" alt="IKABAY" className="w-12 h-12 object-contain" />
                <div>
                  <h3 className="text-2xl font-bold">IKABAY</h3>
                  <p className="text-sm text-gray-400">Trading & Marketplace</p>
                </div>
              </Link>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                La plateforme révolutionnaire de trading automatisé et de swap crypto. 
                Gagnez des revenus passifs avec notre bot MEXC et nos swaps Solana automatisés.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5 text-caribbean-400" />
                  <span>contact@ikabay.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-5 h-5 text-caribbean-400" />
                  <span>+33 1 XX XX XX XX</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-caribbean-400" />
                  <span>Paris, France</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-lg font-bold text-white mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-caribbean-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-caribbean-gradient rounded-2xl p-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">
                Restez Informé
              </h4>
              <p className="text-white/90">
                Recevez les dernières mises à jour sur nos bots de trading, 
                nouvelles stratégies et opportunités de gains.
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:border-white focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-caribbean-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                <Zap className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start space-x-2">
                <span>&copy; {currentYear} IKABAY.</span>
                <span>Fait avec</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>pour les traders</span>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200 hover:bg-gray-700`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link to="/mentions-legales" className="hover:text-caribbean-400 transition-colors">
                Mentions Légales
              </Link>
              <Link to="/confidentialite" className="hover:text-caribbean-400 transition-colors">
                Confidentialité
              </Link>
              <Link to="/conditions" className="hover:text-caribbean-400 transition-colors">
                CGU
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-caribbean-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-coral-500/10 rounded-full blur-3xl"></div>
    </footer>
  );
};

export default Footer;