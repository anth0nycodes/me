"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import Image, { type ImageProps } from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { MediaControlButton } from "@/components/ui/media-control-button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { clamp, cn } from "@/lib/utils";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
// a click on the image zooms straight to this
const CLICK_SCALE = 2.5;
// the zoom buttons and keys step by this
const STEP_SCALE = 1.5;
// pointer moves under this many px still count as a click, not a drag
const DRAG_THRESHOLD = 4;
const OPEN_MS = 340;
const CLOSE_MS = 240;
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

type ZoomableImageProps = ImageProps & { width: number; height: number };

/**
 * A post image that opens larger in a lightbox when clicked, where it can be zoomed and panned.
 * Only where there's a mouse: on touch screens the browser's own pinch-zoom already does this, so
 * the image stays a plain image.
 */
export function ZoomableImage(props: ZoomableImageProps) {
  const canZoom = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [isOpen, setIsOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const image = <Image ref={imageRef} {...props} alt={props.alt} />;

  // remote images arrive without a known size, so there is nothing to fit the lightbox to
  if (
    !canZoom ||
    typeof props.src !== "string" ||
    !props.width ||
    !props.height
  )
    return image;

  return (
    <>
      <button
        type="button"
        aria-label={`View larger: ${props.alt}`}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
        className="block w-full cursor-zoom-in rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
      >
        {image}
      </button>
      {/* portaled to the body: a post image sits inside a <p>, which can't hold a <dialog> */}
      {isOpen &&
        createPortal(
          <ImageLightbox
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
            originRef={imageRef}
            onClosed={() => setIsOpen(false)}
          />,
          document.body
        )}
    </>
  );
}

interface Size {
  width: number;
  height: number;
}

interface Zoom {
  scale: number;
  // pan, in px from the centered position
  x: number;
  y: number;
  // eases to the new zoom (clicks and buttons) instead of following input directly (wheel and drag)
  isSmooth: boolean;
}

const RESET_ZOOM: Zoom = { scale: 1, x: 0, y: 0, isSmooth: true };

/** Fits the image within the viewport, leaving room for the controls, at no more than 2× its size. */
function getFitSize(width: number, height: number): Size {
  const scale = Math.min(
    (window.innerWidth * 0.9) / width,
    (window.innerHeight * 0.8) / height,
    2
  );
  return { width: width * scale, height: height * scale };
}

export interface ImageLightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  // the image on the page, which the lightbox grows out of and shrinks back into
  originRef: RefObject<HTMLImageElement | null>;
  onClosed: () => void;
}

