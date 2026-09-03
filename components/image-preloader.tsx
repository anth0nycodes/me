import fs from "node:fs";
import path from "node:path";

// Preload every image up front so hover previews and blog images
// appear instantly instead of loading on demand.
//
// Runs at render time on the server and walks `public/` for image files,
// so new images are preloaded automatically.

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".svg",
]);

// Directories under `public/` to skip (non-images, or not worth preloading).
const IGNORED_DIRS = new Set(["audio"]);

function collectImages(dir: string, publicRoot: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const images: string[] = [];

  for (const entry of entries) {
    // ignore .DS_STORE
    if (entry.name.startsWith(".")) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      images.push(...collectImages(fullPath, publicRoot));
      continue;
    }

    if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      // Turn absolute path into a public URL: `/posters/recall.png`
      const url =
        "/" + path.relative(publicRoot, fullPath).split(path.sep).join("/");
      images.push(url);
    }
  }

  return images;
}

export function ImagePreloader() {
  const publicRoot = path.join(process.cwd(), "public");
  const images = collectImages(publicRoot, publicRoot);

  return (
    <>
      {images.map((href) => (
        <link key={href} rel="preload" as="image" href={href} />
      ))}
    </>
  );
}
