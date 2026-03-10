"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export type Item = {
  title: string;
  href: string;
  role: string;
  period?: string;
  description: string;
  image?: string;
};

type SectionListProps = {
  title: string;
  emoji: string;
  items: readonly Item[];
  viewAllHref?: string;
  viewAllText?: string;
};

export function SectionList({
  title,
  emoji,
  items,
  viewAllHref,
  viewAllText,
}: SectionListProps) {
  const springConfig = { damping: 50, stiffness: 300, mass: 0.5 };
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [displayedItem, setDisplayedItem] = useState<Item | null>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedItem(hoveredItem);
    }, 50);

    return () => clearTimeout(timeout);
  }, [hoveredItem]);

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl flex items-center gap-3 font-medium">
        <span>{emoji}</span>
        {title}
      </h2>
      <div className="flex flex-col gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="hover:bg-accent hover:cursor-pointer relative rounded-lg p-2 duration-200"
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link href={item.href} target="_blank">
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-sm mb-2">
                {item.role} {item.period && `(${item.period})`}
              </p>
              <p>{item.description}</p>
            </Link>
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
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 mt-6 text-foreground hover:underline group"
        >
          {viewAllText}{" "}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      )}
    </section>
  );
}
