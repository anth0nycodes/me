"use client";

import Link from "next/link";
import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import type { BasePost } from "@/data/mdx";
import { useHaptics } from "@/hooks/use-haptics";
import { formatDate } from "@/lib/utils";

interface PostLinkProps {
  folderName: string;
  post: BasePost;
}

export function PostLink({ folderName, post }: PostLinkProps) {
  const { trigger } = useHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });

  return (
    <Link
      className="relative flex flex-col gap-1.5 py-4 group-hover:opacity-40 hover:opacity-100"
      onMouseEnter={() => {
        trigger("light");
        playHoverSFX();
      }}
      href={`/${folderName}/${post.slug}`}
    >
      <p className="text-sm leading-none font-medium">{post.metadata.title}</p>
      <p className="text-muted-foreground text-xs">{formatDate(post.metadata.publishedAt)}</p>
    </Link>
  );
}
