# Verifying codewithpurpose.org in Google Search Console

The code (sitemap.ts, robots.ts, page metadata) only makes the site *ready* to be indexed. This is the step that actually tells Google to crawl it.

## 1. Sign in

Go to [search.google.com/search-console](https://search.google.com/search-console) and sign in with a shared/org Google account, not a personal one.

## 2. Add the property

Click the property dropdown → **Add property** → **Domain**, then enter `codewithpurpose.org`.

Domain covers `www` and non-`www`, `http` and `https`, all at once — use it instead of the URL prefix option.

## 3. Verify ownership

Google shows a TXT record value like `google-site-verification=abc123...`.

1. Add it as a TXT record on `codewithpurpose.org`'s DNS (Namecheap, GoDaddy, Cloudflare, Vercel Domains — wherever the domain is registered): Host `@`, Value the string Google gave you.
2. Back in Search Console, click **Verify**.

DNS changes can take a few minutes to a few hours — if verification fails right away, wait and retry before assuming it's broken.

No DNS access? Use **URL prefix** instead, verify with the **HTML tag** method, and add the value to `verification.google` in [layout.tsx](../src/app/layout.tsx)'s `metadata` export.

## 4. Submit the sitemap

Left sidebar → **Sitemaps** → enter `sitemap.xml` → **Submit**. Status should show "Success" within a few minutes.

## 5. Request indexing (optional, speeds things up)

Left sidebar → **URL Inspection** → paste in the homepage, then a few key pages (`/courses`, `/learn`, `/about`) → **Request Indexing** on each. There's a daily quota, so prioritize the homepage first.

## 6. Check progress

Give it a few days, then check **Pages** (indexed vs. excluded) and **Performance** (impressions/clicks). Ranking movement is weeks, not days.

## Who needs to do this

Whoever has DNS access for the domain, or deploy access to the codebase (for the HTML tag fallback) — this step can't be done by editing code alone.
