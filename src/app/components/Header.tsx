"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="site-header">
      <nav className="nav">
        <Link className={t('/')} href="/">
          Accueil
        </Link>
        <Link className={t('/products')} href="/products">
          Produits
        </Link>
        <Link className={t('/blog')} href="/blog">
          Blog
        </Link>
        <Link className={t('/about')} href="/about">
          A propos
        </Link>
      </nav>
    </header>
  );
}