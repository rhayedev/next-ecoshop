export default async function FetchProducts(id?: string) {
    const res = await fetch(
        `${
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : ""
        }/api/products.json`,
        {
            next: { tags: ["products"] },
        }
    );

    if (!res.ok) throw new Error("Impossible de charger les produits");

    const allProducts = await res.json();

    if (id) {
        const product = allProducts.find((p: any) => p.id.toString() === id);
        if (!product) throw new Error(`Produit introuvable (id: ${id})`);
        return product;
    }

    return allProducts;
}
