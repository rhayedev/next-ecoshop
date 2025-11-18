import { SUPPORTED_LOCALES, Locale, isLocale } from './request';

export const MESSAGE_LOADERS: Record<Locale, () => Promise<any>> = {
  fr: () => import('../messages/fr.json'),
  en: () => import('../messages/en.json')
};

export async function loadMessages(locale: string) {
  const loc: Locale = isLocale(locale) ? locale : 'fr';

  try {
    const { default: messages } = await MESSAGE_LOADERS[loc]();
    return { locale: loc, messages };
  } catch {
    const { default: messages } = await MESSAGE_LOADERS['fr']();
    return { locale: 'fr', messages };
  }
}
