import Link from "next/link";

type Props = { params: { id: string; locale?: string } };

export default async function ProductDetail({ params }: Props) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);

  let res;
  try {
    res = await fetch(
      `https://fakestoreapi.com/produits-introuvable/${params.id}`,
      {
        cache: "no-store",
        signal: controller.signal,
      }
    );
  } catch (e) {
    clearTimeout(timeout);
    throw new Error("Timeout ou API produits indisponible");
  }
  clearTimeout(timeout);

  if (!res || !res.ok) throw new Error("API produits indisponible");

  let product;
  try {
    product = await res.json();
  } catch {
    throw new Error("Produit introuvable");
  }

  if (!product || !product.id) {
    throw new Error("Produit introuvable");
  }

  return (
    <main className="product-detail-main">
      <div className="product-detail-card">
        <img src={product.image} alt={product.title} className="product-detail-img" />
        <h1 className="product-detail-title">{product.title}</h1>
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