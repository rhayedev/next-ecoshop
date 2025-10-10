import Link from 'next/link';
import { Products } from '@/lib/products';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ id: string }> };

async function getProduct(id: string) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(Products.get(id));
		}, 200);
	});
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const p = (await getProduct(id)) as Awaited<ReturnType<typeof Products.get>>;

	if (!p) {
		return {
			title: 'Produit introuvable — Next Shop',
			description: 'Le produit demandé est introuvable.',
		};
	}

	return {
		title: `${p.name} — Next Shop`,
		description: `Acheter ${p.name} à ${p.price} €`,
	};
}

export default async function ProductDetail({ params }: Props) {
	const { id } = await params;
	const product = (await getProduct(id)) as Awaited<ReturnType<typeof Products.get>>;

	if (!product) notFound();

	return (
		<article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-gray-100">
			<h3 className="text-3xl font-bold text-blue-700 mb-4">{product.name}</h3>
			<p className="text-gray-700 text-lg mb-6">
				Prix : <span className="font-semibold">{product.price} €</span>
			</p>
			<Link
				href="/products"
				className="inline-block px-5 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
			>
				← Retour aux produits
			</Link>
		</article>
	);
}
