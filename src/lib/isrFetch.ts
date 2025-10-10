import { notFound } from "next/navigation";

export default async function FetchNews(id?: string) {
    const res = await fetch(
        `${
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : ""
        }/api/news.json`,
        {
            next: { tags: ["news"] },
        }
    );

    if (!res.ok) throw new Error("Impossible de charger les actualités");

    const allArticles = await res.json();

    if (id) {
        const article = allArticles.find((a: any) => a.id.toString() === id);
        if (!article) notFound();
        return article;
    }

    return allArticles;
}
