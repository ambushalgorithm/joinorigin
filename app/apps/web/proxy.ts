import { NextResponse, type NextRequest } from 'next/server';

import { resolveLocale } from '@joinorigin/i18n';

/**
 * Locale resolution proxy (arch-i18n §6.3) — Next.js 16 `proxy.ts`
 * convention (renamed from `middleware.ts` by the `middleware-to-proxy`
 * codemod). Proxy defaults to the Node.js runtime.
 *
 * Precedence: cookie `joinorigin_locale` wins → Accept-Language header →
 * `DEFAULT_LOCALE` (`en`). The resolved locale is forwarded as the
 * `x-joinorigin-locale` request header (read by the root layout and page
 * wrappers) — no URL rewrite, URLs stay clean (no `[locale]` segment in
 * Sprint 9).
 */

export const LOCALE_COOKIE = 'joinorigin_locale';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const acceptLanguage = request.headers.get('accept-language') ?? undefined;

  // `/de/*` is the German locale surface (Sprint 12, TASK-315): the locale
  // MUST be `de` regardless of the cookie or Accept-Language so
  // `<html lang="de">` renders server-side for crawlers and users with no
  // German preference. All other routes keep the cookie → Accept-Language →
  // en precedence.
  const isGermanPath = pathname === '/de' || pathname.startsWith('/de/');
  const locale = isGermanPath
    ? 'de'
    : cookieLocale
      ? resolveLocale(cookieLocale)
      : resolveLocale(acceptLanguage);

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
