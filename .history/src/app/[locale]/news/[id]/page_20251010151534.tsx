import { notFound } from "next/navigation";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
};

type Props = { params: { id: string; locale: string } };

export const dynamic = "force-dynamic";
export const revalidate = 30;

export default async function NewsPage({ params }: Props) {
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
  const article = news.find((n) => n.id === params.id);
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