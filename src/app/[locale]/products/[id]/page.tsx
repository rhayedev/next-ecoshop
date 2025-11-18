type Params = { params: { id: string } };

export default async function ProductPage({ params }: Params) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);

  try {
    const res = await fetch(`https://api.invalide.com/products/${params.id}`, {
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Impossible de charger le produit #${params.id}`);
    }

    const product = await res.json();

    return (
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <p className="text-xl font-semibold text-green-700 mb-2">
          Prix : {product.price} €
        </p>
        <p>{product.description}</p>
      </main>
    );
  } catch (error) {
    clearTimeout(timeout);

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('⏱️ La requête a expiré (timeout 1,5 s).');
    }

    throw new Error('🚨 Impossible de contacter le serveur produits.');
  }
}