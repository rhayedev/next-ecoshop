import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";

export default async function FetchNews(id?: string) {
    const filePath = path.join(process.cwd(), "public", "api", "news.json");
    const data = await fs.readFile(filePath, "utf-8");
    const allArticles = JSON.parse(data);

    if (id) {
        const article = allArticles.find((a: any) => a.id.toString() === id);
        if (!article) notFound();
        return article;
    }

    return allArticles;
}
