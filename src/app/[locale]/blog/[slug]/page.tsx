import { notFound } from 'next/navigation';
import posts from '@/data/posts.json'; // SSG: import statique au build

type Props = { params: Promise<{ locale: string; slug: string }> };

type Post = {
  slug: string;
  title: string;
  html: string; // contenu HTML (déjà “sécurisé” car maîtrisé/local)
};

// —————————————————————————————————————————————
// SSG: pré-génération des chemins
// On génère pour chaque locale (adapter si besoin)
export async function generateStaticParams() {
  const locales = ['fr', 'en']; // adapte à tes locales
  const slugs = (posts as Post[]).map((p) => p.slug);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

// —————————————————————————————————————————————
// Bonus: meta dynamiques
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = (posts as Post[]).find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Article introuvable — Next Blog' };
  }
  return {
    title: `${post.title} — Next Blog`,
    description: post.html.replace(/<[^>]*>/g, '').slice(0, 160), // petit extrait “safe”
  };
}

// —————————————————————————————————————————————
// Page SSG
export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = (posts as Post[]).find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
