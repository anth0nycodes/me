"use client";

import { ReactNode, useEffect, useState } from "react";
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
