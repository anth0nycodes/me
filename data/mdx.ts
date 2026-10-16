import fs from "fs";
import path from "path";
import { ComponentType } from "react";

type ContentModule<T> = {
  default: ComponentType;
  metadata: T;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

async function importContent<T>(folderName: string, slug: string): Promise<ContentModule<T>> {
  return import(`@/content/${folderName}/${slug}.mdx`);
}

function getContentSlugs(folderName: string) {
  return fs
    .readdirSync(path.join(CONTENT_DIR, folderName))
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => path.basename(file, ".mdx"));
}

export async function getContentPosts<T>(folderName: string) {
  const slugs = getContentSlugs(folderName);
  return Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await importContent<T>(folderName, slug);
      return { slug, metadata };
    }),
  );
}

export async function getContentPost<T>(folderName: string, slug: string) {
  const { default: Component, metadata } = await importContent<T>(folderName, slug);
  return { Component, metadata };
}
