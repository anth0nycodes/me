"use client";

import Link from "next/link";
import { useSound } from "use-sound";
import { useWebHaptics } from "web-haptics/react";
import { useAudioEnabled } from "@/context/use-audio-enabled";

interface BlogPost {
  metadata: {
    [key: string]: any;
  };
  slug: string;
}

interface BlogPostsProps {
  post: BlogPost;
}

export function BlogLink({ post }: BlogPostsProps) {
  const { trigger } = useWebHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover.mp3", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });

  return (
    <Link
      className="group-hover:opacity-40 hover:opacity-100 relative flex flex-col py-3"
      onMouseEnter={() => {
        trigger("light");
        playHoverSFX();
      }}
      href={`/thoughts/${post.slug}`}
    >
      <p className="text-sm font-semibold mb-1">{post.metadata.title}</p>
      <p className="text-xs text-muted-foreground">
        {post.metadata.publishedAt}
      </p>
    </Link>
  );
}
