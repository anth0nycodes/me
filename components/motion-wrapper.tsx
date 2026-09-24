"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const parentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.125 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: [0.25, 0.1, 0.25, 1], duration: 0.5 },
  },
};

let hasPlayed = false;

export function MotionWrapper({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [skipIntro] = useState(hasPlayed);

  useEffect(() => {
    hasPlayed = true;
  }, []);

  return (
    <motion.div
      className="mx-auto flex w-full max-w-2xl flex-col gap-12 lowercase"
      variants={prefersReducedMotion ? {} : parentVariants}
      initial={skipIntro ? "visible" : "hidden"}
      animate="visible"
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
