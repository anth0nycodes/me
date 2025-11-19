import { Header } from "@/components/header";
import { Item, SectionList } from "@/components/section";
import { LinksSection } from "@/components/links-section";
import { EducationSection } from "@/components/education-section";
import { SkillsSection } from "@/components/skills-section";

const workItems: Item[] = [
  {
    title: "magic hour (yc w24)",
    role: "software engineer",
    period: "aug 2025 - sep 2025",
    description:
      "polishing more UI and building more ai-powered tools for creators",
    href: "https://magichour.ai",
  },
  {
    title: "magic hour (yc w24)",
    role: "software engineer intern",
    period: "mar 2025 - aug 2025",
    description: "polishing UI and building ai-powered tools for creators",
    href: "https://magichour.ai",
  },
  {
    title: "revisiondojo (yc f24)",
    role: "software engineer intern",
    period: "jan 2025 - mar 2025",
    description: "figma stuff + UI polishing",
    href: "https://revisiondojo.com",
  },
  {
    title: "muslim tech collaborative",
    role: "frontend developer",
    period: "dec 2024 - jan 2025",
    description: "revamped and rebuilt the community website",
    href: "https://mtc.so",
  },
];

const projectItems = [
  {
    title: "observatory",
    role: "contributor / maintainer",
    description: "open-source project for AI-agent observability",
    href: "https://github.com/The-Context-Company/observatory",
  },
  {
    title: "muslim tech collaborative",
    role: "creator / maintainer",
    description:
      "community website for muslims interested in tech. 30+ universities involved",
    href: "https://mtc.so",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 lowercase mx-auto max-w-3xl w-full">
      <Header />
      <SectionList title="experience" items={workItems} />
      <EducationSection />
      <SkillsSection />
      <SectionList title="projects" items={projectItems} />
      <LinksSection />
    </div>
  );
}
