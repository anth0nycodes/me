"use client";

import Link from "next/link";
import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";

interface VaultCardProps {
  title: string;
  src: string;
  author: string;
  description: string;
}

export function VaultCard({ title, src, author, description }: VaultCardProps) {
  const { trigger } = useHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });

  return (
    <Link
      key={title}
      target="_blank"
      href={src}
      onMouseEnter={() => {
        trigger("selection");
        playHoverSFX();
      }}
      onClick={() => trigger("light")}
    >
      <div className="border-muted hover:bg-accent group flex h-full flex-col justify-between rounded-lg border-2 p-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium tracking-tighter group-hover:underline">{title}</p>
            <p className="text-muted-foreground text-xs">{description}</p>
          </div>
          <p className="text-muted-foreground text-xs font-medium tracking-tighter">by {author}</p>
        </div>
      </div>
    </Link>
  );
}
