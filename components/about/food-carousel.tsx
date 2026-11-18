"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MediaControlButton } from "@/components/ui/media-control-button";
import { ImageLightbox } from "@/components/ui/zoomable-image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

interface FoodPhoto {
  // path without an extension: a .webp is served with a .jpg fallback
  src: string;
  alt: string;
  width: number;
  height: number;
}

const PHOTOS: FoodPhoto[] = [
  {
    src: "/about/food1",
    alt: "A wrap cut in half on a plate, with an iced coffee and a lemonade by a window",
    width: 960,
    height: 720,
  },
  {
    src: "/about/food2",
    alt: "Frozen yogurt topped with kiwi, strawberries, sprinkles and white chocolate chips",
    width: 540,
    height: 720,
  },
  {
    src: "/about/food3",
    alt: "A matcha and vanilla swirl soft serve in a waffle cone",
    width: 405,
    height: 720,
  },
  {
    src: "/about/food4",
    alt: "A poke bowl with salmon, tuna, avocado and fried shallots",
    width: 405,
    height: 720,
  },
  {
    src: "/about/food5",
    alt: "Hainanese chicken rice and nasi lemak with curry, next to a mojito and a Thai iced tea",
    width: 960,
    height: 720,
  },
  {
    src: "/about/food6",
    alt: "A red curry with chicken and Thai basil, a bowl of rice, and a green mango salad with fish",
    width: 540,
    height: 720,
  },
  {
    src: "/about/food7",
    alt: "Two iced drinks topped with lychee and mint, one cloudy white and one purple, by a window lined with plants",
    width: 453,
    height: 720,
  },
  {
    src: "/about/food8",
    alt: "French onion soup with a browned cheese crust, on a plate beside a carafe of water",
    width: 540,
    height: 720,
  },
  {
    src: "/about/food9",
    alt: "An iced matcha latte over red bean and a strawberry milk tea, both from Tea Makers",
    width: 540,
    height: 720,
  },
  {
    src: "/about/food10",
    alt: "Two bowls of teriyaki salmon over rice with sesame seeds, a side salad and a green drink",
    width: 540,
    height: 720,
  },
];

// how far a mouse has to move before a press becomes a drag, so a slightly shaky click still clicks
const DRAG_THRESHOLD = 4;
// how far ahead (ms) the release velocity carries the row before it picks a photo to settle on
const FLING_PROJECTION = 150;

interface DragState {
  pointerId: number;
  startX: number;
  startScroll: number;
  dragging: boolean;
  // recent scroll positions, to read the release velocity from
  samples: { time: number; scroll: number }[];
}

/**
 * A row of food photos that scrolls sideways and snaps to each one. Native scrolling does the work,
 * so trackpads, touch and the keyboard (once the row is focused) all behave as people expect; the
 * arrow buttons page through it for mouse users and grey out at either end. A mouse can also hold
 * and drag the row, which then settles on the nearest photo in the direction it was flung.
 */
