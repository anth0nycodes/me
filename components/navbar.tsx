"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSound } from "use-sound";
import { AudioToggle } from "@/components/audio-toggle";
import { ThemeToggler } from "@/components/theme-toggler";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { DATA } from "@/data/me";
import { useHaptics } from "@/hooks/use-haptics";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/about", label: "About" },
  { href: `mailto:${DATA.email}`, label: "Contact" },
];

/**
 * The site header on every page: name on the left, links and the toggles on the right. On phones
 * the links fold into a menu that drops down under the bar, leaving just the toggles and its button.
 */
export default function Navbar() {
  const pathname = usePathname();
  const { audioEnabled } = useAudioEnabled();
  const { trigger } = useHaptics();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // while the menu is open, Esc or a tap anywhere outside the header closes it
  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node))
        setIsMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  // following any link closes the menu, so it's never left open on the next page
  function handleNavigate() {
    trigger("light");
    setIsMenuOpen(false);
  }

  function renderLinks(linkClassName: string) {
    return LINKS.map(({ href, label }) => {
      const isCurrent = pathname === href;
      return (
        <Link
          key={href}
          href={href}
          aria-current={isCurrent ? "page" : undefined}
          onMouseEnter={() => playHoverSFX()}
          onClick={handleNavigate}
          className={cn(
            "transition-colors duration-150",
            isCurrent
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
            linkClassName
          )}
        >
          {label}
        </Link>
      );
    });
  }

  return (
    // pinned to the top while scrolling, full width with a hairline under it; its padding lines the
    // name and links up with the page content (main's 1.5rem plus the pages' 5vw)
    <header
      ref={headerRef}
      className="bg-background/80 border-separator sticky top-0 z-40 flex items-center justify-between gap-4 border-b px-6 py-5 backdrop-blur-md lg:px-[calc(5vw+1.5rem)]"
    >
      <Link
        href="/"
        onMouseEnter={() => playHoverSFX()}
        onClick={handleNavigate}
        className="flex shrink-0 items-center gap-2.5 text-sm font-medium tracking-[-0.04em] whitespace-nowrap"
      >
        {/* the mark: a blue dot, for the favorite color */}
        <span
          aria-hidden="true"
          className="size-2.5 rounded-full bg-blue-500"
        />
        {DATA.name}
      </Link>
      <div className="flex items-center gap-5">
        <nav
          aria-label="Main"
          className="hidden items-center gap-5 text-sm sm:flex"
        >
          {renderLinks("")}
        </nav>
        <div className="flex items-center gap-1">
          <AudioToggle />
          <ThemeToggler />
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => {
              trigger("light");
              setIsMenuOpen((open) => !open);
            }}
            className="hover:bg-accent text-muted-foreground flex cursor-pointer items-center justify-center rounded-md p-2 sm:hidden"
          >
            {isMenuOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {/* phones only: the links in a panel that drops down under the bar. Its row grows from 0fr to
          1fr so the height animates without measuring; inert while closed, so nothing in it can be
          focused or read */}
      <div
        id="mobile-menu"
        inert={!isMenuOpen}
        className={cn(
          "bg-background border-separator absolute inset-x-0 top-full grid border-b transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none sm:hidden",
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] border-transparent opacity-0"
        )}
      >
        <nav aria-label="Main" className="overflow-hidden">
          <div className="flex flex-col px-6 py-2">
            {renderLinks("py-3 text-base")}
          </div>
        </nav>
      </div>
    </header>
  );
}
