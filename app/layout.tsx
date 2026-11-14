import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ReactNode } from "react";
import { LinksSection } from "@/components/home/links-section";
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

// headings in long-form posts: a serif so they read apart from the Geist body text. Newsreader's
// optical-size axis gives large headings a display cut and smaller ones a sturdier reading cut
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
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
    "Product Designer",
    "Product Designer portfolio",
    "Product design case studies",
    "UI/UX Designer",
    "Designer who codes",
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
      className={cn(
        "font-sans",
        geistSans.variable,
        geistMono.variable,
        newsreader.variable
      )}
    >
      <body className="bg-background flex min-h-screen w-full flex-col font-sans antialiased selection:bg-(--selection)">
        <AudioProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <TooltipProvider>
              <Navbar />
              <main className="w-full flex-1 px-6">{children}</main>
              {/* the same social links at the foot of every page */}
              <footer className="mt-24 px-6 pb-10 lg:px-[calc(5vw+1.5rem)]">
                <LinksSection />
              </footer>
            </TooltipProvider>
            <Analytics />
          </ThemeProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
