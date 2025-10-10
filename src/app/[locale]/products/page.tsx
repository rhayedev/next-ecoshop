import Link from 'next/link';
import { Products } from '@/lib/products';

export const metadata = {
  title: 'Next Shop — Produits',
  description: 'Liste des produits',
};

export default async function ProductsPage() {
  const products = await Products.list();
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <Link href={`/products/${p.id}`}>
            {p.name} — {p.price} €
          </Link>
        </li>
      ))}
    </ul>
  );
}
