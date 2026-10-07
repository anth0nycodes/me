"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CircleCheck, DottedLine, HalfCircle } from "./svgs";

type FormState = "idle" | "loading" | "success";

export function FeedbackPopover() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");
  const prefersReducedMotion = useReducedMotion();

  function handleClickOutside(e: MouseEvent | TouchEvent) {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setOpen(false);
      setFeedback("");
      setFormState("idle");
    }
  }

  function handleSubmit() {
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);

    setTimeout(() => {
      setOpen(false);
    }, 3300);
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("touchstart", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && open && formState === "idle") {
        handleSubmit();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [formState, open]);

  // on close, hand focus back to the trigger so keyboard users aren't dropped at the top of the page.
  // skipped when focus already moved elsewhere (e.g. clicking another control)
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      return;
    }
    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;

    const activeElement = document.activeElement;
    if (
      !activeElement ||
      activeElement === document.body ||
      wrapperRef.current?.contains(activeElement)
    ) {
      triggerRef.current?.focus();
    }
  }, [open]);

  function renderFormStateContent() {
    if (formState === "success") {
      return (
        <motion.div
          key={prefersReducedMotion ? "" : "success"}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -32, filter: "blur(4px)" }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
          className="flex h-full flex-col items-center justify-center gap-2"
        >
          <CircleCheck />
          <div className="flex flex-col items-center gap-1 text-sm">
            <h3 className="font-medium text-[#21201C]">Feedback received!</h3>
            <p className="text-[#63635D]">Thanks for playing with the form.</p>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.form
        id="feedback-form"
        exit={{ y: 8, opacity: 0, filter: "blur(4px)" }}
        transition={{ type: "spring", duration: 0.4, bounce: 0 }}
        onSubmit={(e) => {
          e.preventDefault();
          if (!feedback) return;
          handleSubmit();
        }}
        className="bg-foreground h-full rounded-lg border border-[#E6E7E8]"
      >
        <textarea
          autoFocus
          aria-label="Feedback"
          placeholder="Feedback"
          onChange={(e) => setFeedback(e.target.value)}
          className="text-background h-32 w-full resize-none p-3 text-base outline-none selection:bg-[Highlight]! placeholder:opacity-0 sm:text-sm"
          required
        />
        <div className="relative flex h-12 w-full items-center px-2.5">
          <DottedLine className="absolute -top-px right-0 left-0" />
          <HalfCircle className="absolute top-0 left-0 translate-x-[-1.5px] -translate-y-1/2" />
          <HalfCircle className="absolute top-0 right-0 translate-x-[1.5px] -translate-y-1/2 rotate-180" />
          <button
            type="submit"
            disabled={formState === "loading"}
            form="feedback-form"
            className="relative ml-auto flex h-6 w-26 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-[linear-gradient(180deg,#0b6fe0_0%,#0a5fd0_100%)] text-xs font-semibold shadow-[0_0_1px_1px_rgba(255,255,255,0.08)_inset,0_1px_1.5px_0_rgba(0,0,0,0.32),0_0_0_0.5px_#0b6fe0]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={formState}
                className="text-foreground flex w-full items-center justify-center [text-shadow:0px_1px_1.5px_rgba(0,0,0,0.16)]"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: -25 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: 25 }}
                transition={{
                  type: "spring",
                  duration: 0.3,
                  bounce: 0,
                }}
              >
                {formState === "loading" ? (
                  <Loader2 className="size-4 animate-spin duration-200" aria-label="Sending" />
                ) : (
                  "Send feedback"
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.form>
    );
  }

  return (
    <div className="bg-foreground flex size-full items-center justify-center">
      {/* always mounted so screen readers announce the change; a region mounted with its text is often skipped */}
      <span role="status" className="sr-only">
        {formState === "success" ? "Feedback received! Thanks for playing with the form." : ""}
      </span>
      {/* layoutDependency forces a re-render when open flips. React Compiler otherwise memoizes the trigger,
          so motion snapshots it against a stale page scroll offset and the popover flies in from off-card */}
      <motion.button
        ref={triggerRef}
        {...(prefersReducedMotion
          ? {}
          : {
              layoutId: "wrapper",
            })}
        layoutDependency={open}
        onClick={() => {
          setOpen(true);
          setFeedback("");
          setFormState("idle");
        }}
        className="bg-foreground flex h-9 cursor-pointer items-center border border-[#E9E9E7] px-3 font-medium outline-offset-2 transition-[scale] focus-visible:outline-2 focus-visible:outline-[#1994ff] active:scale-97"
        style={{
          borderRadius: "8px",
        }}
      >
        <motion.span
          {...(prefersReducedMotion
            ? {}
            : {
                layoutId: "title",
              })}
          layoutDependency={open}
          className="text-background block text-base sm:text-sm"
        >
          Feedback
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={wrapperRef}
            {...(prefersReducedMotion
              ? {}
              : {
                  layoutId: "wrapper",
                })}
            className="absolute h-48 w-[calc(100%-100px)] overflow-hidden bg-[#F5F6F7] p-1 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_2px_rgba(0,0,0,0.04)] outline-none sm:w-91"
            style={{
              borderRadius: "12px",
            }}
          >
            <motion.span
              {...(prefersReducedMotion
                ? {}
                : {
                    layoutId: "title",
                  })}
              data-feedback={feedback ? true : false}
              className="absolute top-4.25 left-4.25 text-base text-[#63635d] data-[feedback=true]:opacity-0! sm:text-sm"
            >
              Feedback
            </motion.span>
            <AnimatePresence mode="popLayout">{renderFormStateContent()}</AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
