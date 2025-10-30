'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCart } from '@/app/stores/cart';

export default function AddToCartButton({ p }: { p: { id: string; name: string; price: number } }) {
  const qc = useQueryClient();
  const add = useCart((s) => s.add);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return true;
    },
    onSuccess: () => {
      add({ id: p.id, name: p.name, price: p.price }, 1);
      qc.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
    >
      {isPending ? 'Ajout...' : 'Ajouter au panier'}
    </button>
  );
}
