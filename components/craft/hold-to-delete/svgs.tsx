import type { SVGProps } from "react";

export type Priority = "low" | "medium" | "high";

const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Low Priority",
  medium: "Medium Priority",
  high: "High Priority",
};

interface PriorityBarsProps extends SVGProps<SVGSVGElement> {
  priority: Priority;
}

export function PriorityBars({ priority, ...props }: PriorityBarsProps) {
  return (
    <svg
      aria-label={PRIORITY_LABELS[priority]}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      fill="lch(61.803% 1.2 272 / 1)"
      {...props}
    >
      <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
      <rect
        x="6.5"
        y="5"
        width="3"
        height="9"
        rx="1"
        fillOpacity={priority === "low" ? 0.4 : 1}
      ></rect>
      <rect
        x="11.5"
        y="2"
        width="3"
        height="12"
        rx="1"
        fillOpacity={priority === "high" ? 1 : 0.4}
      ></rect>
    </svg>
  );
}

export function Marker(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      role="img"
      focusable="false"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="lch(20.29% 6.98 77.85)"
      {...props}
    >
      <path d="M7.00194 10.6239C6.66861 10.8183 6.25 10.5779 6.25 10.192V5.80802C6.25 5.42212 6.66861 5.18169 7.00194 5.37613L10.7596 7.56811C11.0904 7.76105 11.0904 8.23895 10.7596 8.43189L7.00194 10.6239Z"></path>
    </svg>
  );
}

export function InProgress(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="lch(80% 90 85)"
        strokeWidth="1.5"
        strokeDasharray="3.14 0"
        strokeDashoffset="-0.7"
      ></circle>
      <circle
        cx="7"
        cy="7"
        r="2"
        fill="none"
        stroke="lch(80% 90 85)"
        strokeWidth="4"
        strokeDasharray="12.189379495928398 24.378758991856795"
        strokeDashoffset="6.094689747964199"
        transform="rotate(-90 7 7)"
      ></circle>
    </svg>
  );
}

export function Checked(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden {...props}>
      <path
        d="M2 5.2L4.1 7.2L8 3"
        className="origin-center scale-80 sm:scale-100"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
