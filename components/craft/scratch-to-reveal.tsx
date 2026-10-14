"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Check, Copy } from "lucide-react";
import { ReplayButton } from "@/components/ui/replay-button";
import { useReplay } from "@/hooks/use-replay";
import { cn } from "@/lib/utils";

const PROMO_CODE = "X9K2-M8R4-V7H3-L5P1";
const GRADIENT_STOPS = [
  [0, "#f2b90f"],
  [0.3, "#ffdd55"],
  [1, "#e09a00"],
] as const;
const GRADIENT_CSS = `linear-gradient(to right, ${GRADIENT_STOPS.map(([offset, color]) => `${color} ${offset * 100}%`).join(", ")})`;
const GRAIN_INTENSITY = 18;

// Brush related properties
const BRUSH_RADIUS = 7.5;
const START_ANGLE = 0;
const END_ANGLE = Math.PI * 2;
const REVEAL_THRESHOLD = 0.6; // the ratio at which the code is considered revealed
const SAMPLE_STRIDE = 8; // check every 8th pixel for performance reasons, which is still plenty enough to get a good estimate of the scratched ratio

// Audio related properties
const SCRATCH_VOLUME = 0.25; // the maximum volume of the scratch sound
const SCRATCH_FULL_SPEED = 24; // pointer travel in px between two moves that plays the sound at full volume
const SCRATCH_FILTER_FREQUENCY = 2000; // the frequency of the bandpass filter applied to the white noise, which makes it sound like a scratch
const SCRATCH_SILENCE_DELAY = 60; // moves stop firing when the pointer rests, so fade out once none arrive for this long
const FADE_OUT_TIME = 0.03; // the time it takes to fade out the scratch sound once moves stop firing
const FADE_IN_TIME = 0.015; // the time it takes to fade in the scratch sound once moves start firing

const COPIED_DURATION = 1500;

type ScratchAudio = { ctx: AudioContext; gain: GainNode };

/**
 * Creates the scratching audio, which is just white noise filtered at a mid-high frequency.
 * @returns - The audio context, `ctx`, and gain node, `gain`, in order to control the properties of the sound.
 */
function createScratchAudio(): ScratchAudio {
  const ctx = new AudioContext();
  const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;

  const source = new AudioBufferSourceNode(ctx, { buffer, loop: true });
  const filter = new BiquadFilterNode(ctx, {
    type: "bandpass",
    frequency: SCRATCH_FILTER_FREQUENCY,
    Q: 0.8,
  });
  const gain = new GainNode(ctx, { gain: 0 });
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start();

  return { ctx, gain };
}

/**
 * Calculates the ratio of the canvas that has been scratched off.
 *
 * @param canvas - The HTML canvas element to read back from.
 * @param ctx - The 2D rendering context of the canvas.
 */
function getScratchedRatio(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let scratched = 0;
  let sampled = 0;
  // Every 4th byte is a pixel's alpha, which destination-out drops to 0
  for (let i = 3; i < data.length; i += 4 * SAMPLE_STRIDE) {
    sampled++;
    // if the pixel is transparent, consider it scratched
    if (data[i] === 0) scratched++;
  }
  return scratched / sampled;
}

