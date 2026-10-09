"use client";

import { ReactNode, useSyncExternalStore, type Dispatch, type SetStateAction } from "react";
import { AudioContext } from "./AudioContext";

const STORAGE_KEY = "audio-preference";
// The native "storage" event only fires in other tabs, so same-tab writes announce themselves
const CHANGE_EVENT = "audio-preference-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// Audio is on until the user turns it off
function readAudioPreference() {
  return localStorage.getItem(STORAGE_KEY) !== "false";
}

const setAudioEnabled: Dispatch<SetStateAction<boolean>> = (action) => {
  const next = typeof action === "function" ? action(readAudioPreference()) : action;
  localStorage.setItem(STORAGE_KEY, String(next));
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

export function AudioProvider({ children }: { children: ReactNode }) {
  // The server can't read localStorage, so it and the hydration render both assume the default
  const audioEnabled = useSyncExternalStore(subscribe, readAudioPreference, () => true);

  return (
    <AudioContext.Provider value={{ audioEnabled, setAudioEnabled }}>
      {children}
    </AudioContext.Provider>
  );
}
