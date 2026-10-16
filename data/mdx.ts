import fs from "fs";
import path from "path";
import { ComponentType } from "react";

interface BasePostMetadata {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
}

export interface BasePost {
  slug: string;
  metadata: BasePostMetadata;
}

interface ContentModule {
  default: ComponentType;
  metadata: BasePostMetadata;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

async function importContent(folderName: string, slug: string): Promise<ContentModule> {
  return import(`@/content/${folderName}/${slug}.mdx`);
}

function getContentSlugs(folderName: string) {
  return fs
    .readdirSync(path.join(CONTENT_DIR, folderName))
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => path.basename(file, ".mdx"));
}

export async function getContentPosts(folderName: string) {
  const slugs = getContentSlugs(folderName);
  const unsortedPostsPromise = Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await importContent(folderName, slug);
      return { slug, metadata };
    }),
  );
  const unsortedPosts = await unsortedPostsPromise;
  return unsortedPosts.sort(
    (a, b) => Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt),
  );
}

export async function getContentPost(folderName: string, slug: string) {
  const { default: Component, metadata } = await importContent(folderName, slug);
  return { Component, metadata };
}
