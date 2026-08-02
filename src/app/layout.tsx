import type { Metadata } from "next";
import { Archivo, Fraunces, Spline_Sans_Mono } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { SiteLoader } from "@/components/SiteLoader";
import "./globals.css";

/* Archivo over Inter: a grotesque with actual character in its terminals and a
 * tall x-height that holds up at the 13–15px the interface leans on. Inter is
 * the safest sans in existence, which is exactly the problem. */
const homeSans = Archivo({
  variable: "--font-home-sans",
  subsets: ["latin"],
});

/* Fraunces over Newsreader: warm, high-contrast, and carrying optical-size,
 * SOFT and WONK axes, so the display face can be soft and slightly wonky at
 * headline sizes and sober at section sizes — one family, two personalities.
 * Newsreader at a single 300 weight gave every headline the same thin voice. */
const homeSerif = Fraunces({
  variable: "--font-home-serif",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
});

const homeMono = Spline_Sans_Mono({
  variable: "--font-home-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.codewithpurpose.org"),
  title: "CWP",
  description:
    "We're a student-run nonprofit teaching real coding skills to students in 130+ countries. Completely free, forever.",
  openGraph: {
    title: "Free Education for Every Student, Everywhere | CodeWithPurpose",
    description:
      "Together in Learning, Stronger in Purpose. Free coding courses for students worldwide.",
    url: "https://www.codewithpurpose.org",
    siteName: "CodeWithPurpose",
    images: [
      {
        url: "/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Education for Every Student, Everywhere | CodeWithPurpose",
      },
    ],
    type: "website",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`home-root ${homeSans.variable} ${homeSerif.variable} ${homeMono.variable} min-h-full`}
      >
        <SiteLoader />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
