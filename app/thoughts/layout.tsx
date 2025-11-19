import { ReactNode } from "react";

export default function ThoughtsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="mx-auto w-full max-w-2xl min-h-screen bg-background px-6">
      {children}
    </div>
  );
}
