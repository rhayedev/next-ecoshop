import news from '@/data/news.json';
import { notFound } from 'next/navigation';
import '@/app/styles/news.css';

type News = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

type Props = { params: { id: string } };

export const revalidate = 30;

export async function generateStaticParams() {
  return (news as News[]).map((n) => ({ id: n.id }));
}

export default async function NewsPage({ params }: Props) {
  const { id } = params;

  let articleFromApi: News | null = null;
  try {
    const res = await fetch(`https://api.example.com/news/${id}`, {
      next: { tags: ['news', `news:${id}`] },
    });
    if (res.ok) articleFromApi = await res.json();
  } catch {}

  const article = articleFromApi ?? (news as News[]).find((n) => n.id === id);
  if (!article) notFound();

  return (
    <article className="news-article">
      <h1>{article.title}</h1>
      <p className="news-date">
        {new Date(article.date).toLocaleDateString('fr-FR')}
      </p>
      <p className="news-excerpt">{article.excerpt}</p>
      {!articleFromApi && (
        <p className="news-fallback">
          Données locales affichées – API non disponible.
        </p>
      )}
    </article>
  );
}
