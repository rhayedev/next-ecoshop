import { notFound } from "next/navigation";
import "@/global.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    let messages;
    try {
        messages = (await import(`@/messages/${locale}.json`)).default;
    } catch {
        notFound();
    }

    return (
        <html lang="fr">
            <body>
                <Header />
                <main className="container">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
