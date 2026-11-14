import fs from "fs";
import path from "path";
import { ComponentType } from "react";

interface BasePostMetadata {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  // case studies only: the details grid under the title
  timeline?: string;
  role?: string;
  team?: string;
  tools?: string;
  // the live product, shown as the last detail
  link?: { label: string; href: string };
  // case studies only: the full-width visual above the title. It fills a 5:2 box (object-cover), so
  // art made at 5:2, like 1400×560, shows uncropped
  hero?: {
    src: string;
    alt: string;
    // optional art for lg screens and up; `src` is used below that
    desktopSrc?: string;
    // the desktop art is a cutout on a transparent background: fit it whole, resting on the bottom
    // edge, over `background` instead of covering the box
    desktopCutout?: boolean;
    // fills the band beside the box on wide screens; match it to the image's left and right edges
    background?: string;
  };
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
