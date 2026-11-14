"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

// a chunk reveals once its top is this far up from the bottom of the viewport
const ROOT_MARGIN = "0px 0px -10% 0px";

/**
 * Eases each chunk of a post (paragraph, figure, heading) up into place the first time it scrolls
 * into view. Renders nothing; it marks the elements `selector` matches, and globals.css animates them.
 *
 * Only chunks still below the fold when the page loads are hidden. Anything already on screen stays
 * as the server drew it, so nothing visible blinks out and back in while the page hydrates, and with
 * JavaScript off every chunk is simply there.
 */
export function ScrollReveal({ selector }: { selector: string }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const below = [...document.querySelectorAll<HTMLElement>(selector)].filter(
      (element) => element.getBoundingClientRect().top > window.innerHeight,
    );
    for (const element of below) element.dataset.reveal = "pending";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: ROOT_MARGIN },
    );
    for (const element of below) observer.observe(element);

    return () => {
      observer.disconnect();
      // leave nothing hidden if this unmounts mid-scroll
      for (const element of below) delete element.dataset.reveal;
    };
  }, [selector, prefersReducedMotion]);

  return null;
}
