"use client";

import { KeyboardEvent, PointerEvent, useRef, useState } from "react";
import { clamp } from "@/lib/utils";
import { SloganNormal, SloganOutline } from "../svgs/slogan";

export function CreateCoolThings() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateSliderPosition = (clientY: number) => {
    const content = contentRef.current;
    if (!content) return;
    const contentRect = content.getBoundingClientRect();
    const contentOffsetY = clientY - contentRect.top;
    setPercentage(clamp((contentOffsetY / contentRect.height) * 100, 0, 100));
  };

  const handleKnobPointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  const handleKnobPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handleKnobPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientY);
  };

  const handleKnobKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    const next = {
      ArrowUp: percentage - step,
      ArrowDown: percentage + step,
      ArrowLeft: percentage - step,
      ArrowRight: percentage + step,
      Home: 0,
      End: 100,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setPercentage(clamp(next, 0, 100));
  };

  return (
    <div ref={contentRef} className="relative grid h-full bg-black select-none">
      <div
        style={{
          top: `${percentage}%`,
        }}
        className="absolute inset-x-0 z-10 h-0.75 -translate-y-1/2 bg-[#0D99FF90] sm:h-1"
      />
      <div
        role="slider"
        aria-label="Reveal amount"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percentage)}
        tabIndex={0}
        onPointerUp={handleKnobPointerEnd}
        onPointerDown={handleKnobPointerDown}
        onPointerMove={handleKnobPointerMove}
        onPointerCancel={handleKnobPointerEnd}
        onKeyDown={handleKnobKeyDown}
        style={{
          top: `${percentage}%`,
        }}
        className="group absolute left-1/2 z-20 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none place-items-center focus-visible:outline-none active:cursor-grabbing"
      >
        <span
          data-dragging={isDragging || undefined}
          className="size-4 rounded-full border-2 border-[#0D99FF] bg-white shadow-md transition-transform duration-150 ease-out group-focus-visible:ring-2 group-focus-visible:ring-white/70 data-dragging:scale-90 sm:size-5"
        />
      </div>
      <div
        style={{
          clipPath: `inset(${percentage}% 0 0 0)`,
        }}
        className="col-start-1 row-start-1 flex items-center justify-center"
      >
        <SloganOutline className="h-auto w-[85%]" />
      </div>
      <div
        style={{
          clipPath: `inset(0 0 ${100 - percentage}% 0)`,
        }}
        className="col-start-1 row-start-1 flex items-center justify-center"
      >
        <SloganNormal className="h-auto w-[85%]" />
      </div>
    </div>
  );
}
