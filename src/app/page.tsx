import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { HeroGlobe } from "@/components/HeroGlobe";
import { PromptsMarquee } from "@/components/PromptsMarquee";
import { ProductSection } from "@/components/ProductSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { WhyGlenSection } from "@/components/WhyGlenSection";
import { SecuritySection } from "@/components/SecuritySection";
import { QuoteSection } from "@/components/QuoteSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <HeroGlobe />
        <PromptsMarquee />
        <div className="h-16 md:h-40" />
        <ProductSection />
        <div className="h-16 md:h-40" />
        <UseCasesSection />
        <WhyGlenSection />
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
