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
  {
    id: "header",
    component: <Header />,
  },
  {
    id: "work experience",
    component: <SectionList sectionTitle="work experience" items={DATA.work} />,
  },
  {
    id: "creative-works",
    component: (
      <SectionList sectionTitle="creative works" items={DATA.creativeWorks} />
    ),
  },
  {
    id: "projects",
    component: (
      <SectionList
        sectionTitle="projects"
        items={projectsList}
        itemsCount={DATA.projects.length}
        viewAllHref="/projects"
        viewAllText="all projects"
      />
    ),
  },
  {
    id: "links",
    component: <LinksSection />,
  },
];

export default function HomePage() {
  return (
    <main>
      <MotionWrapper>
        {sections.map((section) => (
          <MotionSection key={section.id}>{section.component}</MotionSection>
        ))}
      </MotionWrapper>
    </main>
  );
}
