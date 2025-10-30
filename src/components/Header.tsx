"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import PreferencesControls from "@/app/components/PreferencesControls";

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
  const [showPrefs, setShowPrefs] = useState(false);

  return (
    <header className="site-header home-header">
      <div className="header-inner">
        <Link href={`/${locale}`} className="header-logo">
          <span role="img" aria-label="leaf">🌿</span> EcoShop
        </Link>
        <nav className="header-nav">
          {navLinks.map(
            link =>
              link.label && (
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
              )
          )}
        </nav>
        <div style={{ marginLeft: 24, position: "relative" }}>
          <button
            aria-label="Préférences"
            style={{
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              padding: 4,
            }}
            onClick={() => setShowPrefs((v) => !v)}
          >
            ⚙️
          </button>
          {showPrefs && (
            <div
              style={{
                position: "absolute",
                top: "120%",
                right: 0,
                zIndex: 1000,
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 8,
                boxShadow: "0 2px 12px #0002",
                padding: 16,
                minWidth: 220,
              }}
            >
              <PreferencesControls />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}