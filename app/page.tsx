import { Header } from "@/components/header";
import { SectionList } from "@/components/section";
import { LinksSection } from "@/components/links-section";
import { DATA } from "@/data/me";
import { MotionSection, MotionWrapper } from "@/components/motion-wrapper";

const projectsList = (
  DATA.projects.length > 3
    ? DATA.projects.filter((p) => p.primary)
    : DATA.projects
).map((p) => ({
  title: p.title,
  role: p.role,
  status: p.status,
  description: p.description,
  href: p.sourceCodeHref,
  image: p.image,
}));

const sections = [
  <Header key="header" />,
  <SectionList key="work" sectionTitle="work experience" items={DATA.work} />,
  <SectionList
    key="creative-works"
    sectionTitle="creative works"
    items={DATA.creativeWorks}
  />,
  <SectionList
    key="projects"
    sectionTitle="projects"
    items={projectsList}
    itemsCount={DATA.projects.length}
    viewAllHref="/projects"
    viewAllText="all projects"
  />,
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
