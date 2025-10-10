"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import ChevronDown from "../icon/chevronDown";
import LanguageLogo from "../icon/languageLogo";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
];

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const currentLanguage =
        languages.find((lang) => lang.code === locale) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const changeLanguage = (langCode: string) => {
        const segments = pathname.split("/");
        segments[1] = langCode;
        const newPath = segments.join("/");
        router.push(newPath);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center cursor-pointer px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <LanguageLogo className="w-4 h-4 mr-1" />
                <span className="font-medium text-xs mr-1">
                    {currentLanguage.code.toUpperCase()}
                </span>
                <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-1 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-2 gap-2 flex flex-col w-40 min-w-max right-0">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full text-left cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center ${
                                lang.code === locale
                                    ? "bg-gray-100 dark:bg-gray-800"
                                    : ""
                            }`}
                        >
                            <span className="inline-block me-2 w-full font-medium text-xs">
                                {lang.code.toUpperCase()}
                            </span>
                            <p className="w-full">{lang.name}</p>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
