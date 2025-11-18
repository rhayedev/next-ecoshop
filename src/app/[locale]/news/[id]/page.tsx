import news from '@/data/news.json';
import { notFound } from 'next/navigation';

export const revalidate = 30;

export default async function NewsPage({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://alliancedesproprietaires.fr:8443/api/faqs/${params.id}`,
    {
      next: { tags: ['news', `news:${params.id}`] },
    }
  ).catch(() => null);

  if (!res || !res.ok) {
    const article = news.find((n) => n.id === params.id);
    if (!article) notFound();

    return (
      <article className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
        <p className="text-sm text-gray-500 mb-4">Publié le {article.date}</p>
        <p>{article.excerpt}</p>
        <p className="mt-6 text-yellow-700 text-sm italic">
          Données locales affichées - API non disponible
        </p>
      </article>
    );
  }

  const article = await res.json();

  return (
    <article className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Publié le {article.date}</p>
      <p>{article.excerpt}</p>
    </article>
  );
}
