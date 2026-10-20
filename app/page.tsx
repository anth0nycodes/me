import { CreativeWorksSection } from "@/components/home/creative-works-section";
import { Header } from "@/components/home/header";
import { LinksSection } from "@/components/home/links-section";

const sections = [
  {
    id: "header",
    component: <Header />,
  },
  {
    id: "creative-works",
    component: <CreativeWorksSection />,
  },
  {
    id: "links",
    component: <LinksSection />,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <div key={section.id}>{section.component}</div>
      ))}
    </div>
  );
}
