"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const isActive = (href: string) => (pathname === href ? "active" : "");

    return (
        <header className="site-header w-full flex-center h-20">
            <nav className="nav w-fit flex gap-5">
                <Link className={isActive("/")} href="/">
                    Home
                </Link>
                <Link className={isActive("/blogs")} href="/blogs">
                    Blogs
                </Link>
                <Link className={isActive("/products")} href="/products">
                    Store
                </Link>
                <input
                    type="search"
                    className="bg-white outline-0 pl-4 text-[#5f1a84] rounded-xl w-6 h-6 hover:w-40 trans-fast"
                    name=""
                    id=""
                />
                <Link className={isActive("/bag")} href="/bag">
                    Bag
                </Link>
            </nav>
        </header>
    );
}
