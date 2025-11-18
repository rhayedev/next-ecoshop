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
      className={`mt-2 px-3 py-1 rounded text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#245b92] ${
        isPending ? 'opacity-60 cursor-wait' : 'bg-[#3077C0] hover:bg-[#245b92]'
      }`}
      aria-live="polite"
    >
      {isPending ? 'Ajout...' : 'Ajouter au panier'}
    </button>
  );
}