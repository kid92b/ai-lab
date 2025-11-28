"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/language-context";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    validate({ live: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, message]);

  const validate = ({ live = false } = {}): boolean => {
    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = t("contact.form.errors.name");
    if (!emailRegex.test(email.trim())) nextErrors.email = t("contact.form.errors.email");
    if (message.trim().length < 3) nextErrors.message = t("contact.form.errors.message");
    if (!live) setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setServerError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message");
      }
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSuccess(false), 3500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send message";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-2xl ring-1 ring-slate-200/70 backdrop-blur dark:border-white/15 dark:bg-white/5 dark:shadow-sky-900/40 dark:ring-white/10"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900 dark:text-white" htmlFor="name">
            {t("contact.form.name")}
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("contact.form.placeholders.name")}
            className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 ring-1 outline-none transition focus:ring-2 dark:text-white ${
              errors.name
                ? "border-rose-300 ring-rose-300 focus:ring-rose-400 dark:border-rose-400 dark:ring-rose-400"
                : "border-slate-300 ring-transparent focus:ring-cyan-300 dark:border-white/10 dark:ring-transparent dark:focus:ring-cyan-300/70"
            }`}
          />
          {errors.name ? <p className="text-xs text-rose-400">{errors.name}</p> : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900 dark:text-white" htmlFor="email">
            {t("contact.form.email")}
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("contact.form.placeholders.email")}
            className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 ring-1 outline-none transition focus:ring-2 dark:text-white ${
              errors.email
                ? "border-rose-300 ring-rose-300 focus:ring-rose-400 dark:border-rose-400 dark:ring-rose-400"
                : "border-slate-300 ring-transparent focus:ring-cyan-300 dark:border-white/10 dark:ring-transparent dark:focus:ring-cyan-300/70"
            }`}
          />
          {errors.email ? <p className="text-xs text-rose-400">{errors.email}</p> : null}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-900 dark:text-white" htmlFor="message">
          {t("contact.form.message")}
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("contact.form.placeholders.message")}
          rows={4}
          className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 ring-1 outline-none transition focus:ring-2 dark:text-white ${
            errors.message
              ? "border-rose-300 ring-rose-300 focus:ring-rose-400 dark:border-rose-400 dark:ring-rose-400"
              : "border-slate-300 ring-transparent focus:ring-cyan-300 dark:border-white/10 dark:ring-transparent dark:focus:ring-cyan-300/70"
          }`}
        />
        {errors.message ? <p className="text-xs text-rose-400">{errors.message}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/60 bg-cyan-400/70 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(56,189,248,0.35)] transition hover:border-cyan-200/70 hover:bg-cyan-400 disabled:opacity-60 dark:bg-cyan-400/30 dark:text-white"
        >
          {loading ? "Відправляю…" : t("contact.form.submit")}
        </button>
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-500/20 px-3 py-2 text-xs font-semibold text-emerald-800 shadow-[0_0_24px_rgba(16,185,129,0.35)] dark:border-emerald-300/40 dark:bg-emerald-500/20 dark:text-emerald-100"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-inner">
                ✓
              </span>
              <span>{t("contact.form.success")}</span>
            </motion.div>
          )}
        </AnimatePresence>
        {serverError ? <p className="text-xs text-rose-400">{serverError}</p> : null}
      </div>
    </form>
  );
}
