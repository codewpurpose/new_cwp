import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase is optional. The whole student experience works local-first with no
 * backend; accounts, cross-device sync, and the leaderboard only switch on once
 * a project exists and its two public keys are in the environment.
 *
 * We only ever read the anon (publishable) key here. The service_role secret
 * must never ship to the browser — it bypasses row-level security.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

/**
 * Returns the browser Supabase client, or null when no keys are configured.
 * Callers must handle null and fall back to the local-first store.
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}
