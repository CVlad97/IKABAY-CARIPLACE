import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coral-100 via-ocean-50 to-caribbean-100">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 bg-caribbean-gradient text-white px-6 py-3 rounded-xl font-medium hover:shadow-caribbean transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour à l&apos;accueil</span>
        </Link>
      </div>
    </div>
  );
}