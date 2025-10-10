import { notFound } from "next/navigation";
import FetchNews from "@/lib/isrFetch";

export const revalidate = 60;

export default async function NewsPage({ params }: { params: { id: string } }) {
    try {
        const article = await FetchNews(params.id);

        return (
            <article className="space-y-3">
                <h1 className="text-2xl font-semibold">{article.title}</h1>
                <p className="text-sm text-gray-500">
                    Publié le {article.date}
                </p>
                <p>{article.excerpt}</p>
            </article>
        );
    } catch {
        notFound();
    }
}
