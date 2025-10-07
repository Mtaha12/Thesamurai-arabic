import { getTranslations } from 'next-intl/server';

export default async function ServicesPage() {
	const t = await getTranslations('Services');

	return (
		<main className="max-w-7xl mx-auto p-8">
			<h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
			<p className="text-gray-600">{t('description')}</p>
		</main>
	);
}
