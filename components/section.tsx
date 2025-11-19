import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type Item = {
  title: string;
  href: string;
  role: string;
  period?: string;
  description: string;
};

type SectionListProps = {
  title: string;
  items: readonly Item[];
  viewAllHref?: string;
  viewAllText?: string;
};

export function SectionList({
  title,
  items,
  viewAllHref,
  viewAllText,
}: SectionListProps) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl flex items-center gap-3 font-medium font-monocraft text-white">
        <span className="text-primary">$</span> {title}
      </h2>
      <div className="flex flex-col gap-8">
        {items.map((item, index) => (
          <div key={index} className="group">
            <Link href={item.href} target="_blank">
              <h3 className="text-xl font-semibold mb-1 text-white group-hover:text-primary transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                {item.role} {item.period && `(${item.period})`}
              </p>
              <p className="text-gray-300">{item.description}</p>
            </Link>
          </div>
        ))}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 mt-6 text-accent hover:underline group"
        >
          {viewAllText}{" "}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      )}
    </section>
  );
}
