'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from '@/i18n/navigation';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fr';

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-blue-600">Next Shop</div>
        <nav className="flex space-x-4">
          <Link href={`/${locale}/`}>{t('home')}</Link>
          <Link href={`/${locale}/products`}>{t('products')}</Link>
          <Link href={`/${locale}/about`}>{t('about')}</Link>
          <Link href={`/${locale}/blog`}>{t('blog')}</Link>
          <Link href={`/${locale}/cart`}>{t('cart')}</Link>
        </nav>
      </div>
    </header>
  );
}
