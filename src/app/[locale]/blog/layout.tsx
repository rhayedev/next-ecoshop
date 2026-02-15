import { ReactNode } from 'react';
import Link from 'next/link';
import { Articles } from '@/app/lib/articles';
import '@/app/styles/posts.css';

export default function BlogLayout({ children }: { children: ReactNode }) {
  const articles = Articles.list();

  return (
    <section className="posts-list">
      {articles.map((article) => (
        <Link key={article.slug} href={`/blog/${article.slug}`}>
          <h2>{article.title}</h2>
          <p>{article.html}</p>
        </Link>
      ))}
      {children}
    </section>
  );
}
