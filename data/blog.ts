import fs from "fs";
import path from "path";

export interface PostMetadata {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function getMDXSlugs() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => path.basename(file, ".mdx"));
}

export async function getBlogPosts() {
  const slugs = getMDXSlugs();
  return Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = (await import(`@/content/${slug}.mdx`)) as {
        metadata: PostMetadata;
      };
      return { slug, metadata };
    }),
  );
}
