export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="marketing-layout">
      <header>
        <h2>Marketing</h2>
      </header>
      {children}
      <footer>
        <small>© 2025 — Marketing Next Shop</small>
      </footer>
    </section>
  );
}