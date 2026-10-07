"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ReplayButton } from "@/components/ui/replay-button";
import { Checked, InProgress, Marker, PriorityBars, type Priority } from "./svgs";

interface Task {
  id: string;
  label: string;
  date: string;
  author: string;
  authorColor: string;
  priority: Priority;
}

const TASKS: Task[] = [
  {
    id: "eng-326",
    label: "migrate to new design system",
    date: "Jun 6",
    author: "Anthony Hoang",
    authorColor: "#5E6AD2",
    priority: "high",
  },
  {
    id: "eng-327",
    label: "fix popover flicker on safari",
    date: "Jun 8",
    author: "Maya Chen",
    authorColor: "#C2477F",
    priority: "medium",
  },
  {
    id: "eng-331",
    label: "add haptics to drag handle",
    date: "Jun 11",
    author: "Daniel Ortiz",
    authorColor: "#C7632B",
    priority: "low",
  },
  {
    id: "eng-334",
    label: "audit reduced motion fallbacks",
    date: "Jun 14",
    author: "Priya Nair",
    authorColor: "#2B8A6E",
    priority: "medium",
  },
  {
    id: "eng-340",
    label: "convert hero images to avif",
    date: "Jun 19",
    author: "Sam Whitfield",
    authorColor: "#2F7BC8",
    priority: "low",
  },
];

// Tasks past this count are hidden below the sm breakpoint
const MOBILE_TASKS_COUNT = 3;
const MOBILE_HIDDEN_IDS = new Set(TASKS.slice(MOBILE_TASKS_COUNT).map((task) => task.id));

