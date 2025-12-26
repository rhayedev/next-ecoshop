'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCart, CartState } from '@/app/stores/useCart';
import { useTranslations } from 'next-intl';

export default function AddToCartButton({ p }: { p: { id: string; name: string; price: number } }) {
    const qc = useQueryClient();
    const add = useCart((s: CartState) => s.add);
    const t = useTranslations("products");
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            await new Promise(r => setTimeout(r, 300));
            return true;
        },
        onSuccess: () => {
            add({ id: p.id, name: p.name, price: p.price }, 1);
            qc.invalidateQueries({ queryKey: ['wishlist'] });
        }
    });
    return <button onClick={() => mutate()} disabled={isPending} className="trans-fast hover:bg-violet-300 hover:text-violet-700 text-violet-500 rounded-2xl px-6 h-10 hover:cursor-pointer bg-violet-200">
        {t("add_to_bag")}
    </button>
}