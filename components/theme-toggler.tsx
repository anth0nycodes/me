"use client";

import { MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggler() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cycleTheme = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  return (
    <button
      onClick={cycleTheme}
      className="hover:text-primary text-muted-foreground cursor-pointer transition-colors"
    >
      {theme === "system" ? (
        <span className="flex items-center gap-1">
          <MonitorCog className="size-4" aria-hidden="true" /> system
        </span>
      ) : resolvedTheme === "dark" ? (
        <span className="flex items-center gap-1">
          <Moon className="size-4" aria-hidden="true" /> dark
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <Sun className="size-4" aria-hidden="true" /> light
        </span>
      )}
    </button>
  );
}
