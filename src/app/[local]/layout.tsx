import { notFound } from "next/navigation";
import "@/global.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

interface Props {
    children: ReactNode;
    params: { locale: string };
}

export default async function LocaleLayout({ children, params: { locale } }: Props): Promise<JSX.Element> {
    let messages;
    try {
        messages = (await import(`@/messages/${locale}.json`)).default;
    } catch {
        notFound();
    }

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
