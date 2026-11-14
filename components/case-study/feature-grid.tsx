import type { ReactNode } from "react";

/**
 * Lays a run of titled points out as cards across the wide column, so a list that would read as a
 * wall of text can be scanned instead. Pair with `Feature`.
 */
export function FeatureGrid({ children }: { children: ReactNode }) {
  return (
    <div className="feature-grid not-prose my-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
  );
}

export function Feature({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-muted/55 ring-border flex flex-col gap-2 rounded-xl p-5 ring-1 ring-inset">
      <h4 className="text-foreground text-[0.9375rem] leading-snug font-medium">{title}</h4>
      {/* a div, not a <p>: MDX wraps the text it's given in its own paragraph */}
      <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
    </div>
  );
}
