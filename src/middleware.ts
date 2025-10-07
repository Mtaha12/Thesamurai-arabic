// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    
    // Set a cookie when the user visits the root
    '/(ar|en)/:path*',
    
    // Enable redirects that add missing locales
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};