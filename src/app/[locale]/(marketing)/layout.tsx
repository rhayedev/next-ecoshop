export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <header>
        <h2>Espace Marketing</h2>
      </header>
      {children}
    </section>
  );
}
