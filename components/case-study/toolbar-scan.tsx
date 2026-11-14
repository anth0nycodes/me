"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { MediaControlButton } from "@/components/ui/media-control-button";
import { useOnScreen } from "@/hooks/use-on-screen";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/* ══ Toolbar scan ═════════════════════════════════════════
   An eye-tracking style replay of someone hunting for the Text
   tool in two toolbars. Each red ring is one look (a fixation),
   joined to the last by the jump the eye made (a saccade).

   Both run on the same clock, so the single row finds the tool
   in half the looks and then waits, while the grid keeps
   bouncing around. That gap is the point of the graphic. */

// one look per tick: a quick jump, then a dwell long enough to read the trail
const STEP_MS = 520;
const JUMP_MS = 200;
const JUMP_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
// ticks to hold on the finished trails before replaying
const HOLD_STEPS = 5;
const RED = "#e5484d";

// glyphs on a 24-unit grid, drawn as strokes like the real toolbar's icons
const GLYPHS = {
  pointer: "M7 4l11 7-5 1.5L10.5 18z",
  pencil: "M5 19l3.5-1L18 8.5 15.5 6 6 15.5z",
  highlighter: "M6 19h6M8.5 15.5l8-8-3-3-8 8V16z",
  eraser: "M9 19h9M6 15l7-7 4 4-6 7H9z",
  line: "M6 18L18 6",
  square: "M6 6h12v12H6z",
  circle: "M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0z",
  copy: "M10 10h8v8h-8zM6 14V6h8",
  download: "M12 5v9M8 10.5l4 4 4-4M6 19h12",
  trash: "M6 7h12M10 7V5h4v2M8 7l1 12h6l1-12",
  drop: "M12 5l4.5 6.5a5 5 0 1 1-9 0z",
  text: "M6 6h12M12 6v12",
} as const;

type Glyph = keyof typeof GLYPHS;

interface Point {
  x: number;
  y: number;
}

interface Tool extends Point {
  glyph: Glyph;
}

interface Layout {
  label: string;
  // the toolbar's own box
  bar: { x: number; y: number; width: number; height: number; radius: number };
  tools: Tool[];
  // the order the eye lands on tools, by index into `tools`; the last one is the Text tool
  looks: number[];
}

// one row of eight, like Tracemark: scanned left to right, found on the sixth look
const ROW_GLYPHS: Glyph[] = ["pointer", "pencil", "highlighter", "eraser", "line", "text", "square", "download"];
const ROW: Layout = {
  label: "One row",
  bar: { x: 26, y: 72, width: 248, height: 36, radius: 18 },
  tools: ROW_GLYPHS.map((glyph, i) => ({ glyph, x: 45 + i * 30, y: 90 })),
  looks: [0, 1, 2, 3, 4, 5],
};

// four by four, like the toolbars I compared against: the eye has no line to follow
const GRID_GLYPHS: Glyph[] = [
  "pencil", "square", "circle", "copy",
  "line", "drop", "eraser", "trash",
  "download", "highlighter", "text", "pointer",
  "circle", "square", "line", "copy",
];
const GRID: Layout = {
  label: "Rows and columns",
  bar: { x: 88, y: 28, width: 124, height: 124, radius: 12 },
  tools: GRID_GLYPHS.map((glyph, i) => ({ glyph, x: 105 + (i % 4) * 30, y: 45 + Math.floor(i / 4) * 30 })),
  // (col, row): 0,0 → 3,1 → 1,3 → 2,0 → 0,2 → 3,3 → 1,1 → 3,0 → 0,3 → 1,2 → 3,2 → 2,2
  looks: [0, 7, 13, 2, 8, 15, 5, 3, 12, 9, 11, 10],
};

const TOTAL_STEPS = Math.max(ROW.looks.length, GRID.looks.length) + HOLD_STEPS;

// the counter and label slide on this curve: a quick start that settles gently
const SLIDE = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
  transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
} as const;

export function ToolbarScan() {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(ref, 0.4);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  // `cycle` changes on every replay, which remounts the trails so they start clean
  const [clock, setClock] = useState({ tick: 0, cycle: 0 });

  useEffect(() => {
    if (!isVisible || isPaused || prefersReducedMotion) return;
    const id = setInterval(() => {
      setClock(({ tick, cycle }) =>
        tick + 1 >= TOTAL_STEPS ? { tick: 0, cycle: cycle + 1 } : { tick: tick + 1, cycle },
      );
    }, STEP_MS);
    return () => clearInterval(id);
  }, [isVisible, isPaused, prefersReducedMotion]);

  function handleReplay() {
    setClock(({ cycle }) => ({ tick: 0, cycle: cycle + 1 }));
    setIsPaused(false);
  }

  // reduced motion shows both finished trails, still, so there is nothing to pause or replay
  const tick = prefersReducedMotion ? TOTAL_STEPS : clock.tick;

  return (
    <figure ref={ref} className="not-prose my-6">
      <div className="relative grid gap-3 sm:grid-cols-2">
        {[ROW, GRID].map((layout) => (
          <ScanPanel
            key={layout.label}
            layout={layout}
            tick={tick}
            cycle={clock.cycle}
            isAnimated={!prefersReducedMotion}
          />
        ))}
        {/* one pair for both panels: they share a clock, and running in step is the comparison */}
        {!prefersReducedMotion && (
          <div className="absolute top-2 right-2 flex gap-1">
            <MediaControlButton
              label={isPaused ? "Play animation" : "Pause animation"}
              onClick={() => setIsPaused((paused) => !paused)}
            >
              {isPaused ? <Play aria-hidden /> : <Pause aria-hidden />}
            </MediaControlButton>
            <MediaControlButton label="Replay animation" onClick={handleReplay}>
              <RotateCcw aria-hidden />
            </MediaControlButton>
          </div>
        )}
      </div>
      <figcaption className="text-muted-foreground mt-3 text-center text-sm">
        Looking for the same tool. One row reads in a line; rows and columns make the eye hunt.
      </figcaption>
    </figure>
  );
}

