import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  TrendingUp, 
  User, 
  Search, 
  Globe,
  Bot,
  Zap,
  BarChart3,
  ShoppingBag,
  Newspaper,
  Briefcase,
  Gamepad2,
  Users,
  GraduationCap,
  Handshake,
  PieChart,
  Radio,
  Copy,
  TestTube,
  Store,
  LogOut,
  LogIn
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../utils/supabase';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: 'Accueil', path: '/', icon: <Bot className="w-4 h-4" /> },
    { name: 'Boutique', path: '/boutique', icon: <ShoppingBag className="w-4 h-4" /> },
    { name: 'Zendrop', path: '/zendrop', icon: <Store className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Actualités', path: '/actualites', icon: <Newspaper className="w-4 h-4"  /> },
    { name: 'Emplois', path: '/emplois', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Jeux', path: '/jeux', icon: <Gamepad2 className="w-4 h-4" /> },
    { name: 'Formation', path: '/formation', icon: <GraduationCap className="w-4 h-4" /> },
    { name: 'Communauté', path: '/communaute', icon: <Users className="w-4 h-4" /> },
  ];

  const tradingLinks = [
    { name: 'Trading Bot', path: '/trading', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Swap Auto', path: '/swap', icon: <Zap className="w-4 h-4" /> },
    { name: 'Portfolio', path: '/portfolio', icon: <PieChart className="w-4 h-4" /> },
    { name: 'Signaux', path: '/signals', icon: <Radio className="w-4 h-4" /> },
    { name: 'Copy Trading', path: '/copy-trading', icon: <Copy className="w-4 h-4" /> },
    { name: 'Backtesting', path: '/backtesting', icon: <TestTube className="w-4 h-4" /> },
  ];

  const moreLinks = [
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Partenaires', path: '/partenaires', icon: <Handshake className="w-4 h-4" /> },
    { name: 'Admin', path: '/admin', icon: <User className="w-4 h-4" /> },
  ];

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ht', name: 'Kreyòl', flag: '🇭🇹' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    // Check for user session on component mount
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };
    
    getUser();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-3">
                <div className="relative">
                  <img src="/IKABAY.png" alt="IKABAY" className="w-12 h-12 object-contain" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-caribbean-gradient bg-clip-text text-transparent">
                    IKABAY
                  </h1>
                  <p className="text-xs text-gray-600 font-medium">Trading & Marketplace V2.0</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
                      location.pathname === link.path
                        ? 'bg-caribbean-gradient text-white shadow-caribbean'
                        : 'text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600'
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Trading Dropdown */}
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl font-medium text-sm text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600 transition-all duration-300"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Trading</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {tradingLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="flex items-center space-x-3 px-4 py-3 text-left hover:bg-caribbean-50 first:rounded-t-xl last:rounded-b-xl transition-colors text-gray-700 hover:text-caribbean-600"
                    >
                      {link.icon}
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* More Dropdown */}
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl font-medium text-sm text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600 transition-all duration-300"
                >
                  <span>Plus</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="flex items-center space-x-3 px-4 py-3 text-left hover:bg-caribbean-50 first:rounded-t-xl last:rounded-b-xl transition-colors text-gray-700 hover:text-caribbean-600"
                    >
                      {link.icon}
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-caribbean-100 text-gray-600 hover:text-caribbean-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Language Selector */}
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-caribbean-100 text-gray-600 hover:text-caribbean-600 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </motion.button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-caribbean-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                        i18n.language === lang.code ? 'bg-caribbean-50 text-caribbean-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* User Account */}
              {user ? (
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl bg-caribbean-gradient text-white shadow-caribbean hover:shadow-glow transition-all duration-300"
                  >
                    <User className="w-5 h-5" />
                  </motion.button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{user.email}</p>
                      <p className="text-xs text-gray-500">Membre</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 text-left hover:bg-caribbean-50 transition-colors text-gray-700 hover:text-caribbean-600"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link
                      to="/portfolio"
                      className="flex items-center space-x-3 px-4 py-3 text-left hover:bg-caribbean-50 transition-colors text-gray-700 hover:text-caribbean-600"
                    >
                      <PieChart className="w-4 h-4" />
                      <span className="font-medium">Portfolio</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 rounded-b-xl transition-colors text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Déconnexion</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-caribbean-gradient text-white shadow-caribbean hover:shadow-glow transition-all duration-300"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="font-medium">Connexion</span>
                  </motion.button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-caribbean-100 text-gray-600 hover:text-caribbean-600 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 bg-white/95 backdrop-blur-md"
            >
              <div className="container mx-auto px-4 md:px-6 py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher produits, emplois, formations, signaux trading..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-caribbean-500 focus:ring-2 focus:ring-caribbean-200 outline-none transition-all"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <img src="/IKABAY.png" alt="IKABAY" className="w-10 h-10 object-contain" />
                    <div>
                      <h2 className="font-bold text-gray-900">IKABAY</h2>
                      <p className="text-xs text-gray-500">V2.0 Trading Platform</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {user && (
                  <div className="mb-6 p-4 bg-caribbean-50 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-caribbean-gradient rounded-full flex items-center justify-center text-white">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.email}</p>
                        <p className="text-xs text-gray-500">Membre</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}

                <nav className="space-y-2 mb-8">
                  {[...navLinks, ...tradingLinks, ...moreLinks].map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          location.pathname === link.path
                            ? 'bg-caribbean-gradient text-white shadow-caribbean'
                            : 'text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600'
                        }`}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {!user && (
                  <div className="mb-6">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-caribbean-gradient text-white rounded-xl shadow-sm hover:shadow-caribbean transition-all duration-300"
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="font-medium">Connexion</span>
                    </Link>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Langues</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          i18n.language === lang.code 
                            ? 'bg-caribbean-100 text-caribbean-600' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;