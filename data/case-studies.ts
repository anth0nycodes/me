import { getContentPost, getContentPosts } from "./mdx";

const CASE_STUDIES_FOLDER_NAME = "case-studies";

export const CASE_STUDIES = await getContentPosts(CASE_STUDIES_FOLDER_NAME);

export function getCaseStudy(slug: string) {
  if (!CASE_STUDIES.some((post) => post.slug === slug)) return;
  return getContentPost(CASE_STUDIES_FOLDER_NAME, slug);
}
