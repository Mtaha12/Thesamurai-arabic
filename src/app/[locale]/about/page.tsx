import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default async function About() {
  const t = await getTranslations('About');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t('title')}
          </h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-700 mb-4">
              {t('description1')}
            </p>
            <p className="text-gray-700">
              {t('description2')}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}