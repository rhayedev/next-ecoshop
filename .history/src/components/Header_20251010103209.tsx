"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", labelFr: "Accueil", labelEn: "Home" },
  { href: "/products", labelFr: "Produits", labelEn: "Products" },
  { href: "/about", labelFr: "À propos", labelEn: "About" },
];

export default function Header({ locale = "fr" }: { locale?: string }) {
  const pathname = usePathname() || "/";
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
              {locale === "fr" ? link.labelFr : link.labelEn}
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