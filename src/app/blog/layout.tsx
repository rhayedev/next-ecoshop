// app/blog/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { Articles } from '@/lib/articles';

export default function BlogLayout({ children }: { children: ReactNode }) {
	const articles = Articles.list();

	return (
		<section className="max-w-6xl mx-auto py-10 px-4">
			<header className="mb-8">
				<h1 className="text-4xl font-bold text-blue-600">Le Blog</h1>
				<p className="text-gray-700 mt-2">Découvrez nos articles et conseils.</p>
			</header>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
				{articles.map((article) => (
					<Link
						key={article.slug}
						href={`/blog/${article.slug}`}
						className="block p-4 border rounded-lg hover:shadow-lg transition"
					>
						<h2 className="text-xl font-semibold text-blue-600">{article.title}</h2>
						<p className="text-gray-700 mt-2">{article.description}</p>
					</Link>
				))}
			</div>
			<div>{children}</div>
		</section>
	);
}
