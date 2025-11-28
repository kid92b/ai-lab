 "use client";

import { useEffect, useRef, useState } from "react";

type ProjectCardProps = {
  title: string;
  description: string;
};

export function ProjectCard({ title, description }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number>();
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e: MouseEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
      });
    };

    const handleLeave = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      setTransform("rotateX(0deg) rotateY(0deg)");
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      style={{ transform }}
      className="fade-in relative h-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 text-slate-100 shadow-2xl ring-1 shadow-sky-900/50 ring-white/10 backdrop-blur transition-transform duration-200 will-change-transform hover:-translate-y-1"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.16),transparent_40%)]" />
      <div className="relative flex h-full flex-col gap-3">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-white">
          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(56,189,248,0.7)]" />
          {title}
        </div>
        <p className="text-sm leading-6 text-slate-200">{description}</p>
        <div className="mt-auto h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </article>
  );
}
