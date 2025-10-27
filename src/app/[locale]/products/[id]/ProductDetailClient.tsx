'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ProductDetailClient({ product }: { product: any }) {
  const t = useTranslations('products');

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-700">
        <h2 className="text-2xl font-bold">{t('notFoundTitle')}</h2>
        <p>{t('notFoundDesc')}</p>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-gray-100">
      <h3 className="text-3xl font-bold text-blue-700 mb-4">{product.name}</h3>
      <p className="text-gray-700 text-lg mb-6">
        {t('priceLabel')} : <span className="font-semibold">{product.price} €</span>
      </p>
      <Link
        href="/products"
        className="inline-block px-5 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
      >
        {t('backButton')}
      </Link>
    </article>
  );
}
