import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

// radius of each perforation; the paper margin is sized from it so the holes sit in the margin
const HOLE = 6;

/* The perforated edge. A grid of round holes is tiled with `round` so a whole number fits each
   side, offset by half a tile so every hole is centered on the edge; the second layer keeps the
   inside solid. Masking clips shadows too, so the drop shadow lives on the wrapper instead. */
const PERFORATION = [
  `radial-gradient(${HOLE}px, #0000 98%, #000) round ${-1.5 * HOLE}px ${-1.5 * HOLE}px / ${3 * HOLE}px ${3 * HOLE}px`,
  `linear-gradient(#000 0 0) no-repeat 50% / calc(100% - ${3 * HOLE}px) calc(100% - ${3 * HOLE}px)`,
].join(", ");

interface StampProps {
  // path without an extension: a .webp is served with a .jpg fallback
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  // resting tilt in degrees; the stamp straightens on hover
  tilt: number;
  className?: string;
}

/** A photo printed as a postage stamp: cream paper, perforated edges, a caption shown on hover. */
export function Stamp({
  src,
  alt,
  width,
  height,
  caption,
  tilt,
  className,
}: StampProps) {
  // Safari doesn't fit the holes to the paper with `round`: it lays whole 18px tiles from the top
  // left, so any size off the grid cuts the last holes on the right and bottom. The paper is sized
  // to whole tiles instead: its width is the figure's, rounded down to a tile, and its height is the
  // photo's at that width plus the margins, rounded to a tile, with the photo cropped by the few
  // pixels of difference. Every browser then fits the holes exactly
  const tile = 3 * HOLE;
  const top = 3 * HOLE;
  const bottom = 5.5 * HOLE;
  const paperWidth = `round(down, 100cqw, ${tile}px)`;
  const paperHeight = `round(calc((${paperWidth} - ${2 * tile}px) * ${height / width} + ${top + bottom}px), ${tile}px)`;

  return (
    <figure
      className={cn(
        "group @container rotate-(--tilt) drop-shadow-[0_10px_18px_rgb(0_0_0/0.28)] transition-[rotate,translate,scale] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:z-10 hover:-translate-y-1 hover:scale-[1.03] hover:rotate-0 motion-reduce:transition-none",
        className
      )}
      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
    >
      <div
        className="relative mx-auto bg-[#fbf8f1]"
        style={{
          width: paperWidth,
          height: paperHeight,
          // a deeper bottom margin, like the printed strip on a stamp, which holds the caption
          padding: `${top}px ${tile}px ${bottom}px`,
          mask: PERFORATION,
          WebkitMask: PERFORATION,
        }}
      >
        <picture className="block size-full">
          <source srcSet={`${src}.webp`} type="image/webp" />
          <img
            src={`${src}.jpg`}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            draggable={false}
            className="block size-full object-cover"
          />
        </picture>
        {/* sits in the bottom margin rather than taking its own row, so the paper stays snug around
            the photo. Hidden at rest; on hover it fades in, and it disappears at once when the pointer
            leaves (the transition only exists while hovered) */}
        <figcaption
          className="absolute truncate font-mono text-[0.5625rem] leading-none tracking-[0.12em] text-neutral-600 uppercase opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-200 group-hover:ease-out"
          style={{ left: 3 * HOLE, right: 3 * HOLE, bottom: 2.5 * HOLE }}
        >
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}
