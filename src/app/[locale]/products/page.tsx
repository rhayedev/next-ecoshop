"use client";

import { useQuery } from "@tanstack/react-query";
import { useCart } from '../../components/CartContext';
import Link from "next/link";
import CartSummary from "../../components/CartSummary";
import Categories from "../../components/Categories";

async function fetchProducts() {
  const res = await fetch("/api/products", {
    next: { tags: ["products-api"] },
  });
  if (!res.ok)
    throw new Error(`Erreur de chargement des produits (status ${res.status})`);
  return res.json();
}

export default function ProductsPage() {
  const { addToCart } = useCart();

  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    retry: false,
  });

  if (isLoading) return <p>Chargement...</p>;
  if (error) {
    return (
      <div role="alert">
        <p>Erreur lors du chargement des produits</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );
  }

  return (
    <main className="grid grid-cols-3 gap-4" aria-labelledby="products-title">
      <h1
        id="products-title"
        className="col-span-3 text-2xl font-bold mb-4 sr-only:not-sr-only"
      >
        Nos produits
      </h1>

      <section className="col-span-2" aria-labelledby="products-title">
        <ul className="product-list" aria-live="polite">
          {data.map((p: any) => (
            <li key={p.id} className="product-card" role="article">
              <h2 className="text-lg font-semibold">
                <Link href={`/products/${p.id}`}>{p.name}</Link>
              </h2>
              <p>{p.price} €</p>
              <button
                type="button"
                onClick={() => addToCart(p.price)}
                className="mt-2 px-3 py-1 border rounded"
              >
                Ajouter au panier
              </button>
            </li>
          ))}
        </ul>
      </section>

      <aside className="col-span-1" aria-label="Panier et catégories">
        <CartSummary />
        <hr className="my-4" />
        <Categories />
      </aside>
    </main>
  );
}
