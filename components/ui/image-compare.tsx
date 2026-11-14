"use client";

/*
 * Adapted from Bencho's "Image compare" block (https://bencho.dev), free plan, MIT License.
 *
 * Copyright (c) 2026 Lorenzo Cabra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Changes from the original: images, size and alt text come in as props; the block fills its column
 * and measures itself instead of being a fixed 270×360; the slider role sits on the knob so the
 * images keep their alt text; reduced motion snaps instead of gliding; Home/End and Shift+arrow keys;
 * touch scrolls the page vertically. Bencho's demo-page styles are left out.
 */

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { clamp } from "@/lib/utils";

/* ══ Image compare ════════════════════════════════════════
   One picture, two states of it, and a line to drag across.
   Left of the line is the raw shot, right of it the edit. Drag
   slowly and it stays where you leave it; flick it and it
   glides to the edge you threw it at.

   ── TWO PICTURES, ONE FRAME ─────────────────────────────
   The before and after shots are the same scene at the same
   size, so the two halves line up exactly and the line reads as
   seeing through the picture.

   ── THE LINE IS JELLY ───────────────────────────────────
   The knob is exactly where the finger is; the two ends of the
   line are not. They follow it on an under-damped spring, so a
   hard swing leaves them behind and the line bows into a curve,
   then wobbles straight when you stop. The before layer is cut
   along the SAME curve — clip-path: path(), in the block's own
   pixels — so the picture's edge bends with the line rather than
   the line bending over a straight cut. */

// the most the middle of the line may bow away from its ends, in px
const MAX_BEND = 9;

interface CompareImage {
  // path without an extension: a .webp is served with a .png fallback
  src: string;
  alt: string;
}

interface ImageCompareProps {
  before: CompareImage;
  after: CompareImage;
  // the images' own size, for the aspect ratio
  width: number;
  height: number;
  /* show the Before and After tags */
  labels?: boolean;
}

function Picture({ src, alt, width, height }: CompareImage & { width: number; height: number }) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img
        className="image-compare-img"
        src={`${src}.png`}
        alt={alt}
        width={width}
        height={height}
        draggable={false}
      />
    </picture>
  );
}

