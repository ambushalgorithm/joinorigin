import { headers } from 'next/headers';

/**
 * Server-side geo helpers (arch §6.3, TASK-479 — fe-ip-country).
 *
 * Cloudflare sets the `CF-IPCountry` header (ISO-3166-1 alpha-2) on the
 * origin request. The locale proxy (`proxy.ts`) forwards it downstream as
 * the `x-joinorigin-ip-country` request header so server components can
 * order location content by the visitor's country (IP-country matches
 * first, then locale-language matches, then alphabetical).
 *
 * The header is only present when Cloudflare provided a value — local /
 * non-Cloudflare requests carry no country, and `getServerCountry()` then
 * returns `null` so callers fall back to locale-language ordering.
 */

/** The request header the proxy sets from Cloudflare's `CF-IPCountry`
 *  (must stay in sync with `IP_COUNTRY_HEADER` in `proxy.ts`). */
export const IP_COUNTRY_HEADER = 'x-joinorigin-ip-country';

/** ISO-3166-1 alpha-2 country code — exactly two uppercase ASCII letters. */
const COUNTRY_CODE_PATTERN = /^[A-Z]{2}$/;

/**
 * Resolve the visitor's country from the proxy-forwarded
 * `x-joinorigin-ip-country` header (TASK-479).
 *
 * Returns the ISO-3166-1 alpha-2 country code (uppercased, e.g. `"DE"`) or
 * `null` when the header is absent or not a well-formed country code —
 * callers then fall back to locale-language ordering.
 */
export async function getServerCountry(): Promise<string | null> {
  const headerStore = await headers();
  const raw = headerStore.get(IP_COUNTRY_HEADER)?.trim().toUpperCase();
  if (!raw || !COUNTRY_CODE_PATTERN.test(raw)) {
    return null;
  }
  return raw;
}
