import { ReactNode } from "react";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function ThoughtsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="bg-background min-h-screen">
      {children}
      <ScrollToTop />
    </div>
  );
}
