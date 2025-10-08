'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ServiceFooter() {
  const t = useTranslations('HomePage');

  return (
    <footer style={{
      background: '#0a0e3d',
      color: '#fff',
      padding: '4rem 3rem 2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Image 
              src="/logo.png" 
              alt="The SamurAI Logo" 
              width={35} 
              height={35}
              style={{ objectFit: 'contain' }}
            />
            <span style={{ fontSize: '1.3rem', fontWeight: '700' }}>The SamurAI</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {['f', 't', 'in', 'y'].map((social) => (
              <div key={social} style={{
                width: '35px',
                height: '35px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                {social}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '1rem', fontWeight: '700' }}>LOREM IPSUM</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Many</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Ipsum Is</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Simply As</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Dummys</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Text</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Industry</a>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '1rem', fontWeight: '700' }}>READABLE</h4>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.6' }}>
            {t('footerReadable').substring(0, 150)}...
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: '1rem', fontWeight: '700' }}>CONTACT US</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', opacity: 0.8 }}>
            <p>📞 {t('footerPhone1')}</p>
            <p>📞 {t('footerPhone2')}</p>
            <p>✉️ {t('footerEmail')}</p>
            <p>🌐 {t('footerWebsite')}</p>
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '2rem',
        textAlign: 'center',
        fontSize: '0.85rem',
        opacity: 0.6
      }}>
        <p>{t('footerNote')}</p>
        <p style={{ marginTop: '0.5rem' }}>Copyright © 2025 Privacy Policy | The SamurAI</p>
      </div>
    </footer>
  );
}
