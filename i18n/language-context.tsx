"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { en } from "./en";
import { pl } from "./pl";
import { uk } from "./uk";

export const LANGUAGES = ["en", "uk", "pl"] as const;
export type Language = (typeof LANGUAGES)[number];

const STORAGE_KEY = "ai-lab-language";

type Translation = typeof en;

// Больше не вычисляем вложенные ключи типами — просто строка.
type TranslationKey = string;

const translations: Record<Language, Translation> = {
  en: en as Translation,
  uk: uk as Translation,
  pl: pl as Translation,
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolveTranslation(key: TranslationKey, dictionary: Translation): string {
  return key.split(".").reduce((acc: unknown, part) => {
    if (typeof acc === "object" && acc && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return "";
  }, dictionary) as string;
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
      resolveTranslation(key, translations[language]) || `missing:${key}`;

    return {
      language,
      t,
      setLanguage,
    };
  }, [language, setLanguage]);

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
