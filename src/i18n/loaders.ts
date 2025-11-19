import { Locale, isLocale } from "./request";
import frMessages from "../messages/fr.json";

export type Messages = typeof frMessages;

export const MESSAGE_LOADERS: Record<Locale, () => Promise<{ default: Messages }>> = {
  fr: () => import("../messages/fr.json"),
  en: () => import("../messages/en.json"),
};

export async function loadMessages(locale: string): Promise<{ locale: Locale; messages: Messages }> {
  const loc: Locale = isLocale(locale) ? locale : "fr";

  try {
    const { default: messages } = await MESSAGE_LOADERS[loc]();
    return { locale: loc, messages };
  } catch {
    const { default: messages } = await MESSAGE_LOADERS["fr"]();
    return { locale: "fr", messages };
  }
}
