import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from './useProducts';

export const useAddToCart = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (product: Product) => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			return product;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['wishlist'],
			});
		},
	});
};