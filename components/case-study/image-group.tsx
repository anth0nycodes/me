import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A soft panel behind a set of images, or one image smaller than the column. The panel always spans
 * the column, so the space around narrow images reads as part of the figure rather than as a gap
 * in the page. `className` lays out what's inside, e.g. a grid for a side-by-side pair.
 */
export function ImageGroup({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("image-group", className)}>{children}</div>;
}
