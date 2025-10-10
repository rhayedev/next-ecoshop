import Link from "next/link";
import { Products } from "@/lib/products";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";

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

export default function ProductsPage({ params }: Props) {
  const messages = getMessages(params.locale);
  const products = Products.list();

  return (
    <main className="products-main">
      <h1 className="products-title">{messages.products.title}</h1>
      <ul className="products-list grid">
        {products.map(p => (
          <li key={p.id} className="product-card">
            <Link href={`/${params.locale}/products/${p.id}`} className="product-link">
              <div className="product-info">
                <span className="product-name">{p.name}</span>
                <span className="product-price">{p.price} €</span>
              </div>
              <span className="product-arrow">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}