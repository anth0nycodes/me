import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MediaControlButtonProps {
  // read out by screen readers and shown as a tooltip, since the button is icon-only
  label: string;
  onClick: () => void;
  // `surface` sits on the page; `overlay` sits on top of a video, so it brings its own dark backing
  variant?: "surface" | "overlay";
  disabled?: boolean;
  children: ReactNode;
}

/** A small icon button for media controls: play, pause, replay, previous, next. */
export function MediaControlButton({
  label,
  onClick,
  variant = "surface",
  disabled,
  children,
}: MediaControlButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex size-7 cursor-pointer items-center justify-center rounded-md transition-[color,background-color,border-color,scale] duration-150 outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring) active:scale-95 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-3.5",
        variant === "surface"
          ? "bg-card border-border text-muted-foreground hover:text-foreground border"
          : "border border-white/20 bg-[rgba(23,24,26,0.5)] text-white/85 backdrop-blur-md hover:border-white/35 hover:bg-[rgba(23,24,26,0.7)] hover:text-white"
      )}
    >
      {children}
    </button>
  );
}
