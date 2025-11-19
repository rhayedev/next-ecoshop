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

export default async function LocaleLayout(props: { children: ReactNode; params: { locale: string } }) {
  const { params, children } = await props;
  const { locale } = params;
  const loader = MESSAGE_LOADERS[locale] ?? MESSAGE_LOADERS.fr;
  const messages = (await loader()).default;

  return (
    <NextIntlClientProvider locale={loader === MESSAGE_LOADERS.fr ? 'fr' : locale} messages={messages}>
      <Header locale={locale} messages={messages} />
      <main className="app-main">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}