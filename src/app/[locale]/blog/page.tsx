// app/blog/page.tsx
import Link from 'next/link';
import { Articles } from '@/app/lib/articles';

export default function BlogHome() {
	const articles = Articles.list();

	return (
		<div className="space-y-8">
			<h2 className="text-2xl font-semibold">Derniers articles</h2>
			<ul className="space-y-4">
				{articles.map((article) => (
					<li key={article.slug} className="border p-4 rounded-lg hover:shadow">
						<Link href={`/blog/${article.slug}`} className="block">
							<h3 className="text-xl font-bold text-blue-600 hover:underline">
								{article.title}
							</h3>
							<p className="text-gray-700">{article.description}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}