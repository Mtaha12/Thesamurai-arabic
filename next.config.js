/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  // Add this to fix the lockfile warning
  outputFileTracingRoot: __dirname,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp']
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
  
  // ADD THIS to fix prerendering errors
  output: 'standalone',
  
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
