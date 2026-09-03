import { useContext } from "react";
import { AudioContext } from "./AudioContext";

export function useAudioEnabled() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("useAudioEnabled must be used within an AudioProvider");
  }

  return context;
}
