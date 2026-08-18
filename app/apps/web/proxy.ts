import { NextResponse, type NextRequest } from 'next/server';

import { resolveLocale, SUPPORTED_LOCALES } from '@joinorigin/i18n';

/**
 * Locale resolution proxy (arch-i18n §6.3) — Next.js 16 `proxy.ts`
 * convention (renamed from `middleware.ts` by the `middleware-to-proxy`
 * codemod). Proxy defaults to the Node.js runtime.
 *
 * Precedence: locale-prefixed paths (`/<locale>/...`, TASK-444 + TASK-448)
 * force the prefix locale — including `/en/**` (the en surface mirrors the
 * canonical routes) → cookie `joinorigin_locale` wins → Accept-Language
 * header → `DEFAULT_LOCALE` (`en`). The resolved locale is forwarded as the
 * `x-joinorigin-locale` request header (read by the root layout and page
 * wrappers) — no URL rewrite, URLs stay clean (no `[locale]` segment in
 * Sprint 9).
 */

export const LOCALE_COOKIE = 'joinorigin_locale';

/** Locale forced by a locale-prefixed pathname — `/de`, `/de/...`, `/es/...`,
 *  `/en`, `/en/...`, `/pt-BR/...`, etc. `undefined` for every other path.
 *  All 21 `SUPPORTED_LOCALES` are surfaces (TASK-448 created the full
 *  `/<locale>/**` route trees, incl. `/en/**`). */
export function localeFromPathname(pathname: string): string | undefined {
  return SUPPORTED_LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const acceptLanguage = request.headers.get('accept-language') ?? undefined;

  // A locale-prefixed path is that locale's surface (TASK-315 for /de/*,
  // TASK-444 for every non-EN prefix, TASK-448 for /en/**): the locale
  // MUST be the prefix regardless of the cookie or Accept-Language so
  // `<html lang="<locale>">` renders server-side for crawlers and users
  // with no matching preference. All other routes keep the cookie →
  // Accept-Language → en precedence.
  const locale =
    localeFromPathname(pathname) ??
    (cookieLocale ? resolveLocale(cookieLocale) : resolveLocale(acceptLanguage));

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
  matcher: ['/((?!_next/static|_next/image|assets|fonts|favicon.ico).*)'],
};
