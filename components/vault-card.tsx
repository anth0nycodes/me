"use client";

import Link from "next/link";
import { useWebHaptics } from "web-haptics/react";

interface VaultCardProps {
  title: string;
  src: string;
  author: string;
  description: string;
}

export function VaultCard({ title, src, author, description }: VaultCardProps) {
  const { trigger } = useWebHaptics();

  return (
    <Link
      key={title}
      target="_blank"
      href={src}
      onMouseEnter={() => trigger("selection")}
      onClick={() => trigger("light")}
    >
      <div className="flex flex-col justify-between p-6 h-full border border-border rounded-lg hover:border-glow/30 hover:bg-accent hover:shadow-[0_0_15px_rgba(34,197,94,0.06)] transition-all duration-200 group">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-medium tracking-tighter group-hover:underline">
              {title}
            </p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <p className="text-sm tracking-tighter font-medium text-muted-foreground">
            by {author}
          </p>
        </div>
      </div>
    </Link>
  );
}
