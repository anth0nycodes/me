import { Metadata } from "next";
import { CraftCard } from "@/components/craft/craft-card";
import { RainbowText } from "@/components/craft/rainbow-text/rainbow-text";
import { CRAFTS } from "./constants";

export const metadata: Metadata = {
  title: "Craft",
  description: "My creative craft.",
};

export default function CraftPage() {
  return (
    <section className="bg-background flex min-h-screen flex-col gap-4">
      <h1 className="text-muted-foreground dark:text-foreground border-separator flex items-center justify-between border-b pb-2 text-base font-medium lowercase">
        <span>
          my craft
          <sup className="text-muted-foreground ml-1.5 text-xs select-none">({CRAFTS.length})</sup>
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
        {CRAFTS.map((craft) => (
          <CraftCard key={craft.id} craft={craft} />
        ))}
      </div>
    </section>
  );
}
