import ProductCard from "./components/ProductCard";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <main className="w-full">
                <h1 className="text-5xl text-white flex items-center pl-5 rounded-xl h-32 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                    Mili
                </h1>

                <div className="flex gap-4">
                    <Link href="/1" className="text-white">
                        Produit 1
                    </Link>
                    <Link href="/2" className="text-white">
                        Produit 2
                    </Link>
                </div>
                <div className="flex-wrap mt-10 flex gap-10">
                    <ProductCard />
                    <ProductCard />
                </div>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
                Footeraaaaaaaaaa
            </footer>
        </div>
    );
}
