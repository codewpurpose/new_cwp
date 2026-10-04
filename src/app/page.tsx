import "./cartoon-home.css";
import { Fredoka } from "next/font/google";
import { ProofPointStrip } from "@/components/ProofPointStrip";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { PromptsMarquee } from "@/components/PromptsMarquee";
import { ProductSection } from "@/components/ProductSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { GlobalReachSection } from "@/components/GlobalReachSection";
import { SecuritySection } from "@/components/SecuritySection";
import { QuoteSection } from "@/components/QuoteSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { MediaSection } from "@/components/media/MediaSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { SiteFooter } from "@/components/SiteFooter";
import { getChapters } from "@/lib/learn-nav";

const playfulHeadings = Fredoka({
  variable: "--font-playful-heading",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});
const LESSON_COUNT = getChapters("ml").length + getChapters("vibecoding").length;

export default function Home() {
  return (
    <div className={`cartoon-home ${playfulHeadings.variable}`}>
      <ProofPointStrip lessonCount={LESSON_COUNT} />
      <SiteHeader />
      <main id="main-content" className="home-flow">
        <HeroSection />
        <ProductSection />
        <div className="home-flow-attach"><PromptsMarquee /></div>
        <UseCasesSection />
        <div className="home-flow-attach"><GlobalReachSection /></div>
        <div className="home-flow-close"><SecuritySection /></div>
        <QuoteSection />
        <HowItWorksSection />
        <MediaSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
