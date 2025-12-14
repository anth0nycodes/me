import { Header } from "@/components/header";
import { SectionList } from "@/components/section";
import { LinksSection } from "@/components/links-section";
import { EducationSection } from "@/components/education-section";
import { SkillsSection } from "@/components/skills-section";
import { DATA } from "@/data/me";
import { Testimonials } from "@/components/testimonials";
import { MotionSection } from "@/components/motion-wrapper";

const sections = [
  <Header key="header" />,
  <SectionList
    key="work"
    title="my nap-time detours"
    emoji="💼"
    items={DATA.work}
  />,
  <EducationSection key="education" />,
  <SkillsSection key="skills" />,
  <SectionList
    key="projects"
    title="projects"
    emoji="🗂️"
    items={DATA.projects}
  />,
  <Testimonials key="testimonials" />,
  <LinksSection key="links" />,
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 lowercase mx-auto max-w-2xl w-full">
      {sections.map((section, idx) => (
        <MotionSection key={idx}>{section}</MotionSection>
      ))}
    </div>
  );
}
