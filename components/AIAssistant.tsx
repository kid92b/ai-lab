"use client";

import { useEffect, useRef, useState } from "react";

type Role = "user" | "assistant";

type Message = {
  role: Role;
  text: string;
};

type Props = {
  currentLang?: "uk" | "en" | "pl";
};

export default function AIAssistant({ currentLang = "uk" }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const text = input.trim();
    setInput("");
    setError(null);

    const userMessage: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const history = [...messages, userMessage].slice(-8);
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          lang: currentLang,
          history,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "AI request failed");
      }

      const answerText: string = data?.answer || "Мені важко відповісти на це запитання.";

      const aiMessage: Message = {
        role: "assistant",
        text: answerText,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (e: unknown) {
      console.error("AI error:", e);
      setError(e instanceof Error ? e.message : "Сервер недоступний. Спробуйте пізніше.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur shadow-lg dark:border-sky-500/40 dark:bg-slate-900/40">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-sky-100">AI-асистент</h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">Працює через Groq API</span>
      </div>

      <div
        ref={scrollRef}
        className="mb-4 h-60 space-y-2 overflow-y-auto pr-1 text-sm text-slate-900 dark:text-slate-100"
      >
        {messages.length === 0 && !loading && !error && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Напишіть запитання — асистент відповість в контексті AI Lab.
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[90%] rounded-2xl px-3 py-2 ${
              m.role === "user"
                ? "ml-auto bg-sky-500/20 text-slate-900 dark:bg-sky-500/40 dark:text-sky-50"
                : "mr-auto bg-slate-100 text-slate-900 dark:bg-slate-800/80 dark:text-slate-100"
            }`}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="mr-auto max-w-[70%] rounded-2xl bg-slate-200 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
            Думаю…
          </div>
        )}

        {error && (
          <div className="mr-auto max-w-[90%] rounded-2xl bg-red-100 px-3 py-2 text-xs text-red-700 dark:bg-red-900/60 dark:text-red-100">
            {error}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-900 ring-1 ring-slate-300 outline-none focus:ring-sky-500 dark:bg-slate-950/80 dark:text-slate-100 dark:ring-slate-700/70"
          placeholder="Введіть повідомлення…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 disabled:opacity-50"
        >
          Надіслати
        </button>
      </div>
    </section>
  );
}
