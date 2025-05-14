/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  webpackDevMiddleware: (config) => {
    config.client = {
      overlay: false, // Desactiva el overlay de errores
    };
    return config;
  },
  experimental: {
    allowedDevOrigins: ['http://192.168.0.100:3000'], // ⚠️ Usa la IP real desde donde accedes
  },
};

module.exports = nextConfig;
