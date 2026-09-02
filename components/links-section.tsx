"use client";

import Link from "next/link";
import { useWebHaptics } from "web-haptics/react";

const links = [
  { title: "github", href: "https://github.com/anth0nycodes" },
  { title: "linkedin", href: "https://www.linkedin.com/in/anth0nycodes" },
  { title: "x", href: "https://x.com/anth0nycodes" },
  { title: "coffee chat ☕️", href: "https://cal.com/anth0nycodes" },
  { title: "resume", href: "https://anthonyhoang.dev/resume.pdf" },
  { title: "email", href: "mailto:hoanganthony2207@gmail.com" },
  {
    title: "design playground 🎨",
    href: "https://www.figma.com/design/cVCS3lKtT23stQWnnUAMGa/design-playground?node-id=0-1&t=g4NbBNdZ9dm1F2xO-1",
  },
];

export function LinksSection() {
  const { trigger } = useWebHaptics();

  return (
    <section className="flex flex-col gap-6">
      <h3 className="border-b pb-2 border-[#222222] text-base font-medium">
        <span>
          where to find me
          <sup className="ml-1.5 select-none text-muted-foreground text-xs">
            ({links.length})
          </sup>
        </span>
      </h3>
      <div className="flex flex-wrap gap-4 text-sm">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target="_blank"
            onClick={() => trigger("light")}
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
