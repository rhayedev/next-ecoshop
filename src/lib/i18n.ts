import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "@/messages/en.json";
import translationFR from "@/messages/fr.json";

const resources = {
    en: { translation: translationEN },
    fr: { translation: translationFR },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    keySeparator: false,
    interpolation: { escapeValue: false },
});

export default i18n;
