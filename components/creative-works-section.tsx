"use client";

import { DATA } from "@/data/me";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

export function CreativeWorksSection() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 50, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [hoveredWork, setHoveredWork] = useState<
    (typeof DATA.works)[number] | null
  >(null);
  const [displayedWork, setDisplayedWork] = useState<
    (typeof DATA.works)[number] | null
  >(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    cursorX.set(clientX);
    cursorY.set(clientY);
  };

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedWork(hoveredWork);
    }, 200);

    return () => clearTimeout(timeout);
  }, [hoveredWork]);

  return (
    <section id="creative-works" onMouseMove={handleMouseMove}>
      <div className="flex min-h-0 flex-col gap-5">
        <h2 className="text-2xl flex items-center gap-3 font-medium">
          <span>🎬</span> creative works
        </h2>
        <div className="flex flex-col gap-8">
          {DATA.works.map((work) => (
            <div
              key={work.title}
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
            </div>
          ))}
        </div>
      </div>
      {!prefersReducedMotion && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          <AnimatePresence>
            {displayedWork?.thumbnailUrl && (
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
                    src={displayedWork.thumbnailUrl}
                    alt={displayedWork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
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
