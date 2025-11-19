import Link from "next/link";
import { Products } from "@/lib/products";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";
import { useCart } from "../../stores/Cart"; // AJOUT

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

export default function ProductsPage(props: Props) {
  const { params } = props;
  const messages = getMessages(params.locale);
  const products = Products.list();
  const add = useCart(s => s.add); // AJOUT

  return (
    <main className="products-main">
      <h1 className="products-title">{messages.products.title}</h1>
      <ul className="products-list grid">
        {products.map(p => (
          <li key={p.id} className="product-card">
            <Link href={`/${params.locale}/products/${p.id}`} className="product-link">
              <img src={p.image} alt={p.name} className="product-img" />
              <div className="product-info">
                <span className="product-name">{p.name}</span>
                <span className="product-price">{p.price} €</span>
              </div>
              <span className="product-arrow">→</span>
            </Link>
            <button
              onClick={() => add({ id: p.id, name: p.name, price: p.price }, 1)}
              className="product-add"
              style={{ marginTop: 8 }}
            >
              {params.locale === "fr" ? "Ajouter au panier" : "Add to cart"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}