"use client";

import { useEffect, useRef } from "react";

export function BackgroundFX() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const px = (e.clientX / window.innerWidth - 0.5) * 14;
      const py = (e.clientY / window.innerHeight - 0.5) * 14;
      target.current = { x: px, y: py };
    };

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--px", `${current.current.x}px`);
        containerRef.current.style.setProperty("--py", `${current.current.y}px`);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handleMouse);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handleMouse);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ "--px": "0px", "--py": "0px" } as React.CSSProperties}
    >
      <div className="absolute inset-[-20%] translate-x-[var(--px)] translate-y-[var(--py)] bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.55),transparent_55%),linear-gradient(to_bottom_right,#0f172a,#020617)] dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_55%),linear-gradient(to_bottom_right,#020617,#020617)] blur-[90px] transition-transform duration-300" />

      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.18),transparent_25%),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.12),transparent_22%)] blur-2xl mix-blend-screen dark:bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.08),transparent_25%),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.05),transparent_22%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.08),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_55%)]" />
      </div>

      <div className="absolute inset-0 animate-[dash-flow_18s_linear_infinite] bg-[linear-gradient(120deg,rgba(255,255,255,0.07)_8%,transparent_12%,transparent_20%,rgba(255,255,255,0.05)_24%,transparent_30%)] bg-[length:200%_200%] opacity-60 dark:bg-[linear-gradient(120deg,rgba(59,130,246,0.08)_8%,transparent_12%,transparent_20%,rgba(99,102,241,0.08)_24%,transparent_30%)]" />

      <div className="absolute inset-[-10%] animate-[pulse-float_12s_ease-in-out_infinite] bg-[radial-gradient(circle_at_30%_20%,rgba(168,220,255,0.14),transparent_35%),radial-gradient(circle_at_70%_40%,rgba(125,211,252,0.12),transparent_32%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_70%_40%,rgba(99,102,241,0.15),transparent_32%)] blur-[80px]" />
    </div>
  );
}
