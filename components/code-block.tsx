"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({ className, style, children, ...props }: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  async function copy() {
    // Read from <code> rather than the whole <pre> so the button's own text never ends up on the clipboard.
    const text = preRef.current?.querySelector("code")?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative my-6" style={style}>
      <pre
        ref={preRef}
        className={cn(
          "[&::-webkit-scrollbar-thumb]:bg-border rounded-lg [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent",
          // Firefox ignores ::-webkit-scrollbar; Chromium ignores it once scrollbar-color is set, so scope it
          "supports-[-moz-appearance:none]:[scrollbar-color:var(--border)_transparent]",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="text-muted-inverse ring-muted hover:text-foreground absolute top-2 right-2 rounded-md bg-(--shiki-light-bg) p-1.5 ring transition-[scale,color] duration-[60ms,200ms] select-none active:scale-97 dark:bg-(--shiki-dark-bg)"
      >
        {copied ? (
          <Check className="size-3.5 text-green-600" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied to clipboard" : ""}
        </span>
      </button>
    </div>
  );
}
