import type { AuthoredQuestion } from "@/lib/quizzes/types";

/**
 * Hand-written quick checks for the health-in-tech track, keyed by chapter slug.
 * A chapter listed here uses these questions instead of the auto-drafted
 * quiz in src/lib/quiz.ts. Each question tests something the chapter
 * actually teaches; `answer` is the zero-based index of the correct option.
 */
export const QUIZZES: Record<string, readonly AuthoredQuestion[]> = {
  "what-is-health-tech": [
    {
      q: "Using the chapter's test, which of these counts as health tech?",
      options: [
        "A hospital's payroll system",
        "A medication-dosing screen",
        "The hospital cafeteria's ordering app",
        "A shift-swap tool for nurses",
      ],
      answer: 1,
    },
    {
      q: "A watch's heart-rate feature is ordinary wellness software. What turns the same code into health tech?",
      options: [
        "A clinician starts using its readings to make care decisions",
        "The company releases a software update",
        "More people download the app",
        "The watch gets a bigger screen",
      ],
      answer: 0,
    },
    {
      q: "According to the chapter, whether something counts as health tech depends mainly on:",
      options: [
        "How complex the code is",
        "Whether it runs inside a hospital building",
        "What happens downstream of its output",
        "How much the software costs",
      ],
      answer: 2,
    },
    {
      q: "In the track's pipeline, what happens right after a patient record gets created?",
      options: [
        "An AI model analyses it",
        "It is deleted for privacy",
        "It reaches the patient through an app",
        "It has to move between systems",
      ],
      answer: 3,
    },
  ],

  "why-healthcare-is-different": [
    {
      q: "In healthcare's three-party setup, who is the payer?",
      options: [
        "The patient who uses the software",
        "The hospital that buys it",
        "The insurer or employer that settles most of the bill",
        "The vendor that builds it",
      ],
      answer: 2,
    },
    {
      q: "Why is a checkout bug in a shopping app usually fully recoverable?",
      options: [
        "The loss is money, and a refund makes the same customer whole",
        "Shopping apps are tested more carefully",
        "Regulators fix shopping bugs quickly",
        "Customers never notice checkout bugs",
      ],
      answer: 0,
    },
    {
      q: "Why does buying new clinical software often take a hospital years rather than weeks?",
      options: [
        "Vendors deliberately slow down sales",
        "Security review, validation, integration, and training all come first",
        "Hospitals only buy software once a decade",
        "Software has to be written from scratch for each hospital",
      ],
      answer: 1,
    },
    {
      q: "Software that diagnoses, doses, or monitors a patient can fall into which regulatory category?",
      options: [
        "General wellness",
        "Consumer electronics",
        "Open-source software",
        "Software as a medical device",
      ],
      answer: 3,
    },
  ],

  "careers-in-health-tech": [
    {
      q: "Which role is usually filled by a nurse or doctor who moved into software?",
      options: [
        "Health data analyst",
        "Clinical informaticist",
        "Regulatory specialist",
        "Backend engineer",
      ],
      answer: 1,
    },
    {
      q: "Someone turns 'nurses keep missing this allergy alert' into a specific, buildable change to one screen. Which role is that?",
      options: [
        "Product manager on clinical software",
        "Implementation specialist",
        "Health data analyst",
        "Compliance auditor",
      ],
      answer: 0,
    },
    {
      q: "Which of these paths never requires a clinical licence?",
      options: [
        "Chief Medical Information Officer",
        "Hospital informatics leadership",
        "Health data analyst",
        "Practising nurse",
      ],
      answer: 2,
    },
    {
      q: "What does the chapter say actually gets someone hired into one of these roles?",
      options: [
        "A medical degree plus a computer science degree",
        "Ten years in general software first",
        "A professional certification exam",
        "One real technical skill plus direct exposure to how care happens",
      ],
      answer: 3,
    },
  ],

  "a-day-in-a-digital-clinic": [
    {
      q: "A patient writes 'cough for three weeks, worse at night when I lie down.' What does the structured record often keep?",
      options: [
        "The full sentence, word for word",
        "Cough, onset 3 weeks",
        "Only 'worse at night'",
        "Nothing until the doctor rewrites it",
      ],
      answer: 1,
    },
    {
      q: "When a referral moves to a specialist's different system, what usually arrives intact?",
      options: [
        "Structured fields like the diagnosis code and medication list",
        "Everything the patient said out loud",
        "The patient's own account of what makes symptoms worse",
        "Free-text notes, exactly as typed",
      ],
      answer: 0,
    },
    {
      q: "What does the pharmacy's own system check a new electronic prescription against?",
      options: [
        "The patient's step count",
        "The clinic's appointment schedule",
        "Every medication already on file, for interactions",
        "The doctor's billing codes",
      ],
      answer: 2,
    },
    {
      q: "Why can a computer act on a coded field but not on a typed sentence in a note?",
      options: [
        "Typed notes are always inaccurate",
        "Typed notes are deleted after the visit",
        "Coded fields are hidden from the patient",
        "Coded values can be counted and compared; free text generally can't",
      ],
      answer: 3,
    },
  ],

  "what-is-an-ehr": [
    {
      q: "According to the chapter, what two jobs was an EHR primarily built to do?",
      options: [
        "Help clinicians reason and speed up visits",
        "Produce a legally defensible record and justify a bill",
        "Store images and send reminders",
        "Run research studies and train AI",
      ],
      answer: 1,
    },
    {
      q: "Under role-based access, what does a front-desk scheduler typically see?",
      options: [
        "Name, appointment history, and insurance details",
        "The full medication list and lab results",
        "Every past visit note",
        "Nothing at all",
      ],
      answer: 0,
    },
    {
      q: "A system built to flag rising A1C values misses one written only in a doctor's sentence. Why?",
      options: [
        "A1C values are never recorded",
        "The doctor typed it in the wrong patient's chart",
        "It sits in unstructured free text the system can't read",
        "Labs are stored in a separate building",
      ],
      answer: 2,
    },
    {
      q: "What ratio did the widely cited study of physician time report?",
      options: [
        "Ten minutes of paperwork per hour with patients",
        "Equal time on paperwork and patients",
        "Half an hour of paperwork per hour with patients",
        "Nearly two hours of EHR and desk work per hour with patients",
      ],
      answer: 3,
    },
  ],

  interoperability: [
    {
      q: "A receiving system opens an incoming record fine but doesn't recognise the code 'DX-2240' inside it. What's been solved?",
      options: [
        "Semantic interoperability, but not syntactic",
        "Syntactic interoperability, but not semantic",
        "Both kinds",
        "Neither kind",
      ],
      answer: 1,
    },
    {
      q: "With one-off translators for every pair, how many do ten systems need?",
      options: ["10", "20", "100", "45"],
      answer: 3,
    },
    {
      q: "A vendor charges steep fees for the interface that lets other systems connect to theirs. What is that called?",
      options: [
        "Information blocking",
        "Semantic drift",
        "Role-based access",
        "Data minimisation",
      ],
      answer: 0,
    },
    {
      q: "According to the chapter, what has actually pushed a shared standard into wide use?",
      options: [
        "Vendors volunteering out of goodwill",
        "Patients asking for it",
        "Regulation giving every vendor the same deadline",
        "A single vendor buying all the others",
      ],
      answer: 2,
    },
  ],

  "health-data-standards": [
    {
      q: "In the v2 segment PID|1||482||DOE^JANE||19910604|F, which pipe-separated field holds the birth date?",
      options: ["The 4th", "The 7th", "The 5th", "The 3rd"],
      answer: 1,
    },
    {
      q: "Which terminology identifies exactly which lab test was run, whichever lab ran it?",
      options: ["ICD-10", "RxNorm", "LOINC", "SNOMED CT"],
      answer: 2,
    },
    {
      q: "Two pharmacy databases list 'metformin 500mg' under their own names. Which terminology lets a system know it's the same drug?",
      options: ["RxNorm", "LOINC", "ICD-10", "HL7 v2"],
      answer: 0,
    },
    {
      q: "Why did FHIR change the economics of connecting systems?",
      options: [
        "It replaced JSON with a faster binary format",
        "It made HL7 v2 messages illegal",
        "It removed the need for coding systems",
        "Its resources are fetched over REST, like any web API",
      ],
      answer: 3,
    },
  ],

  "privacy-and-hipaa-basics": [
    {
      q: "A step-counting app you downloaded yourself logs your heart rate. Does HIPAA usually cover that data?",
      options: [
        "Yes, all heart data is PHI",
        "No, unless the app works for a covered provider or insurer",
        "Yes, once it's stored in the cloud",
        "Only if the app charges a subscription",
      ],
      answer: 1,
    },
    {
      q: "An ER doctor requests your records from your regular clinic while treating you. Does that need your fresh authorisation?",
      options: [
        "No, treatment is one of the purposes HIPAA permits",
        "Yes, every transfer needs a new signature",
        "Only if you've never visited that ER",
        "Yes, unless a lawyer approves it",
      ],
      answer: 0,
    },
    {
      q: "A hospital wants a cloud provider to host its patient records. What has to be signed first?",
      options: [
        "A Notice of Privacy Practices",
        "A patient consent form for each record",
        "A Business Associate Agreement",
        "Nothing, if the provider's security is good",
      ],
      answer: 2,
    },
    {
      q: "Why isn't Safe Harbor de-identified data guaranteed to be anonymous?",
      options: [
        "Safe Harbor only removes names",
        "Hospitals keep a secret key to every record",
        "It is encrypted with a weak algorithm",
        "It can be linked with outside datasets, like a voter roll",
      ],
      answer: 3,
    },
  ],

  "what-counts-as-a-wearable": [
    {
      q: "A band's box says 'tracks your daily activity.' What review does that claim need in the US?",
      options: [
        "A 510(k) clearance",
        "A full clinical trial",
        "None; it's a general wellness claim",
        "A De Novo request",
      ],
      answer: 2,
    },
    {
      q: "A company wants to advertise that its watch 'detects atrial fibrillation.' What does it need first?",
      options: [
        "FDA clearance backed by clinical validation data",
        "Nothing, if the app store approves it",
        "A doctor's endorsement in the advert",
        "A certain number of positive reviews",
      ],
      answer: 0,
    },
    {
      q: "A continuous glucose monitor reads glucose from:",
      options: [
        "A blood draw each hour",
        "Light reflected off the skin",
        "Sweat on the skin's surface",
        "Interstitial fluid just under the skin",
      ],
      answer: 3,
    },
    {
      q: "A watch has a wellness step counter and an FDA-cleared ECG app. What does the clearance cover?",
      options: [
        "Every feature on the watch",
        "Only the ECG feature and its evidence",
        "Only the hardware, not the software",
        "Nothing once the watch updates",
      ],
      answer: 1,
    },
  ],

  "remote-patient-monitoring": [
    {
      q: "A monitored patient's readings stop arriving for three days. How should a well-designed programme treat that?",
      options: [
        "As good news, since nothing abnormal came in",
        "As a flag to follow up, like an abnormal reading",
        "As a reason to end the programme",
        "As a billing issue only",
      ],
      answer: 1,
    },
    {
      q: "The alert threshold is set so sensitively that nurses get paged constantly for readings that turn out fine. What's the risk?",
      options: [
        "Alert fatigue, so real alerts get taken less seriously",
        "The device's battery drains faster",
        "Patients get billed twice",
        "The data stops being stored",
      ],
      answer: 0,
    },
    {
      q: "Medicare's device code 99454 pays for a month only if the patient transmits readings on at least how many days of 30?",
      options: ["5", "10", "30", "16"],
      answer: 3,
    },
    {
      q: "A reading crosses the threshold and is escalated. Who decides whether to change the patient's medication?",
      options: [
        "The device, automatically",
        "The monitoring software vendor",
        "The on-call clinician",
        "The patient's insurer",
      ],
      answer: 2,
    },
  ],

  "how-a-wearable-actually-measures-you": [
    {
      q: "How does a wrist sensor estimate your heart rate?",
      options: [
        "It reads your heart's electrical signal through the strap",
        "It infers your pulse from how much light reflects back",
        "It listens to your heartbeat with a microphone",
        "It measures your wrist's temperature",
      ],
      answer: 1,
    },
    {
      q: "Why does a wearable smooth its raw signal before showing a number?",
      options: [
        "The raw samples are too noisy to read directly",
        "Smoothing saves battery",
        "Regulators require exactly a six-sample average",
        "The raw signal is encrypted",
      ],
      answer: 0,
    },
    {
      q: "When are a wrist wearable's heart-rate readings least reliable?",
      options: [
        "While you sit still",
        "During sleep",
        "First thing in the morning",
        "During vigorous exercise",
      ],
      answer: 3,
    },
    {
      q: "How does a consumer wearable decide which sleep stage you're in?",
      options: [
        "It reads your brain waves through the band",
        "It measures your eye movements",
        "It infers the stage from movement and heart-rate patterns",
        "It asks you each morning",
      ],
      answer: 2,
    },
  ],

  "the-limits-of-consumer-health-data": [
    {
      q: "In the large irregular-rhythm study, what share of notified people who wore a confirmation ECG patch showed atrial fibrillation on it?",
      options: ["About 90%", "About a third", "About two-thirds", "Almost none"],
      answer: 1,
    },
    {
      q: "Which of these can a consumer wearable simply not detect?",
      options: [
        "An unusually high heart rate",
        "A drop in daily activity",
        "A change in sleep duration",
        "A tumour",
      ],
      answer: 3,
    },
    {
      q: "Per the chapter, which pattern is worth booking a real appointment over?",
      options: [
        "One unusual reading on one night",
        "Any reading the app colours red",
        "A pattern repeating across days, paired with a symptom you feel",
        "A lower sleep score than last week",
      ],
      answer: 2,
    },
    {
      q: "What is 'orthosomnia'?",
      options: [
        "A preoccupation with a perfect sleep score that worsens sleep",
        "A sleep disorder wearables can diagnose",
        "Wearing a tracker on both wrists",
        "A brand of sleep-tracking ring",
      ],
      answer: 0,
    },
  ],

  "what-medical-ai-is-actually-doing-today": [
    {
      q: "Where does most of medical AI's advantage over a single radiologist come from?",
      options: [
        "A deeper understanding of biology",
        "Exposure to millions of labelled examples",
        "Access to the patient's full family history",
        "Faster computers in hospitals",
      ],
      answer: 1,
    },
    {
      q: "What does the chapter call the highest-volume use of AI in medicine today?",
      options: [
        "Fully autonomous diagnosis",
        "Robotic surgery",
        "Drafting notes, suggesting codes, and filling schedules",
        "Predicting one-in-a-million personal risks",
      ],
      answer: 2,
    },
    {
      q: "Why did hospitals adopt AI note drafting faster than diagnostic AI?",
      options: [
        "A wrong draft costs an edit, not a delayed diagnosis",
        "Note drafting needs no data at all",
        "Regulators banned diagnostic AI",
        "Clinicians enjoy writing notes",
      ],
      answer: 0,
    },
    {
      q: "A model is used on patients its training data barely represented. What tends to happen?",
      options: [
        "It refuses to make a prediction",
        "It warns the clinician automatically",
        "It becomes more accurate over time",
        "It quietly gets worse, without announcing it",
      ],
      answer: 3,
    },
  ],

  "ai-assisted-diagnosis": [
    {
      q: "Screen 10,000 people for a condition 1% of them have, using a test that's 90% sensitive and 90% specific. About what share of positive flags are real?",
      options: ["About 90%", "About 50%", "About 8%", "About 1%"],
      answer: 2,
    },
    {
      q: "Use the same test only on people already showing symptoms, where prevalence is 30%. The positive predictive value climbs to about:",
      options: ["79%", "30%", "8%", "99%"],
      answer: 0,
    },
    {
      q: "What happens when you lower the model's flag threshold?",
      options: [
        "Fewer real cases are caught and fewer false alarms",
        "More real cases are caught, but more false alarms too",
        "False alarms disappear entirely",
        "Nothing changes; the model output is fixed",
      ],
      answer: 1,
    },
    {
      q: "What does sensitivity measure?",
      options: [
        "The share of flagged people who really have the condition",
        "The share of healthy people correctly cleared",
        "How common the condition is",
        "The share of people with the condition the model correctly flags",
      ],
      answer: 3,
    },
  ],

  "drug-discovery-and-ai": [
    {
      q: "What problem did AlphaFold actually solve?",
      options: [
        "Choosing which disease to target",
        "Predicting a protein's 3D shape from its amino-acid sequence",
        "Running clinical trials faster",
        "Proving a drug is safe in humans",
      ],
      answer: 1,
    },
    {
      q: "In which stage has AI made the clearest dent?",
      options: [
        "Candidate discovery",
        "Phase 3 trials",
        "Regulatory review",
        "Manufacturing",
      ],
      answer: 0,
    },
    {
      q: "AI can match eligible patients to a trial in days. Why doesn't that shorten the trial itself much?",
      options: [
        "Regulators ignore AI-matched patients",
        "Matching is the longest stage",
        "Patients still have to be followed long enough to see if the drug works",
        "Trials no longer need patients",
      ],
      answer: 2,
    },
    {
      q: "Of candidates that reach human trials, roughly how many still fail, and where most often?",
      options: [
        "About 1 in 10, mostly at approval",
        "About half, mostly in animal testing",
        "Almost none fail once in humans",
        "About 9 in 10, most often when testing if it works",
      ],
      answer: 3,
    },
  ],

  "bias-and-error-in-medical-ai": [
    {
      q: "A model is 95% accurate on a test set that's 90% group A and 10% group B, and every error falls in group B. How accurate is it for group B?",
      options: ["About 95%", "About 90%", "About 50%", "About 5%"],
      answer: 2,
    },
    {
      q: "The care-management algorithm in the chapter predicted healthcare cost. Why did that disadvantage Black patients?",
      options: [
        "It was given each patient's race directly",
        "Unequal access meant lower past costs at the same level of illness",
        "Black patients were left out of the data entirely",
        "The model was trained in another country",
      ],
      answer: 1,
    },
    {
      q: "Pulse oximeters missed dangerously low oxygen more often in Black patients. What failure mode is that?",
      options: [
        "A measurement calibrated on one population, used on everyone",
        "A model that kept learning after approval",
        "A ransomware attack on the device",
        "A billing code that paid for the wrong test",
      ],
      answer: 0,
    },
    {
      q: "Besides accuracy, what should a subgroup report specifically include?",
      options: [
        "The model's training cost",
        "The number of engineers who built it",
        "Accuracy on the test set only, pooled",
        "The false negative rate for each group",
      ],
      answer: 3,
    },
  ],

  "what-telemedicine-actually-replaces": [
    {
      q: "Which visit is the best fit for video?",
      options: [
        "Checking a suspicious new lump",
        "A medication follow-up for a known condition",
        "Setting a broken wrist",
        "A first look at an unexplained symptom",
      ],
      answer: 1,
    },
    {
      q: "A doctor in Texas sees a patient on video who is sitting in Ohio. Where does the doctor generally need a licence?",
      options: [
        "Only Texas",
        "Either state is fine",
        "No licence is needed for video",
        "Ohio, where the patient is",
      ],
      answer: 3,
    },
    {
      q: "A frequently cited study found only about 12% of a telehealth service's visits replaced another visit. What were most of the rest?",
      options: [
        "New visits that wouldn't have happened otherwise",
        "Emergency room visits",
        "Duplicate bookings",
        "Visits by doctors to other doctors",
      ],
      answer: 0,
    },
    {
      q: "According to the chapter, what is the hard design problem in telemedicine?",
      options: [
        "Video quality",
        "Payment processing",
        "Triage: sorting which visits belong on a screen",
        "Appointment reminders",
      ],
      answer: 2,
    },
  ],

  "the-digital-divide-in-healthcare": [
    {
      q: "Which single change closes most of the device gap at once?",
      options: [
        "A faster video app",
        "A phone-only option that needs no app or broadband",
        "A larger help page",
        "Free smartwatches for patients",
      ],
      answer: 1,
    },
    {
      q: "Which barriers don't show up on a broadband coverage map?",
      options: [
        "Digital literacy, language, and disability",
        "Rural distance and fibre speed",
        "Data caps and router age",
        "Cell towers and satellite coverage",
      ],
      answer: 0,
    },
    {
      q: "A shared family phone with a data cap and a personal laptop on home broadband both count as 'having a device.' What's the point?",
      options: [
        "Phones are always better for video calls",
        "Survey counts are always exact",
        "Laptops are not allowed for telehealth",
        "The yes/no count hides big differences in real access",
      ],
      answer: 3,
    },
    {
      q: "A team launches video-only and plans to add access features later. What tends to happen?",
      options: [
        "Everyone gets served equally from day one",
        "Costs fall for every group",
        "It serves the best-connected first and the most vulnerable last",
        "Regulators require the features before launch",
      ],
      answer: 2,
    },
  ],

  "health-apps-and-patient-engagement": [
    {
      q: "Which apps tend to keep patients using them past the first few weeks?",
      options: [
        "Ones with the most features",
        "Ones tied to a clinician, an insurer's programme, or discharge instructions",
        "Ones with the highest app store rating",
        "Ones with the most notifications",
      ],
      answer: 1,
    },
    {
      q: "A medication app's daily opens rise for months, but whether people take the pill barely changes. What does that show?",
      options: [
        "Engagement is not the same as outcome",
        "The app is working well",
        "The medication is ineffective",
        "Users are lying about adherence",
      ],
      answer: 0,
    },
    {
      q: "Which feature passes the chapter's test: would it still make sense if it stopped increasing app opens?",
      options: [
        "A streak that guilts you into opening the app",
        "A badge for logging in seven days in a row",
        "A daily 'we miss you' notification",
        "A reminder timed to when you actually take your medication",
      ],
      answer: 3,
    },
    {
      q: "How can a five-star, million-download wellness app still be useless?",
      options: [
        "App stores delete ratings after a year",
        "High ratings mean the app is regulated",
        "Most wellness apps never have to prove they work",
        "Popular apps are always clinically tested",
      ],
      answer: 2,
    },
  ],

  "remote-care-across-borders": [
    {
      q: "Medical licensure for a remote consult typically follows:",
      options: [
        "Where the doctor trained",
        "Where the patient physically is",
        "Where the platform is incorporated",
        "Wherever the doctor chooses",
      ],
      answer: 1,
    },
    {
      q: "What's a key difference between GDPR and HIPAA for a cross-border service?",
      options: [
        "GDPR restricts moving health data out of the EU; HIPAA says little about borders",
        "HIPAA applies everywhere; GDPR only in the US",
        "They are identical in practice",
        "Neither covers health data",
      ],
      answer: 0,
    },
    {
      q: "How does a lot of cross-border care sidestep the sharpest liability problem?",
      options: [
        "By refusing patients from other countries",
        "By recording every call",
        "By using AI instead of doctors",
        "The remote specialist advises; the local provider stays responsible",
      ],
      answer: 3,
    },
    {
      q: "Which case does the chapter say a remote consult helps most?",
      options: [
        "Setting a broken bone",
        "Routine vaccinations",
        "A rare condition with no local specialist",
        "Emergency surgery",
      ],
      answer: 2,
    },
  ],

  "cybersecurity-in-healthcare": [
    {
      q: "Why are hospitals such attractive ransomware targets?",
      options: [
        "They store less data than other businesses",
        "They can't pause patient care to wait out an attack",
        "Their software is always newer",
        "They have no backups by law",
      ],
      answer: 1,
    },
    {
      q: "An old MRI machine can't be patched. What limits the damage if it's compromised?",
      options: [
        "Network segmentation, isolating it from other systems",
        "Turning it off at night",
        "Changing the hospital's Wi-Fi password",
        "Buying cyber insurance",
      ],
      answer: 0,
    },
    {
      q: "Which defence removes the ransom's leverage entirely?",
      options: [
        "A stronger firewall",
        "Paying the ransom quickly",
        "Hiring more IT staff",
        "Offline, regularly tested backups",
      ],
      answer: 3,
    },
    {
      q: "Per the chapter, what is the most common way in?",
      options: [
        "A sophisticated zero-day exploit",
        "A stolen server",
        "A phishing email that plays on urgency",
        "A rogue employee",
      ],
      answer: 2,
    },
  ],

  "regulation-and-oversight": [
    {
      q: "What usually triggers FDA review of a piece of health software?",
      options: [
        "Being used by more than a million people",
        "A claim to diagnose, treat, or prevent a disease",
        "Running on a phone",
        "Collecting any health-related data",
      ],
      answer: 1,
    },
    {
      q: "What decides a device's risk class?",
      options: [
        "How much harm a failure could cause",
        "How complex the technology is",
        "How much the device costs",
        "How many units will be sold",
      ],
      answer: 0,
    },
    {
      q: "Most moderate-risk devices clear review by showing what?",
      options: [
        "A ten-year clinical trial",
        "That they are open source",
        "That doctors like them",
        "Substantial equivalence to a device already on the market",
      ],
      answer: 3,
    },
    {
      q: "Why is an adaptive algorithm hard to regulate?",
      options: [
        "It can't be installed in hospitals",
        "It never needs updates",
        "The version reviewed and the version running later can differ",
        "It is always Class I",
      ],
      answer: 2,
    },
  ],

  "where-health-tech-is-headed": [
    {
      q: "Which prediction does the chapter say the current evidence does NOT support?",
      options: [
        "AI expanding from imaging into notes",
        "Fully autonomous diagnosis with no clinician reviewing it",
        "Monitoring moving earlier, before a diagnosis",
        "Interoperability reaching smaller clinics",
      ],
      answer: 1,
    },
    {
      q: "What does every trend in the chapter assume?",
      options: [
        "Trust problems like bias, access, and security get managed",
        "Hardware keeps getting cheaper",
        "Clinicians are removed from decisions",
        "Regulation goes away",
      ],
      answer: 0,
    },
    {
      q: "For interoperability to 'finish,' what still has to become true?",
      options: [
        "A single vendor has to win",
        "Patients have to stop changing doctors",
        "Every record has to move to paper first",
        "Smaller clinics and older systems have to adopt the standard",
      ],
      answer: 3,
    },
    {
      q: "Which question from the chapter's checklist helps judge a health-tech prediction?",
      options: [
        "How much funding has it raised?",
        "Is the founder well known?",
        "Does it remove a human reviewer, or change what they see?",
        "Has it been covered in the news?",
      ],
      answer: 2,
    },
  ],

  "capstone-mapping-a-health-tech-idea": [
    {
      q: "Which of these is a specific enough problem to start a capstone from?",
      options: [
        "An app for better health",
        "A patient home after a cardiac event who can't tell if today's tiredness is normal",
        "Help heart patients recover better",
        "Use AI to improve hospitals",
      ],
      answer: 1,
    },
    {
      q: "In the worked example, what's the fallback for a patient without a smartphone?",
      options: [
        "An automated phone call asking the same questions",
        "A printed sheet of warning signs only",
        "Nothing; they can't join the programme",
        "A free smartphone from the hospital",
      ],
      answer: 0,
    },
    {
      q: "In the worked example, who sees the patient's daily check-ins?",
      options: [
        "Everyone at the hospital",
        "The insurer, to adjust premiums",
        "Only an AI model, with no human",
        "The patient sees their trend; a nurse sees flagged entries",
      ],
      answer: 3,
    },
    {
      q: "What must any AI component in a capstone idea have?",
      options: [
        "A model trained on at least a million records",
        "Approval from an app store",
        "A named human reviewer in the loop",
        "The ability to change medication on its own",
      ],
      answer: 2,
    },
  ],
};
