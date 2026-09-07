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
export const LEARN_ROBLOX_HREF = "/learn/roblox";
/** The track. `GITHUB_HREF` further down is this repository — not the same thing. */
export const LEARN_GITHUB_HREF = "/learn/github";
export const LEARN_HTML_CSS_HREF = "/learn/html-css";
export const LEARN_COMPUTER_VISION_HREF = "/learn/computer-vision";
export const TOOLKIT_HREF = "/toolkit";
export const DASHBOARD_HREF = "/dashboard";
export const LOGIN_HREF = "/login";
export const SIGN_UP_HREF = "/sign-up";
export const LEADERBOARD_HREF = "/leaderboard";
/** The commit-history leaderboard — a second board, ranked by real GitHub activity instead of XP. */
export const COMMITS_LEADERBOARD_HREF = "/leaderboard/commits";
export const MEDIA_HREF = "/media";
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
export const PYTHON_PART_2_COURSE_HREF =
  "https://www.udemy.com/course/python-data-structures-basic/";
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
export const ROBLOX_COURSE_HREF =
  "https://www.udemy.com/course/master-roblox-studio/";
export const GITHUB_COURSE_HREF =
  "https://www.udemy.com/course/learn-github-in-30-minutes/";
export const HTML_CSS_COURSE_HREF =
  "https://www.udemy.com/course/master-html-and-css-in-30-minutes/";
export const COMPUTER_VISION_COURSE_HREF =
  "https://www.udemy.com/course/computer-vision-in-30-minutes/";
/**
 * Newsletter sign-up endpoint. The trailing slash is load-bearing: with
 * `trailingSlash: true`, posting to the unslashed path earns a 308 redirect
 * instead of a response.
 */
export const NEWSLETTER_SUBSCRIBE_PATH = "/api/subscribe/";

/** Account welcome email, pinged once on first sign-in. Same slash rule. */
export const ACCOUNT_WELCOME_PATH = "/api/account-welcome/";

/** Links or resyncs a student's GitHub username on the commits leaderboard. Same slash rule. */
export const GITHUB_STATS_SYNC_PATH = "/api/github-stats/";

export const CONTACT_EMAIL = "team@codewithpurpose.org";
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;
export const DISCORD_HREF = "https://discord.gg/W948bWbCAK";
export const INSTAGRAM_HREF = "https://www.instagram.com/codewpurpose/";
export const X_HREF = "https://x.com/codewpurpose";
/**
 * The sign-up form on /join — "CodeWithPurpose Further Enrichment".
 *
 * ONE url, used both as the iframe src and as the open-in-a-new-tab fallback.
 *
 * Deliberately WITHOUT `?embedded=true`, which is what Google's own "embed
 * HTML" button hands you. That parameter serves a stripped page that needs a
 * third-party cookie to bootstrap, so in a cross-site frame it renders "Allow
 * Google Forms access to your necessary cookies" instead of the form. Measured
 * against this form from a clean, signed-out browser: `embedded=true` showed
 * that interstitial 4 times out of 4, the plain URL rendered the form 3 times
 * out of 4 (the fourth was a slow load, not a wall).
 *
 * That is not an edge case. Safari and Firefox block third-party cookies by
 * default and Chrome is moving the same way, so the parameter breaks the form
 * for a large share of visitors — most of them on phones. The cost of dropping
 * it is that Google renders a little of its own chrome inside the frame, which
 * is a fair trade for a form that actually loads.
 *
 * Two more traps, both of which produce a URL that looks right and is not:
 *   - The editor URL carries `?usp=publish-editor`. Session junk; strip it.
 *   - `/forms/d/<docId>/` is the DOCUMENT. The published form is
 *     `/forms/d/e/<responseId>/`, which is what belongs here. The doc URL
 *     redirects to it in a top-level tab and is not reliable in a frame.
 */
const VOLUNTEER_FORM_ID =
  "1FAIpQLScpSxKPFuGpFRtJeOa4rmXm2U1ZdhipSiSj4yd6J0EyB-vDqA";
export const VOLUNTEER_FORM_HREF = `https://docs.google.com/forms/d/e/${VOLUNTEER_FORM_ID}/viewform`;
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
  { label: "Media", href: MEDIA_HREF },
  { label: "About Us", href: ABOUT_HREF },
  { label: "Join Us", href: JOIN_HREF },
  { label: "Stories", href: IMPACT_HREF },
  { label: "Contact", href: CONTACT_HREF },
] as const;
