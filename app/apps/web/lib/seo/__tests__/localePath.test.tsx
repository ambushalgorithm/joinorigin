import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import {
  I18nProvider,
  SUPPORTED_LOCALES,
  _resetI18nForTests,
  getDictionary,
  type Locale,
} from '@joinorigin/i18n';

import { localeFromPathname, localeLinkPrefix, localizePath, useLocalizePath } from '../localePath';

/**
 * Shared locale-aware path helper unit tests (Sprint 19 Goal 2, TASK-456;
 * all-routes-prefixed update TASK-464; URL-only TASK-468).
 *
 * The link-prefix table — every internal link ALWAYS carries a locale prefix
 * (including EN → `/en/...`), because unprefixed `/**` 307-redirects to its
 * `/<locale>` surface at the proxy. The active locale is URL-derived (the
 * `I18nProvider` prop / prefix) — no cookie participates:
 *
 * | Current URL    | Active locale | Internal links render as |
 * |----------------|---------------|--------------------------|
 * | unprefixed `/features` | EN   | `/en/guides`              |
 * | `/en/features` | EN            | `/en/guides`              |
 * | `/de/features` | de            | `/de/guides`              |
 * | unprefixed path + de    | de   | `/de/guides`              |
 */

describe('localeFromPathname', () => {
  it('detects a locale prefix on the exact root and nested paths', () => {
    expect(localeFromPathname('/de')).toBe('de');
    expect(localeFromPathname('/de/features')).toBe('de');
    expect(localeFromPathname('/en')).toBe('en');
    expect(localeFromPathname('/en/guides')).toBe('en');
    expect(localeFromPathname('/pt-BR')).toBe('pt-BR');
    expect(localeFromPathname('/vi/location/germany/berlin/berlin')).toBe('vi');
  });

  it('returns undefined for unprefixed and near-miss paths', () => {
    expect(localeFromPathname('/')).toBeUndefined();
    expect(localeFromPathname('/features')).toBeUndefined();
    // `/de-features` is NOT the `/de/` surface.
    expect(localeFromPathname('/de-features')).toBeUndefined();
    expect(localeFromPathname('')).toBeUndefined();
  });
});

describe('localeLinkPrefix', () => {
  it.each([
    // [pathname, locale, expected]
    ['/features', 'en', '/en'], // unprefixed EN load → /en/ links (TASK-464)
    ['/en/features', 'en', '/en'], // /en/** load → /en/** links
    ['/de/features', 'de', '/de'], // /de/** load → /de/** links
    ['/features', 'de', '/de'], // unprefixed path + active de locale (URL-driven)
    ['/', 'en', '/en'],
    ['/', 'vi', '/vi'],
    ['/features', 'pt-BR', '/pt-BR'],
  ] as Array<[string, Locale, string]>)(
    'returns the expected prefix for pathname=%s locale=%s',
    (pathname, locale, expected) => {
      expect(localeLinkPrefix(pathname, locale)).toBe(expected);
    },
  );

  it('never returns an empty prefix for a rendered page (all-routes-prefixed)', () => {
    expect(localeLinkPrefix('/features', 'en')).not.toBe('');
    expect(localeLinkPrefix('/', 'en')).not.toBe('');
  });
});

describe('localizePath', () => {
  it('implements the all-prefixed table for internal links', () => {
    expect(localizePath('/guides', '/features', 'en')).toBe('/en/guides');
    expect(localizePath('/guides', '/en/features', 'en')).toBe('/en/guides');
    expect(localizePath('/guides', '/de/features', 'de')).toBe('/de/guides');
    expect(localizePath('/guides', '/features', 'de')).toBe('/de/guides');
  });

  it('localizes the home path to the bare prefix', () => {
    expect(localizePath('/', '/de/features', 'de')).toBe('/de');
    expect(localizePath('/', '/features', 'de')).toBe('/de');
    expect(localizePath('/', '/features', 'en')).toBe('/en');
  });

  it('applies any of the 21 locale prefixes', () => {
    expect(localizePath('/contact', '/vi/privacy', 'vi')).toBe('/vi/contact');
    expect(localizePath('/contact', '/privacy', 'pt-BR')).toBe('/pt-BR/contact');
    expect(localizePath('/contact', '/privacy', 'zh-CN')).toBe('/zh-CN/contact');
  });

  it('keeps hash-only anchors untouched (in-page links never get a prefix)', () => {
    expect(localizePath('#concepts', '/de/docs', 'de')).toBe('#concepts');
    expect(localizePath('#concepts', '/docs', 'de')).toBe('#concepts');
    expect(localizePath('#faq', '/docs', 'en')).toBe('#faq');
  });

  it('keeps external URLs and empty hrefs untouched', () => {
    expect(localizePath('https://example.com/x', '/de/docs', 'de')).toBe('https://example.com/x');
    expect(localizePath('//cdn.example.com/x', '/de/docs', 'de')).toBe('//cdn.example.com/x');
    expect(localizePath('', '/de/docs', 'de')).toBe('');
    expect(localizePath('mailto:hi@joinorigin.com', '/de/docs', 'de')).toBe(
      'mailto:hi@joinorigin.com',
    );
  });

  it('is idempotent for already-prefixed hrefs (never double-prefixes)', () => {
    expect(localizePath('/de/contact', '/de/docs', 'de')).toBe('/de/contact');
    expect(localizePath('/de/contact', '/docs', 'de')).toBe('/de/contact');
    expect(localizePath('/en/guides', '/en/features', 'en')).toBe('/en/guides');
  });
});

describe('Story F O(1) locale resolution (TASK-537)', () => {
  it.each(SUPPORTED_LOCALES)(
    'resolves every supported locale prefix /%s via the Set lookup',
    (locale) => {
      expect(localeFromPathname(`/${locale}`)).toBe(locale);
      expect(localeFromPathname(`/${locale}/guides/start-an-origin`)).toBe(locale);
      expect(localeFromPathname(`/${locale}/`)).toBe(locale);
    },
  );

  it('treats near-miss segments as unprefixed (Set membership is exact, not prefix-like)', () => {
    expect(localeFromPathname('/deutschland')).toBeUndefined();
    expect(localeFromPathname('/de-features')).toBeUndefined();
    expect(localeFromPathname('/events')).toBeUndefined();
    expect(localeFromPathname('/japan')).toBeUndefined();
  });

  it('keeps localizePath correct for every locale prefix (never double-prefixes)', () => {
    for (const locale of SUPPORTED_LOCALES) {
      expect(localizePath(`/${locale}/guides`, '/features', locale)).toBe(`/${locale}/guides`);
    }
  });
});

/**
 * `useLocalizePath` hook harness — the global `next/navigation` mock returns
 * `/`, so this file overrides it with a mutable `mockPathname`.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

function LocalizedHrefProbe({ path }: { path: string }) {
  const localizePath = useLocalizePath();
  return <a href={localizePath(path)}>{path}</a>;
}

function renderProbe(path: string, locale: Locale) {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <ThemeProvider theme={theme}>
        <LocalizedHrefProbe path={path} />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('useLocalizePath', () => {
  beforeEach(() => {
    _resetI18nForTests();
  });

  it('binds to the router pathname + active locale', () => {
    mockPathname = '/features';
    renderProbe('/guides', 'de');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/de/guides');
  });

  it('prefixes links with /en on an unprefixed EN load (all-routes-prefixed)', () => {
    mockPathname = '/features';
    renderProbe('/guides', 'en');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/en/guides');
  });

  it('keeps the /en/** prefix on an /en/** load', () => {
    mockPathname = '/en/features';
    renderProbe('/guides', 'en');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/en/guides');
  });
});
