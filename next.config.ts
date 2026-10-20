import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.5", "192.168.1.9"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactCompiler: true,
  images: {
    // Serve AVIF when the browser supports it, WebP otherwise.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // Plugins are referenced by name (string form) so they work with Turbopack,
  // the default bundler in Next 16.
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      // Local plugin, so it needs an absolute path: @next/mdx resolves strings from each .mdx file's folder.
      path.join(process.cwd(), "lib/rehype-image-size.mjs"),
      [
        "rehype-pretty-code",
        {
          theme: { light: "min-light", dark: "min-dark" },
        },
      ],
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
