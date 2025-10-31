import "@/global.css";
import { notFound } from "next/navigation";
import type { Messages } from "next-intl";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";

interface Props {
    children: ReactNode;
    params: { local: string };
}

const messagesMap: Record<string, Messages> = {
    en: enMessages,
    fr: frMessages,
  };

export default function LocaleLayout({ children, params: { local } }: Props) {
    const messages = messagesMap[local];
    if (!messages) notFound();

    return (
        <html lang={local}>
            <body>
                <NextIntlClientProvider locale={local} messages={messages}>
                    <Header />
                    <main className="container">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
  