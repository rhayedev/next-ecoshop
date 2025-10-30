import Link from "next/link";
import { Products } from "@/lib/products";

type Props = { params: { id: string; locale?: string } };

export default async function ProductDetail(props: Props) {
  const { params } = await props;
  const product = Products.get(params.id);

  if (!product) {
    throw new Error("Produit introuvable");
  }

  return (
    <main className="product-detail-main">
      <div className="product-detail-card">
        <img src={product.image} alt={product.name} className="product-detail-img" />
        <h1 className="product-detail-title">{product.name}</h1>
        <div className="product-detail-price">{product.price} €</div>
        <p>{product.description}</p>
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