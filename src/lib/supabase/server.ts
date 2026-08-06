import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * The server-side Supabase client, for writes that no signed-in user is making.
 *
 * This is a DIFFERENT client from the one in ./client.ts. That one uses the anon
 * key and is governed by row-level security; this one holds the service_role
 * key, which BYPASSES EVERY POLICY. It exists because newsletter subscribers are
 * anonymous — there is no Clerk `sub` claim to write RLS against — and the only
 * caller is /api/subscribe/, a route handler on the server.
 *
 * Three rules follow from that, and none of them are optional:
 *
 * 1. SUPABASE_SERVICE_ROLE_KEY has no NEXT_PUBLIC_ prefix, so importing this
 *    module from a client component is a build error. That is the point. Do not
 *    "fix" such an error by adding the prefix.
 * 2. Nothing here may be re-exported through a client boundary, and no value
 *    derived from this client may be sent to the browser unfiltered.
 * 3. Only reach for this when RLS genuinely cannot express the rule. Anything a
 *    signed-in learner does goes through ./with-clerk.tsx instead.
 *
 * Optional in the same way the rest of the stack is: without the key this
 * returns null and callers degrade rather than crash.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseServerConfigured = Boolean(url && serviceKey);

let client: SupabaseClient | null = null;

/**
 * Returns the service-role Supabase client, or null when it isn't configured.
 * Callers must handle null — see recordSubscriber in ./subscribers.ts.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseServerConfigured) return null;
  if (!client) {
    // No session to persist or refresh: this is a server process, not a browser
    // tab, and the key is the credential.
    client = createClient(url as string, serviceKey as string, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return client;
}
