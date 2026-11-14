import { isValidElement, type ReactNode } from "react";

/**
 * Reads the plain text out of a heading's children, walking into any inline code, links or emphasis
 * inside it.
 *
 * @param node - The heading's children: a string, an array of mixed pieces, or an element.
 * @returns The heading's text with all formatting stripped.
 */
export function getText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return getText(node.props.children);
  return "";
}

/**
 * Strips inline markdown (code ticks, links, emphasis) from a raw heading line, so it gives the same
 * text `getText` reads off the rendered heading.
 *
 * @param markdown - The heading's source, without the leading hashes.
 * @returns The heading's plain text.
 */
export function stripInlineMarkdown(markdown: string) {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim();
}

/**
 * Turns a heading's text into a URL-safe id by lowercasing it, dropping anything that isn't a letter,
 * number, space or hyphen, then joining the words with hyphens.
 *
 * @param text - The plain text of the heading.
 * @returns The id, e.g. "This is an example" becomes "this-is-an-example".
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-");
}
