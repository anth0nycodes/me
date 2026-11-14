"use client";

import { useState } from "react";
import Image from "next/image";
import useSound from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { DATA } from "@/data/me";

function getRandomImage(images: readonly string[], exclude?: string) {
  const pool = exclude ? images.filter((image) => image !== exclude) : images;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** A profile picture that swaps to a different one on each click. */
export function AvatarShuffle() {
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

  return (
    <button
      onClick={() => {
        setAvatarImage(getRandomImage(DATA.images, avatarImage));
        clickHighSFX();
      }}
      onMouseDown={() => clickLowSFX()}
      aria-label="Shuffle profile picture"
      className="border-muted size-14 cursor-pointer overflow-clip rounded-full border-2 transition-transform duration-200 select-none active:scale-95 dark:border-none"
    >
      <Image
        src={avatarImage}
        className="size-full object-cover"
        width={56}
        height={56}
        alt="Picture of me"
      />
    </button>
  );
}
