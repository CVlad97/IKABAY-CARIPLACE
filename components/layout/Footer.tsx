import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  TrendingUp,
  Bot,
  Zap
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Plateforme',
      links: [
        { name: 'Trading Bot', path: '/bot-status' },
        { name: 'Swap Automatique', path: '/swap' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'API Documentation', path: '/api-docs' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Centre d\'Aide', path: '/aide' },
        { name: 'Contact', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
      ],
    },
    {
      title: 'Entreprise',
      links: [
        { name: 'À Propos', path: '/a-propos' },
        { name: 'Sécurité', path: '/securite' },
        { name: 'Carrières', path: '/carrieres' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, url: 'https://facebook.com/ikabay', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: <Instagram className="w-5 h-5" />, url: 'https://instagram.com/ikabay', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: <Twitter className="w-5 h-5" />, url: 'https://twitter.com/ikabay', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com/company/ikabay', label: 'LinkedIn', color: 'hover:text-blue-700' },
  ];

  const stats = [
    { number: '€2M+', label: 'Volume Tradé', icon: <TrendingUp className="w-5 h-5" /> },
    { number: '10K+', label: 'Utilisateurs Actifs', icon: <Bot className="w-5 h-5" /> },
    { number: '99.9%', label: 'Uptime', icon: <Zap className="w-5 h-5" /> },
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-tropical-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-caribbean-400">{stat.icon}</span>
                <span className="text-3xl font-bold text-white">{stat.number}</span>
              </div>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <img src="/IKABAY.png" alt="IKABAY" className="w-12 h-12 object-contain" />
              <div>
                <h3 className="text-2xl font-bold">IKABAY</h3>
                <p className="text-sm text-gray-400">Trading & Crypto</p>
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
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-bold text-white mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.path} 
                      className="text-gray-300 hover:text-caribbean-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

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
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200 hover:bg-gray-700`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/mentions-legales" className="hover:text-caribbean-400 transition-colors">
                Mentions Légales
              </Link>
              <Link href="/confidentialite" className="hover:text-caribbean-400 transition-colors">
                Confidentialité
              </Link>
              <Link href="/conditions" className="hover:text-caribbean-400 transition-colors">
                CGU
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;