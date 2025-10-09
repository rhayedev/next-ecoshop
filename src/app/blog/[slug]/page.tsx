import { notFound } from 'next/navigation';

interface BlogPageProps {
	params: {
		slug: string;
	};
}

export default function BlogPage({ params }: BlogPageProps) {
    if (!params.slug) notFound();
	return (
		<div>
			<h1>Article : {params.slug}</h1>
			<p>Contenu de l’article “{params.slug}”.</p>
		</div>
	);
}
