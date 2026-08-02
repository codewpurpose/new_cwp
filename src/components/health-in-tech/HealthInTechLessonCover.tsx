/**
 * Card art for the Health in Tech track.
 *
 * Each cover is a miniature of that lesson's own idea, drawn from the design
 * tokens rather than shipped as an image. That keeps the track free of binary
 * assets, scales cleanly at any size, and means the card actually previews
 * what the reader is about to open.
 */

interface CoverProps {
  slug: string;
}

const W = 160;
const H = 90;
const INK = "var(--learn-ink)";
const MUTED = "var(--learn-ink-subtle)";
const ACCENT = "var(--learn-accent)";
const HIGHLIGHT = "var(--learn-chart-highlight)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="aspect-[16/9] w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={W} height={H} fill="var(--learn-chart-plot)" />
      {children}
    </svg>
  );
}

/* --------------------------------------------------------------------------
 * Part 1 — The Landscape
 * ---------------------------------------------------------------------- */

function WhatIsHealthTechCover() {
  return (
    <Frame>
      <path d="M50 50 h20 v-14 h20 v14 h20" fill="none" stroke={MUTED} strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M80 20 L80 8 M80 8 L74 14 M80 8 L86 14" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={50} cy={58} r={9} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M46 58 h8 M50 54 v8" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
      <circle cx={110} cy={58} r={9} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
    </Frame>
  );
}

function WhyHealthcareIsDifferentCover() {
  return (
    <Frame>
      <rect x={26} y={30} width={44} height={32} rx={6} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.4} />
      <text x={48} y={51} textAnchor="middle" fontSize={20} fontWeight={700} fill={MUTED}>$</text>
      <rect x={90} y={26} width={44} height={36} rx={6} fill="var(--learn-danger-bg)" stroke={INK} strokeWidth={1.4} />
      <path d="M112 38 L112 48 M112 52 L112 53" stroke="var(--learn-danger-fg)" strokeWidth={2.4} strokeLinecap="round" />
    </Frame>
  );
}

function CareersInHealthTechCover() {
  return (
    <Frame>
      <circle cx={52} cy={38} r={12} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
      <path d="M34 68 C34 54 70 54 70 68" fill="none" stroke={INK} strokeWidth={1.6} />
      <rect x={92} y={28} width={36} height={26} rx={4} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
      <path d="M98 40 h24 M98 46 h16" stroke={MUTED} strokeWidth={1.4} />
      <path d="M76 44 h10" stroke={ACCENT} strokeWidth={1.6} strokeDasharray="2 3" />
    </Frame>
  );
}

