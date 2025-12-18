import { Header } from "@/components/header";
import { SectionList } from "@/components/section";
import { LinksSection } from "@/components/links-section";
import { SkillsSection } from "@/components/skills-section";
import { DATA } from "@/data/me";
import { Testimonials } from "@/components/testimonials";
import { MotionSection, MotionWrapper } from "@/components/motion-wrapper";
import { CreativeWorksSection } from "@/components/creative-works-section";

const sections = [
  <Header key="header" />,
  <SectionList
    key="work"
    title="what I did instead of nap"
    emoji="💼"
    items={DATA.work}
  />,
  <CreativeWorksSection key="creative-works" />,
  <SectionList
    key="projects"
    title="other works"
    emoji="🗂️"
    items={DATA.projects}
  />,
  <SkillsSection key="skills" />,
  <Testimonials key="testimonials" />,
  <LinksSection key="links" />,
];

export default function HomePage() {
  return (
    <main>
      <MotionWrapper>
        {sections.map((section, idx) => (
          <MotionSection key={idx}>{section}</MotionSection>
        ))}
      </MotionWrapper>
    </main>
  );
}
