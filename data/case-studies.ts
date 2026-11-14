import fs from "fs";
import path from "path";
import { slugify, stripInlineMarkdown } from "@/lib/slugify";
import { getContentPost, getContentPosts } from "./mdx";

export const CASE_STUDIES_FOLDER_NAME = "case-studies";

export const CASE_STUDIES = await getContentPosts(CASE_STUDIES_FOLDER_NAME);

export function getCaseStudy(slug: string) {
  if (!CASE_STUDIES.some((post) => post.slug === slug)) return;
  return getContentPost(CASE_STUDIES_FOLDER_NAME, slug);
}

export interface CaseStudyHeading {
  id: string;
  text: string;
}

/**
 * Lists a case study's top-level sections (its `##` headings) for the table of contents. The ids
 * match the ones the MDX `h2` component gives each heading, since both run the same slugify.
 *
 * @param slug - The case study's file name, without `.mdx`.
 * @returns Each section's id and text, in page order.
 */
export function getCaseStudyHeadings(slug: string): CaseStudyHeading[] {
  const source = fs.readFileSync(
    path.join(process.cwd(), "content", CASE_STUDIES_FOLDER_NAME, `${slug}.mdx`),
    "utf8",
  );
  // a "## " inside a code block is code, not a heading
  const withoutCode = source.replace(/```[\s\S]*?```/g, "");
  return [...withoutCode.matchAll(/^## (.+)$/gm)].map(([, raw]) => {
    const text = stripInlineMarkdown(raw);
    return { id: slugify(text), text };
  });
}
