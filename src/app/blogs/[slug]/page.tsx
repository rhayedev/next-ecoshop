import { Blogs } from "@/lib/blog";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props) {
    const p = Blogs.get(params.id);
    if (!p) return { title: "Produit introuvable — Next Shop" };
    return {
        title: `${p.name} — Next Shop`,
        description: `Regarder ${p.name} à ${p.text}`,
    };
}

export default function ProductDetail({ params }: Props) {
    const product = Blogs.get(params.id);
    if (!product) notFound();
    return (
        <>
            <h3>{product.name}</h3>
            <p>{product.text}</p>
        </>
    );
}
