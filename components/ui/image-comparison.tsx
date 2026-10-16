"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { clamp, cn } from "@/lib/utils";

interface ComparisonImage {
  src: string;
  alt: string;
}

interface ImageComparisonProps {
  before: ComparisonImage;
  after: ComparisonImage;
  width: number;
  height: number;
  className?: string;
}

function Picture({ src, alt, width, height }: ComparisonImage & { width: number; height: number }) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img
        src={`${src}.png`}
        alt={alt}
        width={width}
        height={height}
        draggable={false}
        className="block h-auto w-full"
      />
    </picture>
  );
}

function Label({ children, className }: { children: string; className: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute bottom-3 rounded-full bg-black/70 px-2 py-0.5 text-xs text-white backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ImageComparison({ before, after, width, height }: ImageComparisonProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const container = containerRef.current;
    if (!container || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const { left, width } = container.getBoundingClientRect();
    const percent = ((e.clientX - left) / width) * 100;
    const clampedPosition = clamp(percent, 0, 100);
    setPosition(clampedPosition);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const step = e.shiftKey ? 10 : 5;
    const next = {
      ArrowLeft: position - step,
      ArrowRight: position + step,
      Home: 0,
      End: 100,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const clampedPosition = clamp(next, 0, 100);
    setPosition(clampedPosition);
  }

  return (
    <div
      ref={containerRef}
      className="not-prose relative my-4 overflow-hidden rounded-lg select-none"
    >
      <div className="relative">
        <Picture {...before} width={width} height={height} />
        <Label className="left-3">Before</Label>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <Picture {...after} width={width} height={height} />
          <Label className="right-3">After</Label>
        </div>
        <div
          className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white"
          style={{ left: `${position}%` }}
        />
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after divider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% before`}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="absolute top-1/2 flex size-8 -translate-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full bg-white text-black shadow-md outline-none before:absolute before:-inset-2 before:content-[''] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        style={{ left: `${position}%` }}
      >
        <ChevronsLeftRight className="size-4" aria-hidden />
      </div>
    </div>
  );
}
