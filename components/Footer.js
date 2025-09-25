import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-caribbean-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-caribbean-blue to-caribbean-green rounded-xl flex items-center justify-center text-white font-bold text-xl">
                IK
              </div>
              <div>
                <h3 className="text-xl font-bold">Ikabay</h3>
                <p className="text-gray-300">Marketplace Caraïbe</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              La première marketplace caribéenne qui connecte les producteurs locaux aux consommateurs. 
              Produits authentiques, livraison rapide, paiements sécurisés.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/596696XXXXXX" className="text-caribbean-green hover:text-white transition-colors">
                WhatsApp
              </a>
              <a href="https://t.me/ikabay" className="text-caribbean-blue hover:text-white transition-colors">
                Telegram
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-semibold mb-4">Boutique</h4>
            <div className="space-y-2">
              <Link href="/products" className="block text-gray-300 hover:text-white transition-colors">
                Tous les produits
              </Link>
              <Link href="/products?category=epicerie" className="block text-gray-300 hover:text-white transition-colors">
                Épicerie
              </Link>
              <Link href="/products?category=cosmetique" className="block text-gray-300 hover:text-white transition-colors">
                Cosmétique
              </Link>
              <Link href="/products?category=mode" className="block text-gray-300 hover:text-white transition-colors">
                Mode
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <Link href="/vendors" className="block text-gray-300 hover:text-white transition-colors">
                Devenir vendeur
              </Link>
              <Link href="/partners" className="block text-gray-300 hover:text-white transition-colors">
                Partenaires
              </Link>
              <a href="mailto:contact@ikabay.com" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
              <a href="tel:+596696XXXXXX" className="block text-gray-300 hover:text-white transition-colors">
                +596 696 XX XX XX
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Ikabay. Tous droits réservés.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/legal/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
              CGV
            </Link>
            <Link href="/legal/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
              Confidentialité
            </Link>
            <Link href="/legal/cookies" className="text-gray-300 hover:text-white text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}