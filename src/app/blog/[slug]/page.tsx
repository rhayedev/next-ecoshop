import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Articles } from '@/app/lib/articles';

type BlogPageProps = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
	const article = Articles.get(params.slug);

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
			url: `https://mon-site.fr/blog/${params.slug}`,
		},
		twitter: {
			card: 'summary_large_image',
			title: article.title,
			description: article.description,
		},
	};
}

export default function BlogPage({ params }: BlogPageProps) {
	const article = Articles.get(params.slug);

	if (!article) notFound();

	return (
		<article className="space-y-6">
			<h1 className="text-3xl font-bold text-blue-600">{article.title}</h1>
			<p className="text-gray-700">{article.content}</p>
		</article>
	);
}