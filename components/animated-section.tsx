"use client";

import { motion, useAnimation } from "framer-motion";
import type React from "react";
import { useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";

type AnimatedSectionProps = {
  as?: React.ElementType;
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export function AnimatedSection({
  as: Tag = "section",
  delay = 0,
  className,
  children,
}: AnimatedSectionProps) {
  const controls = useAnimation();
  const { ref, visible } = useInView<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    if (visible) {
      controls.start("visible");
    }
  }, [visible, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.5, ease: "easeOut", delay: delay / 1000 }}
      className={className}
    >
      <Tag>{children}</Tag>
    </motion.div>
  );
}
