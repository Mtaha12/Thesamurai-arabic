// app/[locale]/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const common = useTranslations('Common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Header />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 50%, #00bcd4 100%)',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem)',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(0, 188, 212, 0.2) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
        
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          fontWeight: '800',
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          {t('heroTitle').split(' ').slice(0, -1).join(' ')}{' '}
          <span style={{ color: '#00bcd4' }}>{t('heroTitle').split(' ').slice(-1)}</span>
        </h1>
        
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          maxWidth: '700px',
          margin: '0 auto 2.5rem',
          lineHeight: '1.8',
          opacity: 0.9,
          position: 'relative',
          zIndex: 1,
          padding: '0 1rem'
        }}>
          {t('heroSubtitle')}
        </p>

        <button style={{
          background: 'transparent',
          color: '#fff',
          border: '2px solid #fff',
          padding: 'clamp(0.7rem, 1.5vw, 0.8rem) clamp(1.5rem, 4vw, 2.5rem)',
          borderRadius: '30px',
          fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s',
          position: 'relative',
          zIndex: 1
        }}>
          {t('heroTagline')}
        </button>
      </section>

      {/* Partners Section */}
      <section id="industries" style={{
        background: '#0a0e3d',
        padding: 'clamp(2rem, 5vw, 3rem)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'clamp(1rem, 3vw, 2rem)'
      }}>
        {['ForgeRock', 'Microsoft Azure', 'SentinelOne', 'PingIdentity', 'THALES', 'okta'].map((partner) => (
          <div key={partner} style={{
            color: '#fff',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontWeight: '600',
            opacity: 0.8
          }}>
            {partner}
          </div>
        ))}
      </section>

      {/* Who We Are Section */}
      <section id="about" style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: 'clamp(2rem, 5vw, 4rem)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div>
          <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 1.2vw, 0.95rem)', marginBottom: '0.5rem' }}>Who We Are</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            color: '#0a0e3d',
            lineHeight: '1.2',
            marginBottom: '2rem'
          }}>
            Defenders Of<br />Your Digital Realm
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8', fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)' }}>
            {t('aboutDescription')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Cybersecurity Card */}
          <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: '#0a0e3d',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: '#00bcd4',
              fontSize: '1.5rem'
            }}>🔒</div>
            <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', fontWeight: '700', color: '#0a0e3d', marginBottom: '0.75rem' }}>
              {t('cybersecurityTitle')}
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}>
              {t('cybersecurityDescription')}
            </p>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)' }}>
              {t('cybersecurityDetail')}
            </p>
            <button style={{
              background: 'transparent',
              border: 'none',
              color: '#00bcd4',
              fontSize: '2rem',
              cursor: 'pointer',
              marginTop: '1rem'
            }}>→</button>
          </div>

          {/* IT Consultation Card */}
          <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: '#0a0e3d',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: '#00bcd4',
              fontSize: '1.5rem'
            }}>💡</div>
            <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', fontWeight: '700', color: '#0a0e3d', marginBottom: '0.75rem' }}>
              {t('consultationTitle')}
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}>
              {t('consultationDescription')}
            </p>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)' }}>
              {t('consultationButton')}
            </p>
            <button style={{
              background: 'transparent',
              border: 'none',
              color: '#00bcd4',
              fontSize: '2rem',
              cursor: 'pointer',
              marginTop: '1rem'
            }}>→</button>
          </div>
        </div>
      </section>

      {/* Cybersecurity Solutions Section */}
      <section id="locations" style={{
        background: '#0a0e3d',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '800',
            color: '#fff',
            marginBottom: '1.5rem'
          }}>
            {t('solutionsTitle')}
          </h2>
          <p style={{ color: '#ccc', lineHeight: '1.8', marginBottom: '2rem', fontSize: 'clamp(0.95rem, 1.5vw, 1rem)' }}>
            {t('solutionsIntro')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button style={{
              background: '#00bcd4',
              color: '#0a0e3d',
              border: 'none',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '700',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              {t('solutions.aiSecurity')}
            </button>
            <button style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '600',
              textAlign: 'left',
              cursor: 'pointer'
            }}>
              {t('solutions.identity')}
            </button>
            <button style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '600',
              textAlign: 'left',
              cursor: 'pointer'
            }}>
              {t('solutions.lorem')}
            </button>
            <button style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '600',
              textAlign: 'left',
              cursor: 'pointer'
            }}>
              {t('solutions.zeroTrust')}
            </button>
            <button style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '600',
              textAlign: 'left',
              cursor: 'pointer'
            }}>
              {t('solutions.network')}
            </button>
            <button style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '600',
              textAlign: 'left',
              cursor: 'pointer'
            }}>
              {t('solutions.cloud')}
            </button>
            <button style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '600',
              textAlign: 'left',
              cursor: 'pointer'
            }}>
              {t('solutions.endpoint')}
            </button>
          </div>
        </div>

        <div style={{
          background: '#1a1f71',
          borderRadius: '20px',
          padding: '3rem',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(0,188,212,0.1) 0%, transparent 100%)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem'
          }}>
            👨‍💻
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section style={{
        background: '#0a0e3d',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: '800',
          color: '#fff',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          {t('servicesTitle')}
        </h2>
        <p style={{
          color: '#ccc',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto clamp(2rem, 5vw, 4rem)',
          lineHeight: '1.8',
          padding: '0 1rem',
          fontSize: 'clamp(0.95rem, 1.5vw, 1rem)'
        }}>
          {t('servicesIntro')}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2rem)',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {[
            { title: t('services.consulting'), desc: t('services.consultingDesc'), icon: '📊' },
            { title: t('services.infrastructure'), desc: t('services.infrastructureDesc'), icon: '🏗️' },
            { title: t('services.resourcing'), desc: t('services.resourcingDesc'), icon: '👥' },
            { title: t('services.training'), desc: t('services.trainingDesc'), icon: '🎓' },
            { title: t('services.managed'), desc: t('services.managedDesc'), icon: '⚙️' },
            { title: t('services.devsecops'), desc: t('services.devsecopsDesc'), icon: '🔧' }
          ].map((service, idx) => (
            <div key={idx} style={{
              background: '#1a1f71',
              borderRadius: '15px',
              padding: '2rem',
              border: '1px solid rgba(0,188,212,0.2)',
              transition: 'transform 0.3s'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#0a0e3d',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '2rem'
              }}>
                {service.icon}
              </div>
              <h3 style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '1rem'
              }}>
                {service.title}
              </h3>
              <p style={{
                color: '#ccc',
                lineHeight: '1.6',
                fontSize: 'clamp(0.9rem, 1.2vw, 0.95rem)',
                marginBottom: '1.5rem'
              }}>
                {service.desc}
              </p>
              <button style={{
                background: 'transparent',
                border: 'none',
                color: '#00bcd4',
                fontSize: '2rem',
                cursor: 'pointer'
              }}>→</button>
            </div>
          ))}
        </div>
      </section>

      {/* Core Value Statements Section */}
      <section style={{
        background: '#00bcd4',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#0a0e3d',
            marginBottom: '2rem'
          }}>
            {t('valuesTitle')}
          </h2>
          <div style={{
            fontSize: '8rem',
            fontWeight: '900',
            color: '#0a0e3d',
            opacity: 0.3,
            lineHeight: 1
          }}>
            "
          </div>
          <p style={{
            color: '#0a0e3d',
            lineHeight: '1.8',
            fontSize: '1.05rem',
            marginBottom: '1rem'
          }}>
            {t('valuesDescription1')}
          </p>
          <p style={{
            color: '#0a0e3d',
            lineHeight: '1.8',
            fontSize: '0.95rem'
          }}>
            {t('valuesDescription2')}
          </p>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '3rem',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(10,14,61,0.05) 0%, transparent 100%)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem'
          }}>
            👥
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" style={{
        background: '#fff',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: '800',
          color: '#0a0e3d',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          {t('resourcesTitle')}
        </h2>
        <p style={{
          color: '#666',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto clamp(2rem, 5vw, 4rem)',
          lineHeight: '1.8',
          padding: '0 1rem',
          fontSize: 'clamp(0.95rem, 1.5vw, 1rem)'
        }}>
          {t('resourcesIntro')}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2rem)',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {[
            { title: t('resources.penetration'), image: '🔐' },
            { title: t('resources.cybersecurity'), image: '🛡️' },
            { title: t('resources.blackhat'), image: '🎩' }
          ].map((resource, idx) => (
            <div key={idx} style={{
              background: '#0a0e3d',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem'
              }}>
                {resource.image}
              </div>
              <div style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
                <h3 style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                  fontWeight: '700',
                  color: '#fff',
                  marginBottom: '1.5rem',
                  lineHeight: '1.4'
                }}>
                  {resource.title}
                </h3>
                <button style={{
                  background: '#00bcd4',
                  color: '#0a0e3d',
                  border: 'none',
                  padding: 'clamp(0.6rem, 1.5vw, 0.7rem) clamp(1.2rem, 2.5vw, 1.5rem)',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.85rem, 1.2vw, 0.9rem)'
                }}>
                  {common('readMore')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="careers" style={{
        background: '#fff',
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem)',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: '#f8f9fa',
          borderRadius: '20px',
          padding: 'clamp(2rem, 5vw, 3rem)',
          border: '2px solid #e0e0e0'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '800',
            color: '#0a0e3d',
            marginBottom: '1rem'
          }}>
            {t('footerTitle')}
          </h2>
          <p style={{
            color: '#666',
            marginBottom: '2rem',
            fontSize: 'clamp(0.95rem, 1.5vw, 1rem)'
          }}>
            {t('footerTagline')}
          </p>
          <button style={{
            background: '#00bcd4',
            color: '#fff',
            border: 'none',
            padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 4vw, 3rem)',
            borderRadius: '30px',
            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,188,212,0.3)'
          }}>
            Lorem Ipsum
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
