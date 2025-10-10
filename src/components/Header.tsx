'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function Header() {
  const t = useTranslations('nav');

  return (
    <nav className="px-4 py-3">
      <Link href="/">{t('home')}</Link> <Link href="/products">{t('products')}</Link>{' '}
      <Link href="/about">{t('about')}</Link>
      <LocaleSwitcher />
    </nav>
  );
}
