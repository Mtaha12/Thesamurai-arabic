import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { listBlogArticles, getBlogArticle, BlogLocale } from '@/data/blogPosts';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const localeFallback: BlogLocale = 'en';

type ArticlePageProps = {
  params: {
    slug: string;
    locale?: string;
  };
};

export function generateStaticParams() {
  return listBlogArticles().map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getBlogArticle(params.slug);
  if (!article) {
    return {
      title: 'Article not found',
      description: 'The requested article could not be located.'
    };
  }

  const locale = params.locale === 'ar' ? 'ar' : localeFallback;
  const content = article[locale];

  return {
    title: content.title,
    description: content.description.slice(0, 155)
  };
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  const article = getBlogArticle(params.slug);
  if (!article) {
    const isArabicFallback = params.locale === 'ar';
    const blogHref = isArabicFallback ? '/ar/blog' : '/en/blog';
    const contactHref = isArabicFallback ? '/ar/contact' : '/en/contact';
    const heading = isArabicFallback ? 'المقال غير متاح حاليًا' : 'Article coming soon';
    const message = isArabicFallback
      ? 'لم نتمكن من العثور على المقال المطلوب. تصفح أحدث التحليلات أو عد إلى صفحة المدونة للمزيد.'
      : "We couldn't find the story you were after. Explore the latest insights or return to the blog homepage for more coverage.";
    const browseLabel = isArabicFallback ? 'تصفح كل المقالات' : 'View all articles';
    const contactLabel = isArabicFallback ? 'تواصل مع فريقنا' : 'Talk to our team';

    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem'
        }}
      >
        <div
          style={{
            maxWidth: '520px',
            background: '#fff',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 20px 45px rgba(10, 14, 61, 0.12)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 800,
              color: '#0a0e3d',
              margin: 0
            }}
          >
            {heading}
          </h1>
          <p
            style={{
              color: '#4b5563',
              lineHeight: 1.7,
              fontSize: '1.05rem',
              margin: 0
            }}
          >
            {message}
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <Link
              href={blogHref}
              style={{
                background: '#0a0e3d',
                color: '#fff',
                padding: '0.9rem 2.2rem',
                borderRadius: '28px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              {browseLabel}
            </Link>
            <Link
              href={contactHref}
              style={{
                background: 'transparent',
                border: '2px solid #0a0e3d',
                color: '#0a0e3d',
                padding: '0.9rem 2.2rem',
                borderRadius: '28px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              {contactLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const locale: BlogLocale = params.locale === 'ar' ? 'ar' : localeFallback;
  const content = article[locale];
  const isArabic = locale === 'ar';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        <section
          style={{
            background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 50%, #00bcd4 100%)',
            color: '#fff',
            padding: 'clamp(3.5rem, 9vw, 6rem) clamp(1.5rem, 5vw, 3rem)'
          }}
        >
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <Link
              href={isArabic ? '/ar/blog' : '/en/blog'}
              style={{
                color: '#69E8E1',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}
            >
              {isArabic ? 'عودة إلى المدونة' : 'Back to blog'}
            </Link>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.95rem'
              }}
            >
              <span>{article.category}</span>
              <span style={{ opacity: 0.6 }}>•</span>
              <span>{article.date}</span>
              <span style={{ opacity: 0.6 }}>•</span>
              <span>{article.readTime}</span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                margin: 0
              }}
            >
              {content.title}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: 1.8,
                opacity: 0.9,
                margin: 0
              }}
            >
              {content.description}
            </p>
          </div>
        </section>

        <section
          style={{
            padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
            maxWidth: '968px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem'
          }}
        >
          <div
            style={{
              background: '#f1f5f9',
              borderRadius: '18px',
              padding: '2rem',
              border: '1px solid rgba(10, 14, 61, 0.08)'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '0.6rem 1.2rem',
                borderRadius: '999px',
                background: 'rgba(105, 232, 225, 0.2)',
                color: '#0a0e3d',
                fontWeight: 600,
                letterSpacing: '0.05em',
                fontSize: '0.85rem'
              }}
            >
              {content.kicker}
            </span>
          </div>

          {content.sections.map((section) => (
            <article
              key={section.heading}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                borderBottom: '1px solid rgba(10, 14, 61, 0.1)',
                paddingBottom: '2.5rem'
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                  fontWeight: 700,
                  color: '#0a0e3d',
                  margin: 0
                }}
              >
                {section.heading}
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  color: '#374151',
                  fontSize: '1.05rem',
                  lineHeight: 1.85
                }}
              >
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} style={{ margin: 0 }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}

          <div
            style={{
              background: '#0a0e3d',
              color: '#fff',
              borderRadius: '20px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
                fontWeight: 700,
                margin: 0
              }}
            >
              {isArabic ? 'أبرز النقاط' : 'Key takeaways'}
            </h3>
            <ul
              style={{
                listStyle: isArabic ? 'inside' : 'inside',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                fontSize: '1rem',
                lineHeight: 1.7
              }}
            >
              {content.takeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              background: '#f8f9fa',
              borderRadius: '18px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              border: '1px solid rgba(10, 14, 61, 0.06)'
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(1.4rem, 2.6vw, 1.8rem)',
                fontWeight: 700,
                color: '#0a0e3d',
                margin: 0
              }}
            >
              {isArabic ? 'الخلاصة' : 'Conclusion'}
            </h3>
            <p
              style={{
                color: '#475569',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                margin: 0
              }}
            >
              {content.conclusion}
            </p>
            <div>
              <Link
                href={isArabic ? '/ar/contact' : '/en/contact'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.9rem 2.4rem',
                  borderRadius: '30px',
                  background: '#0a0e3d',
                  color: '#fff',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                {isArabic ? 'تحدث مع خبير' : 'Talk to an expert'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
