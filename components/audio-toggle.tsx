"use client";

import { Volume2, VolumeOff } from "lucide-react";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { cn } from "@/lib/utils";

export function AudioToggle({ className }: { className?: string }) {
  const { audioEnabled, setAudioEnabled } = useAudioEnabled();

  return (
    <button
      onClick={() => setAudioEnabled((prev) => !prev)}
      className={cn(
        "hover:bg-accent text-muted-foreground flex cursor-pointer items-center justify-center rounded-md p-2",
        className
      )}
      aria-label={audioEnabled ? "Disable audio" : "Enable audio"}
    >
      {audioEnabled ? (
        <Volume2 className="size-4" aria-hidden="true" />
      ) : (
        <VolumeOff className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
