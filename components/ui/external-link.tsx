"use client";

import { ArrowUpRight } from "lucide-react";
import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";

interface ExternalLinkProps {
  label: string;
  href: string;
}

export function ExternalLink({ label, href }: ExternalLinkProps) {
  const { trigger } = useHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs font-medium transition-colors sm:text-sm"
      onMouseEnter={() => {
        trigger("light");
        playHoverSFX();
      }}
    >
      <span className="group-hover:underline">{label}</span>
      <ArrowUpRight
        className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden
      />
    </a>
  );
}