export function HoldToDelete() {
  const prefersReducedMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(true);
  const [tasks, setTasks] = useState(TASKS);
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());
  const [isHolding, setIsHolding] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Keep focus inside the card when the focused element unmounts, so Space doesn't scroll the page
  function focusCard() {
    cardRef.current?.focus({ preventScroll: true });
  }

  function toggleExpanded() {
    setIsExpanded((prev) => !prev);
  }

  function toggleChecked(task: Task) {
    setCheckedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(task.id)) next.delete(task.id);
      else next.add(task.id);
      return next;
    });
  }

  function deleteChecked() {
    // Keep unchecked tasks only
    setTasks((prev) => prev.filter((task) => !checkedTasks.has(task.id)));
    setCheckedTasks(new Set());
    setIsHolding(false);
    focusCard();
  }

  function restart() {
    setIsExpanded(true);
    setTasks(TASKS);
    setCheckedTasks(new Set());
  }

  return (
    <div
      ref={cardRef}
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === " " && !(e.target instanceof HTMLButtonElement)) e.preventDefault();
      }}
      className="relative flex size-full justify-center bg-[#121213] py-8 outline-hidden sm:py-6"
    >
      <ReplayButton aria-label="Restart" onClick={restart} />
      <div className="flex w-5/6 flex-col gap-0.5 sm:w-6/7">
        <div
          tabIndex={0}
          onClick={toggleExpanded}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              toggleExpanded();
            }
          }}
          className="cursor-pointer rounded-md bg-[#1C1B1B] p-2"
        >
          <div className="flex w-full items-center gap-2">
            <button
              tabIndex={-1}
              aria-expanded={isExpanded}
              className="relative cursor-pointer before:absolute before:-inset-1 before:content-['']"
            >
              <Marker
                data-expanded={isExpanded}
                aria-label={`${isExpanded ? "Expanded" : "Collapsed"} marker`}
                className="size-3.5 data-[expanded=true]:rotate-90 sm:size-4"
              />
            </button>
            <InProgress className="size-3 sm:size-3.25" aria-hidden />
            <span className="text-xs font-medium sm:text-[13px]">In Progress</span>
            <span className="text-xs text-[#A1988D] sm:text-[13px]">
              <span className="sm:hidden">
                {tasks.filter((task) => !MOBILE_HIDDEN_IDS.has(task.id)).length}
              </span>
              <span className="max-sm:hidden">{tasks.length}</span>
            </span>
            {!isExpanded && checkedTasks.size > 0 && (
              <div className="flex items-center gap-2 text-xs text-[#A1988D] sm:text-[13px]">
                <span>•</span>
                <span>
                  <span className="max-sm:hidden">{checkedTasks.size}</span>
                  <span className="sm:hidden">
                    {[...checkedTasks].filter((taskId) => !MOBILE_HIDDEN_IDS.has(taskId)).length}
                  </span>{" "}
                  selected
                </span>
              </div>
            )}
          </div>
        </div>
        <div data-expanded={isExpanded} className="relative data-[expanded=false]:invisible">
          <AnimatePresence mode="popLayout" initial={false}>
            {tasks.map((task, index) => {
              const parts = task.author.split(" ");
              const firstName = parts[0];
              const lastName = parts[1];
              const initials = `${firstName[0]}${lastName[0]}`;
              const isChecked = checkedTasks.has(task.id);
              const isPrevChecked = index > 0 && checkedTasks.has(tasks[index - 1].id);
              const isNextChecked =
                index < tasks.length - 1 && checkedTasks.has(tasks[index + 1].id);

              return (
                <motion.div
                  layout={!prefersReducedMotion}
                  key={task.id}
                  role="checkbox"
                  aria-checked={isChecked}
                  aria-label={`Select ${task.id}`}
                  tabIndex={0}
                  data-checked={isChecked}
                  data-mobile-hidden={MOBILE_HIDDEN_IDS.has(task.id)}
                  data-join-top={isChecked && isPrevChecked}
                  data-join-bottom={isChecked && isNextChecked}
                  onClick={() => toggleChecked(task)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      toggleChecked(task);
                    }
                  }}
                  className="group flex cursor-pointer items-center justify-between gap-6 rounded-md py-3 pr-3 pl-2 will-change-transform hover:bg-[#1A1A1B] focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-[#5E6AD2] data-[checked=true]:bg-[#1C1E38] data-[checked=true]:hover:bg-[#232648] data-[join-bottom=true]:rounded-b-none data-[join-top=true]:rounded-t-none max-sm:data-[mobile-hidden=true]:hidden"
                  initial={prefersReducedMotion ? {} : { opacity: 0, filter: "blur(4px)" }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, filter: "blur(0px)" }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, filter: "blur(4px)" }}
                  transition={
                    prefersReducedMotion ? {} : { type: "spring", duration: 0.3, bounce: 0 }
                  }
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      aria-hidden
                      data-checked={isChecked}
                      className="mx-px flex size-3 shrink-0 items-center justify-center rounded-[3px] border border-[#737476] hover:border-[#5E6AD2] data-[checked=true]:border-[#5E6AD2] data-[checked=true]:bg-[#5E6AD2] data-[checked=true]:opacity-100 sm:size-3.5 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
                    >
                      {isChecked && <Checked />}
                    </span>
                    <PriorityBars
                      className="size-3.5 shrink-0 sm:size-4"
                      priority={task.priority}
                    />
                    <span className="hidden w-max shrink-0 text-[13px] text-[#959597] uppercase tabular-nums sm:block">
                      {task.id}
                    </span>
                    <InProgress className="size-3 shrink-0 sm:size-3.25" aria-hidden />
                    <span className="truncate text-xs font-medium sm:text-[13px]">
                      {task.label}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                    <div
                      style={{ backgroundColor: task.authorColor }}
                      className="flex size-4 shrink-0 items-center justify-center rounded-full sm:size-4.5"
                    >
                      <span className="text-[7.5px] leading-none font-semibold sm:text-[8.25px]">
                        {initials}
                      </span>
                    </div>
                    <span className="w-10 text-right text-[11px] text-[#959597] tabular-nums sm:text-xs">
                      {task.date}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      {checkedTasks.size > 0 && (
        <div className="absolute bottom-4.5 flex translate-y-0 items-center justify-between gap-12 rounded-full bg-[#1A1A1B] px-4 py-2 text-xs font-medium opacity-100 shadow-md transition-[opacity,translate] duration-300 ease-[ease] motion-reduce:transition-none sm:text-[13px] starting:[translate:0_12px] starting:opacity-0">
          <span>
            <span className="inline-block w-[1ch] text-center tabular-nums">
              <span className="max-sm:hidden">{checkedTasks.size}</span>
              <span className="sm:hidden">
                {[...checkedTasks].filter((taskId) => !MOBILE_HIDDEN_IDS.has(taskId)).length}
              </span>
            </span>{" "}
            selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCheckedTasks(new Set());
                focusCard();
              }}
              className="cursor-pointer rounded-full bg-[#2A2A2C] px-3 py-1.5 text-[#D4D4D6] transition-transform duration-160 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-[#343437] focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-[#5E6AD2] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              Close
            </button>
            <button
              data-holding={isHolding}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  setIsHolding(true);
                }
              }}
              onKeyUp={() => setIsHolding(false)}
              onBlur={() => setIsHolding(false)}
              className="group relative flex cursor-pointer overflow-clip rounded-full bg-[#D14D41] px-3 py-1.5 transition-transform duration-160 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] select-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-[#5E6AD2] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              {/* Fill is kept under reduced motion: it is the hold progress, and its transitionend triggers the delete */}
              <div
                className="absolute inset-0 bg-[#B14D41] px-3 py-1.5 transition-[clip-path] duration-300 ease-out [clip-path:inset(0_100%_0_0)] group-active:duration-1500 group-active:ease-linear group-active:[clip-path:inset(0_0_0_0)] group-data-[holding=true]:duration-1500 group-data-[holding=true]:ease-linear group-data-[holding=true]:[clip-path:inset(0_0_0_0)]"
                onTransitionEnd={(e) => {
                  if (
                    e.propertyName === "clip-path" &&
                    getComputedStyle(e.currentTarget).clipPath === "inset(0px)"
                  ) {
                    deleteChecked();
                  }
                }}
              >
                Delete
              </div>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
