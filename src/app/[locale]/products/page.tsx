import Link from "next/link";
import { Products } from "@/app/lib/products";
import "@/app/styles/products.css";

export const metadata = {
  title: "Next Shop - Produits",
  description: "Liste des produits",
};

export default function ProductsPage() {
  const products = Products.list();
  return (
    <ul className="product-list">
      {products.map(p => (
        <li key={p.id} className="product-card">
          <Link href={`/products/${p.id}`}>{p.name}</Link>
          <p>{p.price} €</p>
        </li>
      ))}
    </ul>
  );
}