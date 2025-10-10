"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
  locale: string;
  messages: {
    nav: {
      home: string;
      products: string;
    };
  };
};

export default function Header({ locale, messages }: HeaderProps) {
  const pathname = usePathname();
  const isActive = (href: string) => (pathname === href ? "active" : "");

  return (
    <header className="site-header">
      <nav className="nav">
        <Link className={isActive(`/${locale}`)} href={`/${locale}`}>
          {messages.nav.home}
        </Link>
        <Link className={isActive(`/${locale}/products`)} href={`/${locale}/products`}>
          {messages.nav.products}
        </Link>
      </nav>
    </header>
  );
}