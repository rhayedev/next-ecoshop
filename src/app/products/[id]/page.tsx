import { Products } from "@/lib/products";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props) {
    const p = Products.get(params.id);
    if (!p) return { title: "Produit introuvable — Next Shop" };
    return {
        title: `${p.name} — Next Shop`,
        description: `Acheter ${p.name} à ${p.price} €`,
    };
}

export default function ProductDetail({ params }: Props) {
    const product = Products.get(params.id);
    if (!product) notFound();
    return (
        <>
            <h3>{product.name}</h3>
            <p>Prix : {product.price} €</p>
        </>
    );
}
