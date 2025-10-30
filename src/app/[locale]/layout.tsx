import { NextIntlClientProvider } from 'next-intl';
import ClientProvider from "@/providers/reduxProvider";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import fs from 'fs';
import path from 'path';

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const localeDir = path.join(process.cwd(), 'src', 'messages', locale);

  let messages = {};

  try {
    if (fs.existsSync(localeDir)) {
      const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.json'));

      messages = files.reduce((acc, file) => {
        const filePath = path.join(localeDir, file);
        const fileMessages = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return { ...acc, ...fileMessages };
      }, {});
    } else {
      console.warn(`Dossier i18n manquant pour ${locale}, fallback sur fr`);
      const fallbackDir = path.join(process.cwd(), 'src', 'messages', 'fr');
      const files = fs.readdirSync(fallbackDir).filter((f) => f.endsWith('.json'));
      messages = files.reduce((acc, file) => {
        const filePath = path.join(fallbackDir, file);
        const fileMessages = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return { ...acc, ...fileMessages };
      }, {});
    }
  } catch (e) {
    console.error('Erreur de chargement des messages i18n', e);
  }

  return (
    
    <html lang={locale}>
      <ClientProvider>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">{children}</main>
            <Footer />
          </NextIntlClientProvider>

      </body>
      </ClientProvider>
    </html>
  );
}
