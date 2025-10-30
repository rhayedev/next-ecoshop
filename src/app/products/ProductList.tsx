'use client';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import HearthLogo from "@/components/icon/heartLogo";
import ChevronDown from '@/components/icon/chevronDown';
import AddToCartButton from './AddToCartButton';

async function fetchProducts(page: number, q: string | null) {
    const res = await fetch(`/api/products?page=${page}${q ? `&q=${encodeURIComponent(q)}` : ''}`);
    if (!res.ok) throw new Error('Produits indisponibles');
    return res.json();
}

export default function ProductsList() {
    const router = useRouter();
    const params = useSearchParams();
    const t = useTranslations("products");

    const q = params.get('q');
    const page = Number(params.get('page') ?? '1');

    const { data, isLoading, error } = useQuery({
        queryKey: ['products', page, q],
        queryFn: () => fetchProducts(page, q),
        staleTime: 30_000,
    });

    if (isLoading) return <p>Chargement…</p>;
    if (error) return <p>Erreur</p>;

    function goToPage(nextPage: number) {
        const next = new URLSearchParams(params.toString());
        next.set('page', nextPage.toString());
        router.push(`/products?${next.toString()}`);
    }

    const total = data.total ?? 0;
    const perPage = 5;
    const totalPages = Math.ceil(total / perPage);

    return (
        <div>
            <ul className="flex-wrap flex justify-center gap-5 min-h-80">
                {data.items.map((p: any) => (
                    <li key={p.id}>
                        <Link href={`/products/${p.id}`}>
                            <div className="w-72 bg-gray-100 hover:ring-[3px] trans-fast ring-violet-400 ring-offset-2 rounded-2xl p-6 overflow-hidden aspect-[9:16] group flex flex-col gap-2 relative">
                                <div className="flex justify-between text-gray-500">
                                    <p>{p.name}</p>
                                    <p className="text-xl text-black font-semibold">
                                        {p.price} €
                                    </p>
                                </div>

                                <div className="overflow-hidden p-10 rounded-xl bg-gray-100">
                                    <img
                                        src="https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/6925281988219.png"
                                        alt=""
                                        className="grayscale-100 group-hover:grayscale-0 rounded-b-xl cursor-pointer trans-fast rounded-t-[4px]"
                                    />
                                </div>

                                <div className="flex gap-2 relative z-10 flex-center">
                                    <AddToCartButton p={{ id: p.id, name: p.name, price: p.price }} />
                                    <button className="flex-center h-10 w-10 rounded-2xl hover:cursor-pointer bg-white border-red-100 border p-2 hover:bg-red-400 hover:text-red-100 text-red-400 trans-fast">
                                        <HearthLogo />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="flex-center py-10">
                <div className='w-fit flex gap-5'>
                <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    className="h-10 w-10 bg-violet-200 text-violet-800 flex-center rounded-full disabled:opacity-50"
                >
                        <ChevronDown className='rotate-90' />
                </button>

                <span className='h-10 flex-center'>Page {page} / {totalPages}</span>

                <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                    className="h-10 w-10 bg-violet-200 text-violet-800 flex-center rounded-full disabled:opacity-50"
                >
                    <ChevronDown className='-rotate-90'/>
                </button>
                </div>
            </div>
        </div>
    );
}
