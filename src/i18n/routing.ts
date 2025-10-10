import { defineRouting } from 'next-intl/routing';
import { SUPPORTED_LOCALES } from '@/i18n/request';

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: 'fr',
  // Optionnel : enlève le préfixe pour la locale par défaut
  localePrefix: 'as-needed',
  // Si tu veux des URL traduites, ajoute les dans un objet `pathnames` ici
});
