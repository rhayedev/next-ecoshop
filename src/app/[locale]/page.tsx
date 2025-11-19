'use client';

import { useTranslations } from 'next-intl';

export default function HomePage() {
	const t = useTranslations('home');

	return (
		<section className="max-w-3xl mx-auto text-center space-y-6">
			<h1 className="text-4xl font-bold text-blue-700">{t('title')}</h1>
			<p className="text-lg text-gray-700">{t('description')}</p>
		</section>
	);
}
