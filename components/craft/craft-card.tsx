"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useSound } from "use-sound";
import type { Craft } from "@/app/craft/constants";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";

interface CraftCardProps {
  craft: Craft;
  isSlugRoute?: boolean;
}

export function CraftCard({ craft, isSlugRoute }: CraftCardProps) {
  const { trigger } = useHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });

  return (
    <section id={craft.id} className="flex scroll-mt-4 flex-col gap-2">
      <div className="ring-accent aspect-16/12 size-full max-h-93.5 overflow-clip rounded-lg ring-2 dark:ring-1">
        {/* demos are built against the dark palette, so pin it here regardless of site theme */}
        <div className="dark text-foreground size-full">{craft.component}</div>
      </div>
      {!isSlugRoute && (
        <Link
          href={`/craft/${craft.id}`}
          className="group text-foreground flex w-fit items-center gap-1 text-sm"
          onMouseEnter={() => {
            trigger("light");
            playHoverSFX();
          }}
        >
          <span className="group-hover:underline">{craft.description}</span>
          <ArrowRight
            className="text-muted-foreground group-hover:text-foreground size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      )}
    </section>
  );
}

export function CraftLink({ label, href }: { label: string; href: string }) {
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
