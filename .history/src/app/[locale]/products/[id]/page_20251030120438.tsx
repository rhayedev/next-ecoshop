'use client';

import { useParams } from 'next/navigation';
import { Products } from '@/lib/products';
import { useCart } from '../../../stores/Cart';

export default function ProductDetailPage() {
  const params = useParams();
  const { id, locale } = params as { id: string; locale: string };
  const product = Products.list().find(p => p.id === id);
  const add = useCart(s => s.add);

  if (!product) return <div>Produit introuvable</div>;

  return (
    <main>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ maxWidth: 300 }} />
      <p>Prix : {product.price} €</p>
      <button
        onClick={() => add({ id: product.id, name: product.name, price: product.price }, 1)}
        style={{ marginTop: 16 }}
      >
        {locale === 'fr' ? 'Ajouter au panier' : 'Add to cart'}
      </button>
      <p>{product.description}</p>
    </main>
  );
}