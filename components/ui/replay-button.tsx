import type { ComponentProps } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReplayButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      aria-label="Restart animation"
      className={cn(
        "text-foreground absolute top-4 right-4 z-10 cursor-pointer rounded-md bg-[#F4F4F5] p-1 text-sm shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-all hover:bg-[#E9E9E9] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RotateCcw className="text-muted-foreground size-3.5" aria-hidden />
    </button>
  );
}
