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

// Add error handling to generateStaticParams
export function generateStaticParams() {
  try {
    const articles = listBlogArticles();
    return articles.map(({ slug }) => ({ slug }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return []; // Return empty array if there's an error
  }
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  try {
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
  } catch (error) {
    console.error('Error generating metadata for slug:', params.slug, error);
    return {
      title: 'Article',
      description: 'Blog article'
    };
  }
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  let article;
  
  try {
    article = getBlogArticle(params.slug);
  } catch (error) {
    console.error('Error fetching article for slug:', params.slug, error);
    notFound();
  }

  if (!article) {
    notFound();
  }

  const locale: BlogLocale = params.locale === 'ar' ? 'ar' : localeFallback;
  const content = article[locale];
  const isArabic = locale === 'ar';

  // Add validation for content properties
  if (!content || !content.sections || !content.takeaways) {
    console.error('Invalid content structure for article:', params.slug);
    notFound();
  }

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
              {content.title || 'Untitled Article'}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: 1.8,
                opacity: 0.9,
                margin: 0
              }}
            >
              {content.description || 'No description available.'}
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
              {content.kicker || 'Insight'}
            </span>
          </div>

          {content.sections?.map((section, index) => (
            <article
              key={section.heading || `section-${index}`}
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
                {section.heading || 'Section Heading'}
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
                {section.paragraphs?.map((paragraph, pIndex) => (
                  <p key={pIndex} style={{ margin: 0 }}>
                    {paragraph}
                  </p>
                )) || <p>No content available.</p>}
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
              {content.takeaways?.map((takeaway, tIndex) => (
                <li key={tIndex}>{takeaway}</li>
              )) || <li>No takeaways available.</li>}
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
              {content.conclusion || 'No conclusion available.'}
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
