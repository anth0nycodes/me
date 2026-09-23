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
  source: string;
  reference?: string;
  techStack: string[];
  component: ReactNode;
}

const crafts: Craft[] = [
  {
    id: "navlinks-clip",
    description: "Clip Path Tabs",
    source:
      "https://github.com/anth0nycodes/me/blob/main/components/craft/navlinks-clip.tsx",
    reference:
      "https://pqoqubbw.dev/crafts/mintlify-landing-page#:~:text=tabs%20with%20clip%2Dpath",
    techStack: ["React.js", "Tailwind"],
    component: <NavlinksClip />,
  },
  {
    id: "create-cool-things",
    description: "Clip Path Slider",
    source:
      "https://github.com/anth0nycodes/me/blob/main/components/craft/create-cool-things.tsx",
    reference:
      "https://animations.dev/learn/css-animations/the-magic-of-clip-path#:~:text=technically",
    techStack: ["React.js", "Tailwind"],
    component: <CreateCoolThings />,
  },
  {
    id: "bricks",
    description: "Stacking Lego Bricks",
    source:
      "https://www.figma.com/design/cVCS3lKtT23stQWnnUAMGa/design-playground?node-id=253-1702",
    reference:
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
      <div className="grid grid-cols-1 gap-8">
        {crafts.map((craft) => (
          <CraftCard key={craft.id} craft={craft} />
        ))}
      </div>
    </section>
  );
}
