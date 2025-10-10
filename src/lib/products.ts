export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
};

async function loadAll(): Promise<Product[]> {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) throw new Error('NEXT_PUBLIC_BASE_URL manquante (.env.local)');
  const res = await fetch(`${base}/products.json`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Impossible de charger les produits');
  return res.json();
}

export const Products = {
  async list(): Promise<Product[]> {
    return loadAll();
  },
  async get(id: string): Promise<Product | null> {
    const products = await loadAll();
    return products.find((p) => String(p.id) === String(id)) ?? null;
  },
};
