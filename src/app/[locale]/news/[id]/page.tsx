import { notFound } from 'next/navigation';
import { NewsAPI } from '@/lib/news';

type Props = { params: { id: string } };

export const revalidate = 30;

export async function generateStaticParams() {
	return NewsAPI.list().map((news) => ({ id: news.id }));
}

export default function NewsPage({ params }: Props) {
	const news = NewsAPI.get(params.id);

	if (!news) notFound();

	return (
		<article className="max-w-3xl mx-auto py-12 px-6 space-y-4 bg-white rounded-2xl shadow-md border border-gray-100">
			<h1 className="text-3xl font-bold text-blue-600">{news.title}</h1>
			<p className="text-gray-500 text-sm">{new Date(news.date).toLocaleDateString()}</p>
			<p className="text-gray-700">{news.excerpt}</p>
		</article>
	);
}
