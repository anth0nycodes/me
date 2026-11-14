import { ReactNode } from "react";

export default function VaultLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
