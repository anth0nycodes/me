"use client";

import { useEffect, useState, type JSX } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowLeft, CircleCheck, Trash, TrashBack, TrashFront } from "./svgs";

interface Image {
  id: string;
  src: string;
  alt: string;
}

interface ToolbarItemProps {
  name: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const IMAGES: Image[] = [
  {
    id: "mountains",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    alt: "Mountain peaks above the clouds",
  },
  {
    id: "lake",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80",
    alt: "Lake surrounded by mountains",
  },
  {
    id: "valley",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
    alt: "Foggy green valley",
  },
  {
    id: "forest",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
    alt: "Sunlight through a forest",
  },
];

const IMAGE_TILT_AMOUNT = 4;

export function TrashInteraction() {
  const prefersReducedMotion = useReducedMotion();
  const [imagesToRemove, setImagesToRemove] = useState<Image[]>([]);
  const [readyToRemove, setReadyToRemove] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [visible, setVisible] = useState(true);

  const TOOLBAR_ITEMS: ToolbarItemProps[] = [
    {
      name: "Back",
      icon: ArrowLeft(),
      onClick: () => setImagesToRemove([]),
    },
    {
      name: "Trash",
      icon: Trash(),
      onClick: () => setReadyToRemove(true),
    },
  ];

  useEffect(() => {
    if (removed) {
      setTimeout(() => {
        setVisible(false);
      }, 1000);

      setTimeout(() => {
        setImagesToRemove([]);
        setReadyToRemove(false);
        setRemoved(false);
      }, 1200);

      setTimeout(() => {
        setVisible(true);
      }, 1800);
    }
  }, [removed]);

  return (
    <MotionConfig
      transition={
        prefersReducedMotion ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0.2 }
      }
    >
      <div className="bg-foreground relative flex size-full items-center justify-center">
        <motion.div initial={false} animate={{ opacity: visible ? 1 : 0 }}>
          <ul className="grid grid-cols-2 gap-2 sm:gap-3">
            <AnimatePresence>
              {!readyToRemove &&
                IMAGES.map((image) => {
                  const isImageSelected = imagesToRemove.some((img) => img.id === image.id);
                  return (
                    <motion.li
                      key={image.id}
                      className="relative size-22 sm:size-25"
                      exit={
                        isImageSelected || prefersReducedMotion
                          ? {}
                          : {
                              opacity: 0,
                              filter: "blur(4px)",
                              transition: { duration: 0.17 },
                            }
                      }
                    >
                      <motion.div
                        exit={{ opacity: 0, transition: { duration: 0 } }}
                        className="border-foreground/60 pointer-events-none absolute top-2 right-2 flex size-4 items-center justify-center rounded-full border"
                      >
                        <AnimatePresence>
                          {isImageSelected && (
                            <motion.div
                              aria-label={`Selected ${image.id} image`}
                              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1.1 }}
                              exit={
                                prefersReducedMotion
                                  ? {}
                                  : {
                                      opacity: 0,
                                      scale: 0.9,
                                      transition: { duration: 0.1 },
                                    }
                              }
                              transition={
                                prefersReducedMotion
                                  ? { duration: 0 }
                                  : {
                                      type: "spring",
                                      duration: 0.25,
                                      bounce: 0,
                                    }
                              }
                            >
                              <div className="absolute inset-0.5 rounded-full bg-white" />
                              <CircleCheck />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <button
                        aria-label={`Remove ${image.id} image`}
                        className="size-full cursor-pointer"
                        onClick={() => {
                          if (isImageSelected) {
                            setImagesToRemove((prev) => prev.filter((img) => img.id !== image.id));
                            return;
                          }

                          setImagesToRemove((prev) => [...prev, image]);
                        }}
                      >
                        <motion.img
                          {...(prefersReducedMotion ? {} : { layoutId: image.id })}
                          className="size-full rounded-xl object-cover"
                          alt={image.alt}
                          src={image.src}
                        />
                      </button>
                    </motion.li>
                  );
                })}
            </AnimatePresence>
          </ul>

          <AnimatePresence>
            {imagesToRemove.length > 0 && !readyToRemove && (
              <motion.div
                key="toolbar"
                initial={prefersReducedMotion ? {} : { opacity: 0, x: 8, filter: "blur(4px)" }}
                animate={prefersReducedMotion ? {} : { opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={prefersReducedMotion ? {} : { opacity: 0, x: 8, filter: "blur(4px)" }}
                transition={
                  prefersReducedMotion ? {} : { type: "spring", duration: 0.3, bounce: 0 }
                }
                className="bg-foreground absolute top-1/2 right-3 flex -translate-y-1/2 flex-col gap-1 rounded-xl p-1 shadow-md ring ring-[#E9E9E8] sm:right-13"
              >
                {TOOLBAR_ITEMS.map((item) => {
                  return (
                    <button
                      key={item.name}
                      className={cn(
                        "flex w-10 cursor-pointer flex-col items-center gap-px rounded-lg bg-[#F5F5F4] pt-1 pb-0.5 text-[9px] font-medium text-[#75756F] sm:w-12 sm:pt-1.5 sm:pb-1 sm:text-[10px]",
                        item.name === "Back" && "hover:bg-blue-50 hover:text-blue-400",
                        item.name === "Trash" && "hover:bg-red-50 hover:text-red-400",
                      )}
                      onClick={item?.onClick}
                    >
                      {item.icon}
                      {item.name}
                    </button>
                  );
                })}
              </motion.div>
            )}

            {readyToRemove && (
              <div className="absolute inset-0 flex justify-center">
                <motion.button
                  disabled={removed}
                  onClick={() => setRemoved(true)}
                  className="absolute bottom-4.5 flex h-8 w-50 cursor-pointer items-center justify-center rounded-full bg-[#FF3F40] text-xs font-semibold transition-[scale] duration-200 active:scale-97 disabled:pointer-events-none disabled:cursor-not-allowed motion-reduce:transition-none motion-reduce:active:scale-100 sm:bottom-8 sm:text-[13px]"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                  animate={{ opacity: removed ? 0.5 : 1, y: 0 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", duration: 0.4, bounce: 0 }
                  }
                >
                  Trash {imagesToRemove.length}{" "}
                  {imagesToRemove.length === 1 ? "Collectible" : "Collectibles"}
                </motion.button>

                <div className="absolute top-1/2 z-10 h-25 w-21 -translate-y-1/2 sm:h-28.5 sm:w-24">
                  <motion.div
                    initial={
                      prefersReducedMotion ? {} : { opacity: 0, scale: 1.2, filter: "blur(4px)" }
                    }
                    animate={
                      prefersReducedMotion ? {} : { opacity: 1, scale: 1, filter: "blur(0px)" }
                    }
                    exit={
                      prefersReducedMotion ? {} : { opacity: 0, scale: 1.2, filter: "blur(4px)" }
                    }
                  >
                    <TrashBack />
                  </motion.div>
                  <motion.div
                    className="absolute grid w-full -translate-y-61.5 place-items-center sm:-translate-y-65"
                    animate={
                      prefersReducedMotion
                        ? { y: 130, opacity: removed ? 0 : 1 }
                        : {
                            y: removed ? 170 : 130,
                            scale: removed ? 0.7 : 1,
                            filter: removed ? "blur(4px)" : "blur(0px)",
                          }
                    }
                    exit={prefersReducedMotion ? {} : { opacity: 0, filter: "blur(4px)" }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : removed
                          ? { type: "spring", duration: 0.3, bounce: 0 }
                          : { delay: 0.13 }
                    }
                  >
                    {imagesToRemove.map((image, i) => (
                      <motion.img
                        {...(prefersReducedMotion ? {} : { layoutId: image.id })}
                        key={image.id}
                        src={image.src}
                        alt={image.alt}
                        className="col-start-1 row-start-1 size-14.25 rounded-md sm:size-16.25"
                        style={{
                          rotate:
                            (i % 2 === 0 ? IMAGE_TILT_AMOUNT : -IMAGE_TILT_AMOUNT) *
                            (imagesToRemove.length - i + 1),
                        }}
                      />
                    ))}
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 left-0.5 w-20 sm:left-0.75 sm:w-22.5"
                    initial={prefersReducedMotion ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, filter: "blur(4px)" }}
                    transition={
                      prefersReducedMotion ? { duration: 0 } : { delay: 0.175, duration: 0 }
                    }
                  >
                    <TrashFront />
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
