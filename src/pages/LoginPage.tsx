import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  User,
  Key
} from 'lucide-react';
import { supabase } from '../utils/supabase';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    document.title = isLogin ? 'Connexion - IKABAY' : 'Créer un compte - IKABAY';
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    
    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        setSuccess('Connexion réussie!');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        // Register
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              country: country
            }
          }
        });
        
        if (error) throw error;
        
        // Create user profile in the database
        if (data.user) {
          const { error: profileError } = await supabase
            .from('users')
            .insert([
              { 
                id: data.user.id,
                email: email,
                full_name: fullName,
                country: country,
                role: 'user'
              }
            ]);
            
          if (profileError) throw profileError;
        }
        
        setSuccess('Compte créé avec succès! Vous pouvez maintenant vous connecter.');
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    { code: 'MQ', name: 'Martinique' },
    { code: 'GP', name: 'Guadeloupe' },
    { code: 'GF', name: 'Guyane Française' },
    { code: 'RE', name: 'Réunion' },
    { code: 'FR', name: 'France' },
    { code: 'HT', name: 'Haïti' },
    { code: 'JM', name: 'Jamaïque' },
    { code: 'BB', name: 'Barbade' },
    { code: 'TT', name: 'Trinidad et Tobago' },
    { code: 'LC', name: 'Sainte-Lucie' },
    { code: 'DM', name: 'Dominique' },
    { code: 'AG', name: 'Antigua-et-Barbuda' },
    { code: 'VC', name: 'Saint-Vincent-et-les-Grenadines' },
    { code: 'GD', name: 'Grenade' },
    { code: 'BS', name: 'Bahamas' },
    { code: 'CU', name: 'Cuba' },
    { code: 'DO', name: 'République Dominicaine' },
    { code: 'PR', name: 'Porto Rico' },
    { code: 'OTHER', name: 'Autre' }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-caribbean-50 to-ocean-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-caribbean-gradient p-6 text-white text-center">
              <div className="flex justify-center mb-4">
                <img src="/IKABAY.png" alt="IKABAY" className="w-16 h-16 object-contain" />
              </div>
              <h1 className="text-2xl font-bold">
                {isLogin ? 'Bienvenue sur IKABAY' : 'Rejoignez IKABAY'}
              </h1>
              <p className="text-white/80 mt-2">
                {isLogin 
                  ? 'Connectez-vous pour accéder à votre compte' 
                  : 'Créez votre compte pour commencer votre expérience'}
              </p>
            </div>

            {/* Form */}
            <div className="p-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start space-x-3"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 text-green-600 p-4 rounded-xl mb-6 flex items-start space-x-3"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{success}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-caribbean-500 focus:border-transparent"
                        placeholder="Votre nom complet"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-caribbean-500 focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-caribbean-500 focus:border-transparent"
                      placeholder="••••••••"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {!isLogin && (
                    <p className="text-xs text-gray-500 mt-1">
                      Le mot de passe doit contenir au moins 6 caractères
                    </p>
                  )}
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pays
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-caribbean-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Sélectionnez votre pays</option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-caribbean-600 focus:ring-caribbean-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Se souvenir de moi
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="font-medium text-caribbean-600 hover:text-caribbean-500">
                        Mot de passe oublié?
                      </a>
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-caribbean-gradient text-white py-3 rounded-xl font-bold hover:shadow-caribbean transition-all duration-300 disabled:opacity-70"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      {isLogin ? <LogIn className="w-5 h-5" /> : <User className="w-5 h-5" />}
                      <span>{isLogin ? 'Se connecter' : 'Créer un compte'}</span>
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Vous n'avez pas de compte?" : "Vous avez déjà un compte?"}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="ml-1 font-medium text-caribbean-600 hover:text-caribbean-500"
                  >
                    {isLogin ? "Créer un compte" : "Se connecter"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              En vous connectant, vous acceptez nos{' '}
              <a href="#" className="text-caribbean-600 hover:underline">Conditions d'utilisation</a>{' '}
              et notre{' '}
              <a href="#" className="text-caribbean-600 hover:underline">Politique de confidentialité</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;