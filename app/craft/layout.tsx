import { ReactNode } from "react";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function CraftLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {children}
      <ScrollToTop />
    </>
  );
}
