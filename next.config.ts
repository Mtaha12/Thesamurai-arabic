/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  // Remove experimental.appDir as it's no longer needed in Next.js 15
};

module.exports = withNextIntl(nextConfig);