export function ScratchToReveal() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const audioRef = useRef<ScratchAudio | null>(null);
  const silenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { runId, isReplayDisabled, replay, enableReplay } = useReplay(() => {
    lastPointRef.current = null;
    clearTimeout(copiedTimeoutRef.current);
    setIsRevealed(false);
    setIsCopied(false);
  });

  useEffect(
    () => () => {
      clearTimeout(copiedTimeoutRef.current);
      clearTimeout(silenceTimeoutRef.current);
      audioRef.current?.ctx.close();
      audioRef.current = null;
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // The scratched ratio is read back on every move, which is slow on a GPU-backed canvas
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    for (const [offset, color] of GRADIENT_STOPS) gradient.addColorStop(offset, color);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Grain: shift each device pixel's brightness by a random amount
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      const grain = (Math.random() - 0.5) * 2 * GRAIN_INTENSITY;
      data[i] += grain;
      data[i + 1] += grain;
      data[i + 2] += grain;
    }
    ctx.putImageData(imageData, 0, 0);

    // Bitmap now holds the texture, so drop the CSS cover or erasing would reveal it
    canvas.style.background = "none";
    // Replaying remounts the canvas, so the fresh one needs its foil drawn
  }, [runId]);

  /**
   * Plays the scratch sound with volume based on the speed of the pointer movement, which is calculated from the `distance`.
   *
   * @param distance - The distance between the last pointer position and the current one.
   */
  function playScratchSound(distance: number) {
    const audio = audioRef.current;
    if (!audio) return;
    // Faster drags are louder, like pressing a coin across the foil
    const level = Math.min(distance / SCRATCH_FULL_SPEED, 1) * SCRATCH_VOLUME;
    audio.gain.gain.setTargetAtTime(level, audio.ctx.currentTime, FADE_IN_TIME);
    clearTimeout(silenceTimeoutRef.current);
    silenceTimeoutRef.current = setTimeout(silenceScratchSound, SCRATCH_SILENCE_DELAY);
  }

  /**
   * Silences the scratch sound by setting the gain of the sound to 0.
   */
  function silenceScratchSound() {
    clearTimeout(silenceTimeoutRef.current);
    const audio = audioRef.current;
    if (!audio) return;
    audio.gain.gain.setTargetAtTime(0, audio.ctx.currentTime, FADE_OUT_TIME);
  }

  /**
   * Handles the scratching logic of the canvas by drawing an arc alongside a line based on the last pointer position to the current one.
   *
   * @param e - The pointer event that triggered the scratch.
   */
  function scratch(e: PointerEvent<HTMLCanvasElement>) {
    // Only scratch when the main button, or a finger, is held down
    if (e.buttons !== 1) {
      lastPointRef.current = null;
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    enableReplay();

    const { offsetX: x, offsetY: y } = e.nativeEvent;
    const lastPoint = lastPointRef.current;

    ctx.globalCompositeOperation = "destination-out";

    // Pointer events fire slower than a fast drag moves, so bridge the gap from the previous point
    if (lastPoint) {
      ctx.lineWidth = BRUSH_RADIUS * 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, BRUSH_RADIUS, START_ANGLE, END_ANGLE);
    ctx.fill();

    lastPointRef.current = { x, y };

    if (getScratchedRatio(canvas, ctx) >= REVEAL_THRESHOLD) {
      setIsRevealed(true);
      silenceScratchSound();
    } else if (!isRevealed) {
      // A press without a previous point still scrapes off a brush-sized dot
      playScratchSound(lastPoint ? Math.hypot(x - lastPoint.x, y - lastPoint.y) : BRUSH_RADIUS);
    }
  }

  function startScratch(e: PointerEvent<HTMLCanvasElement>) {
    // Keep receiving moves when the drag leaves the canvas, so re-entry doesn't draw a line across it
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPointRef.current = null;
    // Browsers only allow audio to start from a user gesture, so build it on the first press
    audioRef.current ??= createScratchAudio();
    resumeScratchAudio();
    scratch(e);
  }

  function endScratch() {
    lastPointRef.current = null;
    silenceScratchSound();
    // Touch only counts as a gesture on release, so a context blocked on press unlocks here
    resumeScratchAudio();
  }

  function resumeScratchAudio() {
    const ctx = audioRef.current?.ctx;
    if (ctx?.state === "suspended") void ctx.resume();
  }

  async function copyCode() {
    await navigator.clipboard.writeText(PROMO_CODE);
    setIsCopied(true);
    // Restart the countdown on repeat clicks, or an earlier timer would cut the checkmark short
    clearTimeout(copiedTimeoutRef.current);
    copiedTimeoutRef.current = setTimeout(() => setIsCopied(false), COPIED_DURATION);
  }

  return (
    <div className="bg-foreground relative flex size-full items-center justify-center">
      <ReplayButton aria-label="Restart" onClick={replay} disabled={isReplayDisabled} />
      <div className="text-background flex flex-col gap-2 font-mono sm:flex-row sm:items-center sm:gap-4">
        <span className="font-medium uppercase sm:text-xl">Promo code</span>
        <div className="relative overflow-clip rounded-md py-2 pr-10 pl-2 ring ring-[#73737380] ring-inset">
          <span className="text-sm sm:text-base">{PROMO_CODE}</span>
          <canvas
            key={runId}
            onPointerDown={startScratch}
            onPointerMove={scratch}
            onPointerUp={endScratch}
            onPointerCancel={endScratch}
            ref={canvasRef}
            className={cn(
              "absolute inset-0 size-full cursor-crosshair touch-none transition-opacity duration-300 ease-out",
              isRevealed && "pointer-events-none opacity-0",
            )}
            style={{ backgroundImage: GRADIENT_CSS }}
          />
          <button
            type="button"
            onClick={copyCode}
            disabled={!isRevealed}
            aria-label={isCopied ? "Copied promo code" : "Copy promo code"}
            className={cn(
              "text-background/60 hover:text-background absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center",
              // Transition only lives on the revealed state, so it fades in but hides instantly on restart
              isRevealed
                ? "transition-[opacity,scale,color] duration-200 ease-out"
                : "pointer-events-none scale-90 opacity-0",
            )}
          >
            {isCopied ? (
              <Check className="size-4 text-green-600" aria-hidden />
            ) : (
              <Copy className="size-4" aria-hidden />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
