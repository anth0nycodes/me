"use client";

import { KeyboardEvent, PointerEvent, useState } from "react";
import Image from "next/image";
import { DATA } from "@/data/me";
import { clamp } from "@/lib/utils";

const MAX_X_TILT = 12;
const MAX_Y_TILT = 8;
const MAX_SHADOW_OFFSET = 12;
const PRESS_DEPTH = 1;

const KEY_STEP = 0.2;
const KEY_STEP_LARGE = 0.5;
const PRESS_KEYS = [" ", "Enter"];

// fractal noise stretched horizontally (low x frequency, high y) reads as brushed metal grain
const BRUSHED_GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0 0 0 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
// a faint diagonal falloff so the plate isn't a flat fill
const METAL_BASE = `linear-gradient(135deg, #fcfcfd 0%, #eff1f3 45%, #f6f7f8 70%, #eceef1 100%)`;
// alternating light and dark cool grays read as polished steel; the white gaps are the highlights
const FOIL_GRADIENT = `linear-gradient(115deg,
  transparent 20%,
  hsl(215 10% 82%) 30%,
  hsl(215 15% 97%) 37%,
  hsl(215 8% 72%) 45%,
  hsl(0 0% 100%) 52%,
  hsl(215 12% 80%) 60%,
  hsl(215 15% 94%) 68%,
  transparent 80%)`;

