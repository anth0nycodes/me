"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useWebHaptics } from "web-haptics/react";
import { useSound } from "use-sound";
import { cn } from "@/lib/utils";

export type Item = {
  title: string;
  href: string;
  role: string;
  period?: string;
  description: string;
  status?: string;
  image?: string;
};

type SectionListProps = {
  title: string;
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

export function SectionList({
  title,
  items,
  itemsCount,
  viewAllHref,
  viewAllText,
}: SectionListProps) {
  const springConfig = { damping: 50, stiffness: 300, mass: 0.5 };
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [displayedItem, setDisplayedItem] = useState<Item | null>(null);
  const { trigger } = useWebHaptics();
  const [playHoverSFX] = useSound("/audio/hover.mp3", { volume: 0.125 });

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedItem(hoveredItem);
    }, 50);

    return () => clearTimeout(timeout);
  }, [hoveredItem]);

  return (
    <section className="flex flex-col gap-2">
      <div className="border-b pb-2 border-[#222222] flex justify-between">
        <h3 className="font-medium">
          {title}
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
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="hover:bg-accent hover:cursor-pointer relative rounded-sm p-3 -mx-3 duration-150"
            onMouseEnter={() => {
              setHoveredItem(item);
              trigger("selection");
            }}
            onMouseLeave={() => setHoveredItem(null)}
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
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </Link>
            {item.status && (
              <span
                className={cn(
                  "absolute top-3 right-3 px-2 py-1 text-[11px] rounded-md",
                  determineStatusColor(item.status),
                )}
              >
                {item.status}
              </span>
            )}
            {displayedItem?.title === item.title && displayedItem?.image && (
              <div className="absolute right-0 top-full mt-2 2xl:left-auto 2xl:top-0 2xl:mt-0 2xl:-translate-y-1/4 2xl:translate-x-[105%] pointer-events-none z-50 hidden md:block">
                <AnimatePresence>
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? {}
                        : { opacity: 0, scale: 0.9, y: 10 }
                    }
                    animate={
                      prefersReducedMotion
                        ? {}
                        : { opacity: 1, scale: 1, y: 0, rotate: 1 }
                    }
                    exit={
                      prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }
                    }
                    transition={
                      prefersReducedMotion
                        ? {}
                        : { type: "spring", ...springConfig }
                    }
                    className="relative 2xl:rotate-0"
                  >
                    <div className="relative md:w-xs 2xl:w-sm rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 backdrop-blur-sm">
                      <img
                        src={displayedItem.image}
                        alt={displayedItem.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
