"use client";

import Image from "next/image";
import { determineStatusColor } from "@/lib/status";
import { cn } from "@/lib/utils";
import { ExternalLink } from "../ui/external-link";

interface Project {
  title: string;
  status: string;
  techStack: readonly string[];
  description: string;
  projectHref: string;
  sourceCodeHref: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const LINKS = [
    {
      label: "View project",
      href: project.projectHref,
    },
    {
      label: "Source code",
      href: project.sourceCodeHref,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="ring-border relative overflow-clip rounded-md ring-2 dark:ring-0">
        <Image
          src={project.image}
          alt={project.title}
          width={500}
          height={180}
          loading="eager"
          sizes="(min-width: 640px) 576px, 100vw"
          draggable={false}
          className="h-45 w-full object-cover transition-transform duration-500 select-none group-hover:scale-115 group-has-focus-visible:scale-115 motion-reduce:duration-0 motion-reduce:group-hover:scale-100 motion-reduce:group-has-focus-visible:scale-100 sm:h-60"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">{project.title}</h2>
              <span
                className={cn(
                  "rounded-sm px-1.5 py-0.5 text-[11px] select-none",
                  determineStatusColor(project.status),
                )}
              >
                {project.status}
              </span>
            </div>
            <p className="text-muted-foreground text-xs">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <div
                className="border-border bg-card flex items-center justify-center rounded-md border px-1.5 py-0.5 leading-6 select-none"
                key={tech}
              >
                <span className="text-[11px]">{tech}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 lowercase">
          {LINKS.map((link) => (
            <ExternalLink
              key={link.label}
              variant="underline"
              href={link.href}
              label={link.label}
              additionalContext={project.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
