"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Volume2, VolumeOff } from "lucide-react";
import { useSound } from "use-sound";
import { useWebHaptics } from "web-haptics/react";
import { useAudioEnabled } from "@/context/use-audio-enabled";

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
      prefix: "[c]",
      text: "craft",
      href: "/craft",
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
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case "h":
          triggerRef.current("light");
          router.push("/");
          break;
        case "p":
          triggerRef.current("light");
          router.push("/projects");
          break;
        case "c":
          triggerRef.current("light");
          router.push("/craft");
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
    <div className="mx-auto mb-5 flex max-w-2xl items-center justify-between">
      <div className="flex items-center gap-3">
        {navItems.map((item) => (
          <Link
            key={item.text}
            href={item.href}
            onMouseEnter={() => playHoverSFX()}
            onClick={() => trigger("light")}
            className="hover:text-primary text-muted-foreground flex items-center gap-2 text-sm"
          >
            <span className="hidden sm:inline-block">{item.prefix}</span>
            {item.text}
          </Link>
        ))}
      </div>
      <button
        onClick={() => setAudioEnabled((prev) => !prev)}
        className="hover:bg-accent text-muted-foreground flex cursor-pointer items-center justify-center rounded-md p-2"
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
