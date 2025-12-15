"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

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
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 50, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [displayedItem, setDisplayedItem] = useState<Item | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    cursorX.set(clientX);
    cursorY.set(clientY);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedItem(hoveredItem);
    }, 200);

    return () => clearTimeout(timeout);
  }, [hoveredItem]);

  return (
    <section className="flex flex-col gap-5" onMouseMove={handleMouseMove}>
      <h2 className="text-2xl flex items-center gap-3 font-medium">
        <span>{emoji}</span>
        {title}
      </h2>
      <div className="flex flex-col gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="hover:bg-accent rounded-lg p-2 duration-200"
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link href={item.href} target="_blank">
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-sm mb-2">
                {item.role} {item.period && `(${item.period})`}
              </p>
              <p className="">{item.description}</p>
            </Link>
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

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <AnimatePresence>
          {displayedItem?.image && (
            <motion.div
              className="relative -translate-x-1/2 -translate-y-1/2"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              <div className="size-full max-w-sm rounded-lg overflow-hidden shadow-2xl border border-white/20">
                <img
                  src={displayedItem.image}
                  alt={displayedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