export function MetalCard() {
  // pointer position normalized to -1..1, center is 0
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  // horizontal movement tilts around the Y axis, vertical around the X axis
  const rotateX = -pointer.y * MAX_Y_TILT;
  const rotateY = pointer.x * MAX_X_TILT;

  // pressing sinks the card further toward the pointer. it lives on the separate
  // `rotate` property (same axis as the tilt) so it can share the scale's duration
  const tilt = Math.hypot(rotateX, rotateY);
  const pressRotate =
    tilt === 0
      ? "none"
      : `${rotateX} ${rotateY} 0 ${isPressing ? tilt * PRESS_DEPTH : 0}deg`;

  const tiltDuration = isHovering ? 250 : 400;
  // sink in quickly, recover slowly so the release doesn't snap back
  const pressDuration = isPressing ? 400 : 1000;

  // pointer as 0..100% across the card, where the foil catches the light
  const glareX = (pointer.x + 1) * 50;
  const glareY = (pointer.y + 1) * 50;

  // shadow falls away from the pointer and tightens as the card is pressed down
  const lift = isPressing ? 0.4 : 1;
  const sx = -pointer.x * MAX_SHADOW_OFFSET * lift;
  const sy = (MAX_SHADOW_OFFSET * 0.5 - pointer.y * MAX_SHADOW_OFFSET) * lift;
  const boxShadow = [
    // bevel: bright top edge and a darker bottom edge give the plate some thickness
    "inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    "inset 0 -1px 0 rgba(0, 0, 0, 0.05)",
    "0 1px 2px rgba(0, 0, 0, 0.06)",
    `${sx * 0.5}px ${sy * 0.5 + 2}px ${8 * lift}px rgba(0, 0, 0, 0.06)`,
    `${sx}px ${sy + 8}px ${32 * lift}px rgba(0, 0, 0, 0.1)`,
  ].join(", ");

  const resetPointer = () => {
    setIsHovering(false);
    setPointer({ x: 0, y: 0 });
  };

  const handleRelease = () => {
    setIsPressing(false);
    resetPointer();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (PRESS_KEYS.includes(e.key)) {
      e.preventDefault();
      setIsPressing(true);
      return;
    }

    const step = e.shiftKey ? KEY_STEP_LARGE : KEY_STEP;
    const next = {
      ArrowUp: { x: pointer.x, y: pointer.y - step },
      ArrowDown: { x: pointer.x, y: pointer.y + step },
      ArrowLeft: { x: pointer.x - step, y: pointer.y },
      ArrowRight: { x: pointer.x + step, y: pointer.y },
      Home: { x: 0, y: 0 },
    }[e.key];
    if (!next) return;
    e.preventDefault();
    // keyboard has no hover, so treat moving the card as hovering to show the foil
    setIsHovering(true);
    setPointer({ x: clamp(next.x, -1, 1), y: clamp(next.y, -1, 1) });
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (PRESS_KEYS.includes(e.key)) setIsPressing(false);
  };

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    const { clientX, clientY } = e;

    // measure the unrotated wrapper (or the button covering it); the rotated card's rect changes as it tilts
    const cardRect = e.currentTarget.getBoundingClientRect();
    const cardX = clamp(clientX - cardRect.left, 0, cardRect.width);
    const cardY = clamp(clientY - cardRect.top, 0, cardRect.height);

    // normalize to -1..1 with the center as 0
    const nx = (cardX / cardRect.width) * 2 - 1;
    const ny = (cardY / cardRect.height) * 2 - 1;

    setPointer({ x: nx, y: ny });
  };

  return (
    <div className="bg-foreground flex size-full items-center justify-center select-none">
      <div
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => {
          // while pressed, hold the tilt and scale until release
          if (!isPressing) resetPointer();
        }}
        className="group relative aspect-1.75/1 w-[26.25em] text-[min(1rem,65cqw/26.25)] perspective-distant"
      >
        <div
          data-pressed={isPressing}
          className="pointer-events-none absolute inset-0 overflow-clip rounded-[0.75em] outline-1 outline-[#EBEBEB] transform-3d data-[pressed=true]:scale-97"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            rotate: pressRotate,
            backgroundImage: `${BRUSHED_GRAIN}, ${METAL_BASE}`,
            boxShadow,
            // tilt follows the pointer quickly while hovering; press and release share one duration
            transition: `transform ${tiltDuration}ms ease, rotate ${pressDuration}ms ease, scale ${pressDuration}ms ease, box-shadow ${pressDuration}ms ease`,
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 mix-blend-multiply"
            style={{
              backgroundImage: FOIL_GRADIENT,
              backgroundSize: "300% 300%",
              // the sheen band sweeps across as the pointer moves, like light catching foil
              backgroundPosition: `${glareX}% ${glareY}%`,
              // only show the sheen around where the light hits
              maskImage: `radial-gradient(circle at ${glareX}% ${glareY}%, black, transparent 70%)`,
              opacity: isHovering ? 0.35 : 0,
              transition: "background-position 700ms ease, opacity 1s ease",
            }}
          />
          <div className="flex h-full flex-col justify-between p-[1.5em]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start text-[1.5em]">
                <span className="text-background leading-tight">
                  anthony hoang
                </span>
                <span className="leading-tight text-[#6B6B6B]">
                  design engineer
                </span>
              </div>
              <div className="size-[3.75em] overflow-clip rounded-full ring-1 ring-[#EBEBEB]">
                <Image
                  src={DATA.images[0]}
                  width={250}
                  height={250}
                  alt="Profile picture of me at the Golden Gate Bridge in San Francisco, California"
                  className="size-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-[0.875em]">
              <span className="leading-none text-[#9B9B9B]">united states</span>
              <span className="leading-none text-[#6B6B6B]">
                anthonyhoang.dev
              </span>
            </div>
          </div>
        </div>
        <button
          onPointerDown={(e) => {
            // keep receiving move/up events even after the pointer leaves the card
            e.currentTarget.setPointerCapture(e.pointerId);
            setIsPressing(true);
            // touch has no hover before the press, so tilt toward where the finger lands
            handlePointerMove(e);
          }}
          onPointerUp={handleRelease}
          onPointerCancel={handleRelease}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleRelease}
          aria-label="Tilt card with arrow keys"
          className="absolute inset-0 z-10 cursor-pointer touch-none"
        />
      </div>
    </div>
  );
}
