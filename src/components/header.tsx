"use client";
import "@/lib/i18n";
import LanguageSwitcher from "./buttons/languageSwitch";
import HeaderLink from "./headerLink";
import HeaderSearch from "./headerSearch";

export default function Header() {
    return (
        <header className="site-header w-full flex-center h-20">
            <nav className="nav w-fit items-center flex gap-5 text-gray-200 h-full">
                <LanguageSwitcher />
                <HeaderLink href="/" title="home" />
                <HeaderLink href="/blogs" title="blog" />
                <HeaderLink href="/products" title="store" />
                <HeaderLink href="/bags" title="bag" />
                <HeaderSearch />
            </nav>
        </header>
    );
}
