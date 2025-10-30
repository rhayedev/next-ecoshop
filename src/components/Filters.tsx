'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function Filters() {
    const router = useRouter();
    const params = useSearchParams();
    const q = params.get('q') ?? '';
    const [isPending, startTransition] = useTransition();

    function updateParam(value: string) {
        const next = new URLSearchParams(params.toString());
        if (value) next.set('q', value);
        else next.delete('q');

        startTransition(() => {
            router.push(`/products?${next.toString()}`);
        });
    }

    return (
        <div className='relative mb-2'>
            <input
                defaultValue={q}
                onChange={(e) => updateParam(e.target.value)}
                placeholder="Recherche…"
                className="p-2 border rounded w-full"
            />
            {isPending && <p className='text-gray-500 absolute top-full translate-y-2'>Mise à jour…</p>}
        </div>
    );
}
