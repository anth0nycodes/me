import fs from "fs";
import path from "path";
import { ComponentType } from "react";

type ContentModule<T> = {
  default: ComponentType;
  metadata: T;
};

async function importContent<T>(folderName: string, slug: string): Promise<ContentModule<T>> {
  return import(`@/content/${folderName}/${slug}.mdx`);
}

export function getContentSlugs(directory: string) {
  return fs
    .readdirSync(directory)
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => path.basename(file, ".mdx"));
}

export async function getContentPosts<T>(folderName: string, directory: string) {
  const slugs = getContentSlugs(directory);
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
