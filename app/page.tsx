import { Header } from "@/components/header";
import { SectionList } from "@/components/section";
import { LinksSection } from "@/components/links-section";
import { EducationSection } from "@/components/education-section";
import { SkillsSection } from "@/components/skills-section";
import { DATA } from "@/data/me";
import { Testimonials } from "@/components/testimonials";
import { MotionSection, MotionWrapper } from "@/components/motion-wrapper";

const sections = [
  <Header key="header" />,
  <SectionList
    key="work"
    title="what I did instead of nap"
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
    <MotionWrapper>
      {sections.map((section, idx) => (
        <MotionSection key={idx}>{section}</MotionSection>
      ))}
    </MotionWrapper>
  );
}
