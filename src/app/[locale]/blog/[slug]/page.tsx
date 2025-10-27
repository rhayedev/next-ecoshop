import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Articles } from '@/lib/articles';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
	return Articles.list().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const article = Articles.get(slug);
	if (!article) {
		return { title: 'Article introuvable | Blog', description: '' };
	}
	return {
		title: `${article.title} | Blog`,
		description: article.title,
		openGraph: {
			title: article.title,
			description: article.title,
			type: 'article',
			url: `https://mon-site.fr/blog/${slug}`,
		},
		twitter: {
			card: 'summary_large_image',
			title: article.title,
			description: article.title,
		},
	};
}

export default async function BlogPage({ params }: Props) {
	const { slug } = await params;
	const article = Articles.get(slug);
	if (!article) notFound();

	return (
		<article className="max-w-3xl mx-auto py-12 px-6 space-y-6 prose prose-lg text-gray-800">
			<h1 className="text-3xl font-bold text-blue-600">{article.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: article.html }} />
		</article>
	);
}
