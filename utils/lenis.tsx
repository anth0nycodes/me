"use client";

import { ReactLenis as OriginalReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export function ReactLenis({
  children,
  ...props
}: React.ComponentProps<typeof OriginalReactLenis>) {
  const [shouldEnableSmoothScroll, setShouldEnableSmoothScroll] =
    useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setShouldEnableSmoothScroll(!e.matches);
    };

    // Set initial value
    handleChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  if (!shouldEnableSmoothScroll) {
    return children;
  }

  return <OriginalReactLenis {...props}>{children}</OriginalReactLenis>;
}
