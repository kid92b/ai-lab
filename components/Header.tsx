"use client";

import type { ReactNode } from "react";

type HeaderProps = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};

export function Header({ left, center, right }: HeaderProps) {
  return (
    <header className="mt-6 flex w-full justify-center px-4">
      <div
        className="
          flex w-full max-w-5xl items-center justify-between
          rounded-3xl
          border border-white/12 dark:border-white/10
          bg-white/10 dark:bg-slate-900/70
          backdrop-blur-2xl
          shadow-[0_18px_60px_rgba(15,23,42,0.75)]
          px-5 py-3
        "
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/60">
            AI
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold tracking-[0.28em] text-slate-300/80">
              AI LAB
            </span>
            <span className="text-sm font-medium text-slate-50/90">Lab</span>
          </div>
          {left}
        </div>

        <div className="flex items-center gap-4">{center}</div>

        <div className="flex items-center gap-3">{right}</div>
      </div>
    </header>
  );
}
