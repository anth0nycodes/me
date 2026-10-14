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

  function getBackLink() {
    if (pathname.startsWith("/thoughts/")) return { href: "/thoughts", text: "thoughts" };
    if (pathname.startsWith("/craft/")) {
      const slug = pathname.slice("/craft/".length);
      return { href: `/craft#${slug}`, text: "craft" };
    }
    return { href: "/", text: "home" };
  }

  const { href, text } = getBackLink();

  return (
    <nav
      aria-label="Main"
      className="mx-auto mb-5 flex w-full max-w-150 items-center justify-between"
    >
      <Link
        href={href}
        onMouseEnter={() => playHoverSFX()}
        onClick={() => trigger("light")}
        className="group text-muted-foreground hover:text-primary flex items-center gap-1.5 text-sm"
      >
        <ArrowLeft
          className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        {text}
      </Link>
      <div className="flex items-center gap-1">
        <AudioToggle />
        <ThemeToggler />
      </div>
    </nav>
  );
}
