import { defineRouting } from "next-intl/routing";
import { SUPPORTED_LOCALES } from "@/i18n/request";

export const routing = defineRouting({
    locales: SUPPORTED_LOCALES,
    defaultLocale: "fr",
    localePrefix: "as-needed",
});
