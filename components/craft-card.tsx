"use client";

import Link from "next/link";
import { ArrowUpRight, LinkIcon } from "lucide-react";
import { useSound } from "use-sound";
import { useWebHaptics } from "web-haptics/react";
import { type Craft } from "@/app/craft/page";
import { useAudioEnabled } from "@/context/use-audio-enabled";

interface CraftCardProps {
  craft: Craft;
}

export function CraftCard({ craft }: CraftCardProps) {
  return (
    <section id={craft.id} className="flex scroll-mt-4 flex-col gap-2">
      <div className="border-accent aspect-16/12 size-full max-h-94 overflow-clip rounded-lg border">
        {craft.component}
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center">
          <Link
            href={`#${craft.id}`}
            className="group/title text-foreground flex items-center gap-1.5 text-sm sm:-ml-5"
          >
            <LinkIcon
              className="text-muted-foreground group-hover/title:text-foreground hidden size-3.5 opacity-0 transition-opacity group-hover/title:opacity-100 group-focus-visible/title:opacity-100 sm:block"
              aria-hidden
            />
            {craft.description}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {craft.reference && (
            <CraftLink label="reference" href={craft.reference} />
          )}
          <CraftLink label="source" href={craft.source} />
        </div>
      </div>
    </section>
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
