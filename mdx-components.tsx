import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";

const components: MDXComponents = {
  img: (props) => {
    const src = typeof props.src === "string" ? props.src : "";
    return (
      <Image
        {...(props as ImageProps)}
        alt={props.alt ?? ""}
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
