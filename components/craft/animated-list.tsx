"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

interface AnimatedListItem {
  label: string;
  description: string;
  timeAgo: string;
  icon: string;
  iconBg: string;
}

interface PoppedItem extends AnimatedListItem {
  id: number;
}

const ITEMS: AnimatedListItem[] = [
  {
    label: "Package delivered",
    description: "Your order was left at the front door",
    timeAgo: "2m ago",
    icon: "📦",
    iconBg: "#f59e0b",
  },
  {
    label: "New message",
    description: "Sam: are we still on for tonight?",
    timeAgo: "5m ago",
    icon: "💬",
    iconBg: "#3b82f6",
  },
  {
    label: "Payment received",
    description: "You received $42.00 from Alex",
    timeAgo: "12m ago",
    icon: "💸",
    iconBg: "#22c55e",
  },
  {
    label: "New follower",
    description: "Jordan started following you",
    timeAgo: "1h ago",
    icon: "👋",
    iconBg: "#a855f7",
  },
  {
    label: "Reminder",
    description: "Team standup starts in 10 minutes",
    timeAgo: "2h ago",
    icon: "⏰",
    iconBg: "#ef4444",
  },
];

export function AnimatedList() {
  const currentItemIndex = useRef(0);
  const [poppedItems, setPoppedItems] = useState<PoppedItem[]>([]);
  const [runId, setRunId] = useState(0);
  const [isRestartDisabled, setIsRestartDisabled] = useState(true);

  const restart = () => {
    currentItemIndex.current = 0;
    setPoppedItems([]);
    setRunId((prev) => prev + 1);
    setIsRestartDisabled(true);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentItemIndex.current >= ITEMS.length) {
        setIsRestartDisabled(false);
        clearInterval(intervalId);
        return;
      }
      const id = currentItemIndex.current;
      const currentItem = ITEMS[id];
      setPoppedItems((prevItems) => [{ ...currentItem, id }, ...prevItems]);
      currentItemIndex.current += 1;
    }, 1000);

    return () => clearInterval(intervalId);
  }, [runId]);

  return (
    <div className="bg-foreground relative flex size-full items-center justify-center">
      <button
        onClick={restart}
        aria-label="Restart animation"
        disabled={isRestartDisabled}
        className="text-foreground absolute top-4 right-4 z-10 cursor-pointer rounded-md bg-[#F4F4F5] p-1 text-sm shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-all hover:bg-[#E9E9E9] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RotateCcw className="text-muted-foreground size-3.5" aria-hidden />
      </button>
      <div className="relative flex size-full flex-col gap-4 p-4">
        {poppedItems.map((item, i) => (
          <AnimatedListItem
            key={item.id}
            item={item}
            style={
              {
                "--index": i,
                "--gap": "10px",
              } as CSSProperties
            }
          />
        ))}
        <div className="from-foreground pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 transform-gpu bg-linear-to-t to-transparent" />
      </div>
    </div>
  );
}

interface AnimatedListItemProps {
  item: AnimatedListItem;
  style?: CSSProperties;
}

function AnimatedListItem({ item, style }: AnimatedListItemProps) {
  return (
    <div
      className="group absolute left-1/2 w-[calc(100%-2rem)] max-w-100 origin-top -translate-x-1/2 translate-y-[calc(var(--index)*(100%+var(--gap)))] scale-100 opacity-100 transition-[scale,opacity,translate] duration-[650ms,400ms,675ms] ease-[cubic-bezier(0.29,0.95,0.27,0.97),ease-out,cubic-bezier(0.39,0.93,0.3,0.96)] starting:scale-20 starting:opacity-0"
      style={style}
    >
      <div className="bg-foreground flex cursor-pointer items-center gap-3 rounded-2xl p-4 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transition-[scale] duration-200 ease-in-out group-hover:scale-103">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: item.iconBg }}
        >
          <span className="text-lg">{item.icon}</span>
        </div>
        <div className="text-background flex flex-col overflow-hidden">
          <div className="flex items-center text-lg font-medium whitespace-pre">
            <span className="truncate text-sm sm:text-lg">{item.label}</span>
            <span className="mx-1 shrink-0">·</span>
            <span className="shrink-0 text-xs text-gray-500">
              {item.timeAgo}
            </span>
          </div>
          <p className="truncate text-sm">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
