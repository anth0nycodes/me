"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useHaptics } from "@/hooks/use-haptics";
import { useIsMounted } from "@/hooks/use-is-mounted";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const { trigger } = useHaptics();

  if (!mounted) return null;

  function cycleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    trigger("selection");

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

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
