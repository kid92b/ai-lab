"use client";

import AIAssistant from "@/components/AIAssistant";
import { NeuralGlobe3D } from "@/components/NeuralGlobe3D";
import { SectionCard } from "@/components/section-card";
import { ProjectCard } from "@/components/project-card";
import { ContactForm } from "@/components/contact-form";
import { AnimatedSection } from "@/components/animated-section";
import { useTranslation } from "@/i18n/language-context";

export default function Home() {
  const { t, language } = useTranslation();

  const quickLinks = [
    {
      title: t("quickLinks.setup.title"),
      description: t("quickLinks.setup.description"),
      link: {
        href: "https://nextjs.org/docs/app",
        label: t("quickLinks.setup.linkLabel"),
      },
    },
    {
      title: t("quickLinks.styling.title"),
      description: t("quickLinks.styling.description"),
      link: {
        href: "https://tailwindcss.com/docs",
        label: t("quickLinks.styling.linkLabel"),
      },
    },
    {
      title: t("quickLinks.api.title"),
      description: t("quickLinks.api.description"),
      link: {
        href: "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
        label: t("quickLinks.api.linkLabel"),
      },
    },
    {
      title: t("quickLinks.deploy.title"),
      description: t("quickLinks.deploy.description"),
      link: {
        href: "https://vercel.com/docs",
        label: t("quickLinks.deploy.linkLabel"),
      },
    },
  ];

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-3 py-12 text-slate-100 sm:px-0">
      <AnimatedSection className="space-y-6 rounded-[32px] border border-white/10 bg-slate-900/40 p-8 backdrop-blur-2xl shadow-[0_24px_80px_rgba(15,23,42,0.8)] dark:bg-slate-900/60">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.28em] text-slate-200 uppercase">
          {t("hero.badge")}
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0.75rem_0.15rem_rgba(52,211,153,0.45)]" />
        </div>
        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-200">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                {t("tags.next")}
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                {t("tags.tailwind")}
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                {t("tags.typescript")}
              </span>
            </div>
          </div>

          <div className="flex w-full justify-center md:justify-end">
            <div className="relative h-[320px] w-[320px] md:h-[380px] md:w-[380px] lg:h-[420px] lg:w-[420px]">
              <NeuralGlobe3D />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="grid gap-5 md:grid-cols-2">
        {quickLinks.map((section) => (
          <SectionCard
            key={section.title}
            title={section.title}
            description={section.description}
            link={section.link}
          />
        ))}
      </AnimatedSection>

      <AnimatedSection className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-white/70 to-white/50 p-8 shadow-2xl ring-1 ring-slate-200/70 backdrop-blur dark:border-white/10 dark:from-white/10 dark:via-white/5 dark:to-transparent dark:shadow-sky-900/40 dark:ring-white/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm tracking-[0.2em] text-slate-300 uppercase">
              {t("checklist.label")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{t("checklist.title")}</h2>
          </div>
          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/15"
          >
            {t("checklist.cta")}
          </a>
        </div>
        <ol className="mt-6 space-y-3 text-sm text-slate-200">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 h-6 w-6 rounded-full bg-sky-500/20 text-center text-xs font-semibold text-sky-200">
              1
            </span>
            {t("checklist.item1")}
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 h-6 w-6 rounded-full bg-sky-500/20 text-center text-xs font-semibold text-sky-200">
              2
            </span>
            {t("checklist.item2")}
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 h-6 w-6 rounded-full bg-sky-500/20 text-center text-xs font-semibold text-sky-200">
              3
            </span>
            {t("checklist.item3")}
          </li>
        </ol>
      </AnimatedSection>

      <AnimatedSection className="rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-2xl ring-1 ring-slate-200/70 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-sky-900/40 dark:ring-white/10">
        <div className="flex flex-col gap-3">
          <p className="text-sm tracking-[0.22em] text-slate-300 uppercase">{t("about.title")}</p>
          <p className="text-lg leading-8 text-slate-100">{t("about.body")}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="space-y-6 rounded-2xl border border-slate-200/60 bg-white/70 p-8 shadow-2xl ring-1 ring-slate-200/60 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-sky-900/50 dark:ring-white/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-white">{t("projects.title")}</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent sm:h-[1px]" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <ProjectCard
            title={t("projects.items.pulse.name")}
            description={t("projects.items.pulse.description")}
          />
          <ProjectCard
            title={t("projects.items.stream.name")}
            description={t("projects.items.stream.description")}
          />
          <ProjectCard
            title={t("projects.items.synth.name")}
            description={t("projects.items.synth.description")}
          />
          <ProjectCard
            title={t("projects.items.ops.name")}
            description={t("projects.items.ops.description")}
          />
        </div>
      </AnimatedSection>

      <AnimatedSection className="grid gap-6 rounded-2xl border border-slate-200/60 bg-white/70 p-8 shadow-2xl ring-1 ring-slate-200/60 backdrop-blur dark:border-white/10 dark:bg-gradient-to-br dark:from-cyan-500/10 dark:via-indigo-500/10 dark:to-slate-950 dark:shadow-sky-900/50 dark:ring-white/10 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">{t("aiAssistant.title")}</h2>
          <p className="text-base leading-7 text-slate-100">{t("aiAssistant.body")}</p>
        </div>
        <AIAssistant currentLang={language} />
      </AnimatedSection>

      <AnimatedSection className="rounded-2xl border border-slate-200/60 bg-white/70 p-8 shadow-2xl ring-1 ring-slate-200/60 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-sky-900/50 dark:ring-white/10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2 lg:max-w-sm">
            <h2 className="text-2xl font-semibold text-white">{t("contact.title")}</h2>
            <p className="text-sm leading-6 text-slate-200">{t("contact.body")}</p>
          </div>
          <ContactForm />
        </div>
      </AnimatedSection>
    </main>
  );
}
