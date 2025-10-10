import Link from "next/link";
import { Products } from "@/lib/products";
import { notFound } from "next/navigation";

type Props = { params: { id: string; locale?: string } };

export async function generateMetadata({ params }: Props) {
  const p = Products.get(params.id);
  if (!p) return { title: "Produit introuvable — Next Shop" };
  return { title: `${p.name} — Next Shop`, description: `Acheter ${p.name} à ${p.price} €` };
}

export default function ProductDetail({ params }: Props) {
  const product = Products.get(params.id);
  if (!product) notFound();

  return (
    <main className="product-detail-main">
      <div className="product-detail-card">
  <img src={product.image} alt={product.name} className="product-detail-img" />
  <h1 className="product-detail-title">{product.name}</h1>
  <div className="product-detail-price">{product.price} €</div>
        <Link
          href={`/${params.locale ?? "fr"}/products`}
          className="product-detail-back"
        >
          ← Retour à la liste
        </Link>
      </div>
    </main>
  );
}