/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  // Add this to fix the lockfile warning
  outputFileTracingRoot: __dirname,
  compress: true,
  
  // Image optimization - disable if still having issues
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.NODE_ENV === 'production' ? false : true
  },
  
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  
  // ESLint and TypeScript ignore
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Output configuration
  output: 'standalone',
  
  // ADD these for better build performance
  poweredByHeader: false,
  generateEtags: false,
  
  // ADD this to handle dynamic routes better
  trailingSlash: false,
  
  // ADD this to skip source maps in production for faster builds
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};

module.exports = withNextIntl(nextConfig);
