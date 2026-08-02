import type { LearnChapter, LearnPart } from "@/lib/learn-types";

export { LEARN_HEALTH_IN_TECH_HREF } from "@/lib/links";

/**
 * The Health in Tech track: twenty-four lessons running from what "health
 * tech" actually means through AI diagnosis bias, cybersecurity, and sketching
 * a health-tech idea of your own.
 *
 * Written natively as LearnChapters (rather than adapted from a thinner shape)
 * so the track gets the same sidebar, table of contents, and prev/next pager as
 * the ML, Vibe Coding, and Python chapters.
 *
 * `headings` must match the ids the body component renders — scripts/validate-
 * learn-nav.mjs fails the build if they drift.
 */

export const HEALTH_IN_TECH_PARTS: readonly LearnPart[] = [
  {
    id: "foundations",
    number: 1,
    title: "The Landscape",
    summary:
      "What health tech actually is, why the stakes change the engineering, and what a visit to a digital clinic generates behind the scenes.",
  },
  {
    id: "data",
    number: 2,
    title: "Health Data",
    summary:
      "Electronic health records, why two hospitals' systems don't just talk to each other, and what's actually protected by privacy law.",
  },
  {
    id: "devices",
    number: 3,
    title: "Connected Care",
    summary:
      "Wearables, remote patient monitoring, and the real gap between a wellness estimate and a medical measurement.",
  },
  {
    id: "ai",
    number: 4,
    title: "AI in Medicine",
    summary:
      "What medical AI is actually doing today, how a diagnosis-assist model outputs a probability instead of a verdict, and where bias hides.",
  },
  {
    id: "access",
    number: 5,
    title: "Access & Delivery",
    summary:
      "What telemedicine genuinely replaces, who gets left out by the assumptions behind it, and what keeps a patient actually engaged.",
  },
  {
    id: "future",
    number: 6,
    title: "Security & the Future",
    summary:
      "Why hospitals are a common attack target, how new health tech actually gets approved, and sketching an idea of your own.",
  },
];

