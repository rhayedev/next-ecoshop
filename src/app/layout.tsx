import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
	title: 'Next Shop — Home',
	description: 'Demo Next.js TS: routing, SEO, layouts, errors, i18n',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<body>
				{children}
			</body>
		</html>
	);
}
