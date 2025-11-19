import { DATA } from "@/data/me";
import Link from "next/link";

export function SkillsSection() {
  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-5">
        <h2 className="text-2xl flex items-center gap-3 font-medium font-minecraft text-white">
          <span className="text-primary">$</span> tech I&apos;ve worked with
        </h2>
        <div className="flex flex-wrap gap-3">
          {DATA.skills.map((skill) => (
            <div
              className="p-2 border group hover:cursor-pointer"
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
