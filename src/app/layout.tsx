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
  metadataBase: new URL("https://www.codewithpurpose.org"),
  title: "CodeWithPurpose — Free Education for Every Student, Everywhere",
  description:
    "A student-run nonprofit teaching real coding skills to students in 110+ countries — completely free, forever.",
  openGraph: {
    title: "CodeWithPurpose — Free Education for Every Student, Everywhere",
    description:
      "Together in Learning, Stronger in Purpose. Free coding courses for students worldwide.",
    url: "https://www.codewithpurpose.org",
    siteName: "CodeWithPurpose",
    images: [
      {
        url: "/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeWithPurpose — Free Education for Every Student, Everywhere",
      },
    ],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/images/codewp-logo.png", type: "image/png" },
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
