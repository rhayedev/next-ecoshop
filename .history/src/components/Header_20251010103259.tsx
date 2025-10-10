"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Messages = {
  nav: {
    home: string;
    products: string;
    about?: string;
  };
};

export default function Header({
  locale = "fr",
  messages,
}: {
  locale?: string;
  messages: Messages;
}) {
  const pathname = usePathname() || "/";
  const navLinks = [
    { href: "/", label: messages.nav.home },
    { href: "/products", label: messages.nav.products },
    { href: "/about", label: messages.nav.about ?? "" },
  ];
  return (
    <header className="site-header home-header">
      <div className="header-inner">
        <Link href={`/${locale}`} className="header-logo">
          <span role="img" aria-label="leaf">🌿</span> EcoShop
        </Link>
        <nav className="header-nav">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={`/${locale}${link.href === "/" ? "" : link.href}`}
              className={
                pathname === `/${locale}${link.href === "/" ? "" : link.href}`
                  ? "header-link active"
                  : "header-link"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href={`/${locale}/products`} className="header-cta">
          {locale === "fr" ? "Voir les produits" : "See products"}
        </Link>
      </div>
    </header>
  );
}