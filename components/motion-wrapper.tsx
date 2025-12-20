"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export function MotionWrapper({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col gap-16 lowercase mx-auto max-w-2xl w-full"
      variants={prefersReducedMotion ? {} : parentVariants}
      initial="hidden"
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

export function MotionSection({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div variants={prefersReducedMotion ? {} : childVariants}>
      {children}
    </motion.div>
  );
}
