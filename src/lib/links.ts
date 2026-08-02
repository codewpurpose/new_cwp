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
export const ABOUT_HREF = "/about";
export const JOIN_HREF = "/join";
export const IMPACT_HREF = "/impact";
export const BLOG_HREF = "/blog";
export const CONTACT_HREF = "/contact";
export const DONATE_HREF = "/donate";
export const HOME_HREF = "/";

export const CONGRESS_LETTER_HREF =
  "https://drive.google.com/file/d/1jWQNoSwYOo9GRvRxcg5XVl8bnvAJf6vj/view?usp=sharing";
export const PYTHON_COURSE_HREF =
  "https://www.udemy.com/course/introduction-to-python-bootcamp/";
export const VIBECODING_COURSE_HREF =
  "https://www.udemy.com/course/vibecoding-101/";
export const ML_PART_1_COURSE_HREF =
  "https://www.udemy.com/course/intro-to-machine-learning-part-1/";
export const ML_PART_2_COURSE_HREF =
  "https://www.udemy.com/course/intro-to-machine-learning-part-2/";
export const FINANCIAL_LITERACY_COURSE_HREF =
  "https://www.udemy.com/course/financial-literacy-the-basics/";
export const HEALTH_IN_TECH_COURSE_HREF =
  "https://www.udemy.com/course/health-iin-tech/";
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
  { label: "Impact", href: IMPACT_HREF },
  { label: "Blog", href: BLOG_HREF },
  { label: "Contact", href: CONTACT_HREF },
] as const;
