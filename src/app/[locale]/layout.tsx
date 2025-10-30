import * as React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import ClientProvider from "@/providers/reduxProvider";

type Locale = 'fr' | 'en';
type Messages = AbstractIntlMessages;
type MessagesModule = { default: Messages };

const MESSAGE_LOADERS = {
    fr: () => import('@/messages/fr.json'),
    en: () => import('@/messages/en.json'),
} satisfies Record<Locale, () => Promise<MessagesModule>>;

function isLocale(x: string): x is Locale {
    return x === 'fr' || x === 'en';
}

export const metadata: Metadata = {
    title: 'Ecoshop',
    description: 'Your eco-friendly tech shop',
};

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
        <html lang={locale} suppressHydrationWarning>
            <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <ClientProvider>
                        <Header />
                        <main className="flex-1 container mx-auto px-6 py-12">{children}</main>
                        <Footer />
                    </ClientProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
