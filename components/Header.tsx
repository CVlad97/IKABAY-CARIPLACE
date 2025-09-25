"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-caribbean-dark text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>📱 WhatsApp: +596 696 XX XX XX</span>
            <span>📧 contact@ikabay.com</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-caribbean-blue to-caribbean-green rounded-xl flex items-center justify-center text-white font-bold text-xl">
              IK
            </div>
            <div>
              <h1 className="text-2xl font-bold text-caribbean-dark">Ikabay</h1>
              <p className="text-sm text-gray-600">Marketplace Caraïbe</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link href="/products" className="text-caribbean-dark hover:text-caribbean-blue font-medium transition-colors">
              Boutique
            </Link>
            <Link href="/tracking" className="text-caribbean-dark hover:text-caribbean-blue font-medium transition-colors">
              Suivi
            </Link>
            <Link href="/vendors" className="text-caribbean-dark hover:text-caribbean-blue font-medium transition-colors">
              Devenir vendeur
            </Link>
            <Link href="/partners" className="text-caribbean-dark hover:text-caribbean-blue font-medium transition-colors">
              Partenaires
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}