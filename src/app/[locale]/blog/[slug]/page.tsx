import posts from '@/data/posts.json';
import { notFound } from 'next/navigation';
import '@/app/styles/posts.css';

type Post = { slug: string; title: string; html: string };
type Props = { params: { slug: string } };

export default function BlogPost({ params }: Props) {
  const post = (posts as Post[]).find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="post-article">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
