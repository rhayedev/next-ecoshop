import { notFound } from "next/navigation";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
};

type Props = { params: { id: string; locale: string } };

// ISR toutes les 30s
export const revalidate = 30;

export default async function NewsPage({ params }: Props) {
  // Charge le JSON via fetch depuis le dossier public
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/news.json`, {
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