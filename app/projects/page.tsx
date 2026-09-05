import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/me";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "My personal projects and experiments.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto w-full max-w-2xl flex flex-col gap-4 min-h-screen bg-background">
      <h1 className="lowercase border-b pb-2 border-[#222222] text-base font-medium">
        <span>
          my projects
          <sup className="ml-1.5 select-none text-muted-foreground text-xs">
            ({DATA.projects.length})
          </sup>
        </span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6">
        {DATA.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
