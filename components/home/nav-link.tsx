"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import useSound from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";

interface NavLinkProps {
  href: string;
  color: string;
  children: ReactNode;
}

export function NavLink({ href, color, children }: NavLinkProps) {
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });
  const { trigger } = useHaptics();

  return (
    <Link
      href={href}
      onMouseEnter={() => playHoverSFX()}
      onClick={() => trigger("light")}
      className="group -mx-0.5 rounded-t-[3px] bg-linear-to-t from-(--fill) to-(--fill) bg-size-[100%_0%] bg-bottom bg-no-repeat px-0.5 pb-[2.5px] text-(--color) transition-[background-size] duration-250 ease-out hover:bg-size-[100%_100%] focus-visible:bg-size-[100%_100%] motion-reduce:transition-none"
      style={
        {
          "--color": color,
          "--color-dark": `color-mix(in oklch, ${color}, black 25%)`,
          "--fill": `color-mix(in oklch, ${color} 16%, transparent)`,
        } as CSSProperties
      }
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-full mt-px h-0.5 rounded-full bg-(--color) transition-colors duration-250 ease-out group-hover:bg-(--color-dark) group-focus-visible:bg-(--color-dark) motion-reduce:transition-none"
        />
      </span>
    </Link>
  );
}
