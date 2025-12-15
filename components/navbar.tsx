"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "h") {
        router.push("/");
      }

      if (e.key === "t") {
        router.push("/thoughts");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return (
    <div className="flex gap-3 items-center max-w-2xl mx-auto mb-5">
      <Link
        href="/"
        className="hover:text-primary text-muted-foreground transition-colors"
      >
        [h] home
      </Link>
      <Link
        href="/thoughts"
        className="hover:text-primary text-muted-foreground transition-colors"
      >
        [t] thoughts
      </Link>
    </div>
  );
}
