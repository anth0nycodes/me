"use client";

import { DATA } from "@/data/me";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export function CreativeWorksSection() {
  const springConfig = { damping: 50, stiffness: 300, mass: 0.5 };

  const [hoveredWork, setHoveredWork] = useState<
    (typeof DATA.works)[number] | null
  >(null);
  const [displayedWork, setDisplayedWork] = useState<
    (typeof DATA.works)[number] | null
  >(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedWork(hoveredWork);
    }, 100);

    return () => clearTimeout(timeout);
  }, [hoveredWork]);

  return (
    <section id="creative-works">
      <div className="flex min-h-0 flex-col gap-5">
        <h2 className="text-2xl flex items-center gap-3 font-medium">
          <span>🎬</span> creative works
        </h2>
        <div className="flex flex-col gap-8">
          {DATA.works.map((work) => (
            <div
              key={work.title}
              className="relative"
              onMouseEnter={() =>
                setHoveredWork(prefersReducedMotion ? null : work)
              }
              onMouseLeave={() => setHoveredWork(null)}
            >
              <CreativeWorkCard
                title={work.title}
                description={work.description}
                href={work.href}
              />
              {displayedWork?.title === work.title &&
                displayedWork?.thumbnailUrl && (
                  <div className="absolute right-0 top-full mt-2 2xl:left-auto 2xl:right-0 2xl:top-0 2xl:mt-0 2xl:-translate-y-1/4 2xl:translate-x-[105%] pointer-events-none z-50 hidden md:block">
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotate: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", ...springConfig }}
                        className="relative 2xl:rotate-0"
                      >
                        <div className="relative md:w-xs 2xl:w-sm rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 backdrop-blur-sm">
                          <img
                            src={displayedWork.thumbnailUrl}
                            alt={displayedWork.title}
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
      </div>
    </section>
  );
}

interface CreativeWorkCardProps {
  title: string;
  description?: string;
  href?: string;
}

export const CreativeWorkCard = ({
  title,
  description,
  href,
}: CreativeWorkCardProps) => {
  return (
    <Link href={href || "#"} target="_blank" className="block cursor-pointer">
      <div>
        <div className="items-center flex-col hover:bg-accent rounded-lg p-2 duration-200">
          <div>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold mb-1 text-xl">
                {title}
              </h3>
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
