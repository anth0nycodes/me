import { useSyncExternalStore } from "react";

/**
 * Whether a CSS media query matches. Reports `false` on the server and during hydration so the
 * first client render matches the server HTML, then switches to the real value and follows changes.
 *
 * @param query - A media query, e.g. "(hover: hover) and (pointer: fine)".
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
