import Link from "next/link";
import { Products } from "../../lib/products";
import HearthLogo from "@/components/icon/heartLogo";

export const metadata = {
    title: "Next Shop — Produits",
    description: "Liste des produits",
};

export default function ProductsPage() {
    const products = Products.list();
    return (
        <ul className="flex-wrap flex justify-center gap-5">
            {products.map((p) => (
                <li key={p.id}>
                    <Link href={`/products/${p.id}`}>
                        <div className="w-72 aspect-[9:16] flex group flex-col gap-2 rounded relative">
                            <div className="flex justify-between group-hover:rounded-t-[24px] bg-violet-800/10 text-violet-500 font-semibold p-3 rounded-[4px] trans-fast">
                                <p>{p.name}</p>
                                <p className="text-xl font-bold">{p.price} €</p>
                            </div>
                            <div className="overflow-hidden rounded">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8"
                                    alt=""
                                    className="grayscale-75 hover:grayscale-0 rounded-b-xl cursor-pointer z-0 transition-all duration-300 ease-in-out rounded-t-[4px]"
                                />
                            </div>
                            <div className="flex gap-2 relative z-10">
                                <button className="group-hover:rounded-bl-[24px] trans-fast text-violet-500 rounded-bl-[4px] rounded-t-xl w-full py-2 hover:cursor-pointer bg-violet-200">
                                    Add to Bag
                                </button>
                                <button className="group-hover:rounded-br-[24px] trasn-fast rounded-br-[4px] flex items-center justify-center group rounded-t-xl text-white w-fit px-5 hover:cursor-pointer bg-violet-700 trans-fast">
                                    <HearthLogo className="group-hover:text-red-200 duration-300 ease-in-out transition-all" />
                                </button>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
