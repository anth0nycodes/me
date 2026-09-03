"use client";

import { useSound } from "use-sound";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useWebHaptics } from "web-haptics/react";
import { determineStatusColor } from "./section";
import { useState } from "react";

interface Project {
  title: string;
  role: string;
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

interface ProjectButtonProps {
  href: string;
  label: string;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  onClick?: () => void;
}

function ProjectButton({
  href,
  label,
  onMouseDown,
  onMouseEnter,
  onClick,
}: ProjectButtonProps) {
  return (
    <button
      className="cursor-pointer active:scale-95 px-2 py-1 bg-background hover:opacity-85 transition rounded-sm"
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        {" "}
        {label}
      </a>
    </button>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const { trigger } = useWebHaptics();
  const [playHoverSFX] = useSound("/audio/hover.mp3", { volume: 0.125 });
  const [clickLowSFX] = useSound("/audio/hover.mp3", {
    volume: 0.125,
    playbackRate: 0.5,
  });
  const [clickHighSFX] = useSound("/audio/hover.mp3", {
    volume: 0.125,
    playbackRate: 0.75,
  });
  const activeProject = project === hoveredProject;
  const prefersReducedMotion = useReducedMotion();
  const overlayButtons = [
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
      <div className="relative overflow-clip rounded-md">
        <div
          className="group"
          onMouseEnter={() => {
            setHoveredProject(project);
            trigger("selection");
          }}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <AnimatePresence>
            {activeProject && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { ease: "easeInOut", duration: 0.15 }
                  }
                  className="absolute backdrop-blur-xs inset-0 z-10 bg-background/80"
                />
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { ease: "easeInOut", duration: 0.25 }
                  }
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2"
                >
                  {overlayButtons.map((button) => (
                    <ProjectButton
                      key={button.label}
                      href={button.href}
                      label={button.label}
                      onMouseEnter={playHoverSFX}
                      onMouseDown={() => clickLowSFX()}
                      onClick={() => {
                        trigger("light");
                        clickHighSFX();
                      }}
                    />
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <img
            src={project.image}
            alt={project.title}
            className={cn(
              "w-full h-45 object-cover",
              hoveredProject ? "scale-115" : "scale-100",
              !prefersReducedMotion && "transition-transform duration-500",
            )}
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold mb-1">{project.title}</h3>
          <span
            className={cn(
              " px-2 py-1 text-[11px] rounded-md",
              determineStatusColor(project.status),
            )}
          >
            {project.status}
          </span>
        </div>
        <p className="text-[13px] mb-2">{project.role}</p>
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <div
                className="py-0.5 px-1.5 border border-border rounded-md bg-card"
                key={tech}
              >
                <span className="text-[11px]">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
