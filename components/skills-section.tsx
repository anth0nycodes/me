"use client";

import { DATA } from "@/data/me";
import Link from "next/link";
import { useWebHaptics } from "web-haptics/react";

export function SkillsSection() {
  const { trigger } = useWebHaptics();

  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-4">
        <h3 className="border-b pb-2 border-[#222222] text-base font-medium">
          <span>
            tech i&apos;ve used
            <sup className="ml-1.5 select-none text-muted-foreground text-xs">
              ({DATA.skills.length})
            </sup>
          </span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {DATA.skills.map((skill) => (
            <div
              className="py-1 px-2 border border-border rounded-md bg-card group hover:cursor-pointer hover:border-foreground/30 transition-colors"
              key={skill.name}
              onMouseEnter={() => trigger("selection")}
            >
              <Link
                href={skill.src}
                className="group-hover:text-primary text-xs duration-200"
                target="_blank"
                onClick={() => trigger("light")}
              >
                {skill.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
