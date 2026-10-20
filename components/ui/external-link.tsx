"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";

type ExternalLinkVariant = "default" | "underline";

interface ExternalLinkProps {
  href: string;
  label: string;
  variant?: ExternalLinkVariant;
  additionalContext?: string;
}

export function ExternalLink({
  href,
  label,
  variant = "default",
  additionalContext,
}: ExternalLinkProps) {
  const { trigger } = useHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });

  function handleMouseEnter() {
    trigger("light");
    playHoverSFX();
  }

  return (
    <a
      href={href}
      target="_blank"
      data-variant={variant}
      rel="noopener noreferrer"
      className="group data-[variant=underline]:text-muted-foreground data-[variant=underline]:hover:text-foreground text-foreground flex items-center gap-1.5 text-sm font-medium transition-colors"
      onMouseEnter={handleMouseEnter}
    >
      <span className="group-data-[variant=underline]:group-hover:underline">{label}</span>
      {additionalContext && <span className="sr-only">, {additionalContext}</span>}
      <SquareArrowOutUpRight
        className="text-muted-foreground group-hover:text-foreground size-3.5 transition-colors"
        aria-hidden
      />
    </a>
  );
}
