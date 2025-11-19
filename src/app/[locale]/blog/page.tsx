import Link from 'next/link';
import { Articles } from '@/lib/articles';

export default function BlogIndex() {
	const articles = Articles.list();

	return (
		<section className="max-w-6xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{articles.map((article) => (
				<Link
					key={article.slug}
					href={`/blog/${article.slug}`}
					className="block p-6 bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition"
				>
					<h2 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h2>
				</Link>
			))}
		</section>
	);
}
