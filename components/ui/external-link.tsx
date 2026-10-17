"use client";

import { ArrowUpRight, SquareArrowOutUpRight } from "lucide-react";
import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";

interface ExternalLinkProps {
  label: string;
  href: string;
  /** Shows only an icon, with `label` read out to screen readers instead of shown */
  iconOnly?: boolean;
  /** A fuller name for screen readers when `label` alone is ambiguous, e.g. repeated across cards */
  ariaLabel?: string;
}

export function ExternalLink({ label, href, iconOnly = false, ariaLabel }: ExternalLinkProps) {
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

  if (iconOnly) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="text-muted-foreground hover:text-foreground transition-colors"
        onMouseEnter={handleMouseEnter}
      >
        <SquareArrowOutUpRight className="size-3.5" aria-hidden />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="group text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs font-medium transition-colors sm:text-sm"
      onMouseEnter={handleMouseEnter}
    >
      <span className="group-hover:underline">{label}</span>
      <ArrowUpRight
        className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden
      />
    </a>
  );
}
