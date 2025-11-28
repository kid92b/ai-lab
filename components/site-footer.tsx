export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200/70 pt-6 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pb-6 sm:px-6">
        <p className="tracking-wide">Crafted for rapid experiments.</p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300/60 to-transparent dark:via-white/20" />
      </div>
    </footer>
  );
}
