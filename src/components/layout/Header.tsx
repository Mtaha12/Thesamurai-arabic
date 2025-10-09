'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations('Navigation');
  const tServices = useTranslations('Services');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const services = [
    { name: tServices('consulting'), href: `/${currentLocale}/services/consulting` },
    { name: tServices('infrastructure'), href: `/${currentLocale}/services/infrastructure` },
    { name: tServices('resourcing'), href: `/${currentLocale}/services/resourcing` },
    { name: tServices('training'), href: `/${currentLocale}/services/training` },
    { name: tServices('managedIT'), href: `/${currentLocale}/services/managed-it` },
    { name: tServices('devsecops'), href: `/${currentLocale}/services/devsecops` },
  ];

  return (
    <header style={{
      background: 'linear-gradient(135deg, #001F3F 0%, #000814 100%)',
      padding: '1rem 3rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link href={`/${currentLocale}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <Image 
            src="/logo.png" 
            alt="The SamurAI Logo" 
            width={60} 
            height={60}
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          color: '#fff'
        }} className="hidden md:flex">
          {/* Services Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '500',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem'
            }}>
              {t('services')} <ChevronDown size={16} />
            </button>
            {servicesOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                minWidth: '250px',
                marginTop: '0.5rem',
                overflow: 'hidden'
              }}>
                {services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1.25rem',
                      color: '#001F3F',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '500',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem'
            }}>
              {t('solutions')} <ChevronDown size={16} />
            </button>
            {solutionsOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                minWidth: '250px',
                marginTop: '0.5rem',
                overflow: 'hidden'
              }}>
                <Link href="#" style={{ display: 'block', padding: '0.75rem 1.25rem', color: '#001F3F', textDecoration: 'none', fontSize: '0.9rem', borderBottom: '1px solid #f0f0f0' }}>AI Security</Link>
                <Link href="#" style={{ display: 'block', padding: '0.75rem 1.25rem', color: '#001F3F', textDecoration: 'none', fontSize: '0.9rem', borderBottom: '1px solid #f0f0f0' }}>Identity Management</Link>
                <Link href="#" style={{ display: 'block', padding: '0.75rem 1.25rem', color: '#001F3F', textDecoration: 'none', fontSize: '0.9rem', borderBottom: '1px solid #f0f0f0' }}>Zero Trust</Link>
                <Link href="#" style={{ display: 'block', padding: '0.75rem 1.25rem', color: '#001F3F', textDecoration: 'none', fontSize: '0.9rem' }}>Cloud Security</Link>
              </div>
            )}
          </div>

          <a href={`/${currentLocale}#industries`} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>{t('industries')}</a>
          <a href={`/${currentLocale}#locations`} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>{t('locations')}</a>
          <a href={`/${currentLocale}#resources`} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>{t('resources')}</a>
          <a href={`/${currentLocale}#careers`} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>{t('careers')}</a>
          <a href={`/${currentLocale}#about`} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>{t('aboutUs')}</a>
          
          <Link href={`/${currentLocale}/contact`}>
            <button style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid #fff',
              padding: '0.6rem 1.5rem',
              borderRadius: '25px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.3s'
            }}>
              {t('getInTouch')}
            </button>
          </Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <LanguageSwitcher />
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden" style={{
          background: '#001F3F',
          marginTop: '1rem',
          borderRadius: '8px',
          padding: '1rem'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <button 
                onClick={() => setServicesOpen(!servicesOpen)}
                style={{
                  color: '#fff',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {t('services')} <ChevronDown size={16} />
              </button>
              {servicesOpen && (
                <div style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      style={{
                        display: 'block',
                        padding: '0.5rem',
                        color: '#ccc',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <a href={`/${currentLocale}#industries`} style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem' }} onClick={() => setIsMenuOpen(false)}>{t('industries')}</a>
            <a href={`/${currentLocale}#locations`} style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem' }} onClick={() => setIsMenuOpen(false)}>{t('locations')}</a>
            <a href={`/${currentLocale}#resources`} style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem' }} onClick={() => setIsMenuOpen(false)}>{t('resources')}</a>
            <a href={`/${currentLocale}#careers`} style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem' }} onClick={() => setIsMenuOpen(false)}>{t('careers')}</a>
            <a href={`/${currentLocale}#about`} style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem' }} onClick={() => setIsMenuOpen(false)}>{t('aboutUs')}</a>
          </nav>
        </div>
      )}
    </header>
  );
}