export function ImageLightbox({
  src,
  alt,
  width,
  height,
  originRef,
  onClosed,
}: ImageLightboxProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [size, setSize] = useState(() => getFitSize(width, height));
  const sizeRef = useRef(size);
  const [zoom, setZoom] = useState<Zoom>(RESET_ZOOM);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const isClosingRef = useRef(false);
  const drag = useRef<{
    startX: number;
    startY: number;
    fromX: number;
    fromY: number;
    moved: boolean;
  } | null>(null);

  /** Keeps a pan within the image, so an edge never comes in past the frame. */
  function clampPan(x: number, y: number, scale: number) {
    const maxX = (sizeRef.current.width * (scale - 1)) / 2;
    const maxY = (sizeRef.current.height * (scale - 1)) / 2;
    return { x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) };
  }

  /** Scales by `factor`, keeping the point under (clientX, clientY) where it is on screen. */
  function zoomAt(
    factor: number,
    clientX: number,
    clientY: number,
    isSmooth: boolean
  ) {
    setZoom((current) => {
      const scale = clamp(current.scale * factor, MIN_SCALE, MAX_SCALE);
      const ratio = scale / current.scale;
      // the frame is centered on screen, so the viewport center is the zoom origin
      const px = clientX - window.innerWidth / 2;
      const py = clientY - window.innerHeight / 2;
      return {
        scale,
        ...clampPan(
          px - (px - current.x) * ratio,
          py - (py - current.y) * ratio,
          scale
        ),
        isSmooth,
      };
    });
  }

  function zoomAtCenter(factor: number) {
    zoomAt(factor, window.innerWidth / 2, window.innerHeight / 2, true);
  }

  /** The transform that lays the centered frame exactly over the image on the page. */
  function getOriginTransform() {
    const origin = originRef.current?.getBoundingClientRect();
    if (!origin) return null;
    const dx = origin.left + origin.width / 2 - window.innerWidth / 2;
    const dy = origin.top + origin.height / 2 - window.innerHeight / 2;
    const { width: frameWidth, height: frameHeight } = sizeRef.current;
    return `translate(${dx}px, ${dy}px) scale(${origin.width / frameWidth}, ${origin.height / frameHeight})`;
  }

  function close() {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);
    setZoom({ ...RESET_ZOOM, isSmooth: false });
    const frame = frameRef.current;
    const to = getOriginTransform();
    const animation =
      frame && to && !prefersReducedMotion
        ? frame.animate([{ transform: "none" }, { transform: to }], {
            duration: CLOSE_MS,
            easing: EASE_OUT,
            fill: "forwards",
          })
        : frame?.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 150,
            fill: "forwards",
          });
    (animation?.finished ?? Promise.resolve()).then(onClosed, onClosed);
  }

  // open: lock the page, show the dialog, and grow the frame out of the image on the page. Runs once
  // per opening; the lightbox unmounts when it closes
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const frame = frameRef.current;
    const origin = originRef.current;
    if (!dialog || !frame) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousGutter = root.style.scrollbarGutter;
    // keep the scrollbar's space so the page underneath doesn't shift when it locks
    root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";
    dialog.showModal();
    closeButtonRef.current?.focus();

    // the page image is shown while the full-size file loads, so the frame is never empty
    if (layerRef.current && origin?.currentSrc) {
      layerRef.current.style.backgroundImage = `url("${origin.currentSrc}")`;
    }
    // the image lifts off the page rather than appearing twice
    if (origin) origin.style.visibility = "hidden";

    const from = getOriginTransform();
    if (from && !prefersReducedMotion) {
      frame.animate([{ transform: from }, { transform: "none" }], {
        duration: OPEN_MS,
        easing: EASE_OUT,
      });
    } else {
      frame.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150 });
    }

    return () => {
      root.style.overflow = previousOverflow;
      root.style.scrollbarGutter = previousGutter;
      if (origin) origin.style.visibility = "";
      if (dialog.open) dialog.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the opening animation runs once per mount
  }, []);

  // refit on resize, and drop any zoom since the pan bounds change with the size
  useEffect(() => {
    function handleResize() {
      const next = getFitSize(width, height);
      sizeRef.current = next;
      setSize(next);
      setZoom({ ...RESET_ZOOM, isSmooth: false });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width, height]);

  // the wheel zooms; registered by hand because React's wheel listener is passive and can't
  // stop the page from scrolling. Trackpad pinches arrive as ctrl+wheel and move in smaller steps
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      const factor = Math.exp(-event.deltaY * (event.ctrlKey ? 0.01 : 0.0015));
      zoomAt(factor, event.clientX, event.clientY, false);
    }
    dialog.addEventListener("wheel", handleWheel, { passive: false });
    return () => dialog.removeEventListener("wheel", handleWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- zoomAt only reads refs and setState
  }, []);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || isClosingRef.current) return;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* a scripted pointer has nothing to capture */
    }
    drag.current = {
      startX: event.clientX,
      startY: event.clientY,
      fromX: zoom.x,
      fromY: zoom.y,
      moved: false,
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current) return;
    const dx = event.clientX - current.startX;
    const dy = event.clientY - current.startY;
    if (!current.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    current.moved = true;
    // at fit size there's nothing to pan to
    if (zoom.scale === 1) return;
    setIsDragging(true);
    setZoom((z) => ({
      ...z,
      ...clampPan(current.fromX + dx, current.fromY + dy, z.scale),
      isSmooth: false,
    }));
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    drag.current = null;
    setIsDragging(false);
    if (!current || current.moved) return;
    // a click: zoom in on that spot, or back out if already zoomed
    if (zoom.scale > 1) {
      setZoom(RESET_ZOOM);
    } else {
      zoomAt(CLICK_SCALE, event.clientX, event.clientY, true);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "+" || event.key === "=") zoomAtCenter(STEP_SCALE);
    else if (event.key === "-") zoomAtCenter(1 / STEP_SCALE);
    else if (event.key === "0") setZoom(RESET_ZOOM);
  }

  const cursor =
    zoom.scale > 1
      ? isDragging
        ? "cursor-grabbing"
        : "cursor-grab"
      : "cursor-zoom-in";

  return (
    <dialog
      ref={dialogRef}
      aria-label={alt}
      onCancel={(event) => {
        // Esc: close with the animation instead of the dialog vanishing at once
        event.preventDefault();
        close();
      }}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none overflow-hidden bg-transparent p-0 outline-none backdrop:bg-transparent"
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-black/85",
          isClosing
            ? "opacity-0 transition-opacity duration-200"
            : "animate-in fade-in duration-300"
        )}
      />
      {/* a click anywhere outside the image closes it */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div
          ref={frameRef}
          className="relative"
          style={{ width: size.width, height: size.height }}
        >
          <div
            ref={layerRef}
            className={cn(
              "absolute inset-0 touch-none bg-cover bg-center select-none",
              cursor
            )}
            style={{
              transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})`,
              transition: zoom.isSmooth
                ? `transform 280ms ${EASE_OUT}`
                : "none",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              drag.current = null;
              setIsDragging(false);
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized
              draggable={false}
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5",
          isClosing
            ? "opacity-0 transition-opacity duration-150"
            : "animate-in fade-in duration-300"
        )}
      >
        <MediaControlButton
          variant="overlay"
          label="Zoom out"
          onClick={() => zoomAtCenter(1 / STEP_SCALE)}
        >
          <Minus aria-hidden />
        </MediaControlButton>
        <button
          type="button"
          aria-label="Reset zoom"
          title="Reset zoom"
          onClick={() => setZoom(RESET_ZOOM)}
          className="h-7 min-w-14 cursor-pointer rounded-md border border-white/20 bg-[rgba(23,24,26,0.5)] px-2 text-xs text-white/85 tabular-nums backdrop-blur-md transition-colors outline-none hover:border-white/35 hover:text-white focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
        >
          {Math.round(zoom.scale * 100)}%
        </button>
        <MediaControlButton
          variant="overlay"
          label="Zoom in"
          onClick={() => zoomAtCenter(STEP_SCALE)}
        >
          <Plus aria-hidden />
        </MediaControlButton>
        <span aria-hidden="true" className="mx-1 h-4 w-px bg-white/20" />
        <CloseButton ref={closeButtonRef} onClick={close} />
      </div>
    </dialog>
  );
}

function CloseButton({
  ref,
  onClick,
}: {
  ref: RefObject<HTMLButtonElement | null>;
  onClick: () => void;
}) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Close"
      title="Close"
      onClick={onClick}
      className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-white/20 bg-[rgba(23,24,26,0.5)] text-white/85 backdrop-blur-md transition-[color,background-color,border-color,scale] duration-150 outline-none hover:border-white/35 hover:bg-[rgba(23,24,26,0.7)] hover:text-white focus-visible:ring-2 focus-visible:ring-(--focus-ring) active:scale-95 [&_svg]:size-3.5"
    >
      <X aria-hidden />
    </button>
  );
}
