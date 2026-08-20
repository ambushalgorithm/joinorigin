import { NextResponse, type NextRequest } from 'next/server';

import { resolveAcceptLanguage, SUPPORTED_LOCALES } from '@joinorigin/i18n';

/**
 * Locale resolution proxy (arch-i18n §6.3) — Next.js 16 `proxy.ts`
 * convention (renamed from `middleware.ts` by the `middleware-to-proxy`
 * codemod). Proxy defaults to the Node.js runtime.
 *
 * URL-only locale (TASK-468): the `joinorigin_locale` cookie is FULLY
 * REMOVED — the language always lives in the URL. Locale resolution is
 * exactly:
 *
 *   1. A locale-prefixed path (`/<locale>/...`, TASK-444 + TASK-448 —
 *      including `/en/**`, the EN surface that mirrors the canonical
 *      routes) forces the prefix locale. The prefixed path always wins.
 *   2. Every unprefixed HTML route 307-redirects to its
 *      `/<resolved-locale>/...` surface (all-routes-prefixed, TASK-464),
 *      where `resolved-locale` = Accept-Language header (parsed per RFC
 *      9110: q-values, `q=0` exclusions, region-variant fallback) →
 *      `DEFAULT_LOCALE` (`en`).
 *
 * System / non-HTML routes are EXCLUDED from the redirect so they keep
 * their canonical unprefixed URLs: the private `/api` surface, Next
 * internals (`/_next`), static trees (`/assets`, `/fonts`), the metadata
 * files (`/sitemap.xml`, `/robots.txt`, `/llms.txt`), the icon routes
 * (`/favicon.ico`, `/icon`, `/apple-icon`), and any URL whose final
 * segment carries a file extension (`/foo.png`, `/bar.css`, …).
 *
 * The resolved locale is forwarded as the `x-joinorigin-locale` request
 * header (read by the root layout and page wrappers) — no URL rewrite,
 * URLs stay clean (no `[locale]` segment in Sprint 9). Switching language
 * only changes the URL prefix; no cookie is ever written.
 */

/** Locale forced by a locale-prefixed pathname — `/de`, `/de/...`, `/es/...`,
 *  `/en`, `/en/...`, `/pt-BR/...`, etc. `undefined` for every other path.
 *  All 21 `SUPPORTED_LOCALES` are surfaces (TASK-448 created the full
 *  `/<locale>/**` route trees, incl. `/en/**`). */
export function localeFromPathname(pathname: string): string | undefined {
  return SUPPORTED_LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

/** Paths that must never be locale-redirected (TASK-464). */
const SYSTEM_ROUTE_PREFIXES = ['/api', '/_next', '/assets', '/fonts'];

const SYSTEM_ROUTE_EXACT = new Set([
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/favicon.ico',
  '/icon',
  '/apple-icon',
]);

/** True for non-HTML / system routes that keep their canonical unprefixed
 *  URL (never 307-redirected): the private API surface, Next internals,
 *  static asset trees, metadata + icon routes, and any URL whose final
 *  segment carries a file extension (`/icon-16x16.png`, `/manifest.json`). */
export function isSystemRoute(pathname: string): boolean {
  if (SYSTEM_ROUTE_EXACT.has(pathname)) {
    return true;
  }
  if (
    SYSTEM_ROUTE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  ) {
    return true;
  }
  const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1);
  return lastSegment.includes('.');
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptLanguage = request.headers.get('accept-language') ?? undefined;

  // A locale-prefixed path is that locale's surface (TASK-315 for /de/*,
  // TASK-444 for every non-EN prefix, TASK-448 for /en/**): the locale
  // MUST be the prefix regardless of Accept-Language so `<html
  // lang="<locale>">` renders server-side for crawlers and users with no
  // matching preference. Unprefixed routes resolve from the Accept-Language
  // header (RFC 9110 q-values) → en fallback. No cookie participates in
  // resolution (TASK-468 — the language always exists in the URL).
  const pathLocale = localeFromPathname(pathname);
  const locale = pathLocale ?? resolveAcceptLanguage(acceptLanguage);

  // All-routes-prefixed (TASK-464): every unprefixed HTML route 307-redirects
  // to its `/<locale>` surface. System / non-HTML routes (API, Next
  // internals, static assets, metadata files, icons, file-extension URLs)
  // pass through untouched — they never gain a locale prefix.
  if (!pathLocale && !isSystemRoute(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
    const response = NextResponse.redirect(redirectUrl, 307);
    response.headers.set('x-joinorigin-locale', locale);
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-joinorigin-locale', locale);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('x-joinorigin-locale', locale);

  return response;
}

export const config = {
  // Run on all routes except Next internals + static assets (fonts/images).
  // Non-HTML system routes that still match here (api, sitemap.xml, icon,
  // file-extension URLs) are excluded from the redirect inside `proxy` via
  // `isSystemRoute`, so they keep their canonical unprefixed URLs.
  matcher: ['/((?!_next/static|_next/image|assets|fonts|favicon.ico).*)'],
};
