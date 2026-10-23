"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const { trigger } = useHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playWarpLightSFX] = useSound("/audio/theme-warp-light.wav", {
    volume: 0.4,
    soundEnabled: audioEnabled,
  });
  const [playWarpDarkSFX] = useSound("/audio/theme-warp-dark.wav", {
    volume: 0.4,
    soundEnabled: audioEnabled,
  });
  // no wipe plays under reduced motion or without view transitions, so a short tap fits instead of a sweep
  const [playTapLightSFX] = useSound("/audio/theme-tap-light.wav", {
    volume: 0.4,
    soundEnabled: audioEnabled,
  });
  const [playTapDarkSFX] = useSound("/audio/theme-tap-dark.wav", {
    volume: 0.4,
    soundEnabled: audioEnabled,
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!mounted) return null;

  function cycleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const isLight = nextTheme === "light";
    trigger("selection");

    if (prefersReducedMotion || !document.startViewTransition) {
      if (isLight) playTapLightSFX();
      else playTapDarkSFX();
      setTheme(nextTheme);
      return;
    }

    if (isLight) playWarpLightSFX();
    else playWarpDarkSFX();

    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  }

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Change theme (current: ${theme})`}
      className="hover:bg-accent text-muted-foreground flex cursor-pointer items-center justify-center rounded-md p-2"
    >
      {theme === "dark" ? (
        <Moon className="size-4" aria-hidden="true" />
      ) : (
        <Sun className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
