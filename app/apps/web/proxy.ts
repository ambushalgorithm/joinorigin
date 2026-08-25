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
 *
 * Geo-country (TASK-479): Cloudflare sets the `CF-IPCountry` header on the
 * origin request; this proxy forwards it downstream as the
 * `x-joinorigin-ip-country` request header so server components can order
 * location content by the visitor's country. The header is only set when
 * Cloudflare provides a value — local/dev requests carry no country and the
 * server-side geo helper (`lib/seo/geo.ts`) returns null, letting callers
 * fall back to locale-language ordering.
 */

/** Locale forced by a locale-prefixed pathname — `/de`, `/de/...`, `/es/...`,
 *  `/en`, `/en/...`, `/pt-BR/...`, etc. `undefined` for every other path.
 *  All 21 `SUPPORTED_LOCALES` are surfaces (TASK-448 created the full
 *  `/<locale>/**` route trees, incl. `/en/**`).
 *
 *  Story F (TASK-537): O(1) resolution instead of a 21-element array scan per
 *  request — the proxy runs on every page/RSC request, so this is the
 *  per-navigation hot path. The first pathname segment IS the locale prefix
 *  when it names a supported locale (exact `/de` or `/de/...`), so a single
 *  Set lookup replaces the linear `SUPPORTED_LOCALES.find(...)`. Semantics are
 *  identical: `/deutschland`, `/de-features` and `/events` are NOT locales
 *  (their first segment is not a member), and `/` has no segment. */
const LOCALE_SEGMENTS = new Set<string>(SUPPORTED_LOCALES);

export function localeFromPathname(pathname: string): string | undefined {
  const segment = pathname.split('/')[1];
  if (segment === undefined || !LOCALE_SEGMENTS.has(segment)) {
    return undefined;
  }
  return segment;
}

/** The request header this proxy sets from Cloudflare's `CF-IPCountry`
 *  (ISO-3166-1 alpha-2) — read by the server-side geo helper in
 *  `lib/seo/geo.ts` (TASK-479). */
export const IP_COUNTRY_HEADER = 'x-joinorigin-ip-country';

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

  // Cloudflare sets `CF-IPCountry` on the origin request (ISO-3166-1
  // alpha-2). Forward it downstream as `x-joinorigin-ip-country` so server
  // components can order location content by the visitor's country
  // (TASK-479). When absent (local dev, non-Cloudflare origin), the header
  // is simply not set — the geo helper returns null.
  const ipCountry = request.headers.get('cf-ipcountry')?.trim() || undefined;

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
    if (ipCountry) {
      response.headers.set(IP_COUNTRY_HEADER, ipCountry);
    }
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-joinorigin-locale', locale);
  if (ipCountry) {
    requestHeaders.set(IP_COUNTRY_HEADER, ipCountry);
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('x-joinorigin-locale', locale);
  if (ipCountry) {
    response.headers.set(IP_COUNTRY_HEADER, ipCountry);
  }

  return response;
}

export const config = {
  // Run on all routes except Next internals + static assets (fonts/images)
  // and system routes that never need locale resolution (metadata files,
  // icons, manifests — they pass through untouched via `isSystemRoute`, so
  // skipping the middleware hop entirely is the Story F per-navigation trim,
  // F6). Non-HTML system routes that still match here (api, file-extension
  // URLs) are excluded from the redirect inside `proxy` via `isSystemRoute`,
  // so they keep their canonical unprefixed URLs. Note: RSC/prefetch
  // requests intentionally still match — they carry the same page pathnames
  // and the layout reads `x-joinorigin-locale` from them, so locale
  // resolution IS needed there.
  matcher: [
    '/((?!_next/static|_next/image|assets|fonts|favicon.ico|icon|apple-icon|manifest.webmanifest|sitemap.xml|robots.txt|llms.txt).*)',
  ],
};
