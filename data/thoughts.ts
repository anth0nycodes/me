import { getContentPost, getContentPosts } from "./mdx";

const THOUGHTS_FOLDER_NAME = "thoughts";

export const THOUGHT_POSTS = await getContentPosts(THOUGHTS_FOLDER_NAME);

export async function getThoughtPost(slug: string) {
  if (!THOUGHT_POSTS.some((post) => post.slug === slug)) return;
  return getContentPost(THOUGHTS_FOLDER_NAME, slug);
}
