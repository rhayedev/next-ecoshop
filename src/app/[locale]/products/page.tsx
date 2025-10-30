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
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <ul className="product-list">
          {data.map((p: any) => (
            <li key={p.id} className="product-card">
              <Link href={`/products/${p.id}`}>{p.name}</Link>
              <p>{p.price} €</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <CartSummary />
        <hr className="my-4" />
        <Categories />
      </div>
    </div>
  );
}
