"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => (pathname === href ? "active" : "");

  return (
    <header className="site-header">
      <nav className="nav">
        <Link className={isActive("/")} href="/">Accueil</Link>
        <Link className={isActive("/products")} href="/products">Produits</Link>
      </nav>
    </header>
  );
}