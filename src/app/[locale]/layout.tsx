import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import "@/app/styles/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default async function LocaleLayout({
  children, params: { locale }
}: { children: React.ReactNode; params: { locale: string } }) {
  let messages;
  try { messages = (await import(`@/messages/${locale}.json`)).default; }
  catch { notFound(); }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="container">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}