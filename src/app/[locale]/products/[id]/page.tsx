import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Products } from '@/app/lib/products';

type Props = { params: { id: string } };

export async function generateStaticParams() {
  const list = await Products.list();
  return list.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await Products.get(params.id);

  if (!product) {
    return {
      title: 'Produit introuvable | EcoShop',
      description: 'Le produit demandé est introuvable.',
    };
  }

  return {
    title: `${product.name} | EcoShop`,
    description: `Achetez ${product.name} pour ${product.price} €.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await Products.get(params.id);

  if (!product) notFound();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-xl font-semibold text-green-700 mb-2">
        Prix : {product.price} €
      </p>
      <p className="text-gray-600">
        Produit chargé depuis l’API distante (mise en cache en mémoire).
      </p>
    </main>
  );
}
