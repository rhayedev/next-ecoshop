import React from "react";
import { useTranslation } from "react-i18next";
import FrenchFlagLogo from "../icon/frFlag";
import UKFlagLogo from "../icon/ukFlag";

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    return (
        <button
            onClick={() =>
                i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr")
            }
            className="group cursor-pointer w-7 h-7 overflow-hidden rounded-full bg-white text-violet-500 flex-center"
        >
            {i18n.language === "fr" ? (
                <UKFlagLogo className="z-[101] scale-[1.6]" />
            ) : (
                <FrenchFlagLogo className="scale-[1.6]" />
            )}
        </button>
    );
};

export default LanguageSwitcher;
