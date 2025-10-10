import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Articles } from '@/lib/articles';

type BlogPageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
	const { slug } = await params;
	const article = Articles.get(slug);

	if (!article) {
		return {
			title: 'Article introuvable | Mon Blog',
			description: "Cet article n'existe pas ou a été supprimé.",
		};
	}

	return {
		title: `${article.title} | Mon Blog`,
		description: article.description,
		openGraph: {
			title: article.title,
			description: article.description,
			type: 'article',
			url: `https://mon-site.fr/blog/${slug}`,
		},
		twitter: {
			card: 'summary_large_image',
			title: article.title,
			description: article.description,
		},
	};
}

export default async function BlogPage({ params }: BlogPageProps) {
	const { slug } = await params;
	const article = Articles.get(slug);

	if (!article) notFound();

	return (
		<article className="space-y-6 max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
			<h1 className="text-3xl font-bold text-blue-600">{article.title}</h1>
			<p className="text-gray-700">{article.content}</p>
		</article>
	);
}
