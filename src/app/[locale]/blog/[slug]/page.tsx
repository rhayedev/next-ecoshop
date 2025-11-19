// src/app/[locale]/blog/[slug]/page.tsx

import posts from '@/data/posts.json';
import { notFound } from 'next/navigation';

type Post = {
  slug: string;
  title: string;
  html: string;
};

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return (posts as Post[]).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const post = (posts as Post[]).find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Article introuvable | Blog EcoShop',
    };
  }

  return {
    title: `${post.title} | Blog EcoShop`,
    description: post.title,
  };
}

export default async function BlogPost({ params }: Props) {
  const post = (posts as Post[]).find((p) => p.slug === params.slug);

  if (!post) notFound();

  return (
    <article className="prose mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
