import { notFound } from "next/navigation";
import news from "@/public/api/news.json";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
};

type Props = { params: { id: string; locale: string } };

// ISR toutes les 30s
export const revalidate = 30;

export default function NewsPage({ params }: Props) {
  const article = (news as NewsItem[]).find((n) => n.id === params.id);
  if (!article) notFound();

  return (
    <article>
      <h1>{article.title}</h1>
      <p>
        <small>
          Publié le {new Date(article.date).toLocaleDateString(params.locale)}
        </small>
      </p>
      <p>{article.excerpt}</p>
    </article>
  );
}