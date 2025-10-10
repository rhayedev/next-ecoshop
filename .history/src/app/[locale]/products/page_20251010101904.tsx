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
    <main>
      <h1>{messages.products.title}</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <Link href={`/${params.locale}/products/${p.id}`}>
              {p.name} — {p.price} €
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}