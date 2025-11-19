import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	params: { locale: string } | Promise<{ locale: string }>;
};

export default async function NewsLayout({ children, params }: Props) {
	const { locale } = await params;
	return (
		<section>
			<header>
				<h2>{locale} — Actualités</h2>
			</header>
			{children}
		</section>
	);
}
