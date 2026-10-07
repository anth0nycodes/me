"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useSound } from "use-sound";
import { AudioToggle } from "@/components/audio-toggle";
import { ThemeToggler } from "@/components/theme-toggler";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";

export default function Navbar() {
  const { audioEnabled } = useAudioEnabled();
  const pathname = usePathname();
  const { trigger } = useHaptics();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });

  // home carries its navigation inline in the header text
  if (pathname === "/") return null;

  return (
    <nav
      aria-label="Main"
      className="mx-auto mb-5 flex w-full max-w-150 items-center justify-between"
    >
      <Link
        href="/"
        onMouseEnter={() => playHoverSFX()}
        onClick={() => trigger("light")}
        className="group text-muted-foreground hover:text-primary flex items-center gap-1.5 text-sm"
      >
        <ArrowLeft
          className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        back
      </Link>
      <div className="flex items-center gap-1">
        <AudioToggle />
        <ThemeToggler />
      </div>
    </nav>
  );
}
