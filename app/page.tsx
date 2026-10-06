import { Header } from "@/components/header";
import { LinksSection } from "@/components/links-section";

const sections = [
  {
    id: "header",
    component: <Header />,
  },
  {
    id: "links",
    component: <LinksSection />,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 lowercase">
      {sections.map((section) => (
        <div key={section.id}>{section.component}</div>
      ))}
    </div>
  );
}
