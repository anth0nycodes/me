"use client";

import { useEffect, useRef, VideoHTMLAttributes } from "react";
import { useOnScreen } from "@/hooks/use-on-screen";
import { cn } from "@/lib/utils";

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  srcSet: string[];
}

interface SourceProps {
  src: string;
}

function Source({ src }: SourceProps) {
  if (src.endsWith(".webm")) {
    return <source src={src} type="video/webm" />;
  }
  return <source src={src} type="video/mp4" />;
}

export function Video({ srcSet, className, ...props }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useOnScreen(videoRef);
  // MP4 plays almost everywhere, so it's the safest file to offer as a download
  const downloadSrc = srcSet.find((src) => src.endsWith(".mp4")) ?? srcSet[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <video
      ref={videoRef}
      className={cn("ring-muted my-2 w-full rounded-lg ring-2 dark:ring-0", className)}
      preload="metadata"
      {...props}
    >
      {srcSet.map((src) => (
        <Source key={src} src={src} />
      ))}

      <p>
        Your browser does not support HTML5 video. You can{" "}
        <a href={downloadSrc} download>
          download the video instead
        </a>
        .
      </p>
    </video>
  );
}
