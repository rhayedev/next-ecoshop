export type Product = { id: string; name: string; price: number };
export type FakeStoreItem = { id: string; name: string; price: number };

let DB: Product[] = [];

export const Products = {
	list: async (): Promise<Product[]> => {
		if (DB.length === 0) {
			const res = await fetch('https://fakestoreapi.com/products?limit=100', {
				cache: 'no-store',
			});
			const data: FakeStoreItem[] = await res.json();

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
			await Products.list();
		}
		return DB.find((p) => p.id === id);
	},
};
