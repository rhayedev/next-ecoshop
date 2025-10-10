import { notFound } from "next/navigation";

type Props = { params: { id: string; locale: string } };

export default async function ProductPage({ params }: Props) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
    cache: "no-store", // SSR pur
  });

  if (!res.ok) throw new Error("API produits indisponible");

  const product = await res.json();

  return (
    <main className="product-detail-main">
      <div className="product-detail-card">
        <img src={product.image} alt={product.title} className="product-detail-img" />
        <h1 className="product-detail-title">{product.title}</h1>
        <div className="product-detail-price">{product.price} €</div>
        <p>{product.description}</p>
        {/* Optionnel : lien retour */}
      </div>
    </main>
  );
}