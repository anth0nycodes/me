"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
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
        "bg-muted text-foreground group fixed right-5 bottom-5 z-100 hidden size-12 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ease-out hover:scale-105 sm:flex",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0",
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp
        className="size-6 transition-transform duration-225 ease-out group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </button>
  );
}
