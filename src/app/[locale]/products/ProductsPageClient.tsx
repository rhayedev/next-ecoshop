'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import { useAddToCart } from '@/hooks/useAddToCart';
import Link from 'next/link';

export default function ProductsPageClient() {
  const t = useTranslations('products');
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = params.locale;

  const initialPage = Number(searchParams.get('page') ?? 1);
  const initialQ = searchParams.get('q') ?? '';

  const [page, setPage] = useState(initialPage);
  const [q, setQ] = useState(initialQ);

  const { data: products, isLoading, isError } = useProducts(page, q);
  const addToCart = useAddToCart();

  useEffect(() => {
    const paramsSearch = new URLSearchParams();
    if (q) paramsSearch.set('q', q);
    if (page > 1) paramsSearch.set('page', page.toString());
  
    router.replace(`/${params.locale}/products?${paramsSearch.toString()}`);
  }, [q, page, router, params.locale]);
  

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors du chargement</div>;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Produits</h1>

      <div className="mb-6">
        <label htmlFor="search" className="sr-only">
          Rechercher un produit
        </label>
        <input
          id="search"
          type="text"
          placeholder={t('searchPlaceholder')}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products?.map((p) => (
          <li
            key={p.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="p-8 flex flex-col justify-between h-full">
              <Link href={`/products/${p.id}`} className="block mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">{p.name}</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {t('priceLabel')} : <span className="font-semibold">{p.price} €</span>
                </p>
                <span className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  {t('viewProduct')}
                </span>
              </Link>
              <button
                aria-label={`Ajouter ${p.name} au panier`}
                onClick={() => addToCart.mutate(p)}
                className="mt-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('addToCart')}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded"
        >
          {t('prevPage')}
        </button>
        <span>{t('page')} {page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          className="px-4 py-2 border rounded"
        >
          {t('nextPage')}
        </button>
      </div>
    </section>
  );
}
