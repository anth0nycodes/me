"use client";

import { DATA } from "@/data/me";
import Link from "next/link";
import { useWebHaptics } from "web-haptics/react";

export function SkillsSection() {
  const { trigger } = useWebHaptics();

  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-5">
        <h2 className="text-2xl flex items-center gap-3 font-display font-semibold tracking-tight">
          <span>🛠️</span> tools & tech
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {DATA.skills.map((skill) => (
            <div
              className="px-3 py-1.5 border border-border rounded-md bg-card group hover:cursor-pointer hover:border-glow/50 hover:shadow-[0_0_12px_rgba(34,197,94,0.15)] transition-all duration-200"
              key={skill.name}
              onMouseEnter={() => trigger("selection")}
            >
              <Link
                href={skill.src}
                className="group-hover:text-glow font-mono text-xs duration-200"
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
