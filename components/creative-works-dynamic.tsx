"use client";

import dynamic from "next/dynamic";

export const CreativeWorks = dynamic(
  () =>
    import("@/components/creative-works").then((mod) => ({
      default: mod.CreativeWorks,
    })),
  { ssr: false },
);
