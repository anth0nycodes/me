"use client";

import Image from "next/image";
import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";
import { determineStatusColor } from "@/lib/status";
import { cn } from "@/lib/utils";

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

interface ProjectButtonProps {
  href: string;
  label: string;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  onClick?: () => void;
}

function ProjectButton({ href, label, onMouseDown, onMouseEnter, onClick }: ProjectButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-background ring-border inline-block cursor-pointer rounded-sm px-3 py-1.5 text-sm ring-1 transition hover:opacity-85 active:scale-95 dark:ring-0"
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {label}
    </a>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { trigger } = useHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });
  const [clickLowSFX] = useSound("/audio/press.mp3", {
    volume: 0.125,
    playbackRate: 0.5,
    soundEnabled: audioEnabled,
  });
  const [clickHighSFX] = useSound("/audio/press.mp3", {
    volume: 0.125,
    playbackRate: 0.75,
    soundEnabled: audioEnabled,
  });
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
      <div className="ring-border relative overflow-clip rounded-md ring-2 dark:ring-0">
        <div
          className="group"
          onMouseEnter={() => {
            trigger("selection");
          }}
        >
          <div className="bg-background/80 absolute inset-0 z-30 opacity-0 backdrop-blur-xs transition-opacity duration-250 group-hover:opacity-100 group-has-focus-visible:opacity-100 motion-reduce:duration-0" />
          <div className="pointer-events-none absolute z-40 flex size-full translate-y-3.75 flex-col items-center justify-center gap-2 opacity-0 transition duration-350 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-has-focus-visible:pointer-events-auto group-has-focus-visible:translate-y-0 group-has-focus-visible:opacity-100 motion-reduce:duration-0">
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
          </div>
          <Image
            src={project.image}
            alt={project.title}
            width={500}
            height={180}
            sizes="(min-width: 640px) 576px, 100vw"
            className="h-45 w-full object-cover transition-transform duration-500 select-none group-hover:scale-115 group-has-focus-visible:scale-115 motion-reduce:duration-0 motion-reduce:group-hover:scale-100 motion-reduce:group-has-focus-visible:scale-100 sm:h-60"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{project.title}</h2>
            <span
              className={cn(
                "rounded-sm px-1.5 py-0.5 text-[10px] select-none",
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
    </div>
  );
}
