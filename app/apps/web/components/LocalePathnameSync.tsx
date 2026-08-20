'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { SUPPORTED_LOCALES, useI18n, type Locale } from '@joinorigin/i18n';

/**
 * Client-side locale sync for SPA navigation (TASK-465, Bug 1).
 *
 * During client-side navigation the root layout's server-resolved locale is
 * stale — `headers()` reflects the initial request, so the `I18nProvider`
 * never receives a new `locale` prop and the UI keeps the old language even
 * after the URL changed to `/<locale>/...`. This watcher closes that gap: it
 * reads the current pathname (`usePathname` always reflects client nav),
 * derives the prefix locale from the 21 `SUPPORTED_LOCALES`, and calls
 * `setLocale()` when the prefix differs from the active locale — so
 * navigating to `/vi/features` toggles the UI (chrome, switcher, `<html
 * lang/dir>`) instantly, no reload.
 *
 * Idempotency contract:
 * - no-op when the pathname has no locale prefix (`/`, `/features`);
 * - no-op when the prefix already equals the active locale;
 * - acts ONLY on genuine pathname changes (a `lastPathnameRef` guard), so a
 *   locale-only re-render — e.g. the LanguageSwitcher's own
 *   `setLocale` → `router.push` sequence — is never reverted mid-navigation;
 * - the provider's `setLocale` is itself guarded (`resolved === locale` →
 *   early return), so a redundant call is a pure no-op. No cookie is ever
 *   written — the language always lives in the URL (TASK-468).
 */

/** Locale forced by a pathname's first segment — `/vi`, `/vi/features`,
 *  `/pt-BR/...` → `'vi'` / `'pt-BR'`. `undefined` when the pathname is
 *  unprefixed (`/`, `/features`) or starts with a non-locale segment. */
export function pathnamePrefixLocale(pathname: string): Locale | undefined {
  const first = pathname.split('/')[1] ?? '';
  if (!first) {
    return undefined;
  }
  return (SUPPORTED_LOCALES as readonly string[]).includes(first) ? (first as Locale) : undefined;
}

export function LocalePathnameSync() {
  const { locale, setLocale } = useI18n();
  const pathname = usePathname();

  // Last-seen pathname. The watcher fires only when this changes, so locale
  // state updates (including the sync's own `setLocale`) never re-trigger it.
  const lastPathnameRef = useRef(pathname);

  useEffect(() => {
    if (lastPathnameRef.current === pathname) {
      return;
    }
    lastPathnameRef.current = pathname;

    const prefixLocale = pathnamePrefixLocale(pathname);
    if (!prefixLocale || prefixLocale === locale) {
      return;
    }
    void setLocale(prefixLocale).catch(() => {
      // Best-effort sync; the provider keeps its current dictionary on a
      // load failure and falls back to EN keys.
    });
  }, [pathname, locale, setLocale]);

  return null;
}

export default LocalePathnameSync;
