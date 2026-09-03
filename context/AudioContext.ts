import { createContext, Dispatch, SetStateAction } from "react";

interface AudioContext {
  audioEnabled: boolean;
  setAudioEnabled: Dispatch<SetStateAction<boolean>>;
}

export const AudioContext = createContext<AudioContext | null>(null);
