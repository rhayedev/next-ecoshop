import fs from "fs/promises";
import path from "path";

export default async function FetchProducts(id?: string) {
    const filePath = path.join(process.cwd(), "public", "api", "products.json");
    const data = await fs.readFile(filePath, "utf-8");
    const allProducts = JSON.parse(data);

    if (id) {
        const product = allProducts.find((p: any) => p.id.toString() === id);
        if (!product) throw new Error(`Produit introuvable (id: ${id})`);
        return product;
    }

    return allProducts;
}
