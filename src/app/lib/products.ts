export type Product = { id: string; name: string; price: number };

let DB: Product[] = [];

export const Products = {
  list: async (): Promise<Product[]> => {
    if (DB.length === 0) {
      const res = await fetch('https://fakestoreapi.com/products?limit=100', {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`Impossible de charger la liste de produits (status ${res.status})`);
      }

      const data: any[] = await res.json();

      DB = data.map((item) => ({
        id: item.id.toString(),
        name: item.title,
        price: item.price,
      }));
    }
    return DB;
  },

  get: async (id: string): Promise<Product | undefined> => {
    if (DB.length === 0) {
      await Products.list(); // si ça plante, l'erreur remonte
    }
    return DB.find((p) => p.id === id);
  },
};