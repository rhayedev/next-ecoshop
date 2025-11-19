import Filters from "@/components/Filters";
import { useTranslations } from "next-intl";
import ProductsList from "./ProductList";
import Image from "next/image";
import HeadphoneHero from "@/components/imgs/headphone-hero.webp";
import QueryProvider from "@/app/providers/QueryProvider";
import { Suspense } from "react";

export default function ProductsLayout() {
    const t = useTranslations("products");

    return (
        <section>
            <div className="flex min-h-full gap-15 my-5 mb-20">
                <h1 className="sm:text-5xl text-3xl text-nowrap font-extrabold text-violet-700">
                    {t("products")}
                </h1>
                <div className="bg-linear-to-l from-violet-500 to-fuchsia-500 w-full rounded"></div>
            </div>
            <div className="sm:h-80 h-fit bg-violet-100 mb-20 sm:pl-20 pl-5 sm:pr-48 sm:justify-between flex justify-center flex-col sm:flex-row items-center rounded-xl gap-5 sm:gap-0">
                <div className="flex flex-col gap-10 sm:items-baseline sm:justify-baseline flex-center">
                    <h1 className="sm:text-3xl text-xl mt-5 sm:mt-0 sm:text-nowrap text-black">
                        {t("get_your_headphones_now")}
                    </h1>
                    <button className="px-10 py-2 rounded-full w-fit bg-black text-white flex-center">
                        {t("buy_now")}
                    </button>
                </div>

                <Image
                    alt=""
                    src={HeadphoneHero}
                    className=""
                    width={320}
                    height={320}
                    priority={false}
                />
            </div>
            <Suspense fallback={<p>Chargement…</p>}>
                <Filters />
            </Suspense>
            <QueryProvider>
                <Suspense fallback={<p>Chargement…</p>}>
                    <ProductsList />
                </Suspense>
            </QueryProvider>
        </section>
    );
}
