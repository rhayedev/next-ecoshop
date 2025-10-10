import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export default async function LocaleRootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const { locale } = params;
	const messages = (await import(`../../messages/${locale}.json`)).default;

	return (
		<html lang={locale}>
			<body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Header />
					<main className="flex-1 container mx-auto px-6 py-12">{children}</main>
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
