"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type SVGProps,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  ClaudeIcon,
  DeepSeekIcon,
  GeminiIcon,
  GrokIcon,
  KimiIcon,
  MetaIcon,
  MistralIcon,
  OpenAIIcon,
  QwenIcon,
} from "./svgs";

interface CarouselItem {
  text: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  color?: string; // brand tint for the active state, neutral when omitted
}

const ITEMS: CarouselItem[] = [
  { text: "Claude", Icon: ClaudeIcon, color: "#D97757" },
  { text: "GPT", Icon: OpenAIIcon },
  { text: "Gemini", Icon: GeminiIcon, color: "#3186FF" },
  { text: "Grok", Icon: GrokIcon },
  { text: "DeepSeek", Icon: DeepSeekIcon, color: "#4D6BFE" },
  { text: "Mistral", Icon: MistralIcon, color: "#FA500F" },
  { text: "Qwen", Icon: QwenIcon, color: "#6336E7" },
  { text: "Kimi", Icon: KimiIcon, color: "#1783FF" },
  { text: "Llama", Icon: MetaIcon, color: "#0082FB" },
];

const GAP = 12; // px between each item's edges
const TILT_ANGLE = 15; // degrees of tilt for each item away from center
const PERSPECTIVE = 4; // amount of card-heights away from center
const SCALE_STEP = 0.1; // scale lost per item away from center
const HALF_CARD_HEIGHT_RATIO = 0.5;
const MAX_OFFSET = Math.floor(ITEMS.length / 2); // max distance from center before wrapping around

function getOffset(index: number, activeIndex: number) {
  const distance = Math.abs(index - activeIndex);
  let wrappedIndex = index;

  if (index < activeIndex && distance > MAX_OFFSET) {
    wrappedIndex += ITEMS.length;
  } else if (index > activeIndex && distance > MAX_OFFSET) {
    wrappedIndex -= ITEMS.length;
  }

  return wrappedIndex - activeIndex;
}

function getScale(distance: number) {
  return 1 - distance * SCALE_STEP;
}

function getRotateX(offset: number) {
  return -1 * offset * TILT_ANGLE;
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function getVisibleHeight(step: number) {
  const currentStepScale = getScale(step);
  const tiltAmount = step * TILT_ANGLE;
  return currentStepScale * Math.cos(toRadians(tiltAmount));
}

function getLeanAmount(step: number) {
  const tiltAmount = step * TILT_ANGLE;
  const leanFraction = Math.sin(toRadians(tiltAmount));
  return HALF_CARD_HEIGHT_RATIO * leanFraction;
}

function getTranslateY(distance: number, direction: number) {
  let heights = 0;

  /* leave the current card through its outer half (further away) and
     enter the next through its inner half (closer) */
  for (let step = 0; step < distance; step++) {
    const currentCardHalfHeight = getVisibleHeight(step) / 2;
    const currentCardLean = getLeanAmount(step);
    const outerHalfMultiplier = PERSPECTIVE / (PERSPECTIVE + currentCardLean);

    const nextCardHalfHeight = getVisibleHeight(step + 1) / 2;
    const nextCardLean = getLeanAmount(step + 1);
    const innerHalfMultiplier = PERSPECTIVE / (PERSPECTIVE - nextCardLean);

    heights +=
      currentCardHalfHeight * outerHalfMultiplier + nextCardHalfHeight * innerHalfMultiplier;
  }

  const percentage = heights * 100;

  return `calc(${direction} * (${percentage}% + ${distance * GAP}px))`;
}

export function VerticalCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isInView, setIsInView] = useState(false);
  const targetElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ITEMS.length);
    }, 1200);

    return () => clearInterval(intervalId);
  }, [prefersReducedMotion, isInView]);

  // Unlike a one-shot reveal this keeps observing, so the interval pauses whenever the card leaves view
  useEffect(() => {
    const targetElement = targetElementRef.current;
    if (!targetElement) return;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 },
    );

    intersectionObserver.observe(targetElement);

    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <div
      ref={targetElementRef}
      className="bg-foreground relative flex size-full items-center justify-center overflow-hidden"
    >
      <ChevronRight
        className="text-muted-foreground absolute top-1/2 right-[calc(50%+5.5rem)] size-4 -translate-y-1/2 sm:right-[calc(50%+7.25rem)] sm:size-5"
        aria-hidden
      />
      <ChevronLeft
        className="text-muted-foreground absolute top-1/2 left-[calc(50%+5.5rem)] size-4 -translate-y-1/2 sm:left-[calc(50%+7.25rem)] sm:size-5"
        aria-hidden
      />
      <div className="relative flex size-full items-center justify-center">
        <div className="to-foreground pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 transform-gpu bg-linear-to-t from-transparent" />
        {ITEMS.map(({ text, Icon, color }, index) => {
          const offset = getOffset(index, activeIndex);
          const distance = Math.abs(offset);
          const scale = getScale(distance);
          const direction = Math.sign(offset);
          const translateY = getTranslateY(distance, direction);
          const rotateX = getRotateX(offset);

          return (
            <div
              key={text}
              data-hidden={distance === MAX_OFFSET}
              data-active={distance === 0}
              className="border-muted-foreground/35 bg-foreground text-muted absolute flex h-(--item-height) w-38 translate-y-(--translate-y) scale-(--scale) transform-[perspective(calc(var(--item-height)*var(--perspective)))_rotateX(var(--rotate-x))] items-center justify-center gap-2 rounded-lg border px-4 transition-[translate,scale,transform,opacity,background-color,border-color] duration-[1100ms,1100ms,1100ms,1100ms,550ms,550ms] ease-[cubic-bezier(0.25,1,0.5,1)] [--item-height:2.75rem] data-[active=true]:border-(--brand) data-[active=true]:bg-[color-mix(in_oklch,var(--brand)_15%,var(--foreground))] data-[hidden=true]:opacity-0 sm:w-50 sm:rounded-xl sm:[--item-height:3.75rem]"
              style={
                {
                  "--translate-y": translateY,
                  "--scale": scale,
                  "--rotate-x": `${rotateX}deg`,
                  "--perspective": PERSPECTIVE,
                  "--brand": color ?? "var(--muted-foreground)",
                } as CSSProperties
              }
            >
              <Icon className="size-4 shrink-0 sm:size-5" />
              <span className="text-sm whitespace-nowrap sm:text-xl">{text}</span>
            </div>
          );
        })}
        <div className="from-foreground pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 transform-gpu bg-linear-to-t to-transparent" />
      </div>
    </div>
  );
}
