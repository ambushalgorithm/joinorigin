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
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const acceptLanguage = request.headers.get('accept-language') ?? undefined;
  const locale = cookieLocale ? resolveLocale(cookieLocale) : resolveLocale(acceptLanguage);

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
