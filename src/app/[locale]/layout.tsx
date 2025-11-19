import * as React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactQueryProvider from '@/providers/reduxProvider';
import ServiceWorkerProvider from '@/components/ServiceWorkerProvider';
import '@/styles/globals.css';
import { loadMessages } from '@/i18n/loaders';


export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    const { locale, messages } = await loadMessages(rawLocale);

  return (
    
    <html lang={locale}>
    <head>
      <link rel="icon" href="/favicon.ico" />
    </head>
    <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ReactQueryProvider>
          <ServiceWorkerProvider>
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">{children}</main>
            <Footer />
          </ServiceWorkerProvider>
        </ReactQueryProvider>
      </NextIntlClientProvider>
    </body>
  </html>

  );
}
