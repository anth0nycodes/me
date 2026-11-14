"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { CaseStudyHeading } from "@/data/case-studies";
import { cn } from "@/lib/utils";

// a section counts as the one being read once its heading passes this far down the viewport
const ACTIVE_LINE_RATIO = 0.35;

interface CaseStudyTocProps {
  headings: CaseStudyHeading[];
  // the title and details block; the list shows once it has scrolled off the top
  triggerId: string;
}

export function CaseStudyToc({ headings, triggerId }: CaseStudyTocProps) {
  const [isShown, setIsShown] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const previousIndexRef = useRef(-1);

  // show the list only after the title and details are gone, so it doesn't repeat them
  useEffect(() => {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsShown(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(trigger);

    return () => observer.disconnect();
  }, [triggerId]);

  // the active section is the last heading above the active line; at the very bottom it's the last
  // one, since a short final section may never reach the line
  useEffect(() => {
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((element) => element !== null);
    let frame = 0;

    function update() {
      frame = 0;
      const { innerHeight, scrollY } = window;
      const isAtBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      let index = -1;
      if (isAtBottom) {
        index = elements.length - 1;
      } else {
        const line = innerHeight * ACTIVE_LINE_RATIO;
        elements.forEach((element, i) => {
          if (element.getBoundingClientRect().top <= line) index = i;
        });
      }
      setActiveIndex(index);
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [headings]);

  // slide the marker to the active item. Written straight to the DOM so moving it doesn't re-render.
  // The first time a section becomes active it appears in place instead of sliding in from the top.
  useLayoutEffect(() => {
    const indicator = indicatorRef.current;
    const item = itemRefs.current[activeIndex];
    if (!indicator || !item) return;

    // center on the first line, so it stays put when a long title wraps to two
    const link = item.firstElementChild ?? item;
    const y = item.offsetTop + parseFloat(getComputedStyle(link).lineHeight) / 2;
    if (previousIndexRef.current === -1) {
      indicator.style.transition = "none";
      indicator.style.transform = `translateY(${y}px)`;
      // read layout so the jump commits before the transition comes back
      void indicator.offsetHeight;
      indicator.style.transition = "";
    } else {
      indicator.style.transform = `translateY(${y}px)`;
    }
    previousIndexRef.current = activeIndex;
  }, [activeIndex]);

  if (headings.length === 0) return null;

  // tabbing into the list reveals it too, so a link is never focused while invisible
  const isVisible = isShown || hasFocus;

  return (
    <nav
      aria-label="Sections of this case study"
      onFocus={() => setHasFocus(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
      }}
      className="relative"
    >
      {/* marker for the active section, sitting in the gutter left of the links */}
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className={cn(
          "bg-foreground absolute top-0 -left-4 h-px w-2 -translate-y-1/2 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
          isVisible && activeIndex !== -1 ? "opacity-100" : "opacity-0",
        )}
      />
      <ul className="flex flex-col gap-2">
        {headings.map(({ id, text }, i) => (
          <li
            key={id}
            ref={(element) => {
              itemRefs.current[i] = element;
            }}
            style={{ "--i": i } as CSSProperties}
            // hidden: out at once. shown: each item eases in a beat after the one above it
            className={cn(
              "transition-[opacity,translate]",
              isVisible
                ? "translate-x-0 opacity-100 delay-[calc(var(--i)*35ms)] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                : "pointer-events-none opacity-0 duration-150 ease-out motion-safe:-translate-x-1",
            )}
          >
            <a
              href={`#${id}`}
              aria-current={i === activeIndex ? "true" : undefined}
              className="text-muted-foreground hover:text-foreground aria-[current=true]:text-foreground block text-sm transition-colors duration-150"
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
