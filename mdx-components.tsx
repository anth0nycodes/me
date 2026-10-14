import { isValidElement, type ReactNode } from "react";
import Image, { type ImageProps } from "next/image";
import type { MDXComponents } from "mdx/types";

/**
 * Reads the plain text out of a heading's children, walking into any inline code, links or emphasis
 * inside it.
 *
 * @param node - The heading's children: a string, an array of mixed pieces, or an element.
 * @returns The heading's text with all formatting stripped.
 */
function getText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return getText(node.props.children);
  return "";
}

/**
 * Turns a heading's text into a URL-safe id by lowercasing it, dropping anything that isn't a letter,
 * number, space or hyphen, then joining the words with hyphens.
 *
 * @param text - The plain text of the heading.
 * @returns The id, e.g. "This is an example" becomes "this-is-an-example".
 */
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-");
}

const components: MDXComponents = {
  h2: ({ children, ...props }) => {
    const id = slugify(getText(children));
    return (
      <h2
        id={id}
        {...props}
        className="not-prose text-foreground mt-10 mb-2 scroll-mt-4 text-xl font-medium tracking-tight first:mt-0"
      >
        <a href={`#${id}`}>{children}</a>
      </h2>
    );
  },
  img: (props) => {
    const src = typeof props.src === "string" ? props.src : "";
    return (
      <Image
        {...(props as ImageProps)}
        alt={props.alt ?? ""}
        className="border-muted rounded-lg border-2 first:my-4"
        width={0}
        height={0}
        sizes="(max-width: 650px) 100vw, 650px"
        style={{ width: "100%", height: "auto" }}
        // GIFs must skip optimization or next/image freezes them on one frame.
        unoptimized={src.endsWith(".gif")}
      />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
