import { DATA } from "@/data/me";
import Link from "next/link";

export function SkillsSection() {
  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-5">
        <h2 className="text-2xl flex items-center gap-3 font-medium">
          <span>🛠️</span> tech i&apos;ve used
        </h2>
        <div className="flex flex-wrap gap-3">
          {DATA.skills.map((skill) => (
            <div
              className="p-2 border border-border rounded-md bg-card group hover:cursor-pointer hover:border-foreground/30 transition-colors"
              key={skill.name}
            >
              <Link
                href={skill.src}
                className="group-hover:text-primary text-sm duration-200"
                target="_blank"
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
