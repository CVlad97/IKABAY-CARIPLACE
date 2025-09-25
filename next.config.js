/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Configuration pour autoriser les images distantes depuis Unsplash
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
    ],
    // Formats d'image optimisés pour de meilleures performances
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;