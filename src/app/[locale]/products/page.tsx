'use client';

import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCart } from "../../stores/Cart";
import { useSelector } from "react-redux";
import type { RootState } from "../../stores/stores";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, use } from "react";
import { Products } from "@/lib/products";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";
import CategoriesList from '../../components/CategoriesList';
import React from "react";
// --- Version optimisée : tri natif JS ---
// import sortBy from "lodash/sortBy"; // A décommenter pour la version lodash ciblée)

type Props = { params: Promise<{ locale: string }> };

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
    return `$${(price * 1.1).toFixed(2)}`;
  }
  return `${price.toFixed(2)} €`;
}

function fetchProducts({ page, q }: { page: number; q: string }) {
  const all = Products.list().filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase())
  );
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  return Promise.resolve(all.slice(start, start + pageSize));
}

export default function ProductsPage(props: Props) {
  const params = use(props.params);
  const { locale } = params;
  const messages = getMessages(locale);
  const add = useCart(s => s.add);
  const currency = useSelector((state: RootState) => state.preferences.currency);

  // Synchronisation URL <-> UI
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Valeurs initiales depuis l’URL
  const qParam = searchParams?.get('q') ?? '';
  const pageParam = parseInt(searchParams?.get('page') ?? '1', 10);

  // Etats contrôlés
  const [q, setQ] = useState(qParam);
  const [page, setPage] = useState(pageParam);

  // Quand l’URL change, on met à jour l’UI
  useEffect(() => {
    setQ(qParam);
    setPage(pageParam);
  }, [qParam, pageParam]);

  // Quand l’UI change, on met à jour l’URL
  function updateUrl(newQ: string, newPage: number) {
    const params = new URLSearchParams();
    if (newQ) params.set('q', newQ);
    if (newPage > 1) params.set('page', String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  }

  // useQuery pour les produits
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', page, q],
    queryFn: () => fetchProducts({ page, q }),
  });

  // --- Tri optimisé (natif JS) ---
  const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
  // --- Ou, version lodash ciblée ---
  // const sortedProducts = sortBy(products, "name");
  
  const queryClient = useQueryClient();
  const addToCartMutation = useMutation({
    mutationFn: async (product: { id: string; name: string; price: number }) => {
      add(product, 1);
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    }
  });

  return (
    <main className="products-main" style={{ display: "flex", gap: 32 }}>
      {/* Colonne catégories */}
      <aside style={{ minWidth: 200 }}>
        <h3>Catégories</h3>
        <CategoriesList />
      </aside>
      {/* Colonne produits */}
      <section style={{ flex: 1 }}>
        <h1 className="products-title">{messages.products.title}</h1>
        <form
          role="search"
          aria-label={locale === "fr" ? "Recherche de produits" : "Product search"}
          style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}
          onSubmit={e => e.preventDefault()}
        >
          <label htmlFor="search-products" style={{ fontWeight: "bold" }}>
            {locale === "fr" ? "Recherche" : "Search"}
          </label>
          <input
            id="search-products"
            placeholder={locale === "fr" ? "Recherche" : "Search"}
            value={q}
            onChange={e => {
              setQ(e.target.value);
              updateUrl(e.target.value, 1); // reset page à 1 sur recherche
            }}
            style={{ flex: 1 }}
          />
        </form>
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <ul className="products-list grid">
            {sortedProducts.map(p => (
              <li key={p.id} className="product-card">
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Link href={`/${locale}/products/${p.id}`} className="product-link">
                    <Image
                      src={p.image}
                      alt={p.name}
                      className="product-img"
                      width={400}
                      height={300}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="product-info">
                      <span className="product-name">{p.name}</span>
                      <span className="product-price">{formatPrice(p.price, currency)}</span>
                    </div>
                    <span className="product-arrow">→</span>
                  </Link>
                  <button
                    onClick={() => addToCartMutation.mutate({ id: p.id, name: p.name, price: p.price })}
                    className="product-add"
                    aria-label={`Ajouter ${p.name} au panier`}
                  >
                    {locale === "fr" ? "Ajouter au panier" : "Add to cart"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div style={{ marginTop: 16 }}>
          <button
            onClick={() => {
              setPage(p => Math.max(1, p - 1));
              updateUrl(q, Math.max(1, page - 1));
            }}
            disabled={page === 1}
          >
            Précédent
          </button>
          <span style={{ margin: "0 8px" }}>Page {page}</span>
          <button
            onClick={() => {
              setPage(p => p + 1);
              updateUrl(q, page + 1);
            }}
          >
            Suivant
          </button>
        </div>
      </section>
    </main>
  );
}