export const HEALTH_IN_TECH_CHAPTERS: readonly LearnChapter[] = [
  {
    slug: "what-is-health-tech",
    partId: "foundations",
    order: 1,
    title: "Where Software Actually Touches Patient Care",
    description:
      "\"Health tech\" sounds like a single industry, but it's really software touching an actual patient somewhere along the way — a record, a device, a diagnosis, or an appointment. This track treats it as one connected system rather than four separate topics.",
    level: "beginner",
    minutes: 7,
    prerequisites: [],
    tags: ["Landscape"],
    headings: [
      { id: "health-tech-is-software-touching-an-actual-patient", text: "Health tech is software touching an actual patient", level: 2 },
      { id: "three-places-it-already-lives-in-your-life", text: "Three places it already lives in your life", level: 2 },
      { id: "why-this-track-treats-it-as-one-connected-system", text: "Why this track treats it as one connected system", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "why-healthcare-is-different",
    partId: "foundations",
    order: 2,
    title: "Why Healthcare Is Different",
    description:
      "A bug in a shopping app loses a sale. A bug in a health app can lose something you can't refund. That single difference is why \"move fast and break things\" runs into a wall here that most other software never hits.",
    level: "beginner",
    minutes: 7,
    prerequisites: [],
    tags: ["Landscape"],
    headings: [
      { id: "a-bug-in-a-shopping-app-loses-a-sale", text: "A bug in a shopping app loses a sale", level: 2 },
      { id: "a-bug-in-a-health-app-can-lose-more-than-that", text: "A bug in a health app can lose more than that", level: 2 },
      { id: "why-move-fast-and-break-things-doesnt-work-here", text: "Why \"move fast and break things\" doesn't work here", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "careers-in-health-tech",
    partId: "foundations",
    order: 3,
    title: "The Jobs Behind the Industry",
    description:
      "Health tech isn't just doctors who happen to use software, or engineers who happen to work in healthcare. Some of the most valuable roles sit specifically between the two, translating one world's needs into the other's constraints.",
    level: "beginner",
    minutes: 7,
    prerequisites: [],
    tags: ["Landscape"],
    headings: [
      { id: "its-not-just-doctors-and-its-not-just-engineers", text: "It's not just doctors, and it's not just engineers", level: 2 },
      { id: "the-roles-that-sit-between-the-two", text: "The roles that sit between the two", level: 2 },
      { id: "what-actually-gets-you-hired-into-one", text: "What actually gets you hired into one", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "a-day-in-a-digital-clinic",
    partId: "foundations",
    order: 4,
    title: "Walking Through a Modern Visit",
    description:
      "A single appointment now generates data before you arrive, during the visit itself, and long after you've left. Walk through one visit step by step and see where health tech is actually doing work you never notice.",
    level: "beginner",
    minutes: 8,
    prerequisites: [],
    tags: ["Landscape"],
    headings: [
      { id: "checking-in-before-you-even-arrive", text: "Checking in before you even arrive", level: 2 },
      { id: "the-visit-itself-generates-more-data-than-you-notice", text: "The visit itself generates more data than you notice", level: 2 },
      { id: "what-happens-to-that-data-after-you-leave", text: "What happens to that data after you leave", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "what-is-an-ehr",
    partId: "data",
    order: 5,
    title: "The Record That Replaced the Paper Chart",
    description:
      "An Electronic Health Record replaced the manila folder at the end of your bed, but it's not just a digital copy of it. Click through a mock chart below and see what actually lives inside one — and who is allowed to see which parts.",
    level: "beginner",
    minutes: 8,
    prerequisites: [],
    tags: ["Health Data", "Interactive"],
    headings: [
      { id: "the-record-that-replaced-the-paper-chart", text: "The record that replaced the paper chart", level: 2 },
      { id: "what-actually-lives-inside-one", text: "What actually lives inside one", level: 2 },
      { id: "who-gets-to-see-which-parts", text: "Who gets to see which parts", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "interoperability",
    partId: "data",
    order: 6,
    title: "Why Two Hospitals' Systems Don't Just Talk",
    description:
      "Two hospitals can run two entirely different EHR systems, coding the exact same diagnosis two different ways. See that mismatch side by side, and why a shared standard — not just goodwill — is the only real fix.",
    level: "beginner",
    minutes: 8,
    prerequisites: ["what-is-an-ehr"],
    tags: ["Health Data", "Interactive"],
    headings: [
      { id: "two-hospitals-two-different-ehr-systems", text: "Two hospitals, two different EHR systems", level: 2 },
      { id: "the-same-diagnosis-coded-two-different-ways", text: "The same diagnosis, coded two different ways", level: 2 },
      { id: "why-a-shared-standard-is-the-only-real-fix", text: "Why a shared standard is the only real fix", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "health-data-standards",
    partId: "data",
    order: 7,
    title: "Health Data Standards, Explained Plainly",
    description:
      "FHIR is the standard most new health systems speak, turning a patient record into plain, structured data any compliant system can read. It took decades to catch on, for reasons that have nothing to do with the technology itself.",
    level: "beginner",
    minutes: 8,
    prerequisites: [],
    tags: ["Health Data"],
    headings: [
      { id: "fhir-is-the-standard-most-new-systems-speak", text: "FHIR is the standard most new systems speak", level: 2 },
      { id: "a-patient-record-as-plain-structured-data", text: "A patient record as plain, structured data", level: 2 },
      { id: "why-standards-took-decades-to-actually-catch-on", text: "Why standards took decades to actually catch on", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "privacy-and-hipaa-basics",
    partId: "data",
    order: 8,
    title: "What Actually Has to Stay Private",
    description:
      "HIPAA protects specific information handled by specific organizations — not every health-adjacent fact, and not every company that touches it. Knowing that boundary is what tells you what a breach actually triggers.",
    level: "beginner",
    minutes: 8,
    prerequisites: [],
    tags: ["Health Data"],
    headings: [
      { id: "hipaa-protects-specific-information-not-all-of-it", text: "HIPAA protects specific information, not all of it", level: 2 },
      { id: "who-is-actually-bound-by-it", text: "Who is actually bound by it", level: 2 },
      { id: "what-a-breach-actually-triggers", text: "What a breach actually triggers", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "what-counts-as-a-wearable",
    partId: "devices",
    order: 9,
    title: "What Counts as a Wearable",
    description:
      "A wearable is more than a fitness band counting steps — the category runs from consumer gadgets to medical-grade devices a doctor prescribes. Where a device sits on that spectrum changes what its numbers are actually worth.",
    level: "beginner",
    minutes: 7,
    prerequisites: [],
    tags: ["Connected Care"],
    headings: [
      { id: "further-than-a-fitness-band-on-your-wrist", text: "Further than a fitness band on your wrist", level: 2 },
      { id: "consumer-grade-versus-medical-grade", text: "Consumer-grade versus medical-grade", level: 2 },
      { id: "what-a-wearable-is-actually-measuring", text: "What a wearable is actually measuring", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "remote-patient-monitoring",
    partId: "devices",
    order: 10,
    title: "Moving Care Out of the Clinic",
    description:
      "Remote patient monitoring moves a measurement that used to require a clinic visit into an ordinary day at home. Watch a mock vital sign update live below, and see who is actually on the other end of that stream.",
    level: "intermediate",
    minutes: 9,
    prerequisites: [],
    tags: ["Connected Care", "Interactive"],
    headings: [
      { id: "moving-monitoring-out-of-the-clinic-and-into-the-home", text: "Moving monitoring out of the clinic and into the home", level: 2 },
      { id: "watching-a-vital-sign-update-in-real-time", text: "Watching a vital sign update in real time", level: 2 },
      { id: "who-actually-looks-at-the-stream", text: "Who actually looks at the stream", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "how-a-wearable-actually-measures-you",
    partId: "devices",
    order: 11,
    title: "How a Wearable Actually Measures You",
    description:
      "A sensor samples a signal, it doesn't capture a single clean instant — and the raw signal is noisier than most people expect. Toggle between the raw and smoothed version below to see how much processing happens before a number ever reaches the screen.",
    level: "intermediate",
    minutes: 9,
    prerequisites: [],
    tags: ["Connected Care", "Interactive"],
    headings: [
      { id: "a-sensor-samples-not-a-single-instant", text: "A sensor samples, not a single instant", level: 2 },
      { id: "raw-signal-is-noisier-than-you-would-expect", text: "Raw signal is noisier than you would expect", level: 2 },
      { id: "why-the-number-on-screen-is-already-smoothed", text: "Why the number on screen is already smoothed", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "the-limits-of-consumer-health-data",
    partId: "devices",
    order: 12,
    title: "The Limits of Consumer Health Data",
    description:
      "A wearable estimates — it doesn't diagnose. The gap between wellness data and medical data is exactly where a lot of confusion, and a fair amount of unnecessary panic, actually lives.",
    level: "intermediate",
    minutes: 7,
    prerequisites: [],
    tags: ["Connected Care"],
    headings: [
      { id: "a-wearable-estimates-it-doesnt-diagnose", text: "A wearable estimates, it doesn't diagnose", level: 2 },
      { id: "the-gap-between-wellness-data-and-medical-data", text: "The gap between wellness data and medical data", level: 2 },
      { id: "when-a-number-is-worth-a-real-appointment", text: "When a number is worth a real appointment", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "what-medical-ai-is-actually-doing-today",
    partId: "ai",
    order: 13,
    title: "What Medical AI Is Actually Doing Today",
    description:
      "Medical AI is pattern-matching at a scale no single person can hold in their head, already in genuine use in a few specific places — and still mostly hype in a few others that make better headlines.",
    level: "intermediate",
    minutes: 8,
    prerequisites: [],
    tags: ["AI in Medicine"],
    headings: [
      { id: "pattern-matching-at-a-scale-no-person-can", text: "Pattern-matching at a scale no person can", level: 2 },
      { id: "the-three-places-its-already-in-use", text: "The three places it's already in use", level: 2 },
      { id: "the-two-places-its-still-mostly-hype", text: "The two places it's still mostly hype", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "ai-assisted-diagnosis",
    partId: "ai",
    order: 14,
    title: "A Second Opinion, Not a Replacement",
    description:
      "A diagnosis-assist model doesn't output a verdict — it outputs a probability, and where you set the threshold for a flag changes what counts as suspicious. Move the slider below and watch that tradeoff happen live.",
    level: "intermediate",
    minutes: 9,
    prerequisites: [],
    tags: ["AI in Medicine", "Interactive"],
    headings: [
      { id: "a-second-opinion-not-a-replacement", text: "A second opinion, not a replacement", level: 2 },
      { id: "a-model-outputs-a-probability-not-a-verdict", text: "A model outputs a probability, not a verdict", level: 2 },
      { id: "moving-the-threshold-changes-what-counts-as-a-flag", text: "Moving the threshold changes what counts as a flag", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "drug-discovery-and-ai",
    partId: "ai",
    order: 15,
    title: "Drug Discovery and AI",
    description:
      "Getting a molecule from a lab bench to an approved drug is a pipeline with years-long stages. AI genuinely shortens a few of them — and still can't skip a single one of the rest.",
    level: "intermediate",
    minutes: 8,
    prerequisites: [],
    tags: ["AI in Medicine"],
    headings: [
      { id: "the-pipeline-from-molecule-to-approved-drug", text: "The pipeline from molecule to approved drug", level: 2 },
      { id: "where-ai-actually-shortens-it", text: "Where AI actually shortens it", level: 2 },
      { id: "where-it-still-cant-skip-a-single-step", text: "Where it still can't skip a single step", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "bias-and-error-in-medical-ai",
    partId: "ai",
    order: 16,
    title: "Why a 95% Accurate Model Can Still Fail Unevenly",
    description:
      "A model that's 95% accurate overall can still be far less accurate for one group than another, usually because its training data didn't look like everyone it ends up treating. Compare subgroup accuracy below and see how easily that gap hides behind one clean overall number.",
    level: "intermediate",
    minutes: 9,
    prerequisites: ["ai-assisted-diagnosis"],
    tags: ["AI in Medicine", "Interactive"],
    headings: [
      { id: "95-percent-accurate-overall-can-still-fail-unevenly", text: "95% accurate overall can still fail unevenly", level: 2 },
      { id: "training-data-that-doesnt-look-like-everyone-it-treats", text: "Training data that doesn't look like everyone it treats", level: 2 },
      { id: "why-checking-subgroup-accuracy-isnt-optional", text: "Why checking subgroup accuracy isn't optional", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "what-telemedicine-actually-replaces",
    partId: "access",
    order: 17,
    title: "What Telemedicine Actually Replaces",
    description:
      "Telemedicine genuinely replaces some visits — a follow-up, a prescription refill, a quick consult. It can't replace a physical exam or an urgent procedure, and confusing the two is where trust in the whole system tends to break.",
    level: "intermediate",
    minutes: 8,
    prerequisites: [],
    tags: ["Access & Delivery"],
    headings: [
      { id: "the-visits-it-genuinely-replaces", text: "The visits it genuinely replaces", level: 2 },
      { id: "the-visits-it-cant", text: "The visits it can't", level: 2 },
      { id: "why-the-difference-matters-for-trust-in-the-whole-system", text: "Why the difference matters for trust in the whole system", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "the-digital-divide-in-healthcare",
    partId: "access",
    order: 18,
    title: "The Digital Divide in Healthcare",
    description:
      "Telemedicine assumes a device, a connection, and comfort using both. Compare access across different groups below, and see why closing that gap has to be part of the product itself, not an afterthought bolted on later.",
    level: "advanced",
    minutes: 9,
    prerequisites: [],
    tags: ["Access & Delivery", "Interactive"],
    headings: [
      { id: "telemedicine-assumes-a-device-and-a-connection", text: "Telemedicine assumes a device and a connection", level: 2 },
      { id: "who-gets-left-out-by-that-assumption", text: "Who gets left out by that assumption", level: 2 },
      { id: "closing-the-gap-is-part-of-the-product-not-an-afterthought", text: "Closing the gap is part of the product, not an afterthought", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "health-apps-and-patient-engagement",
    partId: "access",
    order: 19,
    title: "Health Apps and Patient Engagement",
    description:
      "An app nobody opens twice doesn't help the person it was built for, no matter how good its medicine is underneath. What actually keeps someone coming back sits right next to a line that's easy to cross into manipulation.",
    level: "advanced",
    minutes: 8,
    prerequisites: [],
    tags: ["Access & Delivery"],
    headings: [
      { id: "an-app-that-nobody-opens-twice-doesnt-help-anyone", text: "An app that nobody opens twice doesn't help anyone", level: 2 },
      { id: "what-actually-keeps-a-patient-coming-back", text: "What actually keeps a patient coming back", level: 2 },
      { id: "the-line-between-engagement-and-manipulation", text: "The line between engagement and manipulation", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "remote-care-across-borders",
    partId: "access",
    order: 20,
    title: "Remote Care Across Borders",
    description:
      "The same distance problem CodeWithPurpose exists to close in education shows up in healthcare too — a consultation that doesn't require a flight, for someone who couldn't otherwise take one.",
    level: "advanced",
    minutes: 7,
    prerequisites: [],
    tags: ["Access & Delivery"],
    headings: [
      { id: "the-same-problem-cwp-exists-to-solve-shows-up-here", text: "The same problem CodeWithPurpose exists to solve shows up here", level: 2 },
      { id: "a-consultation-that-doesnt-require-a-flight", text: "A consultation that doesn't require a flight", level: 2 },
      { id: "what-still-has-to-happen-in-person", text: "What still has to happen in person", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "cybersecurity-in-healthcare",
    partId: "future",
    order: 21,
    title: "Why Hospitals Are a Common Ransomware Target",
    description:
      "Hospitals can't afford downtime the way most businesses can, which is exactly what makes them an attractive ransomware target. Walk through one attack scenario below and see how a handful of basic defenses stop most of them before they start.",
    level: "advanced",
    minutes: 9,
    prerequisites: [],
    tags: ["Security & Future", "Interactive"],
    headings: [
      { id: "hospitals-are-a-common-ransomware-target-and-heres-why", text: "Hospitals are a common ransomware target, and here's why", level: 2 },
      { id: "what-a-single-breach-actually-costs-a-hospital", text: "What a single breach actually costs a hospital", level: 2 },
      { id: "the-basic-defenses-that-stop-most-attacks", text: "The basic defenses that stop most attacks", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "regulation-and-oversight",
    partId: "future",
    order: 22,
    title: "How New Health Tech Actually Gets Approved",
    description:
      "\"Software as a medical device\" is a real regulatory category now, not a loophole — and that's exactly why approval takes so much longer than a typical app launch.",
    level: "advanced",
    minutes: 8,
    prerequisites: ["ai-assisted-diagnosis"],
    tags: ["Security & Future"],
    headings: [
      { id: "who-actually-approves-a-new-piece-of-health-tech", text: "Who actually approves a new piece of health tech", level: 2 },
      { id: "software-as-a-medical-device-is-a-real-category-now", text: "\"Software as a medical device\" is a real category now", level: 2 },
      { id: "why-approval-takes-longer-than-a-typical-app-launch", text: "Why approval takes longer than a typical app launch", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "where-health-tech-is-headed",
    partId: "future",
    order: 23,
    title: "Where Health Tech Is Headed",
    description:
      "Three trends are already visible if you know where to look, and every prediction about them assumes the same one thing stays true. One thing, on the other hand, almost certainly won't change at all.",
    level: "advanced",
    minutes: 7,
    prerequisites: [],
    tags: ["Security & Future"],
    headings: [
      { id: "three-trends-already-visible-today", text: "Three trends already visible today", level: 2 },
      { id: "the-one-thing-every-prediction-here-assumes", text: "The one thing every prediction here assumes", level: 2 },
      { id: "what-probably-wont-change", text: "What probably won't change", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "capstone-mapping-a-health-tech-idea",
    partId: "future",
    order: 24,
    title: "Building Something From All of It",
    description:
      "Every chapter until now has proven one idea in isolation. Pick one real problem, sketch the data it would need and who could see it, and check it against everything this track has actually covered.",
    level: "advanced",
    minutes: 12,
    prerequisites: ["what-is-an-ehr", "privacy-and-hipaa-basics"],
    tags: ["Security & Future"],
    headings: [
      { id: "picking-a-real-problem-not-a-vague-one", text: "Picking a real problem, not a vague one", level: 2 },
      { id: "sketching-the-data-it-would-need-and-who-could-see-it", text: "Sketching the data it would need, and who could see it", level: 2 },
      { id: "the-checklist-any-idea-here-should-survive", text: "The checklist any idea here should survive", level: 2 },
    ],
    status: "published",
  },
];
