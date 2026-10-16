"use client";

import Link from "next/link";
import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import type { BasePost } from "@/data/mdx";
import { useHaptics } from "@/hooks/use-haptics";
import { formatDate } from "@/lib/utils";

interface ThoughtLinkProps {
  post: BasePost;
}

export function ThoughtLink({ post }: ThoughtLinkProps) {
  const { trigger } = useHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });

  return (
    <Link
      className="relative flex flex-col py-3 group-hover:opacity-40 hover:opacity-100"
      onMouseEnter={() => {
        trigger("light");
        playHoverSFX();
      }}
      href={`/thoughts/${post.slug}`}
    >
      <p className="mb-1 text-sm font-medium">{post.metadata.title}</p>
      <p className="text-muted-foreground text-xs">{formatDate(post.metadata.publishedAt)}</p>
    </Link>
  );
}
