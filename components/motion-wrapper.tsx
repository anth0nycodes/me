"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.275 } },
};

export function MotionWrapper({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col gap-14 lowercase mx-auto max-w-2xl w-full"
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
