import "./cartoon-home.css";
import { Fredoka } from "next/font/google";
import { ProofPointStrip } from "@/components/ProofPointStrip";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { ProductSection } from "@/components/ProductSection";
import { GlobalReachSection } from "@/components/GlobalReachSection";
import { SecuritySection } from "@/components/SecuritySection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { MediaSection } from "@/components/media/MediaSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { SiteFooter } from "@/components/SiteFooter";
import { getChapters } from "@/lib/learn-nav";
import { TRACK_ROUTES } from "@/lib/learn-routes";
import type { LearnTrackId } from "@/lib/learn-types";

const playfulHeadings = Fredoka({
  variable: "--font-playful-heading",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});
const LESSON_COUNT = (Object.keys(TRACK_ROUTES) as LearnTrackId[]).reduce((total, track) => total + getChapters(track).length, 0);

export default function Home() {
  return (
    <div className={`cartoon-home ${playfulHeadings.variable}`}>
      <ProofPointStrip lessonCount={LESSON_COUNT} />
      <SiteHeader />
      <main id="main-content" className="home-flow">
        <HeroSection />
        <ProductSection />
        <HowItWorksSection />
        <GlobalReachSection />
        <SecuritySection />
        <MediaSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