export function ImageCompare({ before, after, width, height, labels = true }: ImageCompareProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [p, setP] = useState(0.5);
  const [bend, setBend] = useState(0);
  // the block's measured size; the curve and the cut are drawn in its pixels
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const widthRef = useRef(0);
  const cur = useRef(0.5);
  const target = useRef<number | null>(null);
  /* the ends of the line, and how fast they are moving */
  const ends = useRef({ x: 0.5, v: 0 });
  const raf = useRef(0);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef<{ v: number; t: number; last: number } | null>(null);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      widthRef.current = w;
      setSize({ w, h });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  /* one loop for both motions: the glide toward a target, and
     the ends catching up with the middle. It stops itself once
     everything is still. */
  const loop = () => {
    if (raf.current) return;
    let prev = performance.now();
    const step = (t: number) => {
      const dt = Math.min(0.033, (t - prev) / 1000);
      prev = t;
      if (target.current !== null) {
        cur.current += (target.current - cur.current) * (1 - Math.pow(0.0004, dt));
        if (Math.abs(target.current - cur.current) < 0.0005) {
          cur.current = target.current;
          target.current = null;
        }
      }
      /* the jelly: a spring from the ends to the middle, damped
         firmly enough that it flexes and settles without a wobble */
      const e = ends.current;
      e.v += ((cur.current - e.x) * 620 - e.v * 44) * dt;
      e.x += e.v * dt;
      setP(cur.current);
      setBend(clamp((cur.current - e.x) * widthRef.current * 0.5, -MAX_BEND, MAX_BEND));
      const still =
        target.current === null &&
        Math.abs(cur.current - e.x) < 0.0006 &&
        Math.abs(e.v) < 0.002;
      if (still) {
        e.x = cur.current;
        e.v = 0;
        setBend(0);
        raf.current = 0;
        return;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };
  /* reduced motion: the line jumps to where it's going, straight */
  const settle = (v: number) => {
    target.current = null;
    cur.current = v;
    ends.current = { x: v, v: 0 };
    setP(v);
    setBend(0);
  };
  const glide = (to: number) => {
    if (prefersReducedMotion) return settle(to);
    target.current = to;
    loop();
  };
  /* under the finger: the knob is drawn this frame, not the next —
     only the ends are left to the loop */
  const place = (v: number) => {
    if (prefersReducedMotion) return settle(v);
    target.current = null;
    cur.current = v;
    setP(v);
    loop();
  };

  const at = (cx: number) => {
    const r = box.current!.getBoundingClientRect();
    return clamp((cx - r.left) / r.width, 0, 1);
  };

  function handleKeyDown(e: KeyboardEvent<HTMLSpanElement>) {
    const step = e.shiftKey ? 0.25 : 0.1;
    const from = target.current ?? cur.current;
    const next = { ArrowLeft: from - step, ArrowRight: from + step, Home: 0, End: 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    glide(clamp(next, 0, 1));
  }

  /* the line as a curve: ends at x - bend, and a control point at
     x + bend so the curve passes exactly through the knob */
  const w = size?.w ?? 0;
  const h = size?.h ?? 0;
  const x = p * w;
  const top = x - bend;
  const curve = `M ${top.toFixed(2)} 0 Q ${(x + bend).toFixed(2)} ${h / 2} ${top.toFixed(2)} ${h}`;
  // until the block is measured (and on the server) the cut is a straight one
  const cut = size
    ? `path("M 0 0 L ${top.toFixed(2)} 0 Q ${(x + bend).toFixed(2)} ${h / 2} ${top.toFixed(2)} ${h} L 0 ${h} Z")`
    : `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0)`;
  const percent = Math.round(p * 100);

  return (
    <div
      ref={box}
      role="group"
      aria-label="Before and after comparison"
      className="image-compare not-prose my-4 rounded-lg"
      data-held={held || undefined}
      style={{ aspectRatio: `${width} / ${height}` }}
      onPointerDown={(e) => {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* a scripted pointer */
        }
        const v = at(e.clientX);
        drag.current = { v: 0, t: performance.now(), last: v };
        setHeld(true);
        // a touch might be the start of a scroll, so it only moves the line once it drags
        if (e.pointerType !== "touch") glide(v);
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const v = at(e.clientX);
        const now = performance.now();
        d.v = (v - d.last) / Math.max(1, now - d.t);
        d.t = now;
        d.last = v;
        place(v);
      }}
      onPointerUp={(e) => {
        const d = drag.current;
        drag.current = null;
        setHeld(false);
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          /* never captured */
        }
        /* a flick carries it to the edge it was thrown at */
        if (d && Math.abs(d.v) > 0.0025) {
          glide(d.v > 0 ? 1 : 0);
        }
      }}
      onPointerCancel={() => {
        drag.current = null;
        setHeld(false);
      }}
    >
      {/* the edit underneath */}
      <Picture {...after} width={width} height={height} />
      {/* the raw shot on top, cut off at the line */}
      <div className="image-compare-before" style={{ clipPath: cut }}>
        <Picture {...before} width={width} height={height} />
      </div>
      {labels && (
        <>
          <span
            aria-hidden="true"
            className="image-compare-tag"
            style={{ opacity: clamp((p - 0.14) * 4, 0, 1) }}
          >
            Before
          </span>
          <span
            aria-hidden="true"
            className="image-compare-tag image-compare-right"
            style={{ opacity: clamp((0.86 - p) * 4, 0, 1) }}
          >
            After
          </span>
        </>
      )}
      {size && (
        <svg
          className="image-compare-line"
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          aria-hidden="true"
        >
          <path d={curve} />
        </svg>
      )}
      <span className="image-compare-grip" style={{ left: `${p * 100}%` }}>
        <span
          className="image-compare-knob"
          role="slider"
          tabIndex={0}
          aria-label="Before and after divider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-valuetext={`${percent}% before`}
          onKeyDown={handleKeyDown}
        >
          <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
            <path
              d="M5 1 1 5l4 4M11 1l4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </div>
  );
}
