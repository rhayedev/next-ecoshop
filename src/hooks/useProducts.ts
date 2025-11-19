import { useQuery } from '@tanstack/react-query';

export type Product = {
  id: string;
  name: string;
  price: number;
};

export const fetchProducts = async (page: number, q?: string): Promise<Product[]> => {
  const params = new URLSearchParams();
  params.set('page', page.toString());
  if (q) params.set('q', q);
  const res = await fetch(`/api/products?${params.toString()}`);
  if (!res.ok) throw new Error('Erreur lors de la récupération des produits');
  return res.json();
};

export const useProducts = (page: number, q?: string) => {
	return useQuery({
		queryKey: ['products', page, q],
		queryFn: () => fetchProducts(page, q),
		placeholderData: (previousData) => previousData,
	});
};
