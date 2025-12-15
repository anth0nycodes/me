"use client";

import { DATA } from "@/data/me";
import Link from "next/link";
import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

export function EducationSection() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 50, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [hoveredEducation, setHoveredEducation] = useState<
    (typeof DATA.education)[number] | null
  >(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    cursorX.set(clientX);
    cursorY.set(clientY);
  };

  return (
    <section id="education" onMouseMove={handleMouseMove}>
      <div className="flex min-h-0 flex-col gap-5">
        <h2 className="text-2xl flex items-center gap-3 font-medium">
          <span>🎓</span> school lore
        </h2>
        <div className="flex flex-col gap-8">
          {DATA.education.map((education, id) => (
            <div
              key={education.school}
              onMouseEnter={() => setHoveredEducation(education)}
              onMouseLeave={() => setHoveredEducation(null)}
            >
              <EducationCard
                title={education.school}
                subtitle={education.degree}
                href={education.href}
                period={`${education.start} - ${education.end}`}
              />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <AnimatePresence>
          {hoveredEducation?.logoUrl && (
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
                  src={hoveredEducation.logoUrl}
                  alt={hoveredEducation.school}
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

interface EducationCardProps {
  title: string;
  subtitle?: string;
  href?: string;
  period: string;
}
export const EducationCard = ({
  title,
  subtitle,
  href,
  period,
}: EducationCardProps) => {
  return (
    <Link href={href || "#"} target="_blank" className="block cursor-pointer">
      <div>
        <div className="items-center flex-col hover:bg-accent rounded-lg p-2 duration-200">
          <div>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold mb-1 text-xl">
                {title}
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {period}
              </div>
            </div>
            {subtitle && (
              <div className="text-sm text-muted-foreground">{subtitle}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
