import posts from '@/data/posts.json';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Article introuvable | Blog EcoShop'
    };
  }

  return {
    title: `${post.title} | Blog EcoShop`
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) notFound();

  return (
    <article className="prose mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
