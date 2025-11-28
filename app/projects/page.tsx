"use client";

import { useMemo, useState } from "react";
import { ProjectCardTilt } from "@/components/project-card-tilt";
import { AnimatedSection } from "@/components/animated-section";
import { useTranslation } from "@/i18n/language-context";

const ALL_TAG = "all";

const projects = [
  {
    title: "AI Support Chat",
    description: "Интерактивный ассистент на Groq/LLM с обогащённым UI и памятью диалога.",
    tags: ["AI", "Chatbot", "Next.js", "Tailwind"],
    image: "/file.svg",
    link: "https://vercel.com/templates/next.js",
  },
  {
    title: "Design System Lab",
    description: "Набор компонентов с нейронным фоном, темизацией и анимациями.",
    tags: ["Design", "UI", "Tailwind"],
    image: "/window.svg",
    link: "https://tailwindcss.com",
  },
  {
    title: "Data + LLM",
    description: "Пример связки API-роутов и LLM для быстрого прототипирования.",
    tags: ["Next.js", "AI", "API"],
    image: "/next.svg",
    link: "https://nextjs.org",
  },
  {
    title: "Groq Assistant",
    description: "Облачный чат на llama-3.1-8b-instant с историей и темизацией.",
    tags: ["AI", "Groq", "Chatbot"],
    image: "/globe.svg",
    link: "https://groq.com",
  },
];

const tagOptions = [ALL_TAG, "AI", "Chatbot", "Next.js", "Tailwind", "Design", "UI", "API", "Groq"];

export default function ProjectsPage() {
  const { language } = useTranslation();
  const [activeTag, setActiveTag] = useState<string>(ALL_TAG);

  const filtered = useMemo(() => {
    if (activeTag === ALL_TAG) return projects;
    return projects.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-12 text-slate-900 dark:text-slate-100 sm:px-6">
      <AnimatedSection className="space-y-4">
        <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
          AI Lab
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {language === "uk"
            ? "Проєкти та демо"
            : language === "pl"
              ? "Projekty i demo"
              : "Projects & demos"}
        </h1>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
          {language === "uk"
            ? "Колекція швидких експериментів: AI-чат, дизайн-системи, інтеграції з LLM та API."
            : language === "pl"
              ? "Kolekcja szybkich eksperymentów: czat AI, systemy projektowe, integracje z LLM i API."
              : "A collection of quick experiments: AI chat, design systems, LLM and API integrations."}
        </p>
      </AnimatedSection>

      <AnimatedSection className="flex flex-wrap gap-3 text-sm">
        {tagOptions.map((tag) => {
          const active = tag === activeTag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-2 transition ${
                active
                  ? "border-sky-400 bg-sky-100 text-sky-700 shadow-[0_8px_22px_rgba(59,130,246,0.25)] dark:border-sky-500 dark:bg-sky-500/20 dark:text-sky-100"
                  : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-sky-400/60 dark:hover:text-sky-200"
              }`}
            >
              {tag === ALL_TAG
                ? language === "uk"
                  ? "Усе"
                  : language === "pl"
                    ? "Wszystko"
                    : "All"
                : tag}
            </button>
          );
        })}
      </AnimatedSection>

      <section className="grid gap-6 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCardTilt key={project.title} {...project} />
        ))}
      </section>
    </main>
  );
}
