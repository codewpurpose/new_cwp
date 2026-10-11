import type { LearnTrackId } from "@/lib/learn-types";
import type { AuthoredQuestion } from "@/lib/quizzes/types";
import { QUIZZES as computerVision } from "@/lib/quizzes/computer-vision";
import { QUIZZES as financialLiteracy } from "@/lib/quizzes/financial-literacy";
import { QUIZZES as github } from "@/lib/quizzes/github";
import { QUIZZES as healthInTech } from "@/lib/quizzes/health-in-tech";
import { QUIZZES as htmlCss } from "@/lib/quizzes/html-css";
import { QUIZZES as ml } from "@/lib/quizzes/ml";
import { QUIZZES as python } from "@/lib/quizzes/python";
import { QUIZZES as roblox } from "@/lib/quizzes/roblox";
import { QUIZZES as vibecoding } from "@/lib/quizzes/vibecoding";

/** Hand-written quick checks, one file per track so tracks can be edited independently. */
export const AUTHORED_QUIZZES: Record<LearnTrackId, Record<string, readonly AuthoredQuestion[]>> = {
  python,
  ml,
  vibecoding,
  "html-css": htmlCss,
  github,
  "computer-vision": computerVision,
  "financial-literacy": financialLiteracy,
  "health-in-tech": healthInTech,
  roblox,
};
