/**
 * URL helpers for the analytics subsystem.
 *
 * Kept local to `lib/analytics` so the module has no dependency on the
 * `lib/seo` URL helper (owned by fe-seo) — the analytics subsystem must be
 * self-contained and importable by a client-only provider.
 */

const DEFAULT_SITE_URL = 'http://localhost:3100';

/**
 * Resolve a path (or full URL) against the canonical site URL.
 * Honors `NEXT_PUBLIC_SITE_URL`; falls back to the local default.
 */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return new URL(normalized, base).toString();
}
