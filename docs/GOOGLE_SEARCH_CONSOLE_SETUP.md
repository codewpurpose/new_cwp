# Verifying codewithpurpose.org in Google Search Console

Search Console is what actually tells Google "crawl this site" and lets you submit the sitemap. The code changes (sitemap.ts, robots.ts, metadata) only make the site *ready* to be indexed — this step is what gets it in front of Google.

## Step 1: Sign in

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Sign in with whichever Google account should own this property (ideally a shared/org account, not a personal one, so more than one person can manage it later)

## Step 2: Add the property

1. Click the property dropdown (top left) → **Add property**
2. You'll see two options — **use Domain, not URL prefix**:
   - **Domain** (`codewithpurpose.org`) — covers `www` and non-`www`, `http` and `https`, all in one property. Verified via DNS.
   - **URL prefix** (`https://www.codewithpurpose.org`) — only covers that exact URL. Verified via HTML file, meta tag, Google Analytics, or Google Tag Manager.
3. Recommendation: use **Domain**. It's the more complete option and avoids having to separately verify `www` vs. non-`www` later.

## Step 3: Verify ownership (Domain method — DNS TXT record)

1. Google will show you a TXT record value like `google-site-verification=abc123...`
2. You need access to DNS for `codewithpurpose.org` (wherever the domain is registered — Namecheap, GoDaddy, Cloudflare, Vercel Domains, etc.). If you don't have this access, this is the actual blocker — ask whoever manages the domain registrar/DNS.
3. Add a new **TXT record**:
   - Host/Name: `@` (or blank, depending on the registrar)
   - Value: the string Google gave you
   - TTL: default is fine
4. Save, then go back to Search Console and click **Verify**. DNS changes can take a few minutes to a few hours to propagate — if it fails immediately, wait and retry rather than assuming it's broken.

## Step 3 (alternative): Verify ownership (URL prefix method — HTML tag)

If you don't have DNS access but do have access to the codebase/deploys, use this instead:

1. Choose **URL prefix**, enter `https://www.codewithpurpose.org`
2. Pick the **HTML tag** method — Google gives you a meta tag like:
   ```html
   <meta name="google-site-verification" content="abc123..." />
   ```
3. Add it to the site's metadata in [layout.tsx](../src/app/layout.tsx), inside the `metadata` object:
   ```ts
   export const metadata: Metadata = {
     // ...existing fields
     verification: {
       google: "abc123...", // the content value only, not the full tag
     },
   };
   ```
4. Deploy the change, then click **Verify** in Search Console.

Note: this only verifies `https://www.codewithpurpose.org` specifically — if the site is also reachable at the bare `codewithpurpose.org` (no `www`), that's treated as a separate, unverified URL prefix property. That's the tradeoff vs. the Domain method above.

## Step 4: Submit the sitemap

1. Once verified, open the property
2. Left sidebar → **Sitemaps**
3. Enter `sitemap.xml` in the "Add a new sitemap" field (it'll resolve to `https://www.codewithpurpose.org/sitemap.xml`)
4. Click **Submit**
5. Status should move to "Success" within a few minutes — it'll show how many URLs were discovered (~50, per the current sitemap)

## Step 5: Speed up initial indexing (optional but helpful)

1. Left sidebar → **URL Inspection**
2. Paste in the homepage URL, then a few key pages (`/courses`, `/learn`, `/about`)
3. Click **Request Indexing** for each — this asks Google to crawl sooner instead of waiting for its normal schedule
4. There's a daily quota on manual requests, so prioritize homepage + highest-value pages first

## Step 6: Confirm it's working

- Give it a few days, then check **Pages** in the left sidebar — it'll show how many pages are indexed vs. excluded (and why, if excluded)
- Check **Performance** for early impressions/clicks in search results
- This is a slow process — meaningful ranking movement is typically weeks, not days

## Who needs to do this

Whoever has DNS access for `codewithpurpose.org` (Step 3, Domain method) or deploy access to the codebase (Step 3, HTML tag alternative) needs to actually click through Search Console — this can't be done by editing code alone. If that's your lead, this doc should be enough to hand off directly.
