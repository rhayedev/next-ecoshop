'use client';

import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Products } from "@/lib/products";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";
import { useCart } from "../../stores/Cart";
import { useSelector } from "react-redux";
import type { RootState } from "../../stores/stores";

type Props = { params: { locale: string } };

function getMessages(locale: string) {
  switch (locale) {
    case "en":
      return messagesEn;
    case "fr":
    default:
      return messagesFr;
  }
}

function formatPrice(price: number, currency: 'EUR' | 'USD') {
  if (currency === 'USD') {
    return `$${(price * 1.1).toFixed(2)}`; // exemple de conversion
  }
  return `${price.toFixed(2)} €`;
}

// Simule une API avec filtre et pagination
function fetchProducts({ page, q }: { page: number; q: string }) {
  const all = Products.list().filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase())
  );
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  return Promise.resolve(all.slice(start, start + pageSize));
}

export default function ProductsPage(props: Props) {
  const { params } = props;
  const messages = getMessages(params.locale);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const add = useCart(s => s.add);
  const currency = useSelector((state: RootState) => state.preferences.currency);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', page, q],
    queryFn: () => fetchProducts({ page, q }),
  });

  const queryClient = useQueryClient();
  const addToCartMutation = useMutation({
    mutationFn: async (product: { id: string; name: string; price: number }) => {
      add(product, 1); // Ajoute au panier Zustand
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] }); // Invalide la wishlist simulée
    }
  });

  return (
    <main className="products-main">
      <h1 className="products-title">{messages.products.title}</h1>
      <input
        placeholder="Recherche"
        value={q}
        onChange={e => setQ(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="products-list grid">
          {products.map(p => (
            <li key={p.id} className="product-card">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Link href={`/${params.locale}/products/${p.id}`} className="product-link">
                  <img src={p.image} alt={p.name} className="product-img" />
                  <div className="product-info">
                    <span className="product-name">{p.name}</span>
                    <span className="product-price">{formatPrice(p.price, currency)}</span>
                  </div>
                  <span className="product-arrow">→</span>
                </Link>
                <button
                  onClick={() => addToCartMutation.mutate({ id: p.id, name: p.name, price: p.price })}
                  className="product-add"
                >
                  {params.locale === "fr" ? "Ajouter au panier" : "Add to cart"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Pagination simple */}
      <div style={{ marginTop: 16 }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Précédent</button>
        <span style={{ margin: "0 8px" }}>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Suivant</button>
      </div>
    </main>
  );
}