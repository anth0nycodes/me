"use client";

import { DATA } from "@/data/me";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Underline } from "./ui/underline";

export function Header() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <Image
          src={DATA.avatarUrl}
          className="rounded-xl ring-1 ring-border"
          width={56}
          height={56}
          alt="Picture of me"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold font-display tracking-tight lowercase">
            {DATA.name}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              <span>{DATA.location}</span>
            </div>
            <span className="text-border">·</span>
            <div className="flex items-center gap-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-glow/75" />
                <span className="relative inline-flex size-2 rounded-full bg-glow" />
              </span>
              <span>{DATA.occupation}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p>
          hey, I&apos;m Anthony — a{" "}
          <Underline hexcode="#22c55e" delay={0.65} duration={1}>
            roblox game developer
          </Underline>{" "}
          based in NYC. I enjoy building{" "}
          <Underline hexcode="#06b6d4" delay={1.5} duration={1}>
            fun and immersive game experiences
          </Underline>{" "}
          that players love, while{" "}
          <Underline hexcode="#eab308" delay={2.3} duration={1}>
            continuously learning
          </Underline>{" "}
          along the way.
        </p>
        <p>
          when I&apos;m not coding, I&apos;m usually at the gym or spending time
          with people i care about.
        </p>
      </div>
    </div>
  );
}
