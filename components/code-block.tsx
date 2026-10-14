"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({ className, children, ...props }: ComponentProps<"pre">) {
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
    <pre ref={preRef} className={cn("relative", className)} {...props}>
      {children}
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="text-muted-inverse hover:text-foreground absolute top-2 right-2 rounded-md p-1.5 transition-colors duration-200"
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
    </pre>
  );
}
