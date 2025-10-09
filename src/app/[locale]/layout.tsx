import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const MESSAGE_LOADERS: Record<string, () => Promise<any>> = {
  fr: () => import("@/messages/fr.json"),
  en: () => import("@/messages/en.json"),
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loader = MESSAGE_LOADERS[locale] ?? MESSAGE_LOADERS.fr;
  const messages = (await loader()).default;

  return (
    <NextIntlClientProvider
      locale={loader === MESSAGE_LOADERS.fr ? "fr" : locale}
      messages={messages}
    >
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}