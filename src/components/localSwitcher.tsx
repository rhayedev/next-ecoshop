'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
// import {useParams, useSearchParams} from 'next/navigation';
import { SUPPORTED_LOCALES } from '@/i18n/request';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <select
      value={locale}
      onChange={(e) => changeLocale(e.target.value)}
      className="rounded-md border px-2 py-1 bg-transparent text-sm"
      aria-label="Changer de langue"
    >
      {SUPPORTED_LOCALES.map((l) => (
        <option key={l} value={l}>
          {l === 'fr' ? 'Français' : 'English'}
        </option>
      ))}
    </select>
  );