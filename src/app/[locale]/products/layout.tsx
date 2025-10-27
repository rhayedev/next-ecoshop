'use client';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

export default function ProductsLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('products');

  return (
    <section className="max-w-7xl mx-auto px-8 py-12">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-10 text-center">
        {t('title')}
      </h2>
      {children}
    </section>
  );
}
