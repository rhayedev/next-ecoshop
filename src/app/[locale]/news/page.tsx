import type { FC } from 'react';

type Props = { params: { locale: string } };

const NewsPage: FC<Props> = ({ params }) => {
	const { locale } = params;
	return (
		<main>
			<h1>{locale} — Actualités</h1>
			<p>Contenu de la page « news » pour le locale : {locale}</p>
		</main>
	);
};

export default NewsPage;
