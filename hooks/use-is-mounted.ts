import { useSyncExternalStore } from "react";

// Nothing to listen for: the value only differs between the server and the client
function subscribe() {
  return () => {};
}

/**
 * `false` on the server and during hydration, `true` afterwards. Use it to hold back UI that
 * depends on browser-only values, so the first client render still matches the server HTML.
 */
export function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
