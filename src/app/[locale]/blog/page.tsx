import Link from 'next/link';
import { Articles } from '@/app/lib/articles';
import '@/app/styles/posts.css';

export default function BlogHome() {
  const articles = Articles.list();

  return (
    <ul className="posts-list">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link href={`/blog/${article.slug}`}>
            <h3>{article.title}</h3>
            <p>{article.html}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
