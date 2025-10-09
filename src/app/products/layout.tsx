export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <h2 className="text-5xl mb-20 mt-20">Produits</h2>
            {children}
        </section>
    );
}
