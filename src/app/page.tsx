import { ProofPointStrip } from "@/components/ProofPointStrip";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { PromptsMarquee } from "@/components/PromptsMarquee";
import { ProductSection } from "@/components/ProductSection";
import { TrustedBySection } from "@/components/TrustedBySection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { GlobalReachSection } from "@/components/GlobalReachSection";
import { SecuritySection } from "@/components/SecuritySection";
import { QuoteSection } from "@/components/QuoteSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { SiteFooter } from "@/components/SiteFooter";
import { getChapters } from "@/lib/learn-nav";

/** Counted from the lesson graph, so the strip cannot claim a stale number. */
const LESSON_COUNT = getChapters("ml").length + getChapters("vibecoding").length;

export default function Home() {
  return (
    <>
      <ProofPointStrip lessonCount={LESSON_COUNT} />
      <SiteHeader />
      {/* One rhythm from .home-flow. The three wrappers below are the only
          places a section deliberately sits closer than the rest: the marquee
          carries its own top padding, global reach reads as part of the use
          cases above it, and security follows on from that pair. */}
      <main id="top" className="home-flow">
        <HeroSection />
        <TrustedBySection />
        <ProductSection />
        <div className="home-flow-attach">
          <PromptsMarquee />
        </div>
        <UseCasesSection />
        <div className="home-flow-attach">
          <GlobalReachSection />
        </div>
        <div className="home-flow-close">
          <SecuritySection />
        </div>
        <QuoteSection />
        <HowItWorksSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
