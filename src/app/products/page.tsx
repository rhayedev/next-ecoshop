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
                        <div className="w-72 aspect-[9:16] group flex flex-col gap-2 rounded relative">
                            <div className="overflow-hidden p-10 rounded-xl bg-gray-100">
                                <img
                                    src="https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/6925281988219.png"
                                    alt=""
                                    className="grayscale-100 group-hover:grayscale-0 rounded-b-xl cursor-pointer trans-fast rounded-t-[4px]"
                                />
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <p>{p.name}</p>
                                <p className="text-xl font-semibold">
                                    {p.price} €
                                </p>
                            </div>
                            <div className="flex gap-2 relative z-10">
                                <button className="trans-fast hover:bg-violet-100 text-violet-500 rounded-xl w-full py-2 hover:cursor-pointer bg-violet-200">
                                    Add to Bag
                                </button>
                                <button className="flex-center group hover:bg-violet-800 rounded-xl w-fit px-5 hover:cursor-pointer bg-violet-700 hover:text-white text-red-100 trans-fast">
                                    <HearthLogo className="hover:scale-105 trans-fast" />
                                </button>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
