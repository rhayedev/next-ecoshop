"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ChevronDown from "../icon/chevronDown";
import LangugageLogo from "../icon/languageLogo";

interface Language {
    code: string;
    name: string;
    rtl: boolean;
}

const languages: Language[] = [
    { code: "en", name: "English", rtl: false },
    { code: "fr", name: "Français", rtl: false },
];

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const params = useParams();
    const currentLocale =
        typeof params.locale === "string" ? params.locale : "en";

    const currentLanguage =
        languages.find((lang) => lang.code === currentLocale) || languages[0];

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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const changeLanguage = (langCode: string) => {
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split("/");
        pathSegments[1] = langCode;

        const newPath = pathSegments.join("/");
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
                <LangugageLogo className="w-4 h-4 mr-1" />
                <span className="font-medium text-xs mr-1">
                    {currentLanguage.code.toUpperCase()}
                </span>
                <ChevronDown
                    className={`
                        "w-3 h-3 transition-transform" ${
                            isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-1 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 w-40 min-w-max right-0">
                    <ul className="py-1">
                        {languages.map((language) => (
                            <li key={language.code}>
                                <button
                                    onClick={() =>
                                        changeLanguage(language.code)
                                    }
                                    className={`
                                        "w-full text-left cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center" ${
                                            language.code === currentLocale &&
                                            "bg-gray-100 dark:bg-gray-800"
                                        }
                                            `}
                                >
                                    <span className="inline-block me-2 w-max font-medium text-xs">
                                        {language.code.toUpperCase()}
                                    </span>
                                    {language.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
