import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // Plugins are referenced by name (string form) so they work with Turbopack,
  // the default bundler in Next 16.
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      [
        "rehype-external-links",
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
      [
        "rehype-pretty-code",
        {
          theme: { light: "min-light", dark: "min-dark" },
          keepBackground: false,
        },
      ],
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
