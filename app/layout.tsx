import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { DATA } from "@/data/me";
import { ReactNode } from "react";
import { ReactLenis } from "@/utils/lenis";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    "Roblox Game Developer",
    "Roblox Developer portfolio",
    "Roblox Game Dev",
    "Luau Developer",
    "Roblox Studio",
    "Game Developer NYC",
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
    <html lang="en">
      <ReactLenis root>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${chakraPetch.variable} w-full font-sans antialiased min-h-screen bg-background py-12 sm:py-24 px-6`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div
              className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34, 197, 94, 0.04), transparent)",
              }}
              aria-hidden="true"
            />
            <Navbar />
            {children}
            <Analytics />
          </ThemeProvider>
        </body>
      </ReactLenis>
    </html>
  );
}
