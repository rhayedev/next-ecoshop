import { notFound } from "next/navigation";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
};

type Props = { params: Promise<{ id: string; locale: string }> };

export const dynamic = "force-dynamic";
export const revalidate = 30;

export default async function NewsPage(props: Props) {
  const params = await props.params;
  const { id, locale } = params;

  // Utilise une URL absolue côté serveur
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/news.json`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) notFound();

  const news: NewsItem[] = await res.json();
  const article = news.find((n) => n.id === id);
  if (!article) notFound();

  return (
    <article className="news-article">
      <h1 className="news-title">{article.title}</h1>
      <span className="news-meta">
        Publié le {new Date(article.date).toLocaleDateString(locale)}
      </span>
      <p className="news-excerpt">{article.excerpt}</p>
      {article.content && (
        <div className="news-content">{article.content}</div>
      )}
    </article>
  );
}