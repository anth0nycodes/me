"use client";

import { Dithering } from "@paper-design/shaders-react";
import { DATA } from "@/data/me";
import { Building2, MapPin } from "lucide-react";
import Image from "next/image";
import { Underline } from "./ui/underline";
import { useState } from "react";
import useSound from "use-sound";

function getRandomImage(images: readonly string[], exclude?: string) {
  const pool = exclude ? images.filter((image) => image !== exclude) : images;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

export function Header() {
  const [clickLowSFX] = useSound("/audio/hover.mp3", {
    volume: 0.125,
    playbackRate: 0.5,
  });
  const [clickHighSFX] = useSound("/audio/hover.mp3", {
    volume: 0.125,
    playbackRate: 0.75,
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
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 items-center">
        <button
          onClick={() => {
            const randomImage = getRandomImage(DATA.images, avatarImage);
            setAvatarImage(randomImage);
            clickHighSFX();
          }}
          onMouseDown={() => clickLowSFX()}
          className="cursor-pointer select-none size-12.5 active:scale-95 transition-transform duration-200 rounded-xl overflow-clip"
        >
          <Image
            src={avatarImage}
            className="object-cover size-full"
            width={50}
            height={50}
            alt="Picture of me"
          />
        </button>
        <div className="flex flex-col gap-1">
          <h1 className="font-medium lowercase">
            <span className="inline-block">{DATA.name}</span>
          </h1>
          <div className="text-sm flex gap-4">
            {headerInfo.map((item) => (
              <div
                className="flex items-center text-muted-foreground gap-2"
                key={item.text}
              >
                <item.icon className="size-4" />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-sm flex flex-col gap-3">
        <p>
          hey, I&apos;m Anthony — a{" "}
          <Underline hexcode="#22a8f5" delay={0.65} duration={1}>
            fullstack engineer
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
      <Dithering
        className="-z-1 w-full h-28"
        colorBack="#141414"
        colorFront="#8fb7b7"
        shape="warp"
        type="4x4"
        size={2.375}
        speed={0.25}
      />
    </div>
  );
}
