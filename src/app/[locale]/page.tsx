"use client";
import { useTranslations } from "next-intl";
import PreferencesPanel from '../components/PreferencesPanel';

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </>
  );
}

export function Page() {
  return (
    <main className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-6">Page d’accueil 🌍</h1>
      {/* @ts-expect-error Client Component */}
      <PreferencesPanel />
    </main>
  );
}