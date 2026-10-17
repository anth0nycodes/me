"use client";

import { useEffect, useRef, VideoHTMLAttributes } from "react";
import { useOnScreen } from "@/hooks/use-on-screen";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
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

function getAccessibleVideoProps(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    return { autoPlay: false, controls: true, loop: false };
  }
  return { autoPlay: true, controls: false, loop: true };
}

export function Video({ srcSet, className, ...props }: VideoProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useOnScreen(videoRef);
  // MP4 plays almost everywhere, so it's the safest file to offer as a download
  const downloadSrc = srcSet.find((src) => src.endsWith(".mp4")) ?? srcSet[0];
  const accessibleVideoProps = getAccessibleVideoProps(prefersReducedMotion);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible && !prefersReducedMotion) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, prefersReducedMotion]);

  return (
    <video
      ref={videoRef}
      className={cn("ring-muted my-2 w-full rounded-lg ring-2 dark:ring-0", className)}
      preload="metadata"
      playsInline
      muted
      {...props}
      {...accessibleVideoProps}
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
