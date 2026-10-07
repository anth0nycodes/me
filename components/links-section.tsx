"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { Coffee, FileText } from "lucide-react";
import useSound from "use-sound";
import { GithubIcon, GmailIcon, LinkedinIcon, XIcon } from "@/components/home/svgs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";

interface SocialLink {
  title: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const links: SocialLink[] = [
  {
    title: "github",
    href: "https://github.com/anth0nycodes",
    icon: GithubIcon,
  },
  {
    title: "linkedin",
    href: "https://www.linkedin.com/in/anth0nycodes",
    icon: LinkedinIcon,
  },
  { title: "x", href: "https://x.com/anth0nycodes", icon: XIcon },
  {
    title: "coffee chat ☕️",
    href: "https://cal.com/anth0nycodes",
    icon: Coffee,
  },
  {
    title: "resume",
    href: "https://anthonyhoang.dev/resume.pdf",
    icon: FileText,
  },
  {
    title: "email",
    href: "mailto:hoanganthony2207@gmail.com",
    icon: GmailIcon,
  },
];

export function LinksSection() {
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });
  const { trigger } = useHaptics();

  return (
    <section className="flex items-center justify-between border-separator border-t pt-12 text-sm">
      <span className="text-muted-inverse w-full">form and function.</span>
      <div className="flex gap-1.5">
        {links.map(({ title, href, icon: Icon }) => (
          <Tooltip key={title}>
            <TooltipTrigger
              render={<Link href={href} target="_blank" />}
              aria-label={title}
              onMouseEnter={() => playHoverSFX()}
              onClick={() => trigger("light")}
              className="text-foreground hover:bg-muted flex size-6 shrink-0 items-center justify-center rounded-md transition-colors"
            >
              <Icon className="size-3 shrink-0" />
            </TooltipTrigger>
            <TooltipContent>{title}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </section>
  );
}
