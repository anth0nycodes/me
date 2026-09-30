"use client";

import { useSound } from "use-sound";
import { useWebHaptics } from "web-haptics/react";
import { useAudioEnabled } from "@/context/use-audio-enabled";

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
      className="shimmer-rainbow bg-clip-text text-transparent motion-reduce:animate-none"
      onMouseEnter={() => {
        trigger("light");
        playHoverSFX();
      }}
    >
      {text}
    </span>
  );
}
