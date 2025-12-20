"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="hover:text-primary text-muted-foreground cursor-pointer transition-colors"
    >
      {theme === "dark" ? (
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
