"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

type ProjectCardTiltProps = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
};

export function ProjectCardTilt({ title, description, tags, image, link }: ProjectCardTiltProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState({ transform: "rotateX(0deg) rotateY(0deg)" });

  const motionProps = useMemo(
    () => ({
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: "easeOut" },
    }),
    []
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setStyle({ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)` });
  };

  const handleLeave = () => {
    setStyle({ transform: "rotateX(0deg) rotateY(0deg) scale(1)" });
  };

  return (
    <motion.div {...motionProps}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-lg ring-1 ring-slate-200/70 backdrop-blur transition duration-200 dark:border-white/10 dark:bg-slate-900/70 dark:ring-white/10"
        style={style}
      >
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-70 dark:from-white/10" />
          <Image
            src={image}
            alt={title}
            width={600}
            height={360}
            className="h-48 w-full rounded-xl object-cover transition duration-500 group-hover:scale-105"
            priority={false}
          />
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="pt-2">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:hover:border-sky-400 dark:hover:text-sky-300"
            >
              Посмотреть
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
