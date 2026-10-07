"use client";

import type { ReactNode } from "react";
import useSound from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";

interface LinkBadgeProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}

export function LinkBadge({ href, icon, children }: LinkBadgeProps) {
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });
  const { trigger } = useHaptics();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => playHoverSFX()}
      onClick={() => trigger("light")}
      className="bg-muted hover:bg-foreground/10 inline-flex items-baseline gap-1.5 rounded-sm px-1.5 py-1 align-baseline leading-none whitespace-nowrap transition-colors duration-250 select-none"
    >
      {/* icon opts out of baseline alignment so the label alone sets the badge baseline */}
      <span className="flex shrink-0 self-center">{icon}</span>
      {children}
    </a>
  );
}
