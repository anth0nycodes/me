"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

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
  return (
    <motion.main
      className="flex flex-col gap-16 lowercase mx-auto max-w-2xl w-full"
      variants={parentVariants}
      initial="hidden"
      whileInView="visible"
    >
      {children}
    </motion.main>
  );
}
export function MotionSection({ children }: { children: ReactNode }) {
  return <motion.div variants={childVariants}>{children}</motion.div>;
}
