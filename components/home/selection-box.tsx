import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const SELECTION_HANDLE_CLASS = "bg-white absolute size-[5px] border border-[#0E8CE9]";

interface SelectionBoxProps {
  children: ReactNode;
  className?: string;
}

// static version of the selection frame from the resizable-text craft
export function SelectionBox({ children, className }: SelectionBoxProps) {
  return (
    <span
      className={cn(
        "relative mx-1 inline-block border border-[#0E8CE9] px-1 py-px font-serif text-[15px] leading-none whitespace-nowrap select-none",
        className,
      )}
    >
      {children}
      <span aria-hidden="true">
        <span className={`${SELECTION_HANDLE_CLASS} -top-0.75 -left-0.75`} />
        <span className={`${SELECTION_HANDLE_CLASS} -top-0.75 -right-0.75`} />
        <span className={`${SELECTION_HANDLE_CLASS} -bottom-0.75 -left-0.75`} />
        <span className={`${SELECTION_HANDLE_CLASS} -right-0.75 -bottom-0.75`} />
      </span>
    </span>
  );
}
