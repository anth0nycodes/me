import { DATA } from "@/data/me";
import Link from "next/link";

export function EducationSection() {
  return (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-5">
        <h2 className="text-2xl flex items-center gap-3 font-medium font-minecraft text-white">
          <span className="text-primary">$</span> school lore
        </h2>
        <div className="flex flex-col gap-8">
          {DATA.education.map((education, id) => (
            <EducationCard
              key={education.school}
              title={education.school}
              subtitle={education.degree}
              href={education.href}
              period={`${education.start} - ${education.end}`}
            />
          ))}
        </div>
      </div>
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
        <div className="items-center flex-col group">
          <div>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex group-hover:text-primary duration-200 items-center justify-center font-semibold mb-1 text-xl">
                {title}
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {period}
              </div>
            </div>
            {subtitle && (
              <div className="text-sm text-gray-400">{subtitle}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
