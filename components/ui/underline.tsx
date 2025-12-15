"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface UnderlineProps {
  hexcode: string;
  delay: number;
  duration: number;
  children: ReactNode;
}

export function Underline({
  hexcode,
  delay,
  duration,
  children,
}: UnderlineProps) {
  return (
    <motion.span
      className="inline bg-no-repeat pb-0.5"
      initial={{ backgroundSize: "0% 3px" }}
      whileInView={{ backgroundSize: "100% 3px" }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: duration, ease: "easeInOut" }}
      style={{
        backgroundImage: `linear-gradient(${hexcode}, ${hexcode})`,
        backgroundPosition: "0 calc(100% - 1px)",
      }}
    >
      {children}
    </motion.span>
  );
}
