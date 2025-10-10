import { getRequestConfig } from 'next-intl/server';

const SUPPORTED_LOCALES = ['fr', 'en'] as const;

export default getRequestConfig(async ({ locale }) => {
	const loc =
		typeof locale === 'string' && SUPPORTED_LOCALES.includes(locale as 'fr' | 'en')
			? (locale as (typeof SUPPORTED_LOCALES)[number])
			: 'fr';

	try {
		const messages = (await import(`./messages/${loc}.json`)).default;
		return { locale: loc, messages };
	} catch {
		// Fallback ultra-sûr en cas d'absence de fichier
		const fallback = (await import('./messages/fr.json')).default;
		return { locale: 'fr', messages: fallback };
	}
});
