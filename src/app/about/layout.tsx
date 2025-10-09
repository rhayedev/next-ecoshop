export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ background: "#f0f4f8", padding: "2rem", borderRadius: "1rem" }}>
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