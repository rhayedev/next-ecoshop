import Link from "next/link";
import HearthLogo from "@/components/icon/heartLogo";
import { getTranslations } from "next-intl/server";
import FetchProducts from "@/lib/ssrFetch";

export const metadata = {
    title: "Next Shop — Produits",
    description: "Liste des produits",
};

export default async function ProductsPage() {
    const products = await FetchProducts();
    const t = await getTranslations("products");

    return (
        <ul className="flex-wrap flex justify-center gap-5">
            {products.map((p: any) => (
                <li key={p.id}>
                    <Link href={`/products/${p.id}`}>
                        <div className="w-72 bg-gray-100 hover:ring-[3px] trans-fast ring-violet-400 ring-offset-2 rounded-2xl p-6 overflow-hidden aspect-[9:16] group flex flex-col gap-2 relative">
                            <div className="flex justify-between text-gray-500">
                                <p>{p.name}</p>
                                <p className="text-xl text-black font-semibold">
                                    {p.price} €
                                </p>
                            </div>

                            <div className="overflow-hidden p-10 rounded-xl bg-gray-100">
                                <img
                                    src="https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/6925281988219.png"
                                    alt=""
                                    className="grayscale-100 group-hover:grayscale-0 rounded-b-xl cursor-pointer trans-fast rounded-t-[4px]"
                                />
                            </div>

                            <div className="flex gap-2 relative z-10 flex-center">
                                <button className="trans-fast hover:bg-violet-300 hover:text-violet-700 text-violet-500 rounded-2xl px-6 h-10 hover:cursor-pointer bg-violet-200">
                                    {t("add_to_bag")}
                                </button>
                                <button className="flex-center h-10 w-10 rounded-2xl hover:cursor-pointer bg-white border-red-100 border p-2 hover:bg-red-400 hover:text-red-100 text-red-400 trans-fast">
                                    <HearthLogo />
                                </button>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
