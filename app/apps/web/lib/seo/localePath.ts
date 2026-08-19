'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES, useI18n, type Locale } from '@joinorigin/i18n';

/**
 * Locale-aware path helper for internal links (Sprint 19 Goal 2, TASK-456).
 *
 * Implements the confirmed link-prefix table — the active locale's prefix is
 * applied to ALL internal links, EXCEPT a plain unprefixed EN load keeps
 * links unprefixed:
 *
 * | Current URL           | Active locale      | Internal links render as |
 * |-----------------------|--------------------|--------------------------|
 * | unprefixed `/features`| EN (no cookie/header)| unprefixed `/guides`     |
 * | `/en/features`        | EN                 | `/en/guides`             |
 * | `/de/features`        | de                 | `/de/guides`             |
 * | unprefixed + de cookie| de                 | `/de/guides`             |
 *
 * The rule derives from the CURRENT pathname first (a locale-prefixed load
 * keeps that prefix on every link — including `/en/**`, which stays `/en/**`
 * and never collapses), then falls back to the active locale (so an
 * unprefixed load with a `de` cookie renders `/de/**` links).
 *
 * The pure functions are unit-testable; `useLocalizePath` wires them to the
 * router pathname + i18n locale for client components. Hash-only anchors
 * (`#section`) and external URLs pass through untouched, and already-prefixed
 * hrefs are idempotent (never double-prefixed).
 */

/** The locale forced by a locale-prefixed pathname — `/de`, `/de/...`,
 *  `/en`, `/en/...`, `/pt-BR/...`, etc. `undefined` for unprefixed paths. */
export function localeFromPathname(pathname: string): Locale | undefined {
  return SUPPORTED_LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

/**
 * The prefix to apply to internal links for the current load.
 *
 * - Locale-prefixed pathname → that locale's prefix (`/en`, `/de`, `/vi`, …).
 * - Unprefixed pathname + non-EN active locale (cookie/header) → `/<locale>`.
 * - Unprefixed pathname + EN active locale → `''` (links stay unprefixed).
 */
export function localeLinkPrefix(pathname: string, locale: Locale): string {
  const pathLocale = localeFromPathname(pathname);
  if (pathLocale) {
    return `/${pathLocale}`;
  }
  if (locale !== DEFAULT_LOCALE) {
    return `/${locale}`;
  }
  return '';
}

/**
 * Apply the locale prefix to a single internal link per the table.
 *
 * Passthrough cases (returned unchanged): hash-only anchors (`#section`),
 * external URLs (scheme or `//`), empty strings, and hrefs that already
 * carry a locale prefix (idempotent — avoids double-prefixing when a parent
 * and child component both localize). The home path `/` localizes to the
 * prefix itself (`/` → `/de`).
 */
export function localizePath(path: string, pathname: string, locale: Locale): string {
  // Passthrough: hash-only anchors, external URLs (scheme or `//`), empty
  // strings. Internal site paths always start with a single `/`.
  if (!path.startsWith('/') || path.startsWith('#') || path.startsWith('//')) {
    return path;
  }
  if (localeFromPathname(path)) {
    return path;
  }
  const prefix = localeLinkPrefix(pathname, locale);
  if (!prefix) {
    return path;
  }
  return path === '/' ? prefix : `${prefix}${path}`;
}

/**
 * Client hook — returns a `localizePath` bound to the current router
 * pathname + active i18n locale. Call once per component:
 *
 * ```tsx
 * const localizePath = useLocalizePath();
 * <Link href={localizePath('/features')}>Features</Link>
 * ```
 */
export function useLocalizePath(): (path: string) => string {
  const pathname = usePathname();
  const { locale } = useI18n();
  return useCallback((path: string) => localizePath(path, pathname, locale), [pathname, locale]);
}
