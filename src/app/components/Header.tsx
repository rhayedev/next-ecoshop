'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('nav');

  return (
    <header className="site-header" role="banner">
      <nav className="nav" aria-label="Navigation principale">
        
        {/* Bloc gauche : logo texte + menu */}
        <div className="nav-left" role="menubar">
          <Link href="/" className="nav-logo">
            EcoShop
          </Link>

          <ul className="nav-list">
            <li role="none">
              <Link role="menuitem" href="/" className="nav-link">
                {t('home')}
              </Link>
            </li>
            <li role="none">
              <Link role="menuitem" href="/products" className="nav-link">
                {t('products')}
              </Link>
            </li>
            <li role="none">
              <Link role="menuitem" href="/blog" className="nav-link">
                {t('blog')}
              </Link>
            </li>
            <li role="none">
              <Link role="menuitem" href="/about" className="nav-link">
                {t('about')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Bloc droite : recherche */}
        <form
          role="search"
          aria-label="Recherche de produits"
          className="nav-search"
        >
          <label htmlFor="site-search" className="sr-only">
            Rechercher un produit
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Rechercher un produit..."
            className="nav-search-input"
          />
        </form>
      </nav>
    </header>
  );
}
