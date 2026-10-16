import path from "path";
import { getContentPost, getContentPosts } from "./mdx";

export interface ThoughtPostMetadata {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
}

export interface ThoughtPost {
  slug: string;
  metadata: ThoughtPostMetadata;
}

const THOUGHTS_FOLDER_NAME = "thoughts";
const THOUGHTS_CONTENT_DIR = path.join(process.cwd(), "content", THOUGHTS_FOLDER_NAME);

export const THOUGHT_POSTS = (
  await getContentPosts<ThoughtPostMetadata>(THOUGHTS_FOLDER_NAME, THOUGHTS_CONTENT_DIR)
).sort((a, b) => Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt));

export async function getThoughtPost(slug: string) {
  if (!THOUGHT_POSTS.some((post) => post.slug === slug)) return;
  return getContentPost<ThoughtPostMetadata>(THOUGHTS_FOLDER_NAME, slug);
}
