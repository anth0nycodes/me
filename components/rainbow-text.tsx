"use client";

import { motion } from "motion/react";
import { useSound } from "use-sound";
import { useWebHaptics } from "web-haptics/react";
import { useAudioEnabled } from "@/context/use-audio-enabled";

const rainbowColors = [
  "#ff4d4d", // red
  "#ff9933", // orange
  "#ffe033", // yellow
  "#33cc66", // green
  "#4d79ff", // blue
  "#7052b8", // indigo
  "#a64dff", // violet
  "#ff4d4d", // red
];

interface RainbowTextProps {
  text: string;
}

export function RainbowText({ text }: RainbowTextProps) {
  const { trigger } = useWebHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover.mp3", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });

  return (
    <span
      onMouseEnter={() => {
        trigger("light");
        playHoverSFX();
      }}
    >
      {[...text].map((char, index) => (
        <motion.span
          key={index}
          animate={{ color: rainbowColors }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
            delay: index * 0.15,
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}
