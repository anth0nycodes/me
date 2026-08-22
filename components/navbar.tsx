"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useWebHaptics } from "web-haptics/react";
import { useSound } from "use-sound";

export default function Navbar() {
  const router = useRouter();
  const { trigger } = useWebHaptics();
  const [playHoverSFX] = useSound("/audio/hover.mp3", { volume: 0.125 });
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
    <div className="flex gap-3 items-center max-w-2xl mx-auto mb-5">
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
  );
}
