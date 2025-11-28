"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useTranslation } from "@/i18n/language-context";

export function SiteHeader() {
  const { t } = useTranslation();
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(0.85);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const b = Math.min(18, 10 + y * 0.02);
      const o = Math.min(0.95, 0.7 + y * 0.0005);
      setBlur(b);
      setOpacity(o);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 mb-10 px-4">
      <div
        className="mx-auto mt-6 flex max-w-5xl items-center justify-between
  rounded-3xl
  border border-white/10 dark:border-white/10
  bg-white/30 dark:bg-slate-900/60
  backdrop-blur-2xl
  shadow-[0_14px_40px_rgba(15,23,42,0.45)]
  px-6 py-3"
        style={{
          backdropFilter: `blur(${blur}px)`,
          backgroundColor: `rgba(255,255,255,${opacity})`,
        }}
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-full px-3 py-1 text-sm font-semibold transition hover:text-slate-900 dark:hover:text-white"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-cyan-400 to-indigo-500 text-base font-bold text-slate-950 shadow-[0_10px_35px_rgba(56,189,248,0.35)] ring-1 ring-white/40 transition duration-300 group-hover:shadow-[0_10px_40px_rgba(99,102,241,0.45)]">
            AI
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-xs tracking-[0.28em] text-slate-500 uppercase dark:text-slate-300">
              {t("hero.badge")}
            </span>
            <span className="text-base font-semibold text-slate-900 dark:text-white">Lab</span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
