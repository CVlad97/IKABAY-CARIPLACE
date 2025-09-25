export default function MarketplacePage() {
  const products = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      price: 1199,
      originalPrice: 1299,
      image: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=iPhone+15+Pro',
      category: 'electronics',
      rating: 4.8,
      reviews: 234,
      location: 'France',
      seller: 'Apple Store',
      shipping: {
        express: { price: 15, days: '24-48h' },
        maritime: { price: 5, days: '7-14j' },
        relay: { price: 3, days: '3-5j' }
      }
    },
    {
      id: '2',
      name: 'MacBook Air M3',
      price: 1299,
      originalPrice: 1499,
      image: 'https://via.placeholder.com/400x300/6B7280/FFFFFF?text=MacBook+Air+M3',
      category: 'electronics',
      rating: 4.9,
      reviews: 156,
      location: 'Allemagne',
      seller: 'Tech Europe',
      shipping: {
        express: { price: 25, days: '24-48h' },
        maritime: { price: 8, days: '7-14j' },
        relay: { price: 5, days: '3-5j' }
      }
    },
    {
      id: '3',
      name: 'Robe d\'été Tropicale',
      price: 89,
      originalPrice: 129,
      image: 'https://via.placeholder.com/400x300/EC4899/FFFFFF?text=Robe+Tropicale',
      category: 'fashion',
      rating: 4.6,
      reviews: 89,
      location: 'Martinique',
      seller: 'Mode Caraïbe',
      shipping: {
        express: { price: 12, days: '24-48h' },
        maritime: { price: 4, days: '7-14j' },
        relay: { price: 3, days: '3-5j' }
      }
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  return (
    <div className="min-h-screen py-8">
      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white mb-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Marketplace IKABAY
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Produits locaux et internationaux avec livraison centralisée
          </p>
          
          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              className="w-full px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Livraison 
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"> Centralisée </span>
          </h2>
          <p className="text-xl text-gray-600">
            Nos hubs de Roissy et Le Havre centralisent toutes vos commandes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Express */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl text-white mb-4">
              <div className="text-3xl mb-2">✈️</div>
              <h3 className="text-xl font-bold">Livraison Express</h3>
              <p className="text-blue-100">Hub Roissy CDG</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Délai:</span>
                <span className="font-bold">24-48h</span>
              </div>
              <div className="flex justify-between">
                <span>Prix:</span>
                <span className="font-bold">À partir de 8€</span>
              </div>
              <div className="text-sm text-gray-600">
                ✓ Suivi temps réel<br/>
                ✓ Assurance incluse<br/>
                ✓ Livraison sécurisée
              </div>
            </div>
          </div>

          {/* Maritime */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl text-white mb-4">
              <div className="text-3xl mb-2">🚢</div>
              <h3 className="text-xl font-bold">Livraison Maritime</h3>
              <p className="text-green-100">Hub Le Havre</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Délai:</span>
                <span className="font-bold">7-14 jours</span>
              </div>
              <div className="flex justify-between">
                <span>Prix:</span>
                <span className="font-bold">À partir de 3€</span>
              </div>
              <div className="text-sm text-gray-600">
                ✓ Tarifs avantageux<br/>
                ✓ Gros volumes<br/>
                ✓ Éco-responsable
              </div>
            </div>
          </div>

          {/* Points Relais */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl text-white mb-4">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="text-xl font-bold">Points Relais</h3>
              <p className="text-purple-100">Réseau National</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Délai:</span>
                <span className="font-bold">3-5 jours</span>
              </div>
              <div className="flex justify-between">
                <span>Prix:</span>
                <span className="font-bold">À partir de 2€</span>
              </div>
              <div className="text-sm text-gray-600">
                ✓ 15,000+ points<br/>
                ✓ Horaires étendus<br/>
                ✓ Retrait flexible
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Produits Populaires</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                
                {/* Badge réduction */}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Location */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>📍 {product.location}</span>
                  <span>{product.seller}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} avis)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Shipping */}
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <div className="text-sm font-semibold text-gray-900 mb-2">Livraison</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>✈️ Express:</span>
                      <span>{formatPrice(product.shipping.express.price)} - {product.shipping.express.days}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🚢 Maritime:</span>
                      <span>{formatPrice(product.shipping.maritime.price)} - {product.shipping.maritime.days}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>📍 Relais:</span>
                      <span>{formatPrice(product.shipping.relay.price)} - {product.shipping.relay.days}</span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart */}
                <button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-xl font-bold hover:from-teal-600 hover:to-blue-600 transition-all duration-300">
                  🛒 Ajouter au Panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}