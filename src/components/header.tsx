"use client";
import "@/lib/i18n";
import LanguageSwitcher from "./buttons/languageSwitch";
import HeaderLink from "./headerLink";
import HeaderSearch from "./headerSearch";

export default function Header() {
    return (
        <header className="site-header sticky top-0 z-50 bg-[#0c0c0c] w-full flex-center flex-col h-20">
            <nav className="nav w-fit items-center flex gap-5 text-gray-200 h-full">
                <LanguageSwitcher />
                <HeaderLink href="/" title="home" />
                <HeaderLink href="/blogs" title="blog" />
                <HeaderLink href="/products" title="store" />
                <HeaderLink href="/bags" title="bag" />
                <HeaderSearch />
            </nav>
            <div className="bg-red-200 flex justify-between w-full h-10">
                <div className="inverted bg-red-400 h-10 aspect-square"></div>
                <div className="h-6 w-full bg-red-400"></div>
                <div className="inverted-left aspect-square bg-red-400 h-10"></div>
            </div>
        </header>
    );
}
