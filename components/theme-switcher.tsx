"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const SunIcon = () => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2v2.5m0 15V22M4 12H2m20 0h-2m-2.95-7.05-1.77 1.77M6.72 17.28l-1.77 1.77m0-14.1 1.77 1.77m10.56 10.56 1.77 1.77" />
  </svg>
);

const MoonIcon = () => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7.5 7.5 0 0 0 21 12.79Z" />
  </svg>
);

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Safe here to avoid hydration mismatch when resolving theme on the client.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full border border-white/10 bg-white/10 dark:border-white/10 dark:bg-white/5" />
    );
  }

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-slate-800 shadow-[0_4px_20px_rgba(59,130,246,0.25)] backdrop-blur transition hover:shadow-[0_8px_22px_rgba(59,130,246,0.35)] dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"} mode</span>
    </button>
  );
}
