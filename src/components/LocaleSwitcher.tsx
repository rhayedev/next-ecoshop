'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
// import {useParams, useSearchParams} from 'next/navigation';
import { SUPPORTED_LOCALES } from '@/i18n/request';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // pathname "interne" (sans préfixe)
  // const params = useParams();            // utile si tu utilises `pathnames`
  // const searchParams = useSearchParams();

  const changeLocale = (nextLocale: string) => {
    // const query =
    //     searchParams.size > 0 ? Object.fromEntries(searchParams.entries()) : undefined;

    // Si tu N'UTILISES PAS `pathnames`, tu peux passer juste le pathname string :
    router.replace(pathname, { locale: nextLocale });

    // Version compatible si tu utilises `pathnames` (et routes dynamiques) :
    // router.replace(
    //     @ts-expect-error: pathname + params correspondent à la route courante
    // {pathname, params, query},
    // {locale: nextLocale}
    // );
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
}
