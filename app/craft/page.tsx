import { ReactNode } from "react";
import { Metadata } from "next";
import { CraftCard } from "@/components/craft-card";
import { Bricks } from "@/components/craft/bricks";
import { CreateCoolThings } from "@/components/craft/create-cool-things";
import { NavlinksClip } from "@/components/craft/navlinks-clip";

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
    id: "navlinks-clip",
    description: "Tabs with clip-path",
    techStack: ["React.js", "Tailwind"],
    component: <NavlinksClip />,
  },
  {
    id: "create-cool-things",
    description: "Clip path comparison slider",
    inspirationSource: "animations.dev",
    inspirationHref:
      "https://animations.dev/learn/css-animations/the-magic-of-clip-path#comparison-sliders",
    techStack: ["React.js", "Tailwind"],
    component: <CreateCoolThings />,
  },
  {
    id: "bricks",
    description: "Stacking lego bricks",
    inspirationSource: "SVGator",
    inspirationHref:
      "https://www.svgator.com/integrations/figma-plugin#you-can-preview-and-present",
    techStack: ["Figma Motion"],
    component: <Bricks />,
  },
];

export default function CraftPage() {
  return (
    <section className="bg-background mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-4">
      <h1 className="border-b border-[#222222] pb-2 text-base font-medium lowercase">
        <span>
          my craft
          <sup className="text-muted-foreground ml-1.5 text-xs select-none">
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
