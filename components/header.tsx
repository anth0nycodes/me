"use client";

import { useState } from "react";
import Image from "next/image";
import { Dithering } from "@paper-design/shaders-react";
import { Building2, MapPin } from "lucide-react";
import { useReducedMotion } from "motion/react";
import useSound from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { DATA } from "@/data/me";
import { Underline } from "./ui/underline/underline";

function getRandomImage(images: readonly string[], exclude?: string) {
  const pool = exclude ? images.filter((image) => image !== exclude) : images;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

export function Header() {
  const { audioEnabled } = useAudioEnabled();
  const [clickLowSFX] = useSound("/audio/hover.mp3", {
    volume: 0.125,
    playbackRate: 0.5,
    soundEnabled: audioEnabled,
  });
  const [clickHighSFX] = useSound("/audio/hover.mp3", {
    volume: 0.125,
    playbackRate: 0.75,
    soundEnabled: audioEnabled,
  });
  const [avatarImage, setAvatarImage] = useState<string>(DATA.avatarUrl);
  const prefersReducedMotion = useReducedMotion();

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
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            const randomImage = getRandomImage(DATA.images, avatarImage);
            setAvatarImage(randomImage);
            clickHighSFX();
          }}
          onMouseDown={() => clickLowSFX()}
          aria-label="Shuffle profile picture"
          className="size-12.5 cursor-pointer overflow-clip rounded-xl transition-transform duration-200 select-none active:scale-95"
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
      </div>
      <div className="flex flex-col gap-3 text-sm">
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
        <p>when I&apos;m not coding, I&apos;m usually doomscrolling or laying in bed, or both 😂</p>
      </div>
      <Dithering
        className="-z-1 h-28 w-full"
        colorBack="#0F0F0F"
        colorFront="#8fb7b7"
        shape="warp"
        type="4x4"
        size={2.375}
        speed={prefersReducedMotion ? 0 : 0.25}
      />
    </div>
  );
}
