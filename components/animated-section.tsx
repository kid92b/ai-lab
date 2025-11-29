"use client";

import { motion } from "framer-motion";
import type { ReactNode, ElementType } from "react";

type AnimatedSectionProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
};

export function AnimatedSection({
  as: Tag = "section",
  delay = 0,
  className = "",
  children,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      <Tag>{children}</Tag>
    </motion.div>
  );
}
