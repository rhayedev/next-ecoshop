"use client";
import "@/lib/i18n";
import LanguageSwitcher from "./buttons/languageSwitch";
import HeaderLink from "./headerLink";
import HeaderSearch from "./headerSearch";

export default function Header() {
    return (
        <header className="site-header sticky top-0 z-50 bg-[#0c0c0c] w-full flex-center flex-col h-20">
            <nav className="nav w-fit items-center relative z-50 flex gap-5 text-gray-200 h-full">
                <LanguageSwitcher />
                <HeaderLink href="/" title="home" />
                <HeaderLink href="/blogs" title="blogs" />
                <HeaderLink href="/products" title="products" />
                <HeaderLink href="/bags" title="bag" />
                <HeaderSearch />
            </nav>
            <div className="bg-transparent flex justify-between w-full absolute top-14 h-10">
                <div className="inverted-left -translate-x-28 -translate-y-[104px] bg-[#0c0c0c] h-40 aspect-square"></div>
                <div className="h-6 w-full bg-[#0c0c0c] absolute top-0"></div>
                <div className="inverted aspect-square translate-x-32 -translate-y-[104px] bg-[#0c0c0c] h-40"></div>
            </div>
        </header>
    );
}
