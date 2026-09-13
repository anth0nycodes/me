"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    function handleScroll() {
      const { scrollY } = window;
      setIsVisible(scrollY > 100);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={handleScrollToTop}
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={cn(
        "fixed bottom-5 right-5 flex cursor-pointer transition-all duration-300 ease-out items-center justify-center size-12 rounded-full bg-muted text-foreground group hover:scale-105",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none",
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp
        className="size-6 group-hover:-translate-y-0.5 transition-transform duration-225 ease-out"
        aria-hidden="true"
      />
    </button>
  );
}
