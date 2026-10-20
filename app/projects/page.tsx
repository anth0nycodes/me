import { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { DATA } from "@/data/me";

export const metadata: Metadata = {
  title: "Projects",
  description: "My personal projects and experiments.",
};

export default function ProjectsPage() {
  return (
    <section className="bg-background flex min-h-screen flex-col gap-6">
      <h1 className="text-muted-foreground dark:text-foreground border-separator border-b pb-2 text-base font-medium capitalize">
        <span>
          projects
          <sup className="text-muted-foreground ml-1.5 text-xs select-none">
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
