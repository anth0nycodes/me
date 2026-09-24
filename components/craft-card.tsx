"use client";

import { ArrowUpRight } from "lucide-react";
import { useSound } from "use-sound";
import { useWebHaptics } from "web-haptics/react";
import { type Craft } from "@/app/craft/page";
import { useAudioEnabled } from "@/context/use-audio-enabled";

interface CraftCardProps {
  craft: Craft;
}

export function CraftCard({ craft }: CraftCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="border-accent aspect-16/12 size-full max-h-94 overflow-clip rounded-lg border">
        {craft.component}
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-foreground text-sm">{craft.description}</span>
        <div className="flex items-center gap-2">
          {craft.reference && (
            <CraftLink label="reference" href={craft.reference} />
          )}
          <CraftLink label="source" href={craft.source} />
        </div>
      </div>
    </div>
  );
}

function CraftLink({ label, href }: { label: string; href: string }) {
  const { trigger } = useWebHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover.mp3", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-1 text-xs font-medium text-[#8fb7b7] sm:text-sm"
      onMouseEnter={() => {
        trigger("light");
        playHoverSFX();
      }}
    >
      <span className="group-hover:underline">{label}</span>
      <ArrowUpRight
        className="text-foreground size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden
      />
    </a>
  );
}
