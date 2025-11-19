import { Header } from "@/components/header";
import { SectionList } from "@/components/section";
import { LinksSection } from "@/components/links-section";
import { EducationSection } from "@/components/education-section";
import { SkillsSection } from "@/components/skills-section";
import { DATA } from "@/data/me";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 lowercase mx-auto max-w-3xl w-full">
      <Header />
      <SectionList title="my nap-time detours" items={DATA.work} />
      <EducationSection />
      <SkillsSection />
      <SectionList title="projects" items={DATA.projects} />
      <LinksSection />
    </div>
  );
}
