"use client";
import "@/lib/i18n";
import LanguageSwitcher from "./buttons/languageSwitch";
import { useTranslation } from "react-i18next";
import HeaderLink from "./headerLink";
import HeaderSearch from "./headerSearch";

export default function Header() {
    const { t } = useTranslation();

    return (
        <header className="site-header w-full flex-center h-20">
            <nav className="nav w-fit items-center flex gap-5 text-gray-200 h-full">
                <LanguageSwitcher />
                <HeaderLink href="/" title="home" />
                <HeaderLink href="/blogs" title="blog" />
                <HeaderLink href="/products" title="store" />
                <HeaderLink href="/bags" title="bags" />
                <HeaderSearch />
            </nav>
        </header>
    );
}
