'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('Footer');
  const navT = useTranslations('Navigation');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Phoenix</h3>
            <p className="text-gray-400 mb-4 max-w-md leading-relaxed">
              {t('description')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              <li><Link href={`/${currentLocale}/about`} className="text-gray-400 hover:text-white transition-colors duration-300" prefetch={false}>{navT('about')}</Link></li>
              <li><Link href={`/${currentLocale}/services`} className="text-gray-400 hover:text-white transition-colors duration-300" prefetch={false}>{navT('services')}</Link></li>
              <li><Link href={`/${currentLocale}/projects`} className="text-gray-400 hover:text-white transition-colors duration-300" prefetch={false}>{navT('projects')}</Link></li>
              <li><Link href={`/${currentLocale}/contact`} className="text-gray-400 hover:text-white transition-colors duration-300" prefetch={false}>{navT('contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{navT('contact')}</h4>
            <div className="text-gray-400 space-y-3">
              <p className="flex items-center space-x-2 rtl:space-x-reverse">
                <span>📧</span>
                <span>hello@phoenix.com</span>
              </p>
              <p className="flex items-center space-x-2 rtl:space-x-reverse">
                <span>📞</span>
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="flex items-center space-x-2 rtl:space-x-reverse">
                <span>📍</span>
                <span>123 Business District</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Phoenix. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}