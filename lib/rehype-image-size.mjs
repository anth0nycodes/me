import { readFileSync } from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * Rehype plugin that reads each local markdown image from `public/` at build time and writes its real
 * width and height onto the `<img>`, so the browser can reserve the right space before the image loads.
 * Remote images and missing files are left untouched.
 *
 * Plain `.mjs` (not `.ts`) because @next/mdx imports plugins straight into Node at compile time.
 */
export default function rehypeImageSize() {
  return (tree) => {
    walk(tree);
  };
}

/**
 * Visits every node in the tree, sizing `<img>` elements along the way.
 *
 * @param node - A hast node; elements and roots carry `children`.
 */
function walk(node) {
  if (node.type === "element" && node.tagName === "img") setSize(node);
  node.children?.forEach(walk);
}

/**
 * @param node - An `<img>` element whose `src` is a root-relative path like `/thoughts/post/cover.png`.
 */
function setSize(node) {
  const src = node.properties?.src;
  if (typeof src !== "string" || !src.startsWith("/")) return;

  try {
    const { width, height } = imageSize(readFileSync(path.join(process.cwd(), "public", src)));
    node.properties.width = width;
    node.properties.height = height;
  } catch {
    // Missing or unreadable file: skip it and let the page render without dimensions.
  }
}
