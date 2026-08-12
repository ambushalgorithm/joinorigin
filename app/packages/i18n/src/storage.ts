/**
 * Locale persistence — cookie adapter (arch-i18n §6.5).
 *
 * Cookie name/value are the arch contract: `joinorigin_locale` = locale code,
 * 1-year expiry, `path=/`, `SameSite=Lax` (+ `Secure` in production).
 * The cookie is written ONLY on explicit user selection in the switcher —
 * auto-detection never writes it. On mobile (no switcher in Sprint 9) these
 * are no-ops guarded by `typeof document`.
 */

export const LOCALE_COOKIE_NAME = 'joinorigin_locale';

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

/** Read the persisted locale code, or null when unset/unavailable. */
export function getStoredLocale(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }
  const prefix = `${LOCALE_COOKIE_NAME}=`;
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  if (!match) {
    return null;
  }
  return decodeURIComponent(match.slice(prefix.length));
}

/** Persist an explicit locale selection (web only; no-op elsewhere). */
export function storeLocale(locale: string): void {
  if (typeof document === 'undefined') {
    return;
  }
  const secure =
    typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
  const cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(locale)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  document.cookie = cookie;
}
