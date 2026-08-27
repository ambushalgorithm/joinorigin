import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import Footer from './Footer';

/**
 * `next/navigation` is mocked so the Footer's `useLocalizePath` (link
 * locale-prefix table) and the mounted LanguageSwitcher hooks work in jsdom
 * (TASK-456). `mockPathname` drives the "current URL" for the prefix table.
 * Locale is URL-only (TASK-468): tests render with `I18nProvider locale=...`
 * — no cookie is ever read.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => mockPathname,
}));

function renderFooter(locale: Locale = 'en') {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Footer />
        </ThemeProvider>
      </NativeThemeProvider>
    </I18nProvider>,
  );
}

describe('Footer', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/';
  });

  it('renders the brand, tagline, and grouped nav', () => {
    renderFooter();

    expect(screen.getByText('JoinOrigin')).toBeInTheDocument();
    expect(screen.getByText('Where teams find their Origin')).toBeInTheDocument();
    for (const label of ['Explore', 'Product', 'Company', 'Legal']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    const joinLink = screen.getByTestId('footer-waitlist-button');
    expect(joinLink.tagName).toBe('A');
    expect(joinLink).toHaveAttribute('href', '/en/signup');
    expect(joinLink).toHaveTextContent('Get Started');
  });

  it('prefixes the footer Get Started link on a /de/** load (table row 3)', () => {
    mockPathname = '/de/features';
    renderFooter('de');
    expect(screen.getByTestId('footer-waitlist-button')).toHaveAttribute('href', '/de/signup');
  });

  it('renders the Explore group with Locations / Guides / Glossary links (TASK-316)', () => {
    renderFooter();

    expect(screen.getByRole('link', { name: 'Locations' })).toHaveAttribute('href', '/en/location');
    expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/en/guides');
    expect(screen.getByRole('link', { name: 'Glossary' })).toHaveAttribute('href', '/en/glossary');

    // Community/Docs retained in the Product group.
    expect(screen.getByRole('link', { name: 'Community' })).toHaveAttribute(
      'href',
      '/en/community',
    );
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/en/docs');
  });

  it('prefixes links with /en on an unprefixed EN load (all-routes-prefixed)', () => {
    mockPathname = '/features';
    renderFooter('en');

    expect(screen.getByRole('link', { name: 'Locations' })).toHaveAttribute('href', '/en/location');
    expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/en/guides');
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/en/privacy');
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/features';
    renderFooter('en');

    expect(screen.getByRole('link', { name: 'Locations' })).toHaveAttribute('href', '/en/location');
    expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/en/guides');
    expect(screen.getByRole('link', { name: 'Glossary' })).toHaveAttribute('href', '/en/glossary');
  });

  it('keeps the /de/** prefix on a /de/** load (table row 3)', () => {
    mockPathname = '/de/features';
    renderFooter('de');

    expect(screen.getByRole('link', { name: 'Standorte' })).toHaveAttribute('href', '/de/location');
    expect(screen.getByRole('link', { name: 'Anleitungen' })).toHaveAttribute('href', '/de/guides');
    expect(screen.getByRole('link', { name: 'Funktionen' })).toHaveAttribute(
      'href',
      '/de/features',
    );
    expect(screen.getByRole('link', { name: 'Über uns' })).toHaveAttribute('href', '/de/about');
    expect(screen.getByRole('link', { name: 'Datenschutz' })).toHaveAttribute(
      'href',
      '/de/privacy',
    );
  });

  it('prefixes links on an unprefixed path with an active de locale (URL-driven)', () => {
    mockPathname = '/features';
    renderFooter('de');

    expect(screen.getByRole('link', { name: 'Anleitungen' })).toHaveAttribute('href', '/de/guides');
    expect(screen.getByRole('link', { name: 'Kontakt' })).toHaveAttribute('href', '/de/contact');
    expect(screen.getByRole('link', { name: 'Nutzungsbedingungen' })).toHaveAttribute(
      'href',
      '/de/terms',
    );
  });
});

/**
 * Story A (Sprint 22): the Footer is mobile-first at the researched 320px
 * minimum viewport (TASK-526) — the 320px base stacks the whole footer
 * vertically (column layout with compact 16px gutters); the row layout
 * applies at tablet+. jsdom does not apply `@media` to layout, so
 * breakpoint behavior is asserted on the generated stylesheet.
 */
describe('Story A: Footer mobile-first breakpoints (min viewport = 320px)', () => {
  /** Renders the footer server-side and returns the generated CSS text. */
  function cssForFooter(): string {
    const sheet = new ServerStyleSheet();
    try {
      renderToString(
        sheet.collectStyles(
          <I18nProvider locale="en" dictionary={getDictionary('en')}>
            <NativeThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
                <Footer />
              </ThemeProvider>
            </NativeThemeProvider>
          </I18nProvider>,
        ),
      );
      return sheet.getStyleTags();
    } finally {
      sheet.seal();
    }
  }

  it('uses 16px gutters at the 320px floor and widens at breakpoints', () => {
    const css = cssForFooter();
    expect(css).toContain('padding:32px 16px');
    expect(css).toContain('@media (min-width:480px)');
    expect(css).toContain('padding:32px 24px');
    expect(css).toContain('@media (min-width:1024px)');
    expect(css).toContain('padding:48px 32px');
  });

  it('stacks the footer vertically (column) at the 320px floor', () => {
    const css = cssForFooter();
    expect(css).toContain('flex-direction:column');
    // The row layout applies at tablet+.
    expect(css).toContain('@media (min-width:768px)');
    expect(css).toContain('flex-direction:row');
  });

  it('stacks the nav groups vertically at the 320px floor', () => {
    const css = cssForFooter();
    // Base: groups stack vertically; tablet+: fan out into columns.
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('@media (min-width:768px)');
    expect(css).toContain('flex-direction:row');
  });

  it('keeps the group gap compact at the 320px floor and widens at tablet+', () => {
    const css = cssForFooter();
    expect(css).toContain('gap:24px');
    expect(css).toContain('@media (min-width:768px)');
    expect(css).toContain('gap:48px');
  });
});
