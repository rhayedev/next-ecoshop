export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <div className="flex min-h-full gap-15 my-5 mb-20">
                <h1 className="text-5xl text-nowrap font-extrabold text-violet-700">
                    Produits
                </h1>
                <div className="bg-gradient-to-l from-violet-500 to-fuchsia-500 w-full rounded"></div>
            </div>
            {children}
        </section>
    );
}
