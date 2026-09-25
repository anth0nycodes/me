import { ReactNode } from "react";
import { Metadata } from "next";
import { CraftCard } from "@/components/craft-card";
import { AnimatedList } from "@/components/craft/animated-list";
import { Bricks } from "@/components/craft/bricks";
import { CreateCoolThings } from "@/components/craft/create-cool-things";
import { MetalCard } from "@/components/craft/metal-card";
import { NavlinksClip } from "@/components/craft/navlinks-clip";
import { RainbowText } from "@/components/rainbow-text";

// TODO: animated dashed border component
// TODO: file tree component from scratch

export const metadata: Metadata = {
  title: "Craft",
  description: "My creative craft.",
};

export interface Craft {
  id: string;
  description: string;
  source: string;
  reference?: string;
  component: ReactNode;
}

const crafts: Craft[] = [
  {
    id: "animated-list",
    description: "Animated List",
    source:
      "https://github.com/anth0nycodes/me/blob/main/components/craft/animated-list.tsx",
    reference: "https://magicui.design/docs/components/animated-list",
    component: <AnimatedList />,
  },
  {
    id: "metal-card",
    description: "Metal Card",
    source:
      "https://github.com/anth0nycodes/me/blob/main/components/craft/metal-card.tsx",
    reference: "https://sanyam.sh/lab/foil-card",
    component: <MetalCard />,
  },
  {
    id: "navlinks-clip",
    description: "Clip Path Tabs",
    source:
      "https://github.com/anth0nycodes/me/blob/main/components/craft/navlinks-clip.tsx",
    reference:
      "https://pqoqubbw.dev/crafts/mintlify-landing-page#:~:text=tabs%20with%20clip%2Dpath",
    component: <NavlinksClip />,
  },
  {
    id: "create-cool-things",
    description: "Clip Path Slider",
    source:
      "https://github.com/anth0nycodes/me/blob/main/components/craft/create-cool-things.tsx",
    reference:
      "https://animations.dev/learn/css-animations/the-magic-of-clip-path#:~:text=technically",
    component: <CreateCoolThings />,
  },
  {
    id: "bricks",
    description: "Stacking Lego Bricks",
    source:
      "https://www.figma.com/design/cVCS3lKtT23stQWnnUAMGa/design-playground?node-id=253-1702",
    reference:
      "https://www.svgator.com/integrations/figma-plugin#you-can-preview-and-present",
    component: <Bricks />,
  },
];

export default function CraftPage() {
  return (
    <section className="bg-background mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-4">
      <h1 className="flex items-center justify-between border-b border-[#222222] pb-2 text-base font-medium lowercase">
        <span>
          my craft
          <sup className="text-muted-foreground ml-1.5 text-xs select-none">
            ({crafts.length})
          </sup>
        </span>
        <a
          href="https://www.figma.com/design/cVCS3lKtT23stQWnnUAMGa/design-playground?node-id=0-1&t=g4NbBNdZ9dm1F2xO-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RainbowText text="figma playground" />
        </a>
      </h1>
      <div className="grid grid-cols-1 gap-8">
        {crafts.map((craft) => (
          <CraftCard key={craft.id} craft={craft} />
        ))}
      </div>
    </section>
  );
}
