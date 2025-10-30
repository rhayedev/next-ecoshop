import { getRequestConfig } from 'next-intl/server';
import fs from 'fs';
import path from 'path';

const SUPPORTED_LOCALES = ['fr', 'en'] as const;

export default getRequestConfig(async ({ locale }) => {
  const loc =
    typeof locale === 'string' && SUPPORTED_LOCALES.includes(locale as 'fr' | 'en')
      ? (locale as (typeof SUPPORTED_LOCALES)[number])
      : 'fr';

  try {
    const localeDir = path.join(process.cwd(), 'src', 'messages', loc);
    const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.json'));

    const messages = files.reduce((acc, file) => {
      const filePath = path.join(localeDir, file);
      const fileMessages = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return { ...acc, ...fileMessages };
    }, {} as Record<string, any>);

    return { locale: loc, messages };
  } catch (e) {
    const fallbackPath = path.join(process.cwd(), 'src', 'messages', 'fr', 'common.json');
    const fallback = JSON.parse(fs.readFileSync(fallbackPath, 'utf-8'));
    return { locale: 'fr', messages: fallback };
  }
});
