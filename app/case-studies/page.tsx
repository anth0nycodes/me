import { Metadata } from "next";
import { CaseStudyCards } from "@/components/case-study/case-study-cards";
import { CASE_STUDIES } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Product design case studies: the problem, the research, and the decisions behind each.",
};

export default async function CaseStudiesPage() {
  return (
    <section
      data-case-studies
      className="flex flex-col gap-10 pt-14 lg:px-[5vw]"
    >
      <h1 className="font-heading text-[1.875rem] leading-tight tracking-[-0.01em] sm:text-[2.5rem]">
        Case studies
      </h1>
      <CaseStudyCards posts={CASE_STUDIES} />
    </section>
  );
}
