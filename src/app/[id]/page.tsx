type ProductPageProps = {
    params: {
        id: string;
    };
};

export default async function ProductPage({ params }: ProductPageProps) {
    try {
        const res = await fetch(
            `https://fakestoreapi.com/products/${params.id}`
        );

        if (!res.ok) throw new Error("Produit introuvable");

        const product = await res.json();

        return (
            <main className="p-8">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p className="text-lg mt-2">{product.price} €</p>
            </main>
        );
    } catch (error) {
        return (
            <main className="p-8">
                <h1 className="text-2xl text-red-500">Erreur</h1>
                <p>{(error as Error).message}</p>
            </main>
        );
    }
}
