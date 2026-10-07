import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AudioProvider } from "@/context/AudioProvider";
import { DATA } from "@/data/me";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,

  keywords: [
    "Anthony Hoang",
    "Anthony Hoang portfolio",
    "anth0nycodes",
    "Design Engineer",
    "Design Engineer portfolio",
    "Frontend Engineer",
    "UI Engineer",
    "Design focused engineer",
    "Engineer with design background",
    "Frontend portfolio",
  ],
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://anthonyhoang.dev/opengraph.png",
        width: 1200,
        height: 630,
        alt: DATA.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
    images: ["https://anthonyhoang.dev/opengraph.png"],
    description: DATA.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geistSans.variable, geistMono.variable)}
    >
      <body className="bg-background flex min-h-screen w-full flex-col justify-center px-6 py-12 font-sans antialiased selection:bg-(--selection) sm:py-24">
        <AudioProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <Navbar />
              <main className="mx-auto w-full max-w-150">{children}</main>
            </TooltipProvider>
            <Analytics />
          </ThemeProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
