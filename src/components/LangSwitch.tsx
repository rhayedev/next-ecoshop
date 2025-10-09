"use client";
import { useState } from "react";
import fr from "@/messages/fr.json";
import en from "@/messages/en.json";

const messages = { fr, en };

export default function LangSwitch() {
  const [lang, setLang] = useState<"fr" | "en">("fr");

  return (
    <div className="lang-switch">
      <div className="lang-switch-buttons">
        <button onClick={() => setLang("fr")} disabled={lang === "fr"}>FR</button>
        <button onClick={() => setLang("en")} disabled={lang === "en"}>EN</button>
      </div>
      <h1>{messages[lang]["home.title"]}</h1>
    </div>
  );
}