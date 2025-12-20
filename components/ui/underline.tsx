"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";
import Realistic from "react-canvas-confetti/dist/presets/realistic";

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
  const controller = useRef<{ shoot: () => void } | null>(null);

  const onInitHandler = ({
    conductor,
  }: {
    conductor: { shoot: () => void };
  }) => {
    controller.current = conductor;
  };

  const onShoot = () => {
    controller.current?.shoot();
  };

  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {!prefersReducedMotion && <Realistic onInit={onInitHandler} />}
      <motion.span
        onClick={onShoot}
        className="inline cursor-pointer bg-no-repeat pb-0.5"
        initial={{
          backgroundSize: prefersReducedMotion ? "100% 3px" : "0% 3px",
        }}
        whileInView={{ backgroundSize: "100% 3px" }}
        viewport={{ once: true }}
        transition={{
          delay: prefersReducedMotion ? 0 : delay,
          duration: prefersReducedMotion ? 0 : duration,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `linear-gradient(${hexcode}, ${hexcode})`,
          backgroundPosition: "0 calc(100% - 1px)",
        }}
      >
        {children}
      </motion.span>
    </>
  );
}
