type SectionLink = {
  href: string;
  label: string;
};

type SectionCardProps = {
  title: string;
  description: string;
  link?: SectionLink;
};

export function SectionCard({ title, description, link }: SectionCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-6 text-slate-900 shadow-xl shadow-slate-200/60 transition duration-200 hover:-translate-y-1 hover:shadow-slate-300/70 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:shadow-2xl dark:shadow-sky-950/40 dark:hover:border-white/15 dark:hover:shadow-sky-900/60">
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10" />
      </div>
      <div className="relative space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{description}</p>
        {link ? (
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm font-medium text-slate-700 transition hover:text-slate-900 dark:text-sky-200 dark:hover:text-white"
          >
            {link.label}
            <span className="ml-2 transition group-hover:translate-x-1">→</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
