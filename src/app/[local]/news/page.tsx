import Link from "next/link";
import FetchNews from "@/lib/isrFetch";
import { Article } from "@/types/types";

export const revalidate = 60;

export default async function NewsListPage() {
    const news = await FetchNews();

    return (
        <ul className="space-y-4">
            {news.map((article: Article) => (
                <li key={article.id} className="border-b pb-2">
                    <Link
                        href={`/news/${article.id}`}
                        className="text-blue-600 hover:underline"
                    >
                        {article.title}
                    </Link>
                    <p className="text-sm text-gray-500">
                        Publié le {article.date}
                    </p>
                </li>
            ))}
        </ul>
    );
}
