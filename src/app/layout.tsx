import type { Metadata } from "next";
import { Inter, Newsreader, Spline_Sans_Mono } from "next/font/google";
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
  title: "Glen",
  description:
    "Glen is shared learning for AI agents, one MCP tool your whole org's agents share. It recalls the observations that matter this turn and stores the new ones in the same round trip, so what one agent learns, the whole org keeps.",
  openGraph: {
    title: "Glen",
    description: "Shared learning for AI agents.",
    url: "https://tryglen.com",
    siteName: "Glen",
    images: [
      {
        url: "/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Glen — Shared Learning for AI Agents",
      },
    ],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/seo/favicon.svg", type: "image/svg+xml" },
      { url: "/seo/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png", sizes: "180x180" }],
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
        {children}
      </body>
    </html>
  );
}