interface ScanPanelProps {
  layout: Layout;
  tick: number;
  cycle: number;
  // off under reduced motion, where the finished trail is shown still
  isAnimated: boolean;
}

function ScanPanel({ layout, tick, cycle, isAnimated }: ScanPanelProps) {
  const { label, bar, tools, looks } = layout;
  const step = Math.min(tick, looks.length - 1);
  const isFound = tick >= looks.length - 1;
  const visited = looks.slice(0, step + 1).map((i) => tools[i]);
  const gaze = visited[visited.length - 1];
  // every stop before the current one, and the one the eye just left
  const settled = visited.slice(0, -1);
  const previous = settled[settled.length - 1];
  const target = tools[looks[looks.length - 1]];
  const segmentRef = useRef<SVGLineElement>(null);

  // on each new look, draw the latest jump from its start to its end in step with the ring,
  // instead of the whole line appearing at once while the ring is still on its way
  useLayoutEffect(() => {
    const segment = segmentRef.current;
    if (!segment || !isAnimated) return;
    const length = Math.hypot(
      segment.x2.baseVal.value - segment.x1.baseVal.value,
      segment.y2.baseVal.value - segment.y1.baseVal.value,
    );
    segment.animate(
      [
        { strokeDasharray: `${length}`, strokeDashoffset: length },
        { strokeDasharray: `${length}`, strokeDashoffset: 0 },
      ],
      { duration: JUMP_MS, easing: JUMP_EASING },
    );
  }, [step, cycle, isAnimated]);

  return (
    <div className="bg-muted/60 flex flex-col gap-2 rounded-lg p-3">
      <svg viewBox="0 0 300 180" className="h-auto w-full" aria-hidden="true">
        <rect
          x={bar.x}
          y={bar.y}
          width={bar.width}
          height={bar.height}
          rx={bar.radius}
          className="fill-card stroke-border"
          strokeWidth={1}
        />
        {/* the found tool lights up once the eye lands on it */}
        <rect
          x={target.x - 13}
          y={target.y - 13}
          width={26}
          height={26}
          rx={7}
          fill={RED}
          fillOpacity={0.12}
          stroke={RED}
          strokeWidth={1.5}
          className="transition-opacity duration-200"
          style={{ opacity: isFound ? 1 : 0 }}
        />
        {tools.map(({ glyph, x, y }, i) => (
          <path
            key={i}
            d={GLYPHS[glyph]}
            transform={`translate(${x - 9} ${y - 9}) scale(0.75)`}
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-muted-foreground"
          />
        ))}
        <g key={cycle} className="animate-in fade-in duration-300">
          {/* the jumps already finished */}
          <polyline
            points={settled.map(({ x, y }) => `${x},${y}`).join(" ")}
            fill="none"
            stroke={RED}
            strokeOpacity={0.45}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* the jump in progress, drawn out under the moving ring so the line keeps pace with it */}
          {previous && (
            <line
              ref={segmentRef}
              x1={previous.x}
              y1={previous.y}
              x2={gaze.x}
              y2={gaze.y}
              stroke={RED}
              strokeOpacity={0.45}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          )}
          {/* where the eye already stopped */}
          {settled.map(({ x, y }, i) => (
            <circle key={i} cx={x} cy={y} r={3} fill={RED} fillOpacity={0.55} />
          ))}
          {/* where it is now */}
          <g
            style={{
              transform: `translate(${gaze.x}px, ${gaze.y}px)`,
              transition: `transform ${JUMP_MS}ms ${JUMP_EASING}`,
            }}
          >
            <circle r={13} fill={RED} fillOpacity={0.16} />
            <circle r={13} fill="none" stroke={RED} strokeWidth={1.5} />
            <circle r={2.5} fill={RED} />
          </g>
        </g>
      </svg>
      <div className="flex items-baseline justify-between px-1 text-sm">
        <span className="text-foreground">{label}</span>
        <LooksLabel count={step + 1} isFound={isFound} />
      </div>
    </div>
  );
}

/**
 * Counts the looks so far, sliding each new number up into place. Green while the count is low,
 * warming toward red as it climbs, so the grid's long hunt reads as costly at a glance. Once the
 * tool is found, the whole label slides up into "Found in X looks".
 */
function LooksLabel({ count, isFound }: { count: number; isFound: boolean }) {
  // 145 is green and 25 is red in OKLCH; the grid's last look lands on full red. Cubed, so the
  // color stays green through a reasonable hunt (the row's 6 looks) and only turns once it drags on
  const progress = ((count - 1) / (GRID.looks.length - 1)) ** 3;
  const hue = 145 - progress * 120;
  const looks = (
    <span
      className="inline-flex gap-[0.25em] text-[oklch(0.55_0.16_var(--hue))] transition-colors duration-300 dark:text-[oklch(0.76_0.15_var(--hue))]"
      style={{ "--hue": hue } as CSSProperties}
    >
      <span className="relative inline-flex overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={count} {...SLIDE}>
            {count}
          </motion.span>
        </AnimatePresence>
      </span>
      {count === 1 ? "look" : "looks"}
    </span>
  );

  return (
    <span className="relative inline-flex overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        {isFound ? (
          <motion.span key="found" className="text-foreground inline-flex gap-[0.25em]" {...SLIDE}>
            Found in {looks}
          </motion.span>
        ) : (
          <motion.span key="scanning" className="inline-flex" {...SLIDE}>
            {looks}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
