import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";
import Link from "next/link";


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

export default async function LocaleHomePage(props: Props) {
  const { params } = await props;
  const messages = getMessages(params.locale);

  return (
    <main className="home-main">
      <div className="home-hero">
        <div className="home-hero-text">
          <h1 className="home-title">{messages.home.title}</h1>
          <p className="home-desc">{messages.home.description}</p>
          <Link href={`/${params.locale}/products`} className="home-cta">
            {params.locale === "fr" ? "Voir les produits" : "See products"}
          </Link>
        </div>
        <div className="home-hero-img">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none" aria-hidden="true">
            <circle cx="90" cy="90" r="80" fill="#e0eafc" />
            <ellipse cx="90" cy="110" rx="55" ry="30" fill="#b6d0e2" />
            <rect x="60" y="60" width="60" height="40" rx="12" fill="#fff" stroke="#1a365d" strokeWidth="2"/>
            <circle cx="80" cy="80" r="6" fill="#1a365d"/>
            <circle cx="100" cy="80" r="6" fill="#1a365d"/>
            <rect x="85" y="95" width="10" height="4" rx="2" fill="#1a365d"/>
          </svg>
        </div>
      </div>
      <div className="home-extra">
        <h2>{params.locale === "fr" ? "Pourquoi EcoShop ?" : "Why EcoShop?"}</h2>
        <ul>
          <li>🌱 {params.locale === "fr" ? "Produits éco-responsables" : "Eco-friendly products"}</li>
          <li>🚚 {params.locale === "fr" ? "Livraison rapide" : "Fast delivery"}</li>
          <li>💳 {params.locale === "fr" ? "Paiement sécurisé" : "Secure payment"}</li>
        </ul>
      </div>
      <CartSummary />
    </main>
  );
}