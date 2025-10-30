'use client';

import Link from "next/link";
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

export default function ProductsPage(props: Props) {
  const { params } = props;
  const messages = getMessages(params.locale);
  const products = Products.list();
  const add = useCart(s => s.add);
  const currency = useSelector((state: RootState) => state.preferences.currency);

  return (
    <main className="products-main">
      <h1 className="products-title">{messages.products.title}</h1>
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
                onClick={() => add({ id: p.id, name: p.name, price: p.price }, 1)}
                className="product-add"
              >
                {params.locale === "fr" ? "Ajouter au panier" : "Add to cart"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}