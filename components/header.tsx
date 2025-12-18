"use client";

import { DATA } from "@/data/me";
import { Building2, MapPin } from "lucide-react";
import Image from "next/image";
import { Underline } from "./ui/underline";

export function Header() {
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
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 items-center">
        <Image
          src="/me.png"
          className="rounded-xl"
          width={50}
          height={50}
          alt="Picture of me"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-medium lowercase">
            <span className="inline-block">{DATA.name}</span>
          </h1>
          <div className="flex gap-4">
            {headerInfo.map((item, index) => (
              <div
                className="flex items-center text-muted-foreground gap-2"
                key={index}
              >
                <item.icon className="size-4" />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p>
          hey, I&apos;m Anthony — a{" "}
          <Underline hexcode="#22a8f5" delay={0.65} duration={1}>
            design engineer
          </Underline>{" "}
          based in NYC. I enjoy building beautiful and{" "}
          <Underline hexcode="#58CC02" delay={1.5} duration={1}>
            thoughtful user experiences
          </Underline>{" "}
          that make products feel better, while{" "}
          <Underline hexcode="#f5a623" delay={2.3} duration={1}>
            continuously learning
          </Underline>{" "}
          along the way.
        </p>{" "}
        <p>
          when I&apos;m not coding, I&apos;m usually at the gym or spending time
          with people i care about.
        </p>
      </div>
    </div>
  );
}
