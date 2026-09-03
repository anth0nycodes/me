"use client";

import { ReactNode, useEffect, useState } from "react";
import { AudioContext } from "./AudioContext";

export function AudioProvider({ children }: { children: ReactNode }) {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedAudioPreference = localStorage.getItem("audio-preference");
    if (savedAudioPreference != null) {
      setAudioEnabled(savedAudioPreference === "true");
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("audio-preference", String(audioEnabled));
    }
  }, [audioEnabled, isHydrated]);

  return (
    <AudioContext.Provider value={{ audioEnabled, setAudioEnabled }}>
      {children}
    </AudioContext.Provider>
  );
}
