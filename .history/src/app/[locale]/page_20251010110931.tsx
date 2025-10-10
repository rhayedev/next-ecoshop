import Link from "next/link";
import { Products } from "@/lib/products";
import { notFound } from "next/navigation";

type Props = { params: { id: string; locale: string } };

export async function generateMetadata({ params }: Props) {
  const p = Products.get(params.id);
  if (!p) return { title: "Produit introuvable — EcoShop" };
  return { title: `${p.name} — EcoShop`, description: `Acheter ${p.name} à ${p.price} €` };
}

export default function ProductDetail({ params }: Props) {
  const product = Products.get(params.id);
  if (!product) notFound();

  return (
    <main className="product-detail-main">
      <div className="product-detail-card">
        <h1 className="product-detail-title">{product.name}</h1>
        <div className="product-detail-price">{product.price} €</div>
        {/* Ajoute ici une description ou une image si tu veux */}
        <Link
          href={`/${params.locale}/products`}
          className="product-detail-back"
        >
          ← Retour à la liste
        </Link>
      </div>
    </main>
  );
}