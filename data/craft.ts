import { getContentPost, getContentPosts } from "./mdx";

export const CRAFT_FOLDER_NAME = "craft";

export const CRAFT_NOTES = await getContentPosts(CRAFT_FOLDER_NAME);

export async function getCraftNote(slug: string) {
  if (!CRAFT_NOTES.some((note) => note.slug === slug)) return;
  return getContentPost(CRAFT_FOLDER_NAME, slug);
}
