import { getTranslations } from "next-intl/server";

export default async function HomePage() {
    const t = await getTranslations("home");

    return (
        <div className="flex min-h-full sm:gap-15 my-20">
            <h1 className="text-5xl text-nowrap font-extrabold text-violet-600">
                {t("title")}
            </h1>
            <div className="bg-gradient-to-l from-violet-500 to-fuchsia-500 w-full rounded"></div>
        </div>
    );
}
