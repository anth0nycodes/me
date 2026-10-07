"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { Building2, MapPin } from "lucide-react";
import useSound from "use-sound";
import { AudioToggle } from "@/components/audio-toggle";
import { Favicon } from "@/components/home/favicon";
import { LinkBadge } from "@/components/home/link-badge";
import { NavLink } from "@/components/home/nav-link";
import { SelectionBox } from "@/components/home/selection-box";
import { NpmIcon } from "@/components/home/svgs";
import { ThemeToggler } from "@/components/theme-toggler";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { DATA } from "@/data/me";
import { ROUTE_COLORS } from "@/lib/route-colors";

function getRandomImage(images: readonly string[], exclude?: string) {
  const pool = exclude ? images.filter((image) => image !== exclude) : images;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

const workBadges = DATA.work.map((job) => ({
  name: job.title,
  href: job.href,
  highlight: job.highlight,
  isInternship: job.role.includes("intern"),
  icon: <Favicon src={job.favicon} srcDark={"faviconDark" in job ? job.faviconDark : undefined} />,
}));

const internshipBadges = workBadges.filter((badge) => badge.isInternship);
const otherWorkBadges = workBadges.filter((badge) => !badge.isInternship);

const projectBadges = DATA.projects
  .filter((project) => project.primary)
  .map((project) => ({
    name: project.title,
    href: project.projectHref,
    icon:
      "favicon" in project ? <Favicon src={project.favicon} /> : <NpmIcon className="size-3.5" />,
  }));

export function Header() {
  const { audioEnabled } = useAudioEnabled();
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
  const [avatarImage, setAvatarImage] = useState<string>(DATA.avatarUrl);

  const headerInfo = [
    {
      icon: MapPin,
      text: DATA.location,
    },
    {
      icon: Building2,
      text: DATA.occupation,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            const randomImage = getRandomImage(DATA.images, avatarImage);
            setAvatarImage(randomImage);
            clickHighSFX();
          }}
          onMouseDown={() => clickLowSFX()}
          aria-label="Shuffle profile picture"
          className="border-muted size-12.5 cursor-pointer overflow-clip rounded-full border-2 transition-transform duration-200 select-none active:scale-95 dark:border-none"
        >
          <Image
            src={avatarImage}
            className="size-full object-cover"
            width={50}
            height={50}
            alt="Picture of me"
          />
        </button>
        <div className="flex flex-col gap-1">
          <h1 className="font-medium lowercase">
            <span className="inline-block">{DATA.name}</span>
          </h1>
          <div className="flex gap-4 text-sm">
            {headerInfo.map((item) => (
              <div className="text-muted-foreground flex items-center gap-2" key={item.text}>
                <item.icon className="size-4" />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <AudioToggle />
          <ThemeToggler />
        </div>
      </div>
      <div className="flex flex-col gap-6 text-sm leading-[1.7]">
        <p>
          hey, I&apos;m Anthony — a <SelectionBox>design engineer</SelectionBox> based in NYC. I
          enjoy building beautiful and thoughtful user experiences that make products feel better,
          while continuously learning along the way.
        </p>{" "}
        <p>
          previously, I interned at{" "}
          {internshipBadges.map((badge, index) => (
            <Fragment key={badge.name}>
              {index > 0 && index === internshipBadges.length - 1 && "and "}
              <LinkBadge href={badge.href} icon={badge.icon}>
                {badge.name}
              </LinkBadge>{" "}
              {badge.highlight}
              {index < internshipBadges.length - 1 ? ", " : "."}
            </Fragment>
          ))}
          {otherWorkBadges.map((badge) => (
            <Fragment key={badge.name}>
              {" "}
              I also worked with{" "}
              <LinkBadge href={badge.href} icon={badge.icon}>
                {badge.name}
              </LinkBadge>{" "}
              {badge.highlight}.
            </Fragment>
          ))}
        </p>
        <p>
          on the side, I build things like{" "}
          {projectBadges.map((badge, index) => (
            <Fragment key={badge.name}>
              {index === projectBadges.length - 1 && "and "}
              <LinkBadge href={badge.href} icon={badge.icon}>
                {badge.name}
              </LinkBadge>
              {index < projectBadges.length - 1 ? " " : "."}
            </Fragment>
          ))}
        </p>
        <p>
          take a look at my{" "}
          <NavLink href="/projects" color={ROUTE_COLORS.projects}>
            projects
          </NavLink>
          , the{" "}
          <NavLink href="/craft" color={ROUTE_COLORS.craft}>
            craft
          </NavLink>{" "}
          I&apos;ve been honing, some{" "}
          <NavLink href="/thoughts" color={ROUTE_COLORS.thoughts}>
            thoughts
          </NavLink>{" "}
          I&apos;ve written down, or the{" "}
          <NavLink href="/vault" color={ROUTE_COLORS.vault}>
            vault
          </NavLink>{" "}
          of resources I keep coming back to.
        </p>
        <p>when I&apos;m not coding, I&apos;m usually doomscrolling or laying in bed, or both 😂</p>
      </div>
    </div>
  );
}
