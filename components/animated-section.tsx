"use client";

import React from "react";
import { motion } from "framer-motion";

type AnimatedSectionProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export function AnimatedSection({
  delay = 0,
  className = "",
  children,
}: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.section>
  );
}
