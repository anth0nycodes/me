import { ReactNode } from "react";
import { AnimatedList } from "@/components/craft/animated-list";
import { Bricks } from "@/components/craft/bricks";
import { CreateCoolThings } from "@/components/craft/create-cool-things/create-cool-things";
import { FeedbackPopover } from "@/components/craft/feedback-popover/feedback-popover";
import { FileTree } from "@/components/craft/file-tree/file-tree";
import { HoldToDelete } from "@/components/craft/hold-to-delete/hold-to-delete";
import { Lightswitch } from "@/components/craft/light-switch";
import { MultiStepForm } from "@/components/craft/multistep-form";
import { NavlinksClip } from "@/components/craft/navlinks-clip";
import { ResizableText } from "@/components/craft/resizable-text/resizable-text";
import { ScratchToReveal } from "@/components/craft/scratch-to-reveal";
import { TrashInteraction } from "@/components/craft/trash-interaction/trash-interaction";
import { VerticalCarousel } from "@/components/craft/vertical-carousel/vertical-carousel";

export interface Craft {
  id: string;
  description: string;
  source: string;
  reference?: string;
  component: ReactNode;
}

export const CRAFTS: Craft[] = [
  {
    id: "vertical-carousel",
    description: "Vertical Carousel",
    source:
      "https://github.com/anth0nycodes/me/blob/main/components/craft/vertical-carousel/vertical-carousel.tsx",
    reference: "https://x.com/pqoqubbw/status/1864055454684344633",
    component: <VerticalCarousel />,
  },
  {
    id: "scratch-to-reveal",
    description: "Scratch to Reveal",
    source: "https://github.com/anth0nycodes/me/blob/main/components/craft/scratch-to-reveal.tsx",
    component: <ScratchToReveal />,
  },
  {
    id: "hold-to-delete",
    description: "Hold to Delete",
    source:
      "https://github.com/anth0nycodes/me/blob/main/components/craft/hold-to-delete/hold-to-delete.tsx",
    reference: "https://linear.app/",
    component: <HoldToDelete />,
  },
  {
    id: "trash-interaction",
    description: "Trash Interaction",
    source:
      "https://github.com/anth0nycodes/me/blob/main/components/craft/trash-interaction/trash-interaction.tsx",
    reference: "https://animations.dev/learn/framer-motion/trash-interaction",
    component: <TrashInteraction />,
  },
  {
    id: "resizable-text",
    description: "Resizable Text",
    source:
      "https://github.com/anth0nycodes/me/blob/main/components/craft/resizable-text/resizable-text.tsx",
    reference: "https://vercel.com/design",
    component: <ResizableText />,
  },
  {
    id: "light-switch",
    description: "Light Switch",
    source: "https://github.com/anth0nycodes/me/blob/main/components/craft/light-switch.tsx",
    component: <Lightswitch />,
  },
  {
    id: "file-tree",
    description: "File Tree",
    source: "https://github.com/anth0nycodes/me/blob/main/components/craft/file-tree/file-tree.tsx",
    reference: "https://sanyam.sh/lab/file-tree-explorer",
    component: <FileTree />,
  },
  {
    id: "multistep-form",
    description: "Multistep Form",
    source: "https://github.com/anth0nycodes/me/blob/main/components/craft/multistep-form.tsx",
    reference: "https://animations.dev/learn/framer-motion/multi-step-component",
    component: <MultiStepForm />,
  },
  {
    id: "feedback-popover",
    description: "Feedback Popover",
    source:
      "https://github.com/anth0nycodes/me/blob/main/components/craft/feedback-popover/feedback-popover.tsx",
    reference: "https://animations.dev/learn/framer-motion/feedback-popover",
    component: <FeedbackPopover />,
  },
  {
    id: "animated-list",
    description: "Animated List",
    source: "https://github.com/anth0nycodes/me/blob/main/components/craft/animated-list.tsx",
    reference: "https://magicui.design/docs/components/animated-list",
    component: <AnimatedList />,
  },
  {
    id: "navlinks-clip",
    description: "Clip Path Tabs",
    source: "https://github.com/anth0nycodes/me/blob/main/components/craft/navlinks-clip.tsx",
    reference: "https://animations.dev/learn/css-animations/the-magic-of-clip-path#tabs-transition",
    component: <NavlinksClip />,
  },
  {
    id: "create-cool-things",
    description: "Clip Path Slider",
    source:
      "https://github.com/anth0nycodes/me/blob/main/components/craft/create-cool-things/create-cool-things.tsx",
    reference:
      "https://animations.dev/learn/css-animations/the-magic-of-clip-path#:~:text=technically",
    component: <CreateCoolThings />,
  },
  {
    id: "bricks",
    description: "Stacking Lego Bricks",
    source:
      "https://www.figma.com/design/cVCS3lKtT23stQWnnUAMGa/design-playground?node-id=253-1702",
    reference: "https://www.svgator.com/integrations/figma-plugin#you-can-preview-and-present",
    component: <Bricks />,
  },
];
