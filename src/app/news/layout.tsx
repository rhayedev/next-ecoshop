export const metadata = {
    title: "Next Shop — News",
    description: "Dernières actualités de Next Shop",
};

export default function NewsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="max-w-3xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Actualités</h1>
            {children}
        </section>
    );
}
