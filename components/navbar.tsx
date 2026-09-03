"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useWebHaptics } from "web-haptics/react";
import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { Volume2, VolumeOff } from "lucide-react";

export default function Navbar() {
  const { audioEnabled, setAudioEnabled } = useAudioEnabled();
  const router = useRouter();
  const { trigger } = useWebHaptics();
  const [playHoverSFX] = useSound("/audio/hover.mp3", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });
  const triggerRef = useRef(trigger);
  triggerRef.current = trigger;

  const navItems = [
    {
      prefix: "[h]",
      text: "home",
      href: "/",
    },
    {
      prefix: "[p]",
      text: "projects",
      href: "/projects",
    },
    {
      prefix: "[t]",
      text: "thoughts",
      href: "/thoughts",
    },
    {
      prefix: "[v]",
      text: "vault",
      href: "/vault",
    },
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "h":
          triggerRef.current("light");
          router.push("/");
          break;
        case "p":
          triggerRef.current("light");
          router.push("/projects");
          break;
        case "t":
          triggerRef.current("light");
          router.push("/thoughts");
          break;
        case "v":
          triggerRef.current("light");
          router.push("/vault");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto mb-5">
      <div className="flex gap-3 items-center">
        {navItems.map((item) => (
          <Link
            key={item.text}
            href={item.href}
            onMouseEnter={() => playHoverSFX()}
            onClick={() => trigger("light")}
            className="text-sm flex gap-2 items-center hover:text-primary text-muted-foreground transition-colors"
          >
            <span className="hidden sm:inline-block">{item.prefix}</span>
            {item.text}
          </Link>
        ))}
      </div>
      <button
        onClick={() => setAudioEnabled((prev) => !prev)}
        className="flex cursor-pointer justify-center items-center hover:bg-accent rounded-md p-2 text-muted-foreground"
      >
        {audioEnabled ? (
          <Volume2 className="size-4" aria-hidden="true" />
        ) : (
          <VolumeOff className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
