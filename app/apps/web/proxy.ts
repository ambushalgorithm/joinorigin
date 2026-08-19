import { NextResponse, type NextRequest } from 'next/server';

import { resolveAcceptLanguage, resolveLocale, SUPPORTED_LOCALES } from '@joinorigin/i18n';

/**
 * Locale resolution proxy (arch-i18n §6.3) — Next.js 16 `proxy.ts`
 * convention (renamed from `middleware.ts` by the `middleware-to-proxy`
 * codemod). Proxy defaults to the Node.js runtime.
 *
 * Precedence: locale-prefixed paths (`/<locale>/...`, TASK-444 + TASK-448)
 * force the prefix locale — including `/en/**` (the en surface mirrors the
 * canonical routes) → cookie `joinorigin_locale` wins → Accept-Language
 * header (parsed per RFC 9110: q-values, `q=0` exclusions, region-variant
 * fallback) → `DEFAULT_LOCALE` (`en`). The resolved locale is forwarded as the
 * `x-joinorigin-locale` request header (read by the root layout and page
 * wrappers) — no URL rewrite, URLs stay clean (no `[locale]` segment in
 * Sprint 9).
 *
 * Route-stick (TASK-455): the FIRST visit to a `/<locale>/...` prefixed
 * surface with no `joinorigin_locale` cookie SETS that cookie to the prefix
 * locale, so the user's locale preference persists across later navigations
 * and the page never flashes back to EN (the `/vi` bug). An existing cookie
 * is left untouched — an explicit selection from the language switcher wins.
 */

export const LOCALE_COOKIE = 'joinorigin_locale';

/** Cookie lifetime — parity with `@joinorigin/i18n` storage.ts (1 year). */
const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

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
  const pathLocale = localeFromPathname(pathname);
  const locale =
    pathLocale ??
    (cookieLocale ? resolveLocale(cookieLocale) : resolveAcceptLanguage(acceptLanguage));

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-joinorigin-locale', locale);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('x-joinorigin-locale', locale);

  // Route-stick (TASK-455): first visit to a locale-prefixed surface with no
  // cookie persists the prefix locale, so the `/vi/**` route (and every other
  // language surface) keeps its locale on later navigations instead of
  // flashing to EN. Never overwrite an existing cookie — that is the user's
  // explicit selection.
  if (pathLocale && !cookieLocale) {
    response.cookies.set(LOCALE_COOKIE, pathLocale, {
      path: '/',
      maxAge: LOCALE_COOKIE_MAX_AGE_SECONDS,
      sameSite: 'lax',
      secure: request.nextUrl.protocol === 'https:',
    });
  }
  return response;
}

export const config = {
  // Run on all routes except Next internals + static assets (fonts/images).
  matcher: ['/((?!_next/static|_next/image|assets|fonts|favicon.ico).*)'],
};
