import type { ImageProps } from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code-block";
import { ZoomableImage } from "@/components/ui/zoomable-image";
import { getText, slugify } from "@/lib/slugify";

const components: MDXComponents = {
  pre: (props) => <CodeBlock {...props} />,
  a: (props) => <a target="_blank" rel="noopener noreferrer" className="text-bold" {...props} />,
  // section headings set in the serif, linked to themselves so a section can be shared by URL
  h2: ({ children, ...props }) => {
    const id = slugify(getText(children));
    return (
      <h2
        id={id}
        {...props}
        className="not-prose font-heading text-foreground mt-14 mb-3 scroll-mt-28 text-[2rem] leading-tight font-normal tracking-[-0.01em] first:mt-0"
      >
        <Link href={`#${id}`} className="hover:text-muted-foreground transition-colors">
          {children}
        </Link>
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = slugify(getText(children));
    return (
      <h3
        id={id}
        {...props}
        className="not-prose font-heading text-foreground mt-10 mb-2 scroll-mt-28 text-[1.5rem] leading-snug font-normal"
      >
        <Link href={`#${id}`} className="hover:text-muted-foreground transition-colors">
          {children}
        </Link>
      </h3>
    );
  },
  // width and height come from lib/rehype-image-size.mjs, read off the file at build time, so the
  // browser reserves the right aspect ratio before the image loads. 0 is the fallback for remote images.
  img: ({ width, height, ...props }) => {
    const src = typeof props.src === "string" ? props.src : "";
    return (
      <ZoomableImage
        {...(props as ImageProps)}
        alt={props.alt ?? ""}
        width={Number(width ?? 0)}
        height={Number(height ?? 0)}
        className="ring-muted h-auto w-full rounded-lg ring-2 first:my-4 dark:ring-0"
        sizes="(max-width: 1024px) 100vw, 80vw"
        draggable={false}
        // GIFs must skip optimization or next/image freezes them on one frame.
        unoptimized={src.endsWith(".gif")}
      />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