function ADayInADigitalClinicCover() {
  return (
    <Frame>
      <line x1={30} y1={45} x2={130} y2={45} stroke="var(--learn-line)" strokeWidth={1.4} />
      {[30, 63, 96, 129].map((x, i) => (
        <circle key={x} cx={x} cy={45} r={i === 2 ? 6 : 4.5} fill={i === 2 ? ACCENT : HIGHLIGHT} stroke={INK} strokeWidth={1} />
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
 * Part 2 — Health Data
 * ---------------------------------------------------------------------- */

function WhatIsAnEhrCover() {
  return (
    <Frame>
      <rect x={44} y={16} width={72} height={58} rx={6} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.4} />
      <path d="M54 32 h30 M54 42 h44 M54 52 h44 M54 62 h24" stroke={MUTED} strokeWidth={1.6} />
      <circle cx={104} cy={30} r={7} fill={HIGHLIGHT} stroke={INK} strokeWidth={1} />
    </Frame>
  );
}

function InteroperabilityCover() {
  return (
    <Frame>
      <rect x={22} y={26} width={44} height={38} rx={5} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.4} />
      <rect x={94} y={26} width={44} height={38} rx={5} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
      <path d="M66 38 L94 38 M66 52 L94 52" stroke={ACCENT} strokeWidth={1.6} strokeDasharray="3 3" />
      <text x={80} y={48} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>≠</text>
    </Frame>
  );
}

function HealthDataStandardsCover() {
  return (
    <Frame>
      <rect x={40} y={20} width={80} height={50} rx={6} fill="var(--learn-code-bg)" />
      <text x={50} y={40} fontSize={11} fontFamily="var(--learn-font-mono)" fill={HIGHLIGHT}>{"{"}</text>
      <path d="M62 32 h44 M62 42 h32 M62 52 h38" stroke="var(--learn-code-fg)" strokeWidth={1.4} opacity={0.6} />
      <text x={50} y={62} fontSize={11} fontFamily="var(--learn-font-mono)" fill={HIGHLIGHT}>{"}"}</text>
    </Frame>
  );
}

function PrivacyAndHipaaBasicsCover() {
  return (
    <Frame>
      <path
        d="M80 16 C96 30 100 46 92 62 L80 70 L68 62 C60 46 64 30 80 16 Z"
        fill={HIGHLIGHT}
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <rect x={70} y={38} width={20} height={16} rx={2} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
      <path d="M74 38 v-6 a6 6 0 0 1 12 0 v6" fill="none" stroke={ACCENT} strokeWidth={1.6} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
 * Part 3 — Connected Care
 * ---------------------------------------------------------------------- */

function WhatCountsAsAWearableCover() {
  return (
    <Frame>
      <path d="M62 30 a18 20 0 0 1 36 0 v30 a18 20 0 0 1 -36 0 Z" fill="var(--learn-surface)" stroke={INK} strokeWidth={1.6} />
      <rect x={68} y={34} width={24} height={22} rx={4} fill={HIGHLIGHT} />
      <path d="M60 40 h-8 M100 40 h8 M60 50 h-8 M100 50 h8" stroke={MUTED} strokeWidth={1.6} strokeLinecap="round" />
    </Frame>
  );
}

function RemotePatientMonitoringCover() {
  return (
    <Frame>
      <path
        d="M22 50 L52 50 L60 30 L68 62 L76 42 L84 50 L138 50"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={84} cy={50} r={4} fill={INK} />
    </Frame>
  );
}

function HowAWearableActuallyMeasuresYouCover() {
  return (
    <Frame>
      <path
        d="M20 45 q4 -12 8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0"
        fill="none"
        stroke={MUTED}
        strokeWidth={1.2}
        opacity={0.7}
      />
      <path
        d="M20 45 C40 20 60 70 80 45 C100 20 120 70 140 45"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Frame>
  );
}

function TheLimitsOfConsumerHealthDataCover() {
  return (
    <Frame>
      <path
        d="M62 30 a18 20 0 0 1 36 0 v30 a18 20 0 0 1 -36 0 Z"
        fill="var(--learn-surface)"
        stroke={MUTED}
        strokeWidth={1.6}
        strokeDasharray="3 3"
      />
      <text x={80} y={51} textAnchor="middle" fontSize={22} fontWeight={700} fill={ACCENT}>?</text>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
 * Part 4 — AI in Medicine
 * ---------------------------------------------------------------------- */

function WhatMedicalAiIsActuallyDoingTodayCover() {
  return (
    <Frame>
      <rect x={34} y={26} width={40} height={40} rx={6} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.4} />
      <path d="M42 40 h24 M42 48 h16 M42 56 h20" stroke={MUTED} strokeWidth={1.6} />
      <circle cx={110} cy={44} r={18} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
      <path d="M102 44 l6 6 l12 -14" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function AiAssistedDiagnosisCover() {
  return (
    <Frame>
      <line x1={30} y1={45} x2={130} y2={45} stroke="var(--learn-chart-axis)" strokeWidth={1} />
      {[40, 55, 68, 80, 92, 104, 118].map((x, i) => (
        <circle key={x} cx={x} cy={i % 2 === 0 ? 35 : 55} r={4} fill={i % 3 === 0 ? ACCENT : MUTED} />
      ))}
      <line x1={80} y1={20} x2={80} y2={70} stroke={INK} strokeWidth={1.6} strokeDasharray="4 3" />
    </Frame>
  );
}

function DrugDiscoveryAndAiCover() {
  return (
    <Frame>
      <circle cx={46} cy={45} r={8} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <circle cx={70} cy={30} r={6} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.2} />
      <circle cx={70} cy={60} r={6} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.2} />
      <path d="M53 42 L65 33 M53 48 L65 57" stroke={MUTED} strokeWidth={1.2} />
      <path d="M84 45 L120 45" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
      <path d="M112 38 L120 45 L112 52" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function BiasAndErrorInMedicalAiCover() {
  return (
    <Frame>
      <rect x={34} y={26} width={16} height={38} fill={INK} opacity={0.85} />
      <rect x={62} y={40} width={16} height={24} fill={ACCENT} opacity={0.9} />
      <rect x={90} y={20} width={16} height={44} fill={ACCENT} opacity={0.9} />
      <rect x={118} y={50} width={16} height={14} fill={ACCENT} opacity={0.9} />
      <line x1={26} y1={64} x2={140} y2={64} stroke="var(--learn-chart-axis)" strokeWidth={1} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
 * Part 5 — Access & Delivery
 * ---------------------------------------------------------------------- */

function WhatTelemedicineActuallyReplacesCover() {
  return (
    <Frame>
      <rect x={30} y={22} width={44} height={38} rx={8} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.6} />
      <path d="M74 34 L94 26 V56 L74 48 Z" fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} strokeLinejoin="round" />
      <circle cx={48} cy={38} r={7} fill={HIGHLIGHT} stroke={INK} strokeWidth={1} />
      <rect x={110} y={26} width={26} height={34} rx={5} fill="none" stroke={MUTED} strokeWidth={1.4} strokeDasharray="3 3" />
    </Frame>
  );
}

function TheDigitalDivideInHealthcareCover() {
  return (
    <Frame>
      <rect x={32} y={18} width={16} height={46} fill={INK} opacity={0.85} />
      <rect x={60} y={34} width={16} height={30} fill={ACCENT} opacity={0.9} />
      <rect x={88} y={44} width={16} height={20} fill={ACCENT} opacity={0.7} />
      <rect x={116} y={48} width={16} height={16} fill={ACCENT} opacity={0.5} />
      <line x1={24} y1={64} x2={140} y2={64} stroke="var(--learn-chart-axis)" strokeWidth={1} />
    </Frame>
  );
}

function HealthAppsAndPatientEngagementCover() {
  return (
    <Frame>
      <rect x={56} y={16} width={48} height={58} rx={8} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.6} />
      <circle cx={80} cy={38} r={10} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M72 56 h16 M72 62 h10" stroke={MUTED} strokeWidth={1.6} strokeLinecap="round" />
      <circle cx={100} cy={26} r={4} fill={ACCENT} />
    </Frame>
  );
}

function RemoteCareAcrossBordersCover() {
  return (
    <Frame>
      <circle cx={80} cy={45} r={26} fill="none" stroke={MUTED} strokeWidth={1.4} />
      <path d="M54 45 h52 M80 19 v52 M62 30 q18 10 36 0 M62 60 q18 -10 36 0" fill="none" stroke={MUTED} strokeWidth={1} />
      <path d="M50 45 L110 45" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeDasharray="1 6" />
      <circle cx={50} cy={45} r={5} fill={ACCENT} />
      <circle cx={110} cy={45} r={5} fill={ACCENT} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
 * Part 6 — Security & the Future
 * ---------------------------------------------------------------------- */

function CybersecurityInHealthcareCover() {
  return (
    <Frame>
      <path
        d="M80 16 C96 30 100 46 92 62 L80 70 L68 62 C60 46 64 30 80 16 Z"
        fill="var(--learn-danger-bg)"
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <path d="M70 42 L77 50 L92 32" fill="none" stroke="var(--learn-danger-fg)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function RegulationAndOversightCover() {
  return (
    <Frame>
      <rect x={44} y={20} width={72} height={50} rx={6} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.4} />
      <path d="M56 32 h48 M56 42 h30" stroke={MUTED} strokeWidth={1.6} />
      <circle cx={104} cy={54} r={12} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M99 54 l3.5 3.5 L110 49" fill="none" stroke={INK} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function WhereHealthTechIsHeadedCover() {
  return (
    <Frame>
      <path d="M28 60 L52 40 L76 48 L100 24 L132 30" fill="none" stroke={ACCENT} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M120 22 L132 30 L122 40" fill="none" stroke={ACCENT} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={28} cy={60} r={3.5} fill={INK} />
      <circle cx={76} cy={48} r={3.5} fill={INK} />
    </Frame>
  );
}

function CapstoneMappingAHealthTechIdeaCover() {
  return (
    <Frame>
      <path
        d="M80 18 C96 32 100 54 92 70 L80 62 L68 70 C60 54 64 32 80 18 Z"
        fill={HIGHLIGHT}
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <circle cx={80} cy={40} r={6} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
      <path d="M40 30 h20 M40 38 h14 M116 30 h20 M116 38 h14" stroke={MUTED} strokeWidth={1.4} strokeLinecap="round" />
    </Frame>
  );
}

const COVERS: Record<string, () => React.ReactElement> = {
  "what-is-health-tech": WhatIsHealthTechCover,
  "why-healthcare-is-different": WhyHealthcareIsDifferentCover,
  "careers-in-health-tech": CareersInHealthTechCover,
  "a-day-in-a-digital-clinic": ADayInADigitalClinicCover,
  "what-is-an-ehr": WhatIsAnEhrCover,
  interoperability: InteroperabilityCover,
  "health-data-standards": HealthDataStandardsCover,
  "privacy-and-hipaa-basics": PrivacyAndHipaaBasicsCover,
  "what-counts-as-a-wearable": WhatCountsAsAWearableCover,
  "remote-patient-monitoring": RemotePatientMonitoringCover,
  "how-a-wearable-actually-measures-you": HowAWearableActuallyMeasuresYouCover,
  "the-limits-of-consumer-health-data": TheLimitsOfConsumerHealthDataCover,
  "what-medical-ai-is-actually-doing-today": WhatMedicalAiIsActuallyDoingTodayCover,
  "ai-assisted-diagnosis": AiAssistedDiagnosisCover,
  "drug-discovery-and-ai": DrugDiscoveryAndAiCover,
  "bias-and-error-in-medical-ai": BiasAndErrorInMedicalAiCover,
  "what-telemedicine-actually-replaces": WhatTelemedicineActuallyReplacesCover,
  "the-digital-divide-in-healthcare": TheDigitalDivideInHealthcareCover,
  "health-apps-and-patient-engagement": HealthAppsAndPatientEngagementCover,
  "remote-care-across-borders": RemoteCareAcrossBordersCover,
  "cybersecurity-in-healthcare": CybersecurityInHealthcareCover,
  "regulation-and-oversight": RegulationAndOversightCover,
  "where-health-tech-is-headed": WhereHealthTechIsHeadedCover,
  "capstone-mapping-a-health-tech-idea": CapstoneMappingAHealthTechIdeaCover,
};

export function HealthInTechLessonCover({ slug }: CoverProps) {
  const Cover = COVERS[slug] ?? WhatIsHealthTechCover;
  return <Cover />;
}
