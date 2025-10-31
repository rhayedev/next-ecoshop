'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import CartSummary from '../../components/CartSummary';
import Categories from '../../components/Categories';

async function fetchProducts() {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Erreur de chargement des produits');
  return res.json();
}

export default function ProductsPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {(error as Error).message}</p>;

  return (
    <main className="grid grid-cols-3 gap-4" aria-labelledby="products-title">
      {/* H1 : unique sur la page */}
      <h1 id="products-title" className="col-span-3 text-2xl font-bold mb-4 sr-only:not-sr-only">
        Nos produits
      </h1>

      <section className="col-span-2" aria-labelledby="products-title">
        <ul className="product-list" aria-live="polite">
          {data.map((p: any) => (
            <li key={p.id} className="product-card" role="article">
              <h2 className="text-lg font-semibold">
                <Link href={`/products/${p.id}`}>{p.name}</Link>
              </h2>
              <p>{p.price} €</p>
            </li>
          ))}
        </ul>
      </section>

      <aside className="col-span-1" aria-label="Panier et catégories">
        <CartSummary />
        <hr className="my-4" />
        <Categories />
      </aside>
    </main>
  );
}