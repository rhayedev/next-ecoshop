import news from '@/data/news.json';
import { notFound } from 'next/navigation';

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

  // 1. Tentative appel API distante
  let articleFromApi: News | null = null;
  try {
    const res = await fetch(`https://api.example.com/news/${id}`, {
      next: { tags: ['news', `news:${id}`] },
    });

    if (res.ok) {
      articleFromApi = await res.json();
    }
  } catch {
    // On ignore, on passera sur le fallback local
  }

  // 2. Si API OK → on affiche
  if (articleFromApi) {
    const article = articleFromApi;
    return (
      <article className="max-w-3xl mx-auto py-12 px-6 space-y-4 bg-white rounded-2xl shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-600">{article.title}</h1>
        <p className="text-gray-500 text-sm">
          {new Date(article.date).toLocaleDateString('fr-FR')}
        </p>
        <p className="text-gray-700">{article.excerpt}</p>
      </article>
    );
  }

  // 3. Sinon → fallback local
  const article = (news as News[]).find((n) => n.id === id);
  if (!article) notFound();

  return (
    <article className="max-w-3xl mx-auto py-12 px-6 space-y-4 bg-white rounded-2xl shadow-md border border-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">{article.title}</h1>
      <p className="text-gray-500 text-sm">
        {new Date(article.date).toLocaleDateString('fr-FR')}
      </p>
      <p className="text-gray-700">{article.excerpt}</p>
      <p className="mt-4 text-yellow-700 text-sm italic">
        Données locales affichées – API non disponible.
      </p>
    </article>
  );
}