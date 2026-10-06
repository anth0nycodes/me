import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/me";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "My personal projects and experiments.",
};

export default function ProjectsPage() {
  return (
    <section className="flex flex-col gap-4 min-h-screen bg-background">
      <h1 className="text-muted-foreground dark:text-foreground border-separator border-b pb-2 text-base font-medium lowercase">
        <span>
          my projects
          <sup className="ml-1.5 select-none text-muted-foreground text-xs">
            ({DATA.projects.length})
          </sup>
        </span>
      </h1>
      <div className="flex flex-col gap-10">
        {DATA.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
