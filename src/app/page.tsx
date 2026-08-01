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
import { FaqSection } from "@/components/FaqSection";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <ProofPointStrip />
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <PromptsMarquee />
        <div className="h-16 md:h-40" />
        <ProductSection />
        <div className="h-16 md:h-40" />
        <UseCasesSection />
        <GlobalReachSection />
        <div className="h-12 md:h-20" />
        <SecuritySection />
        <div className="h-16 md:h-40" />
        <QuoteSection />
        <div className="h-16 md:h-40" />
        <HowItWorksSection />
        <div className="h-16 md:h-40" />
        <FaqSection />
        <div className="h-16 md:h-40" />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
