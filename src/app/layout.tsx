import type { Metadata } from "next";
import { Inter, Newsreader, Spline_Sans_Mono } from "next/font/google";
import { SiteLoader } from "@/components/SiteLoader";
import "./globals.css";

const homeSans = Inter({
  variable: "--font-home-sans",
  subsets: ["latin"],
});

const homeSerif = Newsreader({
  variable: "--font-home-serif",
  subsets: ["latin"],
  weight: "300",
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
        {children}
      </body>
    </html>
  );
}
