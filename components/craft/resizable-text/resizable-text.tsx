"use client";

import { useEffect, useRef, useState, type AnimationEvent, type SVGProps } from "react";
import { X } from "lucide-react";
import { ReplayButton } from "@/components/ui/replay-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useReplay } from "@/hooks/use-replay";
import { cn } from "@/lib/utils";

export function ResizableText() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const { runId, isReplayDisabled, replay, enableReplay } = useReplay(() => setIsClicked(false));
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const isSelected = isClicked || prefersReducedMotion;

  useEffect(() => {
    const targetElement = elementRef.current;
    if (!targetElement) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.borderBoxSize[0].inlineSize);
      const height = Math.round(entry.borderBoxSize[0].blockSize);
      setDimensions({ width, height });
    });

    resizeObserver.observe(targetElement);

    return () => resizeObserver.disconnect();
  }, [runId]);

  useEffect(() => {
    const containerElement = containerRef.current;
    const targetElement = elementRef.current;
    if (!containerElement || !targetElement) return;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        containerElement.dataset.inView = "";
        intersectionObserver.disconnect();
      },
      { threshold: 1 },
    );

    intersectionObserver.observe(targetElement);

    return () => intersectionObserver.disconnect();
  }, []);

  const onPointerAnimationStart = (event: AnimationEvent<HTMLSpanElement>) => {
    // first click selects the text, second click (on empty canvas) deselects it
    if (event.animationName === "pointer-click") setIsClicked((prev) => !prev);
  };

  const onPointerAnimationEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.animationName === "pointer-exit") enableReplay();
  };

  return (
    <div
      ref={containerRef}
      className="group/canvas bg-foreground relative flex size-full items-center justify-center p-4"
    >
      <ReplayButton onClick={replay} disabled={isReplayDisabled} />
      <div key={runId} className="relative select-none">
        <div
          ref={elementRef}
          className={cn(
            "relative flex items-center justify-center border-2 border-transparent p-2",
            isSelected && "border-[#0E8CE9]",
          )}
        >
          <span className="group-data-in-view/canvas:motion-safe:animate-text-squeeze text-background text-2xl font-medium sm:text-4xl">
            form follows function
          </span>
          <div className={cn(!isSelected && "invisible")}>
            <span className="bg-foreground absolute -top-1.25 -left-1.25 size-2 border-2 border-[#0E8CE9]" />
            <span className="bg-foreground absolute -top-1.25 -right-1.25 size-2 border-2 border-[#0E8CE9]" />
            <span className="bg-foreground absolute -bottom-1.25 -left-1.25 size-2 border-2 border-[#0E8CE9]" />
            <span className="bg-foreground absolute -right-1.25 -bottom-1.25 size-2 border-2 border-[#0E8CE9]" />
          </div>
        </div>
        <span
          aria-hidden
          onAnimationStart={onPointerAnimationStart}
          onAnimationEnd={onPointerAnimationEnd}
          className="group-data-in-view/canvas:motion-safe:animate-pointer-move absolute top-[calc(50%-4px)] left-[calc(100%-5px)] opacity-0 motion-reduce:-translate-x-5.75 motion-reduce:translate-y-1.5 motion-reduce:opacity-100"
        >
          <Pointer className="group-data-in-view/canvas:motion-safe:animate-pointer-press block origin-[4px_4px]" />
        </span>
      </div>
      <div
        style={{ top: `calc(50% + ${dimensions.height / 2}px + 0.5rem)` }}
        className={cn(
          "absolute left-1/2 flex w-16 -translate-x-1/2 items-center justify-center gap-px rounded-sm bg-[#0B74C4] py-0.75 text-xs font-medium whitespace-nowrap tabular-nums select-none",
          !isSelected && "invisible",
        )}
      >
        {dimensions.width} <X className="size-2.5 stroke-3" aria-hidden /> {dimensions.height}
      </div>
    </div>
  );
}

function Pointer(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.03702 4.68802C3.99755 4.59694 3.98638 4.49609 4.00496 4.39858C4.02354 4.30107 4.07101 4.21139 4.1412 4.1412C4.21139 4.07101 4.30107 4.02354 4.39858 4.00496C4.49609 3.98638 4.59694 3.99755 4.68802 4.03702L20.688 10.537C20.7853 10.5767 20.8676 10.6459 20.9233 10.735C20.979 10.8241 21.0052 10.9284 20.9983 11.0333C20.9913 11.1381 20.9515 11.238 20.8845 11.319C20.8175 11.3999 20.7267 11.4576 20.625 11.484L14.501 13.064C14.155 13.153 13.8391 13.333 13.5863 13.5853C13.3334 13.8377 13.1527 14.1532 13.063 14.499L11.484 20.625C11.4576 20.7267 11.3999 20.8175 11.319 20.8845C11.238 20.9515 11.1381 20.9913 11.0333 20.9983C10.9284 21.0052 10.8241 20.979 10.735 20.9233C10.6459 20.8676 10.5767 20.7853 10.537 20.688L4.03702 4.68802Z"
        fill="#0E8CE9"
        stroke="#0E8CE9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
