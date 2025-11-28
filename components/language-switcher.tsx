"use client";

import { LANGUAGES, type Language, useTranslation } from "@/i18n/language-context";

const LABELS: Record<Language, string> = {
  en: "EN",
  uk: "UA",
  pl: "PL",
};

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 p-1 text-xs font-semibold text-slate-800 shadow-[0_4px_20px_rgba(59,130,246,0.25)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
      {LANGUAGES.map((lang) => {
        const active = lang === language;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            className={`rounded-full px-3 py-1 transition ${
              active
                ? "bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-900 shadow-[0_8px_24px_rgba(59,130,246,0.35)]"
                : "text-slate-700 hover:bg-white/40 dark:text-slate-200 dark:hover:bg-white/10"
            }`}
            aria-pressed={active}
            aria-label={`Switch language to ${LABELS[lang]}`}
          >
            {LABELS[lang]}
          </button>
        );
      })}
    </div>
  );
}
