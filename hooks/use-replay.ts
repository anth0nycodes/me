import { useState } from "react";

/**
 * Replay state for a craft animation. Key the animated subtree on `runId` to remount it,
 * and call `enableReplay` once the animation finishes.
 */
export function useReplay(onReplay?: () => void) {
  const [runId, setRunId] = useState(0);
  const [isReplayDisabled, setIsReplayDisabled] = useState(true);

  const replay = () => {
    onReplay?.();
    setRunId((prev) => prev + 1);
    setIsReplayDisabled(true);
  };

  const enableReplay = () => setIsReplayDisabled(false);

  return { runId, isReplayDisabled, replay, enableReplay };
}
