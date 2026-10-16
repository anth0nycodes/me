import { Metadata } from "next";
import { PostLink } from "@/components/post-link";
import { CASE_STUDIES, CASE_STUDIES_FOLDER_NAME } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "My case studies on stuff I've made or contributed to.",
};

export default async function CaseStudiesPage() {
  return (
    <section data-case-studies className="flex flex-col gap-4">
      <h1 className="text-muted-foreground dark:text-foreground border-separator border-b pb-2 text-base font-medium lowercase">
        <span>
          my case studies
          <sup className="text-muted-foreground ml-1.5 text-xs select-none">
            ({CASE_STUDIES.length})
          </sup>
        </span>
      </h1>
      <div className="group flex flex-col">
        {CASE_STUDIES.map((post) => (
          <PostLink key={post.slug} folderName={CASE_STUDIES_FOLDER_NAME} post={post} />
        ))}
      </div>
    </section>
  );
}
