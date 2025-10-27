'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ProductsPageClient({ products }: { products: any[] }) {
  const t = useTranslations('products');

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((p) => (
          <li
            key={p.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <Link href={`/products/${p.id}`} className="block p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{p.name}</h3>
              <p className="text-gray-600 mb-6 text-lg">
                {t('priceLabel')} : <span className="font-semibold">{p.price} €</span>
              </p>
              <span className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                {t('viewProduct')}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
