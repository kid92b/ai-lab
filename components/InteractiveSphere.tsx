"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function InteractiveSphere({ children }: Props) {
  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragMomentum
      dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
      whileTap={{ scale: 0.97 }}
      className="relative cursor-grab active:cursor-grabbing"
    >
      {children}
    </motion.div>
  );
}
