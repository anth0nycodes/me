import { ScrollToTop } from "@/components/scroll-to-top";
import { ReactNode } from "react";

export default function ThoughtsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <ScrollToTop />
    </div>
  );
}
