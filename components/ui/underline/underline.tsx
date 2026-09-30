"use client";

import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { useReducedMotion } from "motion/react";
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
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.inView = "";
        observer.disconnect();
      },
      { threshold: 1 },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

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
      <span
        ref={spanRef}
        onClick={onShoot}
        role={prefersReducedMotion ? undefined : "button"}
        tabIndex={prefersReducedMotion ? undefined : 0}
        onKeyDown={(e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          onShoot();
        }}
        className="motion-safe:data-in-view:animate-underline-grow inline cursor-pointer bg-linear-to-r from-(--color) to-(--color) bg-size-[0%_2px] bg-position-[0_calc(100%-1px)] bg-no-repeat pb-0.5 motion-reduce:cursor-auto motion-reduce:bg-size-[100%_2px]"
        style={
          {
            "--duration": `${duration}s`,
            "--delay": `${delay}s`,
            "--color": hexcode,
          } as CSSProperties
        }
      >
        {children}
      </span>
    </>
  );
}
