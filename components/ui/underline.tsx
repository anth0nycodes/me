"use client";

import { ReactNode, useRef } from "react";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { motion, useReducedMotion } from "motion/react";
import { useSound } from "use-sound";
import { useWebHaptics } from "web-haptics/react";
import { useAudioEnabled } from "@/context/use-audio-enabled";

interface UnderlineProps {
  hexcode: string;
  delay: number;
  duration: number;
  children: ReactNode;
}

export function Underline({ hexcode, delay, duration, children }: UnderlineProps) {
  const controller = useRef<{ shoot: () => void } | null>(null);
  const { trigger } = useWebHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playConfettiSFX] = useSound("/audio/confetti.mp3", {
    volume: 0.25,
    soundEnabled: audioEnabled,
  });
  const prefersReducedMotion = useReducedMotion();

  const onInitHandler = ({ conductor }: { conductor: { shoot: () => void } }) => {
    controller.current = conductor;
  };

  const onShoot = () => {
    if (prefersReducedMotion) return;
    controller.current?.shoot();
    trigger("success");
    playConfettiSFX();
  };

  return (
    <>
      {!prefersReducedMotion && <Realistic onInit={onInitHandler} />}
      <motion.span
        onClick={onShoot}
        className="inline cursor-pointer bg-no-repeat pb-0.5 motion-reduce:cursor-auto"
        initial={{
          backgroundSize: prefersReducedMotion ? "100% 2px" : "0% 2px",
        }}
        whileInView={{ backgroundSize: "100% 2px" }}
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
