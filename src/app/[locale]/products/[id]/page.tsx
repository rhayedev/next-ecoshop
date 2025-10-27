import { Products } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { PropsWithParams } from 'next-intl';

type Props = PropsWithParams<{ id: string }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  try {
    const p = await Products.get(id);
    if (!p) throw new Error('Not found');

    return {
      title: `${p.name} — Next Shop`,
      description: `Acheter ${p.name} à ${p.price} €`,
    };
  } catch {
    return {
      title: 'Produit introuvable — Next Shop',
      description: 'Le produit demandé est introuvable.',
    };
  }
}

export default async function ProductDetail({ params }: Props) {
  const { id } = params;

  let product;
  try {
    product = await Products.get(id);
    if (!product) notFound();
  } catch {
    throw new Error(`Erreur serveur : impossible de charger le produit ${id}`);
  }

  return <ProductDetailClient product={product} />;
}
