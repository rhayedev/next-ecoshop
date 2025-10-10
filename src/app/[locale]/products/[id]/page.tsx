import { notFound } from 'next/navigation';

type Product = { id: string; name: string; price: number; description?: string };
type Props = { params: Promise<{ id: string }> };

async function getProduct(id: string): Promise<Product | null> {
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${base}/products.json`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Impossible de charger les produits');
  }

  const products: Product[] = await res.json();
  return products.find((p) => String(p.id) === String(id)) ?? null;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const p = await getProduct(id);

  if (!p) {
    return { title: 'Produit introuvable — Next Shop' };
  }

  return {
    title: `${p.name} — Next Shop`,
    description: `Acheter ${p.name} à ${p.price} €`,
  };
}

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <h3>{product.name}</h3>
      <p>Prix : {product.price} €</p>
      {product.description ? <p>{product.description}</p> : null}
    </main>
  );
}
