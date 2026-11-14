import { CaseStudyCards } from "@/components/case-study/case-study-cards";
import { CASE_STUDIES } from "@/data/case-studies";
import { DATA } from "@/data/me";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 pt-14 lg:px-[5vw]">
      <section className="flex max-w-[52.5rem] flex-col gap-5">
        <h1 className="font-heading text-[1.875rem] leading-tight tracking-[-0.01em] text-balance sm:text-[2.5rem]">
          {DATA.name.split(" ")[0]} is a product designer in NYC, designing
          interfaces that feel as good as they look.
        </h1>
        <p className="text-muted-foreground max-w-[40rem] leading-relaxed">
          Previously, I interned at Magic Hour and Deep24. On the side, I made
          Tracemark, a Chrome extension for marking up any website.
        </p>
      </section>
      <section
        aria-labelledby="case-studies-heading"
        className="flex flex-col gap-6"
      >
        <h2 id="case-studies-heading" className="text-sm">
          — Case studies
        </h2>
        <CaseStudyCards posts={CASE_STUDIES} />
      </section>
    </div>
  );
}
