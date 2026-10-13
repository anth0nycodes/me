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

/**
 * Calculates an offset value which represents the signed distance between `index` and `activeIndex`.
 *
 * @param index - The card at `index`.
 * @param activeIndex - The card at the center of the carousel.
 * @returns - The offset value, which is the signed distance of the card at `index` from the card at `activeIndex`.
 *
 * **Note:** In order for the cards to wrap around properly in the carousel, we must provide a correction factor for specific cards based on whether their unsigned distance from the center is beyond our `MAX_OFFSET` threshold. For instance, if we only allow a `MAX_OFFSET` of 4 cards to be above and below the center card at at time, then a distance of 5 cards away from the center would wrap around to the other side of the carousel. Cards on the top that exceed the `MAX_OFFSET` threshold would wrap around to the bottom, and cards on the bottom that exceed the `MAX_OFFSET` threshold would wrap around to the top. This is what allows for the infinite carousel effect.
 */
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

/**
 * Calculates the scale value of a card based on its distance from the center of the carousel.
 *
 * @param distance - The distance of the card from the center of the carousel.
 * @returns - The scale value of the card, which is between 0.6 and 1.
 */
function getScale(distance: number) {
  return 1 - distance * SCALE_STEP;
}

/**
 * Calculates the `rotateX` value of a card based on its offset from the center of the carousel.
 *
 * @param offset - The signed distance of the card from the center of the carousel.
 * @returns - the `rotateX` value of the card, which is between -60 and 60 degrees.
 *
 * **Note:** `offset` can be confused with `distance`, but they are different. `offset` is the signed distance from the center of the carousel, while `distance` is the unsigned distance from the center of the carousel.
 *
 * Also, we use a correction factor of `-1` to ensure that the card tilts in the correct direction. For instance, a positive `offset` would mean that the card is below the center of the carousel, resulting in a positive `rotateX` value which would tilt the bottom edge of the card towards the viewer's perspective, when we want it to tilt away from the viewer's perspective. So, that's why we multiply the `offset` by `-1`, in order for it to correct the direction of the tilt.
 */
function getRotateX(offset: number) {
  return -1 * offset * TILT_ANGLE;
}

/**
 * Converts degrees to radians.
 *
 * @param degrees - The angle in degrees.
 * @returns - The angle in radians.
 */
function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

/**
 * Calculates the visible height of a card based on its scale and tilt amount.
 *
 * @param step - The given step away from the center of the carousel. ex: step 3 would represent the 3rd card away from the center of the carousel, either above or below.
 * @returns - The visible height ratio of the card, which is between 0.3 and 1.
 *
 * **Note:** Both `scale` and `rotateX` (tilt) are styles that affect the overall visible height of a card. So, we must combine those two values to get the final visible height ratio of the card. We also use `Math.cos` to calculate the visible height of the card based on its tilt amount. On a standard 2D plane, the card is flat. But when we view this flat card from the side, it is considered standing upright. On a standard unit circle, `Math.cos()` typically represents the horizontal axis. So, in this case, `Math.cos` would represent the vertical axis of the card, since it is standing upright, and its return value given the `tiltAmount` would represent the visible height of the card. The more the card is tilted, the less visible height it has.
 */
function getVisibleHeight(step: number) {
  const currentStepScale = getScale(step);
  const tiltAmount = step * TILT_ANGLE;
  return currentStepScale * Math.cos(toRadians(tiltAmount));
}

/**
 * Calculates the lean amount of the card at `step` based on its tilt amount.
 *
 * @param step - The given step away from the center of the carousel. ex: step 3 would represent the 3rd card away from the center of the carousel, either above or below.
 * @returns - The lean amount of the card, which is between 0 and 0.433. This value represents the perceived depth of the inner and outer edges of the card in card-heights, relative to the perspective of the viewer.
 */
function getLeanAmount(step: number) {
  const tiltAmount = step * TILT_ANGLE;
  const leanFraction = Math.sin(toRadians(tiltAmount));
  return HALF_CARD_HEIGHT_RATIO * leanFraction;
}

/**
 * Calculates the `translateY` value of a card based on its distance from the center of the carousel and its direction (above or below).
 *
 * @param distance - The unsigned distance of the card from the center of the carousel.
 * @param direction - The direction of the card based on whether it is above or below the center of the carousel. A positive value represents a card below the center, while a negative value represents a card above the center.
 * @returns - How far to move the card from the center of the carousel, as a CSS `calc()` expression. The distance to move is expressed as a percentage of the card's own height plus a fixed gap for each card passed, and `direction` sets whether it moves up or down.
 */
function getTranslateY(distance: number, direction: number) {
  let heights = 0;

  /* leave the current card through its outer half (further away) and
     enter the next through its inner half (closer) */
  for (let step = 0; step < distance; step++) {
    const currentCardHalfHeight = getVisibleHeight(step) * HALF_CARD_HEIGHT_RATIO;
    const currentCardLean = getLeanAmount(step);
    const outerHalfMultiplier = PERSPECTIVE / (PERSPECTIVE + currentCardLean);

    const nextCardHalfHeight = getVisibleHeight(step + 1) * HALF_CARD_HEIGHT_RATIO;
    const nextCardLean = getLeanAmount(step + 1);
    const innerHalfMultiplier = PERSPECTIVE / (PERSPECTIVE - nextCardLean);

    heights +=
      currentCardHalfHeight * outerHalfMultiplier + nextCardHalfHeight * innerHalfMultiplier;
  }

  // how far the given card's center sits from the center card's center
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
