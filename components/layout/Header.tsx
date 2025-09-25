"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
  LogOut,
  LogIn,
  Wallet
} from "lucide-react";
import { useSupabase } from "@/lib/supabase-provider";
import { useWallet } from "@/lib/wallet-provider";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { supabase, user } = useSupabase();
  const { connected, wallet, connect, disconnect } = useWallet();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Swap', path: '/swap' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Bot Status', path: '/bot-status' },
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
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <img src="/IKABAY.png" alt="IKABAY" className="w-12 h-12 object-contain" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-caribbean-gradient bg-clip-text text-transparent">
                    IKABAY
                  </h1>
                  <p className="text-xs text-gray-600 font-medium">Trading & Crypto</p>
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
                    href={link.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
                      pathname === link.path
                        ? 'bg-caribbean-gradient text-white shadow-caribbean'
                        : 'text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              {user?.role === 'admin' && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/admin"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
                      pathname === '/admin'
                        ? 'bg-caribbean-gradient text-white shadow-caribbean'
                        : 'text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600'
                    }`}
                  >
                    <span>Admin</span>
                  </Link>
                </motion.div>
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Connect Wallet Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={connected ? disconnect : connect}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Wallet className="w-4 h-4" />
                <span>{connected ? 'Wallet Connected' : 'Connect Wallet'}</span>
              </motion.button>

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
                      href="/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 text-left hover:bg-caribbean-50 transition-colors text-gray-700 hover:text-caribbean-600"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span className="font-medium">Dashboard</span>
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
                <Link href="/login">
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
      </motion.header>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <img src="/IKABAY.png" alt="IKABAY" className="w-10 h-10 object-contain" />
                  <div>
                    <h2 className="font-bold text-gray-900">IKABAY</h2>
                    <p className="text-xs text-gray-500">Trading & Crypto</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Connect Wallet Button (Mobile) */}
              <div className="mb-6">
                <button
                  onClick={connected ? disconnect : connect}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Wallet className="w-5 h-5" />
                  <span>{connected ? 'Wallet Connected' : 'Connect Wallet'}</span>
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
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      pathname === link.path
                        ? 'bg-caribbean-gradient text-white shadow-caribbean'
                        : 'text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                ))}
                
                {user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      pathname === '/admin'
                        ? 'bg-caribbean-gradient text-white shadow-caribbean'
                        : 'text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-600'
                    }`}
                  >
                    <span>Admin</span>
                  </Link>
                )}
              </nav>

              {!user && (
                <div className="mb-6">
                  <Link
                    href="/login"
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-caribbean-gradient text-white rounded-xl shadow-sm hover:shadow-caribbean transition-all duration-300"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="font-medium">Connexion</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;