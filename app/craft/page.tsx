import { Bricks } from "@/components/bricks";
import { CraftCard } from "@/components/craft-card";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Craft",
  description: "My creative craft.",
};

export interface Craft {
  id: string;
  description: string;
  inspirationSource?: string;
  inspirationHref?: string;
  techStack: string[];
  component: ReactNode;
}

const crafts: Craft[] = [
  {
    id: "bricks",
    description: "Stacking lego bricks",
    inspirationSource: "SVGator",
    inspirationHref:
      "https://www.svgator.com/integrations/figma-plugin#you-can-preview-and-present",
    techStack: ["Figma"],
    component: <Bricks />,
  },
];

export default function CraftPage() {
  return (
    <section className="mx-auto w-full max-w-2xl flex flex-col gap-4 min-h-screen bg-background">
      <h1 className="lowercase border-b pb-2 border-[#222222] text-base font-medium">
        <span>
          my craft
          <sup className="ml-1.5 select-none text-muted-foreground text-xs">
            ({crafts.length})
          </sup>
        </span>
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {crafts.map((craft) => (
          <CraftCard key={craft.id} craft={craft} />
        ))}
      </div>
    </section>
  );
}
