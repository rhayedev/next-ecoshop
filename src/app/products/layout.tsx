import Filters from "@/components/Filters";
import { useTranslations } from "next-intl";
import ProductsList from "./ProductList";
import QueryProvider from "../providers/QueryProvider";
import AddToCartButton from "./AddToCartButton";
import CartSummary from "@/components/CartSummary";

export default function ProductsLayout() {
    const t = useTranslations("products");

    return (
        <section>
            <div className="flex min-h-full gap-15 my-5 mb-20">
                <h1 className="text-5xl text-nowrap font-extrabold text-violet-700">
                    {t("products")}
                </h1>
                <div className="bg-gradient-to-l from-violet-500 to-fuchsia-500 w-full rounded"></div>
            </div>
            <div className="h-80 bg-violet-100 mb-20 pl-20 pr-48 justify-between flex items-center rounded-xl">
                <div className="flex flex-col gap-10">
                    <h1 className="text-3xl text-nowrap text-black">
                        {t("get_your_headphones_now")}
                    </h1>
                    <button className="px-10 py-2 rounded-full w-fit bg-black text-white flex-center">
                        {t("buy_now")}
                    </button>
                </div>

                <img
                    src="https://www.hear-her.com/wp-content/uploads/2018/01/her-onears-5.png"
                    alt=""
                    className="h-80"
                />
            </div>
            <Filters />
            <QueryProvider>
                <ProductsList/>
            </QueryProvider>
        </section>
    );
}
