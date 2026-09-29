"use client";

import { useState } from "react";
import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";

const PRESSED_TILT = 4;
const RAISED_TILT = 16;

// light comes from above, so the plate's top edge catches it and the bottom edge falls into shadow
const PLATE_SHADOW = [
  "inset 0 1px 0 rgba(255, 255, 255, 0.9)",
  "inset 0 -1px 0 rgba(0, 0, 0, 0.06)",
  "0 1px 2px rgba(0, 0, 0, 0.08)",
  "0 8px 24px rgba(0, 0, 0, 0.12)",
].join(", ");

// `dir` is the direction the half's outer end points: 1 for the bottom half, -1 for the top.
// both states share the same shadow list shape so the browser can interpolate between them
function halfShadow(isRaised: boolean, dir: 1 | -1) {
  return isRaised
    ? [
        // a solid strip past the raised end is the rocker's side wall showing its thickness
        `0 ${1 * dir}px 0 #b8b2a8`,
        // the raised end lifts off the opening and casts a shadow into it
        `0 ${7 * dir}px 14px -2px rgba(0, 0, 0, 0.4)`,
      ].join(", ")
    : ["0 0 0 #b8b2a8", "0 0 0 -3px rgba(0, 0, 0, 0)"].join(", ");
}

export function Lightswitch() {
  const [isOn, setIsOn] = useState(false);
  const { audioEnabled } = useAudioEnabled();
  const [playOnSFX] = useSound("/audio/light-switch-on.mp3", {
    volume: 0.5,
    soundEnabled: audioEnabled,
  });
  const [playOffSFX] = useSound("/audio/light-switch-off.mp3", {
    volume: 0.5,
    soundEnabled: audioEnabled,
  });

  return (
    <div className="relative flex size-full items-center justify-center overflow-clip bg-[#e7e3dc] select-none">
      {/* warm light gradient overlay to simulate the light spilling down when the light is on */}
      <div
        aria-hidden
        data-on={isOn}
        className="pointer-events-none absolute inset-0 transition-opacity duration-120 ease-out data-[on=true]:duration-400 motion-reduce:transition-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% -10%, rgba(255, 226, 180, 0.55), transparent 70%)",
          opacity: isOn ? 1 : 0,
        }}
      />
      <div
        className="relative flex h-48 w-34 flex-col items-center justify-center rounded-[10px] bg-linear-to-b from-[#fbfaf8] to-[#efede9] py-3.5"
        style={{ boxShadow: PLATE_SHADOW }}
      >
        <div className="rounded-md bg-[#a9a399] p-0.5">
          <button
            role="switch"
            aria-checked={isOn}
            aria-label="Light"
            onClick={() => {
              const next = !isOn;
              if (next) {
                playOnSFX();
              } else {
                playOffSFX();
              }
              setIsOn(next);
            }}
            className="flex h-29 w-17.5 cursor-pointer flex-col rounded-sm outline-offset-4 perspective-normal focus-visible:outline-2 focus-visible:outline-[#3b82f6]"
          >
            <RockerHalf isRaised={!isOn} dir={-1} tilt={isOn ? PRESSED_TILT : -RAISED_TILT} />
            <RockerHalf isRaised={isOn} dir={1} tilt={isOn ? RAISED_TILT : -PRESSED_TILT} />
          </button>
        </div>
      </div>
      {/* dark gradient overlay to simulate the room darkening when the light is off */}
      <div
        aria-hidden
        data-on={isOn}
        className="pointer-events-none absolute inset-0 transition-opacity duration-120 ease-out data-[on=true]:duration-400 motion-reduce:transition-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(12, 16, 30, 0.62), rgba(6, 8, 16, 0.85))",
          opacity: isOn ? 0 : 1,
        }}
      />
    </div>
  );
}

interface RockerHalfProps {
  isRaised: boolean;
  dir: 1 | -1;
  tilt: number;
}

function RockerHalf({ isRaised, dir, tilt }: RockerHalfProps) {
  return (
    <span
      data-top={dir === -1}
      className="relative block h-1/2 w-full origin-top overflow-clip rounded-b-[5px] bg-linear-to-b from-[#fdfcfa] to-[#f1eee9] transition-[transform,box-shadow] duration-200 ease-out data-[top=true]:origin-bottom data-[top=true]:rounded-t-[5px] data-[top=true]:rounded-b-none motion-reduce:transition-none"
      style={{
        boxShadow: halfShadow(isRaised, dir),
        transform: `rotateX(${tilt}deg)`,
      }}
    />
  );
}
