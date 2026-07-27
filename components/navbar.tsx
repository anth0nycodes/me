"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useWebHaptics } from "web-haptics/react";
import { ThemeToggler } from "./theme-toggler";

export default function Navbar() {
  const router = useRouter();
  const { trigger } = useWebHaptics();
  const triggerRef = useRef(trigger);
  triggerRef.current = trigger;

  const navItems = [
    {
      text: "[h] home",
      href: "/",
    },
    {
      text: "[t] thoughts",
      href: "/thoughts",
    },
    {
      text: "[v] vault",
      href: "/vault",
    },
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "h") {
        triggerRef.current("light");
        router.push("/");
      }

      if (e.key === "t") {
        triggerRef.current("light");
        router.push("/thoughts");
      }

      if (e.key === "v") {
        triggerRef.current("light");
        router.push("/vault");
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
          onClick={() => trigger("light")}
          className="hover:text-primary text-muted-foreground transition-colors"
        >
          {item.text}
        </Link>
      ))}
      <ThemeToggler />
    </div>
  );
}
