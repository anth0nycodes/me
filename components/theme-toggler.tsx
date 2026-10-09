"use client";

import { MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useHaptics } from "@/hooks/use-haptics";
import { useIsMounted } from "@/hooks/use-is-mounted";

export function ThemeToggler() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const { trigger } = useHaptics();

  if (!mounted) return null;

  const cycleTheme = () => {
    trigger("selection");
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Change theme (current: ${theme})`}
      className="hover:bg-accent text-muted-foreground flex cursor-pointer items-center justify-center rounded-md p-2"
    >
      {theme === "system" ? (
        <MonitorCog className="size-4" aria-hidden="true" />
      ) : resolvedTheme === "dark" ? (
        <Moon className="size-4" aria-hidden="true" />
      ) : (
        <Sun className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
