import { getTranslations } from "next-intl/server";
export default async function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = await getTranslations("article");
    return (
        <section>
            <div className="flex min-h-full gap-15 my-20">
                <h1 className="text-5xl text-nowrap font-extrabold text-violet-600">
                    {t("title")}
                </h1>
                <div className="bg-gradient-to-l from-violet-500 to-fuchsia-500 w-full rounded"></div>
            </div>
            {children}
        </section>
    );
}
