"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";

/**
 * An underlined link inside running text, with the hover tick. Paths starting with "/" stay in the
 * site; anything else opens in a new tab.
 */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
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

  const className = "underline underline-offset-4";

  if (href.startsWith("/")) {
    return (
      <Link href={href} onMouseEnter={handleMouseEnter} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      className={className}
    >
      {children}
    </a>
  );
}
