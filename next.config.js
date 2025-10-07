/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  // Add this to fix the lockfile warning
  outputFileTracingRoot: __dirname
};

module.exports = withNextIntl(nextConfig);
