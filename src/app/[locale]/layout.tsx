import type { ReactNode } from 'react';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSummary from '../components/CartSummary';
import ReduxProvider from '../providers/ReduxProvider';
import ThemeEffect from '../components/ThemeEffect';
import ReactQueryProvider from '../providers/ReactQueryProvider';
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";

export default async function LocaleLayout(props: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { children } = props;
  const params = await props.params;
  const { locale } = params;

  const messages = locale === "fr" ? messagesFr : messagesEn;

  return (
    <ReduxProvider>
      <ThemeEffect />
      <ReactQueryProvider>
        <Header locale={locale} messages={messages} />
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
          <main className="app-main" style={{ flex: 1 }}>{children}</main>
          <CartSummary />
        </div>
        <Footer />
      </ReactQueryProvider>
    </ReduxProvider>
  );
}