import { notFound } from 'next/navigation';
import { News } from '@/lib/news';

type Props = { params: Promise<{ locale: string; id: string }> };

// ✅ Active l’ISR : la page est régénérée au plus toutes les 30s
export const revalidate = 30;

// (Optionnel) Meta dynamiques
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const item = await News.get(id);

  if (!item) {
    return { title: 'Article introuvable — Next News' };
  }
  return {
    title: `${item.title} — Next News`,
    description: item.excerpt.slice(0, 160),
    // Tu peux ajouter d'autres champs (open graph, etc.)
  };
}

export default async function NewsPage({ params }: Props) {
  const { id } = await params;

  // On refait un accès data ici (propre et centralisé via lib)
  const item = await News.get(id);
  if (!item) notFound();

  return (
    <article>
      <h1>{item.title}</h1>
      <p>
        <small>Publié le {new Date(item.date).toLocaleString()}</small>
      </p>
      <p>{item.excerpt}</p>
      {item.content ? <div>{item.content}</div> : null}
    </article>
  );
}
