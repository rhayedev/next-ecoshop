import * as React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceWorkerProvider from '@/components/ServiceWorkerProvider';
import '@/styles/globals.css';
import fs from 'fs';
import path from 'path';

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    const locale: Locale = isLocale(rawLocale) ? rawLocale : 'fr';

    const { default: messages } = await MESSAGE_LOADERS[locale]();

  return (
    
    <html lang={locale}>
    <head>
      <link rel="icon" href="/favicon.ico" />
    </head>
    <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ClientProvider>
          <ServiceWorkerProvider>
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">{children}</main>
            <Footer />
          </ServiceWorkerProvider>
        </ClientProvider>
      </NextIntlClientProvider>
    </body>
  </html>

  );
}
