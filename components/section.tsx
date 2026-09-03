"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useWebHaptics } from "web-haptics/react";
import { useSound } from "use-sound";
import { cn } from "@/lib/utils";

export type Item = {
  title: string;
  href: string;
  description: string;
  image: string;
  role?: string;
  period?: string;
  status?: string;
};

type SectionListProps = {
  sectionTitle: string;
  items: readonly Item[];
  itemsCount?: number;
  viewAllHref?: string;
  viewAllText?: string;
};

export function determineStatusColor(status: string) {
  if (status.toLowerCase() === "in development") {
    return "border bg-yellow-500/15 border-yellow-600 text-yellow-600/80";
  }

  return "border bg-green-800/15 border-green-600 text-green-600/80";
}

function SectionCards({ items }: { items: readonly Item[] }) {
  const { trigger } = useWebHaptics();
  const [playHoverSFX] = useSound("/audio/hover.mp3", {
    volume: 0.125,
  });
  const prefersReducedMotion = useReducedMotion();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const lastIndexRef = useRef(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const activeIndex = hoveredIndex ?? lastIndexRef.current;
  const activeItem = items[activeIndex];

  // vertically center the preview on the hovered card
  const activeCard = cardRefs.current[activeIndex];
  const panelTop = activeCard
    ? activeCard.offsetTop + activeCard.offsetHeight / 2
    : 0;

  const settled = { top: panelTop, y: "-50%" };

  return (
    <div className="group relative flex flex-col">
      {items.map((item, index) => (
        <div
          key={item.title}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className="group-hover:opacity-40 hover:opacity-100 hover:cursor-pointer relative rounded-sm py-3"
          onMouseEnter={() => {
            lastIndexRef.current = index;
            setHoveredIndex(index);
            trigger("selection");
            playHoverSFX();
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link
            href={item.href}
            target="_blank"
            onClick={() => trigger("light")}
          >
            <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
            <p className="text-[13px] mb-2">
              {item.role} {item.period && `(${item.period})`}
            </p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </Link>
          {item.status && (
            <span
              className={cn(
                "absolute pointer-events-none top-3 right-3 px-2 py-1 text-[11px] rounded-md",
                determineStatusColor(item.status),
              )}
            >
              {item.status}
            </span>
          )}
        </div>
      ))}

      <AnimatePresence>
        {hoveredIndex !== null && activeItem && (
          <motion.div
            className="absolute -right-3 2xl:left-auto 2xl:translate-x-[105%] pointer-events-none z-50 hidden md:block"
            initial={{ opacity: 0, ...settled }}
            animate={{ opacity: 1, ...settled }}
            exit={{ opacity: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    top: { type: "spring", stiffness: 500, damping: 45 },
                    opacity: { duration: 0.1 },
                  }
            }
          >
            <div className="relative md:w-xs 2xl:w-sm overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-2xl backdrop-blur-sm">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="h-auto w-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SectionList({
  sectionTitle,
  items,
  itemsCount,
  viewAllHref,
  viewAllText,
}: SectionListProps) {
  const { trigger } = useWebHaptics();
  const [playHoverSFX] = useSound("/audio/hover.mp3", { volume: 0.125 });

  return (
    <section className="flex flex-col gap-2">
      <div className="border-b pb-2 border-[#222222] flex justify-between">
        <h3 className="font-medium">
          {sectionTitle}
          <sup className="ml-1.5 select-none text-muted-foreground text-xs">
            ({itemsCount ? itemsCount : items.length})
          </sup>
        </h3>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            onMouseEnter={() => playHoverSFX()}
            onClick={() => trigger("light")}
            className="text-sm text-[#8fb7b7] inline-flex items-center gap-1 font-medium hover:underline group"
          >
            {viewAllText}{" "}
            <ArrowUpRight className="size-4 text-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        )}
      </div>
      <SectionCards items={items} />
    </section>
  );
}
