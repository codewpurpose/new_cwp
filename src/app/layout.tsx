import type { Metadata } from "next";
import { Archivo, Fraunces, Spline_Sans_Mono } from "next/font/google";
import { KoalaEasterEggs } from "@/components/KoalaEasterEggs";
import { KoalaMascot } from "@/components/KoalaMascot";
import { MotionProvider } from "@/components/MotionProvider";
import { SiteLoader } from "@/components/SiteLoader";
import { AppAuthProvider } from "@/components/auth/AppAuthProvider";
import { isClerkConfigured } from "@/lib/clerk";
import { SITE_URL } from "@/lib/links";
import "./globals.css";

const SITE_NAME = "CodeWithPurpose";
const SITE_TITLE = "CodeWithPurpose — Free Coding Education for Students Worldwide";
const SITE_DESCRIPTION =
  "We're a student-run nonprofit teaching real coding skills to students in 130+ countries. Completely free, forever.";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "free coding education",
    "learn to code for free",
    "student-run nonprofit",
    "free coding courses",
    "coding education for students",
    "CodeWithPurpose",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Education for Every Student, Everywhere | CodeWithPurpose",
    description:
      "Together in Learning, Stronger in Purpose. Free coding courses for students worldwide.",
    url: SITE_URL,
    siteName: SITE_NAME,
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
  twitter: {
    card: "summary_large_image",
    title: "Free Education for Every Student, Everywhere | CodeWithPurpose",
    description:
      "Together in Learning, Stronger in Purpose. Free coding courses for students worldwide.",
    images: ["/seo/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/seo/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NonprofitOrganization",
  name: SITE_NAME,
  alternateName: "CWP",
  url: SITE_URL,
  logo: `${SITE_URL}/codewp-logo.png`,
  description: SITE_DESCRIPTION,
  sameAs: ["https://hackclub.com", "https://codewithpurpose.substack.com"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteLoader />
        {isClerkConfigured ? (
          <AppAuthProvider>
            <MotionProvider>{children}</MotionProvider>
          </AppAuthProvider>
        ) : (
          <MotionProvider>{children}</MotionProvider>
        )}
        <KoalaMascot />
        <KoalaEasterEggs />
      </body>
    </html>
  );
}
