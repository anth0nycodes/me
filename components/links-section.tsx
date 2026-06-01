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
];

export function LinksSection() {
  const { trigger } = useWebHaptics();

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl flex items-center gap-3 font-display font-semibold tracking-tight">
        <span>🔗</span> where to find me
      </h2>
      <div className="flex flex-wrap gap-4 font-mono text-sm">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target="_blank"
            onClick={() => trigger("light")}
            className="text-muted-foreground hover:text-glow transition-colors duration-200"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
