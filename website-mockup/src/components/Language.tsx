"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { copy, type Copy, type Lang } from "@/lib/content";

const KEY = "axion-lang";

function readLang(): Lang {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === "pl" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("pl")) {
    return "pl";
  }
  return "en";
}

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Copy;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const next = readLang();
    setLangState(next);
    document.documentElement.lang = next;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = copy[lang].title;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: copy[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useCopy() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useCopy needs LanguageProvider");
  return value;
}

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useCopy();
  return (
    <div className={`inline-flex items-center ${className}`}>
      <button
        type="button"
        className={`inline-flex min-h-11 items-center px-2 text-[13px] ${lang === "pl" ? "text-ink" : "text-ink-faint"}`}
        aria-pressed={lang === "pl"}
        onClick={() => setLang("pl")}
      >
        PL
      </button>
      <button
        type="button"
        className={`inline-flex min-h-11 items-center px-2 text-[13px] ${lang === "en" ? "text-ink" : "text-ink-faint"}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}
