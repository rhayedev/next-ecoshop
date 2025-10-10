import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Messages = {
  nav: {
    home: string;
    products: string;
    about?: string;
  };
  home?: { title: string; description: string };
  products?: { title: string };
  about?: { title: string };
};

const MESSAGE_LOADERS: Record<string, () => Promise<{ default: Messages }>> = {
  fr: () => import('@/messages/fr.json'),
  en: () => import('@/messages/en.json'),
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  // On ne peut pas utiliser await ici, donc il faut charger les messages autrement
  // Solution simple : charger les messages statiquement (import direct)
  const messages =
    locale === 'en'
      ? require('@/messages/en.json')
      : require('@/messages/fr.json');

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header locale={locale} messages={messages} />
      <main className="app-main">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}