import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type Lang, type Translations } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ar",
  setLang: () => {},
  t: translations.ar as unknown as Translations,
  isRtl: true,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const initialLang = new URLSearchParams(window.location.search).get("lang");
  const [lang, setLangState] = useState<Lang>(
    initialLang === "en" || initialLang === "fr" || initialLang === "ar"
      ? initialLang
      : "ar",
  );

  function setLang(l: Lang) {
    setLangState(l);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", l);
    window.history.replaceState({}, "", url);
  }

  const isRtl = lang === "ar";

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", isRtl ? "rtl" : "ltr");
    html.setAttribute("lang", lang);
    if (isRtl) {
      html.classList.add("font-arabic");
    } else {
      html.classList.remove("font-arabic");
    }
  }, [lang, isRtl]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translations[lang] as Translations, isRtl }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
