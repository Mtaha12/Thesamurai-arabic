// app/[locale]/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const common = useTranslations('Common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const heroPillars = (t.raw('heroPillars') as string[]) || [];
  type Testimonial = {
    quote: string;
    client: string;
    role: string;
    caseStudyLabel: string;
    caseStudySlug: string;
  };
  const testimonials = (t.raw('testimonialsList') as Testimonial[]) || [];
  const testimonialsCtaSlug = t('testimonialsCtaSlug');
  const testimonialsCtaHref = testimonialsCtaSlug
    ? `/${currentLocale}/${testimonialsCtaSlug}`
    : `/${currentLocale}`;
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const activeTestimonialData = testimonials[activeTestimonial] ?? null;
  type TeamMember = {
    name: string;
    role: string;
    bio: string;
  };
  const teamMembers = (t.raw('team.members') as TeamMember[]) || [];
  const gatedAssetPoints = (t.raw('gatedAsset.points') as string[]) || [];
  const contactItems = (t.raw('contactBlock.items') as { label: string; value: string }[]) || [];
  type ResourceCard = {
    title: string;
    description: string;
    emoji: string;
    slug: string;
    cta: string;
  };
  const resourceCards = (t.raw('resourcesCards') as ResourceCard[]) || [];

  const buildLocaleHref = (href: string) => {
    if (!href) return '#';
    if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://')) {
      return href;
    }
    const normalized = href.startsWith('/') ? href.slice(1) : href;
    return `/${currentLocale}/${normalized}`;
  };

  const contactCtaHref = buildLocaleHref(t('contactBlock.ctaHref'));
  const gatedAssetFormId = 'gated-report-form';

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
          marginBottom: '1.25rem',
          position: 'relative',
          zIndex: 1,
          lineHeight: 1.15
        }}>
          {t('heroTitle')}
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          maxWidth: '760px',
          margin: '0 auto 1.5rem',
          lineHeight: 1.8,
          opacity: 0.9,
          position: 'relative',
          zIndex: 1,
          padding: '0 1rem'
        }}>
          {t('heroSubtitle')}
        </p>

        <p style={{
          fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
          maxWidth: '640px',
          margin: '0 auto 2rem',
          lineHeight: 1.7,
          opacity: 0.85,
          position: 'relative',
          zIndex: 1,
          padding: '0 1rem'
        }}>
          {t('heroSupporting')}
        </p>

        {heroPillars.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '2.5rem',
              position: 'relative',
              zIndex: 1,
              padding: '0 1rem'
            }}
          >
            {heroPillars.map((pillar) => (
              <span
                key={pillar}
                style={{
                  padding: '0.55rem 1.4rem',
                  borderRadius: '999px',
                  background: 'rgba(105, 232, 225, 0.18)',
                  color: '#69E8E1',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.03em'
                }}
              >
                {pillar}
              </span>
            ))}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            position: 'relative',
            zIndex: 1,
            marginBottom: '1rem'
          }}
        >
          <Link
            href={heroPillars.length ? '#miercom-report' : '#resources'}
            prefetch={false}
            style={{
              background: '#69E8E1',
              color: '#0a0e3d',
              border: 'none',
              padding: 'clamp(0.75rem, 1.8vw, 0.9rem) clamp(1.8rem, 4vw, 2.6rem)',
              borderRadius: '30px',
              fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(105, 232, 225, 0.25)'
            }}
          >
            {t('heroPrimaryCta')}
          </Link>
          <Link
            href={`/${currentLocale}/contact`}
            prefetch={false}
            style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid rgba(255,255,255,0.7)',
              padding: 'clamp(0.75rem, 1.8vw, 0.9rem) clamp(1.8rem, 4vw, 2.6rem)',
              borderRadius: '30px',
              fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'background 0.3s ease, color 0.3s ease'
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              event.currentTarget.style.color = '#69E8E1';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = 'transparent';
              event.currentTarget.style.color = '#fff';
            }}
          >
            {t('heroSecondaryCta')}
          </Link>
        </div>

        <p
          style={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.6,
            position: 'relative',
            zIndex: 1,
            padding: '0 1rem'
          }}
        >
          {t('heroPrimaryCtaNote')}
        </p>
      </section>

      {/* Partners Section */}
      <section id="industries" style={{
        background: '#0a0e3d',
        padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem)'
      }}>
        <div style={{
          maxWidth: '1180px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(1.5rem, 4vw, 2.5rem)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '0.75rem'
            }}>
              {t('partnersHeadline')}
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '720px',
              lineHeight: 1.7,
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              margin: '0 auto'
            }}>
              {t('partnersSubheadline')}
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(1rem, 3vw, 2.5rem)'
          }}>
            {['ForgeRock', 'Microsoft Azure', 'SentinelOne', 'PingIdentity', 'THALES', 'okta'].map((partner) => (
              <div key={partner} style={{
                color: '#fff',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                fontWeight: '600',
                opacity: 0.85,
                letterSpacing: '0.04em'
              }}>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && activeTestimonialData && (
        <section
          style={{
            background: '#f8f9fa',
            padding: 'clamp(3rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)'
          }}
        >
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: 'clamp(2rem, 5vw, 3rem)',
              alignItems: 'center'
            }}
          >
            <div>
              <p
                style={{
                  color: '#00bcd4',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem'
                }}
              >
                {t('testimonialsTitle')}
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  fontWeight: 800,
                  color: '#0a0e3d',
                  marginBottom: '1rem'
                }}
              >
                {activeTestimonialData.client}
              </h2>
              <p
                style={{
                  color: '#555',
                  lineHeight: 1.7,
                  fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                  marginBottom: '0.75rem'
                }}
              >
                {activeTestimonialData.role}
              </p>
              <p
                style={{
                  color: '#666',
                  lineHeight: 1.8,
                  fontSize: 'clamp(1.05rem, 1.9vw, 1.2rem)',
                  fontStyle: 'italic',
                  marginBottom: '2rem'
                }}
              >
                “{activeTestimonialData.quote}”
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignItems: 'center'
                }}
              >
                <Link
                  href={testimonialsCtaHref}
                  prefetch={false}
                  style={{
                    background: '#0a0e3d',
                    color: '#fff',
                    borderRadius: '30px',
                    padding: '0.85rem 2.4rem',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    boxShadow: '0 14px 32px rgba(10, 14, 61, 0.18)'
                  }}
                >
                  {t('testimonialsCtaLabel')}
                </Link>
                <Link
                  href={`/${currentLocale}/${activeTestimonialData.caseStudySlug}`}
                  prefetch={false}
                  style={{
                    color: '#00bcd4',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontSize: '0.95rem'
                  }}
                >
                  {activeTestimonialData.caseStudyLabel}
                </Link>
              </div>
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: 'clamp(2.5rem, 6vw, 3.5rem)',
                boxShadow: '0 20px 45px rgba(10, 14, 61, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                  lineHeight: 1.8,
                  color: '#0a0e3d'
                }}
              >
                “{activeTestimonialData.quote}”
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  style={{
                    background: '#0a0e3d',
                    color: '#fff',
                    border: 'none',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                  aria-label="Previous testimonial"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  style={{
                    background: '#69E8E1',
                    color: '#0a0e3d',
                    border: 'none',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    boxShadow: '0 12px 26px rgba(105, 232, 225, 0.3)'
                  }}
                  aria-label="Next testimonial"
                >
                  ›
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '0.45rem'
                }}
              >
                {testimonials.map((_, index) => (
                  <span
                    key={index}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background:
                        index === activeTestimonial ? '#0a0e3d' : 'rgba(10,14,61,0.2)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section
          style={{
            padding: 'clamp(3.2rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
            background: '#f8f9fa'
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(1.9rem, 4vw, 2.7rem)',
                fontWeight: 800,
                color: '#0a0e3d',
                textAlign: 'center',
                marginBottom: '1rem'
              }}
            >
              {t('team.title')}
            </h2>
            <p
              style={{
                color: '#555',
                textAlign: 'center',
                maxWidth: '820px',
                margin: '0 auto clamp(2.5rem, 5vw, 3.5rem)',
                lineHeight: 1.8,
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)'
              }}
            >
              {t('team.subtitle')}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '2.2rem',
                    border: '1px solid rgba(10,14,61,0.07)',
                    boxShadow: '0 16px 40px rgba(10, 14, 61, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      background: '#0a0e3d',
                      color: '#69E8E1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1.25rem'
                    }}
                  >
                    {member.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        fontWeight: 700,
                        color: '#0a0e3d'
                      }}
                    >
                      {member.name}
                    </p>
                    <p style={{ color: '#00bcd4', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {member.role}
                    </p>
                    <p style={{ color: '#555', lineHeight: 1.7 }}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

        {resourceCards.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {resourceCards.map((card) => (
              <div key={card.title} style={{
                background: '#0a0e3d',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100%'
              }}>
                <div style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem'
                }}>
                  {card.emoji}
                </div>
                <div style={{ padding: 'clamp(1.5rem, 3vw, 2rem)', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                  <h3 style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.4
                  }}>
                    {card.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, fontSize: '0.95rem', flexGrow: 1 }}>
                    {card.description}
                  </p>
                  <Link
                    href={buildLocaleHref(card.slug)}
                    prefetch={false}
                    style={{
                      alignSelf: 'flex-start',
                      background: '#00bcd4',
                      color: '#0a0e3d',
                      borderRadius: '8px',
                      padding: '0.65rem 1.4rem',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      textDecoration: 'none'
                    }}
                  >
                    {card.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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

      {/* Gated Asset Section */}
      <section
        style={{
          background: '#0a0e3d',
          padding: 'clamp(3rem, 9vw, 6rem) clamp(1.5rem, 6vw, 3.5rem)'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(2rem, 5vw, 3rem)',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              background: '#1a1f71',
              borderRadius: '24px',
              padding: 'clamp(2.2rem, 6vw, 3rem)',
              boxShadow: '0 25px 50px rgba(10, 14, 61, 0.25)'
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: '#69E8E1',
                marginBottom: '1rem'
              }}
            >
              {t('gatedAsset.title')}
            </h3>
            <p
              style={{
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.8,
                fontSize: 'clamp(0.98rem, 1.6vw, 1.1rem)',
                marginBottom: '1.75rem'
              }}
            >
              {t('gatedAsset.subtitle')}
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gap: '0.75rem',
                color: 'rgba(255,255,255,0.8)'
              }}
            >
              {gatedAssetPoints.map((point) => (
                <li key={point}>
                  <span style={{ color: '#69E8E1', marginRight: '0.5rem' }}>•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: '24px',
              padding: 'clamp(2.2rem, 6vw, 3rem)',
              boxShadow: '0 25px 50px rgba(10, 14, 61, 0.25)'
            }}
          >
            <h4
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontWeight: 800,
                color: '#0a0e3d',
                marginBottom: '1.5rem'
              }}
            >
              {t('gatedAsset.form.title')}
            </h4>
            <form id={gatedAssetFormId} style={{ display: 'grid', gap: '1rem' }}>
              <label style={{ display: 'grid', gap: '0.4rem', fontSize: '0.9rem', color: '#444' }}>
                {t('gatedAsset.form.nameLabel')}
                <input
                  type="text"
                  name="name"
                  placeholder={t('gatedAsset.form.nameLabel')}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #dce0f5',
                    fontSize: '0.95rem'
                  }}
                  required
                />
              </label>
              <label style={{ display: 'grid', gap: '0.4rem', fontSize: '0.9rem', color: '#444' }}>
                {t('gatedAsset.form.emailLabel')}
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #dce0f5',
                    fontSize: '0.95rem'
                  }}
                  required
                />
              </label>
              <label style={{ display: 'grid', gap: '0.4rem', fontSize: '0.9rem', color: '#444' }}>
                {t('gatedAsset.form.companyLabel')}
                <input
                  type="text"
                  name="company"
                  placeholder={t('gatedAsset.form.companyLabel')}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #dce0f5',
                    fontSize: '0.95rem'
                  }}
                />
              </label>
              <label style={{ display: 'grid', gap: '0.4rem', fontSize: '0.9rem', color: '#444' }}>
                {t('gatedAsset.form.roleLabel')}
                <input
                  type="text"
                  name="role"
                  placeholder={t('gatedAsset.form.roleLabel')}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #dce0f5',
                    fontSize: '0.95rem'
                  }}
                />
              </label>

              <button
                type="submit"
                style={{
                  marginTop: '0.5rem',
                  background: '#0a0e3d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '0.9rem 2.4rem',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                {t('gatedAsset.form.cta')}
              </button>
              <p style={{ color: '#3c3c66', fontSize: '0.85rem', lineHeight: 1.6 }}>
                {t('gatedAsset.form.success')}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        style={{
          background: '#f5fbfb',
          padding: 'clamp(3rem, 9vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)'
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: '#fff',
            borderRadius: '24px',
            padding: 'clamp(2.2rem, 6vw, 3rem)',
            boxShadow: '0 20px 40px rgba(10, 14, 61, 0.08)',
            textAlign: 'center'
          }}
        >
          <h3
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)',
              fontWeight: 800,
              color: '#0a0e3d',
              marginBottom: '1rem'
            }}
          >
            {t('newsletter.title')}
          </h3>
          <p
            style={{
              color: '#555',
              lineHeight: 1.8,
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              marginBottom: '1.75rem'
            }}
          >
            {t('newsletter.subtitle')}
          </p>
          <form
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            <input
              type="email"
              name="newsletter-email"
              placeholder={t('newsletter.emailPlaceholder')}
              style={{
                padding: '0.9rem 1.2rem',
                borderRadius: '999px',
                border: '1px solid #dce0f5',
                fontSize: '0.95rem'
              }}
              required
            />
            <button
              type="submit"
              style={{
                background: '#00bcd4',
                color: '#fff',
                border: 'none',
                borderRadius: '999px',
                padding: '0.9rem 2.5rem',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              {t('newsletter.cta')}
            </button>
          </form>
          <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '1rem' }}>
            {t('newsletter.privacy')}
          </p>
        </div>
      </section>

      {/* Contact Block */}
      <section
        style={{
          padding: 'clamp(3rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)'
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            background: '#0a0e3d',
            borderRadius: '24px',
            padding: 'clamp(2.5rem, 6vw, 3.5rem)',
            color: '#fff',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.8rem, 5vw, 2.5rem)'
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)',
                fontWeight: 800,
                marginBottom: '0.75rem'
              }}
            >
              {t('contactBlock.title')}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
              {t('contactBlock.subtitle')}
            </p>
          </div>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {contactItems.map((item) => (
              <div key={item.label} style={{ color: 'rgba(255,255,255,0.75)' }}>
                <span style={{ color: '#69E8E1', fontWeight: 600 }}>{item.label}</span>
                <br />
                <span>{item.value}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.5rem'
            }}
          >
            <Link
              href={contactCtaHref}
              prefetch={false}
              style={{
                alignSelf: 'flex-start',
                background: '#69E8E1',
                color: '#0a0e3d',
                padding: '0.95rem 2.6rem',
                borderRadius: '30px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.95rem'
              }}
            >
              {t('contactBlock.ctaLabel')}
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              {t('contactBlock.note')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
