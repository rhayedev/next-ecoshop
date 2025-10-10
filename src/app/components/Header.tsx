"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="site-header">
      <nav className="nav">
        <Link href="/">{t("home")}</Link>
        <Link href="/products">{t("products")}</Link>
        <Link href="/blog">{t("blog")}</Link>
        <Link href="/about">{t("about")}</Link>
      </nav>
    </header>
  );
}