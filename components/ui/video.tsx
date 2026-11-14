"use client";

import { useEffect, useRef, useState, VideoHTMLAttributes } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { MediaControlButton } from "@/components/ui/media-control-button";
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

/**
 * What the viewer last asked for. `auto` plays whenever the video is on screen, unless they prefer
 * reduced motion. `playing` is a press of play: it plays on screen even with reduced motion on.
 * `paused` holds until they press play or restart, even if they scroll away and back.
 */
type PlayIntent = "auto" | "playing" | "paused";

export function Video({ srcSet, className, ...props }: VideoProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useOnScreen(videoRef);
  const [intent, setIntent] = useState<PlayIntent>("auto");
  const [isPlaying, setIsPlaying] = useState(false);
  // MP4 plays almost everywhere, so it's the safest file to offer as a download
  const downloadSrc = srcSet.find((src) => src.endsWith(".mp4")) ?? srcSet[0];

  // never plays off screen, whatever the intent
  const shouldPlay =
    isVisible && (intent === "playing" || (intent === "auto" && !prefersReducedMotion));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldPlay]);

  function handleTogglePlay() {
    if (isPlaying) {
      setIntent("paused");
      return;
    }
    setIntent("playing");
    // a video that has ended keeps the same intent, so the effect won't rerun; start it here
    if (isVisible) videoRef.current?.play().catch(() => {});
  }

  function handleRestart() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setIntent("playing");
    if (isVisible) video.play().catch(() => {});
  }

  return (
    // in a post, a video on its own gets the spacing prose would have given it; inside a figure
    // the figure spaces it instead
    <div className="not-prose relative [.prose>&]:my-8">
      <video
        ref={videoRef}
        className={cn("ring-muted w-full rounded-lg ring-2 dark:ring-0", className)}
        preload="metadata"
        playsInline
        muted
        // looping forever would break the 5-second rule for moving content under reduced motion
        loop={!prefersReducedMotion}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
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
      <div className="absolute right-3 bottom-3 flex gap-1.5">
        <MediaControlButton
          variant="overlay"
          label={isPlaying ? "Pause video" : "Play video"}
          onClick={handleTogglePlay}
        >
          {isPlaying ? <Pause aria-hidden /> : <Play aria-hidden />}
        </MediaControlButton>
        <MediaControlButton variant="overlay" label="Restart video" onClick={handleRestart}>
          <RotateCcw aria-hidden />
        </MediaControlButton>
      </div>
    </div>
  );
}
