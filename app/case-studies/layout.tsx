import { ReactNode } from "react";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function CaseStudiesLayout({
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
