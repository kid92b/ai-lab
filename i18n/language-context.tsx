"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { en } from "./en";
import { pl } from "./pl";
import { uk } from "./uk";

export const LANGUAGES = ["en", "uk", "pl"] as const;
export type Language = (typeof LANGUAGES)[number];

const STORAGE_KEY = "ai-lab-language";

const translations = {
  en,
  uk,
  pl,
};

type Translation = typeof en;

export type TranslationKey = string;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolveTranslation(key: string, dictionary: Translation): string {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (typeof acc === "object" && acc && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    // если по пути ключа ничего нет — просто возвращаем пустую строку
    return "";
  }, dictionary as unknown);

  return typeof value === "string" ? value : "";
}

type LanguageProviderProps = {
  children: React.ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      (localStorage.getItem(STORAGE_KEY) as Language | null)) as Language | null;
    if (stored && LANGUAGES.includes(stored)) {
      // Sync language choice from localStorage on mount to avoid hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, language);
    }
  }, [language, hydrated]);

  const value = useMemo<LanguageContextValue>(() => {
    const t = (key: TranslationKey) =>
      resolveTranslation(key, translations[language]) ?? `missing:${key}`;

    return {
      language,
      setLanguage,
      t,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return {
    t: ctx.t,
    language: ctx.language,
    setLanguage: ctx.setLanguage,
  };
}
