'use client';

import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { I18nProvider, SUPPORTED_LOCALES, type Dictionary, type Locale } from '@joinorigin/i18n';

/**
 * URL-locale provider wrapper (TASK-488) — the single web mount for
 * `I18nProvider`.
 *
 * The active locale derives from the URL prefix at provider render time:
 * this wrapper reads `usePathname()` (which reflects the current route on
 * both the initial server render and every client-side navigation), derives
 * the `/<locale>/` prefix, and seeds `I18nProvider` with it as the active
 * locale. The language switcher is navigation only (`router.push` to
 * `/<locale>/<path>`), so the provider follows the URL on arrival — no
 * setLocale-then-push pre-toggle, no post-flash (TASK-488).
 *
 * Precedence: the URL prefix always wins when present. Unprefixed paths
 * (`/`, system routes, dev edge cases) fall back to the server-resolved
 * locale from the proxy-forwarded `x-joinorigin-locale` header — the SSR
 * initial locale, so the first paint is already translated (no flash). The
 * server dictionary is passed through only when it matches the active
 * locale; a URL-derived locale that differs from the server locale (the
 * stale `headers()` case during client navigation) loads its own dictionary
 * lazily inside the provider.
 *
 * Locale is URL-only (TASK-468): no cookie is ever written or read.
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

export interface LocalePathnameSyncProps {
  /** Server-resolved locale (proxy-forwarded `x-joinorigin-locale` header). */
  serverLocale: Locale;
  /** Server-provided dictionary for `serverLocale` — seeds the first paint. */
  serverDictionary?: Dictionary;
  children: ReactNode;
}

export function LocalePathnameSync({
  serverLocale,
  serverDictionary,
  children,
}: LocalePathnameSyncProps) {
  const pathname = usePathname();
  const urlLocale = pathnamePrefixLocale(pathname);
  const activeLocale = urlLocale ?? serverLocale;
  // The server dictionary only matches the server locale; a URL-derived
  // locale that differs (stale headers during client nav) loads its own
  // dictionary lazily inside the provider.
  const dictionary = activeLocale === serverLocale ? serverDictionary : undefined;

  return (
    <I18nProvider locale={activeLocale} dictionary={dictionary}>
      {children}
    </I18nProvider>
  );
}

export default LocalePathnameSync;
