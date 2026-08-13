/**
 * Locale persistence — cookie adapter (arch-i18n §6.5).
 *
 * Cookie name/value are the arch contract: `joinorigin_locale` = locale code,
 * 1-year expiry, `path=/`, `SameSite=Lax` (+ `Secure` in production).
 * The cookie is written ONLY on explicit user selection in the switcher —
 * auto-detection never writes it. On mobile (no switcher in Sprint 9) and
 * server environments these are no-ops.
 *
 * DOM globals are accessed via `globalThis` so the module typechecks in both
 * web (DOM lib) and React Native (no DOM lib) targets.
 */

export const LOCALE_COOKIE_NAME = 'joinorigin_locale';

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

interface CookieDocument {
  cookie: string;
}

interface CookieWindow {
  location: { protocol: string };
}

function getDocument(): CookieDocument | null {
  if (typeof globalThis === 'undefined') {
    return null;
  }
  const doc = (globalThis as { document?: CookieDocument }).document;
  return doc ?? null;
}

function getWindow(): CookieWindow | null {
  if (typeof globalThis === 'undefined') {
    return null;
  }
  const win = (globalThis as { window?: CookieWindow }).window;
  return win ?? null;
}

/** Read the persisted locale code, or null when unset/unavailable. */
export function getStoredLocale(): string | null {
  const doc = getDocument();
  if (!doc || typeof doc.cookie !== 'string') {
    return null;
  }
  const prefix = `${LOCALE_COOKIE_NAME}=`;
  const match = doc.cookie
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
  const doc = getDocument();
  if (!doc) {
    return;
  }
  const win = getWindow();
  const secure = win && win.location.protocol === 'https:' ? '; Secure' : '';
  doc.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(locale)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}
