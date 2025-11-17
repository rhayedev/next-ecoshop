import FetchProducts from "@/lib/ssrFetch";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const products = await FetchProducts();
    return products.map((p: any) => ({
        id: p.id.toString(),
    }));
}

export default async function ProductPage({
    params,
}: {
    params: { id: string };
}) {
    try {
        const product = await FetchProducts(params.id);

        return (
            <article className="p-8 space-y-3">
                <h1 className="text-2xl font-semibold">{product.name}</h1>
                <p className="text-gray-500">Prix : {product.price}€</p>
            </article>
        );
    } catch {
        notFound();
    }
}
