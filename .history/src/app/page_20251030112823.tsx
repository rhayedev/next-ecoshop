'use client';

import { useTranslations } from 'next-intl';
import CartSummary from './components/CartSummary';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <CartSummary />
    </>
  );
}