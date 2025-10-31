'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('nav');

  return (
    <header className="site-header" role="banner">
      <nav className="nav" aria-label="Navigation principale">
        <ul className="flex gap-4 items-center" role="menubar">
          <li role="none">
            <Link role="menuitem" href="/">{t('home')}</Link>
          </li>
          <li role="none">
            <Link role="menuitem" href="/products">{t('products')}</Link>
          </li>
          <li role="none">
            <Link role="menuitem" href="/blog">{t('blog')}</Link>
          </li>
          <li role="none">
            <Link role="menuitem" href="/about">{t('about')}</Link>
          </li>
        </ul>

        <form role="search" aria-label="Recherche de produits" className="mt-2 sm:mt-0">
          <label htmlFor="site-search" className="sr-only">
            Rechercher un produit
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Rechercher un produit..."
            className="border rounded-md p-2"
          />
        </form>
      </nav>
    </header>
  );
}