export function FoodCarousel({
  heading,
  labelledBy,
}: {
  // the section's heading, set on the same row as the arrows
  heading: ReactNode;
  labelledBy: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  // where there's a mouse, a photo opens larger in the same lightbox as the case study images
  const canZoom = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  // the photo the open lightbox grows out of and shrinks back into
  const originRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function update() {
      if (!track) return;
      setEdges({
        atStart: track.scrollLeft <= 1,
        atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 1,
      });
    }
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const dragRef = useRef<DragState | null>(null);
  // set once a press turns into a drag, so the click that ends it doesn't open a photo
  const suppressClickRef = useRef(false);
  const restoreSnapRef = useRef<(() => void) | null>(null);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = event.currentTarget;
    // grabbing the row mid-settle takes over from it
    restoreSnapRef.current?.();
    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      dragging: false,
      samples: [{ time: event.timeStamp, scroll: track.scrollLeft }],
    };
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    const track = event.currentTarget;
    const dx = event.clientX - drag.startX;
    if (!drag.dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      drag.dragging = true;
      suppressClickRef.current = true;
      track.setPointerCapture(event.pointerId);
      // snapping would fight the row following the mouse, so it waits until the drag settles
      track.style.scrollSnapType = "none";
      track.dataset.dragging = "";
    }
    track.scrollLeft = drag.startScroll - dx;
    drag.samples.push({ time: event.timeStamp, scroll: track.scrollLeft });
    // only the last ~100ms matter for the release velocity
    while (
      drag.samples.length > 2 &&
      event.timeStamp - drag.samples[0].time > 100
    ) {
      drag.samples.shift();
    }
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    dragRef.current = null;
    if (!drag.dragging) return;
    const track = event.currentTarget;
    delete track.dataset.dragging;

    const first = drag.samples[0];
    const elapsed = event.timeStamp - first.time;
    const velocity =
      elapsed > 0 ? (track.scrollLeft - first.scroll) / elapsed : 0;
    const projected = track.scrollLeft + velocity * FLING_PROJECTION;

    // settle on the photo whose left edge is nearest where the fling would carry the row
    const trackLeft = track.getBoundingClientRect().left;
    const maxScroll = track.scrollWidth - track.clientWidth;
    let target = track.scrollLeft;
    let best = Infinity;
    for (const child of track.children) {
      const snap = Math.min(
        maxScroll,
        Math.max(
          0,
          track.scrollLeft + child.getBoundingClientRect().left - trackLeft
        )
      );
      if (Math.abs(snap - projected) < best) {
        best = Math.abs(snap - projected);
        target = snap;
      }
    }

    let timeout = 0;
    function restore() {
      track.removeEventListener("scrollend", restore);
      window.clearTimeout(timeout);
      track.style.scrollSnapType = "";
      restoreSnapRef.current = null;
    }
    restoreSnapRef.current = restore;
    track.scrollTo({
      left: target,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    // snap comes back once the row has landed on a photo, so it doesn't jump there. The timeout
    // covers browsers without scrollend, and a scroll that was already in place
    track.addEventListener("scrollend", restore);
    timeout = window.setTimeout(restore, 700);
  }

  function page(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    // most of a screen at a time, so the photo at the edge stays in view as an anchor
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        {heading}
        <div className="flex gap-1.5">
          <MediaControlButton
            label="Previous photos"
            onClick={() => page(-1)}
            disabled={edges.atStart}
          >
            <ChevronLeft aria-hidden />
          </MediaControlButton>
          <MediaControlButton
            label="Next photos"
            onClick={() => page(1)}
            disabled={edges.atEnd}
          >
            <ChevronRight aria-hidden />
          </MediaControlButton>
        </div>
      </div>
      {/* edge fades: photos soften into the page instead of being cut off. The start one shows
          once you have scrolled, the end one hides once you reach the end */}
      <div className="relative">
        <div
          ref={trackRef}
          role="region"
          aria-labelledby={labelledBy}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={(event) => {
            if (!suppressClickRef.current) return;
            suppressClickRef.current = false;
            event.preventDefault();
            event.stopPropagation();
          }}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain rounded-xl outline-none select-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-(--focus-ring) data-dragging:cursor-grabbing data-dragging:*:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          {PHOTOS.map(({ src, alt, width, height }, index) => {
            const picture = (
              <picture>
                <source srcSet={`${src}.webp`} type="image/webp" />
                <img
                  ref={(element) => {
                    imageRefs.current[index] = element;
                  }}
                  src={`${src}.jpg`}
                  alt={alt}
                  width={width}
                  height={height}
                  loading="lazy"
                  draggable={false}
                  className="ring-border block h-64 w-auto rounded-xl ring-1 sm:h-80"
                />
              </picture>
            );
            return canZoom ? (
              <button
                key={src}
                type="button"
                aria-label={`View larger: ${alt}`}
                aria-haspopup="dialog"
                // a press doesn't move focus. Safari would otherwise focus the row (it never focuses
                // a clicked button), and closing the lightbox hands focus back there, ringing the row
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  originRef.current = imageRefs.current[index];
                  setOpenIndex(index);
                }}
                className="shrink-0 cursor-zoom-in snap-start rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
              >
                {picture}
              </button>
            ) : (
              <div key={src} className="shrink-0 snap-start">
                {picture}
              </div>
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className={cn(
            "from-background pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r to-transparent [mask-image:linear-gradient(to_right,black,transparent)] backdrop-blur-[2px] transition-opacity duration-200 ease-out motion-reduce:transition-none sm:w-24",
            edges.atStart ? "opacity-0" : "opacity-100"
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "from-background pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l to-transparent [mask-image:linear-gradient(to_left,black,transparent)] backdrop-blur-[2px] transition-opacity duration-200 ease-out motion-reduce:transition-none sm:w-24",
            edges.atEnd ? "opacity-0" : "opacity-100"
          )}
        />
      </div>
      {openIndex !== null &&
        createPortal(
          <ImageLightbox
            src={`${PHOTOS[openIndex].src}.webp`}
            alt={PHOTOS[openIndex].alt}
            width={PHOTOS[openIndex].width}
            height={PHOTOS[openIndex].height}
            originRef={originRef}
            onClosed={() => setOpenIndex(null)}
          />,
          document.body
        )}
    </div>
  );
}
