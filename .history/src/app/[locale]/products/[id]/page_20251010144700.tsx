import Link from "next/link";

type Props = { params: { id: string; locale?: string } };

export default async function ProductDetail({ params }: Props) {
  // Pour tester la gestion d'erreur, décommente la ligne ci-dessous :
  // const res = await fetch(`https://fakestoreapi.com/produits-introuvable/${params.id}`, { cache: "no-store" });

  // URL correcte pour fonctionnement normal :
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("API produits indisponible");

  let product;
  try {
    product = await res.json();
  } catch {
    throw new Error("Produit introuvable");
  }

  // L'API retourne {} si le produit n'existe pas
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