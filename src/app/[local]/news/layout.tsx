import { getTranslations } from "next-intl/server";
export const metadata = {
    title: "Next Shop — News",
    description: "Dernières actualités de Next Shop",
};

export default async function NewsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = await getTranslations("news");
    return (
        <section className="pb-20">
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
