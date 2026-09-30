import { useWebHaptics } from "web-haptics/react";
import type { HapticInput, TriggerOptions } from "web-haptics";

/**
 * `useWebHaptics`, but `trigger` is a no-op until the user has interacted with the page.
 * Browsers block `navigator.vibrate` before a user gesture and log a console warning,
 * which hover-triggered haptics would otherwise hit on first load.
 */
export function useHaptics() {
  const haptics = useWebHaptics();

  const trigger = (input?: HapticInput, options?: TriggerOptions) => {
    const activation = typeof navigator !== "undefined" ? navigator.userActivation : undefined;
    if (activation && !activation.hasBeenActive) return;
    return haptics.trigger(input, options);
  };

  return { ...haptics, trigger };
}
