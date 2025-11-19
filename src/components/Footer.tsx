'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fr';

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">{t('title')}</h3>
          <p className="text-sm text-gray-400">{t('description')}</p>
        </div>

        <nav className="flex space-x-6 text-sm">
          <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
            {t('nav.about')}
          </Link>
          <Link href={`/${locale}/products`} className="hover:text-white transition-colors">
            {t('nav.products')}
          </Link>
          <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">
            {t('nav.blog')}
          </Link>
        </nav>

        <small className="text-gray-500 text-xs">
          © {t('copyright')}
        </small>
      </div>
    </footer>
  );
}
