export const SITE_URL = "https://www.codewithpurpose.org";

/**
 * The catalog. Courses and the interactive lesson tracks used to be two
 * sections with two nav entries; they are one page now, and `/learn` 308s
 * here. The individual track indexes below still live under /learn — only the
 * old index was folded in.
 */
export const COURSES_HREF = "/courses";
export const LEARN_ML_HREF = "/learn/ml";
export const LEARN_VIBECODING_HREF = "/learn/vibecoding";
export const LEARN_PYTHON_HREF = "/learn/python";
export const LEARN_FINANCIAL_LITERACY_HREF = "/learn/financial-literacy";
export const LEARN_HEALTH_IN_TECH_HREF = "/learn/health-in-tech";
export const TOOLKIT_HREF = "/toolkit";
export const DASHBOARD_HREF = "/dashboard";
export const LOGIN_HREF = "/login";
export const SIGN_UP_HREF = "/sign-up";
export const LEADERBOARD_HREF = "/leaderboard";
export const ABOUT_HREF = "/about";
export const JOIN_HREF = "/join";
/**
 * Impact and the blog are one page. `/blog` 308s here (next.config.ts); only
 * the individual posts still live under /blog/<slug>.
 */
export const IMPACT_HREF = "/impact";
export const CONTACT_HREF = "/contact";
export const DONATE_HREF = "/donate";
export const HOME_HREF = "/";

export const CONGRESS_LETTER_HREF =
  "https://drive.google.com/file/d/1jWQNoSwYOo9GRvRxcg5XVl8bnvAJf6vj/view?usp=sharing";
export const PYTHON_COURSE_HREF =
  "https://www.udemy.com/course/introduction-to-python-bootcamp/";
export const VIBECODING_COURSE_HREF =
  "https://www.udemy.com/course/vibecoding-101/";
export const VIBECODING_PART_2_COURSE_HREF =
  "https://www.udemy.com/course/vibecoding-the-mastery/";
export const ML_PART_1_COURSE_HREF =
  "https://www.udemy.com/course/intro-to-machine-learning-part-1/";
export const ML_PART_2_COURSE_HREF =
  "https://www.udemy.com/course/intro-to-machine-learning-part-2/";
export const FINANCIAL_LITERACY_COURSE_HREF =
  "https://www.udemy.com/course/financial-literacy-the-basics/";
export const HEALTH_IN_TECH_COURSE_HREF =
  "https://www.udemy.com/course/health-iin-tech/";
/**
 * Newsletter sign-up endpoint. The trailing slash is load-bearing: with
 * `trailingSlash: true`, posting to the unslashed path earns a 308 redirect
 * instead of a response.
 */
export const NEWSLETTER_SUBSCRIBE_PATH = "/api/subscribe/";

/** Account welcome email, pinged once on first sign-in. Same slash rule. */
export const ACCOUNT_WELCOME_PATH = "/api/account-welcome/";

export const CONTACT_EMAIL = "team@codewithpurpose.org";
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;
export const DISCORD_HREF = "https://discord.gg/W948bWbCAK";
export const INSTAGRAM_HREF = "https://www.instagram.com/codewpurpose/";
export const X_HREF = "https://x.com/codewpurpose";
export const VOLUNTEER_FORM_HREF = "https://forms.gle/qiSULkmBB7vWk9YDA";
export const HACK_CLUB_HREF = "https://hackclub.com";

/** The lessons under /learn are open source. These point contributors at them. */
export const GITHUB_HREF = "https://github.com/codewpurpose/new_cwp";
export const LESSON_AUTHORING_HREF =
  "https://github.com/codewpurpose/new_cwp/blob/main/docs/contributing/LESSON_AUTHORING.md";
export const LESSON_PROPOSAL_HREF =
  "https://github.com/codewpurpose/new_cwp/issues/new?template=lesson_proposal.yml";
export const HCB_DONATE_EMBED_SRC =
  "https://hcb.hackclub.com/donations/start/code-with-purpose";
export const SUBSTACK_EMBED_SRC = "https://codewithpurpose.substack.com/embed";

export const NAV_LINKS = [
  { label: "Courses", href: COURSES_HREF },
  { label: "About Us", href: ABOUT_HREF },
  { label: "Join Us", href: JOIN_HREF },
  { label: "Stories", href: IMPACT_HREF },
  { label: "Contact", href: CONTACT_HREF },
] as const;
