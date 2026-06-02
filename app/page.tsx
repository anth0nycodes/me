import { Header } from "@/components/header";
import { SectionList } from "@/components/section";
import { LinksSection } from "@/components/links-section";
import { SkillsSection } from "@/components/skills-section";
import { DATA } from "@/data/me";
import { Testimonials } from "@/components/testimonials";
import { MotionSection, MotionWrapper } from "@/components/motion-wrapper";

const sections = [
  <Header key="header" />,
  <SectionList
    key="work"
    title="prior to roblox game dev"
    emoji="💼"
    items={DATA.work}
  />,
  <SectionList
    key="projects"
    title="what I'm building"
    emoji="🎮"
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
