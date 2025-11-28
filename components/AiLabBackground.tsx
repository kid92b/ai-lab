"use client";

import { useTheme } from "next-themes";

export function AiLabBackground() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="ai-lab-bg-layer">
      <div className={isLight ? "ai-lab-bg-light" : "ai-lab-bg"} />
      <div className="ai-lab-orbit" />
      <div className="ai-lab-noise" />
    </div>
  );
}
