import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnChapterHeader } from "@/components/learn/shell/LearnChapterHeader";
import { LearnMobileBar } from "@/components/learn/shell/LearnMobileBar";
import { LearnPager, LearnPagerEnd } from "@/components/learn/shell/LearnPager";
import { LearnShell } from "@/components/learn/shell/LearnShell";
import { LearnToc } from "@/components/learn/shell/LearnToc";
import { WhatIsHealthTechLesson } from "@/components/health-in-tech/WhatIsHealthTechLesson";
import { WhyHealthcareIsDifferentLesson } from "@/components/health-in-tech/WhyHealthcareIsDifferentLesson";
import { CareersInHealthTechLesson } from "@/components/health-in-tech/CareersInHealthTechLesson";
import { ADayInADigitalClinicLesson } from "@/components/health-in-tech/ADayInADigitalClinicLesson";
import { WhatIsAnEhrLesson } from "@/components/health-in-tech/WhatIsAnEhrLesson";
import { InteroperabilityLesson } from "@/components/health-in-tech/InteroperabilityLesson";
import { HealthDataStandardsLesson } from "@/components/health-in-tech/HealthDataStandardsLesson";
import { PrivacyAndHipaaBasicsLesson } from "@/components/health-in-tech/PrivacyAndHipaaBasicsLesson";
import { WhatCountsAsAWearableLesson } from "@/components/health-in-tech/WhatCountsAsAWearableLesson";
import { RemotePatientMonitoringLesson } from "@/components/health-in-tech/RemotePatientMonitoringLesson";
import { HowAWearableActuallyMeasuresYouLesson } from "@/components/health-in-tech/HowAWearableActuallyMeasuresYouLesson";
import { TheLimitsOfConsumerHealthDataLesson } from "@/components/health-in-tech/TheLimitsOfConsumerHealthDataLesson";
import { WhatMedicalAiIsActuallyDoingTodayLesson } from "@/components/health-in-tech/WhatMedicalAiIsActuallyDoingTodayLesson";
import { AiAssistedDiagnosisLesson } from "@/components/health-in-tech/AiAssistedDiagnosisLesson";
import { DrugDiscoveryAndAiLesson } from "@/components/health-in-tech/DrugDiscoveryAndAiLesson";
import { BiasAndErrorInMedicalAiLesson } from "@/components/health-in-tech/BiasAndErrorInMedicalAiLesson";
import { WhatTelemedicineActuallyReplacesLesson } from "@/components/health-in-tech/WhatTelemedicineActuallyReplacesLesson";
import { TheDigitalDivideInHealthcareLesson } from "@/components/health-in-tech/TheDigitalDivideInHealthcareLesson";
import { HealthAppsAndPatientEngagementLesson } from "@/components/health-in-tech/HealthAppsAndPatientEngagementLesson";
import { RemoteCareAcrossBordersLesson } from "@/components/health-in-tech/RemoteCareAcrossBordersLesson";
import { CybersecurityInHealthcareLesson } from "@/components/health-in-tech/CybersecurityInHealthcareLesson";
import { RegulationAndOversightLesson } from "@/components/health-in-tech/RegulationAndOversightLesson";
import { WhereHealthTechIsHeadedLesson } from "@/components/health-in-tech/WhereHealthTechIsHeadedLesson";
import { CapstoneMappingAHealthTechIdeaLesson } from "@/components/health-in-tech/CapstoneMappingAHealthTechIdeaLesson";
import { COURSES_HREF } from "@/lib/links";
import { getAdjacent, getChapter, getChapters, getPositionLabel } from "@/lib/learn-nav";

const TRACK = "health-in-tech" as const;

/**
 * Every published lesson needs an entry here. The build validator fails if a
 * published slug is missing one.
 */
const HEALTH_IN_TECH_LESSON_BODIES: Record<string, () => React.ReactElement> = {
  "what-is-health-tech": WhatIsHealthTechLesson,
  "why-healthcare-is-different": WhyHealthcareIsDifferentLesson,
  "careers-in-health-tech": CareersInHealthTechLesson,
  "a-day-in-a-digital-clinic": ADayInADigitalClinicLesson,
  "what-is-an-ehr": WhatIsAnEhrLesson,
  interoperability: InteroperabilityLesson,
  "health-data-standards": HealthDataStandardsLesson,
  "privacy-and-hipaa-basics": PrivacyAndHipaaBasicsLesson,
  "what-counts-as-a-wearable": WhatCountsAsAWearableLesson,
  "remote-patient-monitoring": RemotePatientMonitoringLesson,
  "how-a-wearable-actually-measures-you": HowAWearableActuallyMeasuresYouLesson,
  "the-limits-of-consumer-health-data": TheLimitsOfConsumerHealthDataLesson,
  "what-medical-ai-is-actually-doing-today": WhatMedicalAiIsActuallyDoingTodayLesson,
  "ai-assisted-diagnosis": AiAssistedDiagnosisLesson,
  "drug-discovery-and-ai": DrugDiscoveryAndAiLesson,
  "bias-and-error-in-medical-ai": BiasAndErrorInMedicalAiLesson,
  "what-telemedicine-actually-replaces": WhatTelemedicineActuallyReplacesLesson,
  "the-digital-divide-in-healthcare": TheDigitalDivideInHealthcareLesson,
  "health-apps-and-patient-engagement": HealthAppsAndPatientEngagementLesson,
  "remote-care-across-borders": RemoteCareAcrossBordersLesson,
  "cybersecurity-in-healthcare": CybersecurityInHealthcareLesson,
  "regulation-and-oversight": RegulationAndOversightLesson,
  "where-health-tech-is-headed": WhereHealthTechIsHeadedLesson,
  "capstone-mapping-a-health-tech-idea": CapstoneMappingAHealthTechIdeaLesson,
};

export function generateStaticParams() {
  return getChapters(TRACK).map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  if (!chapter) return { title: "Health in Tech" };
  return {
    title: chapter.title,
    description: chapter.description,
    alternates: { canonical: `/learn/health-in-tech/${slug}` },
  };
}

export default async function HealthInTechLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  const LessonBody = chapter ? HEALTH_IN_TECH_LESSON_BODIES[slug] : undefined;
  if (!chapter || !LessonBody) notFound();

  const { prev, next } = getAdjacent(TRACK, slug);

  return (
    <LearnShell
      track={TRACK}
      aside={<LearnToc headings={chapter.headings} />}
      mobileBar={<LearnMobileBar track={TRACK} label={getPositionLabel(TRACK, slug)} />}
    >
      <LearnChapterHeader track={TRACK} chapter={chapter} />

      <div className="learn-prose mt-10">
        <LessonBody />
      </div>

      <LearnPager
        track={TRACK}
        prev={prev}
        next={next}
        fallback={
          <LearnPagerEnd href={COURSES_HREF} eyebrow="You reached the end" title="Browse all courses" />
        }
      />
    </LearnShell>
  );
}
