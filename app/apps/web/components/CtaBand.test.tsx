import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import CtaBand from './CtaBand';

/**
 * `next/navigation` is mocked so the band's `useLocalizePath` (link
 * locale-prefix table) works in jsdom (TASK-456). `mockPathname` drives the
 * "current URL" for the prefix table. Locale is URL-only (TASK-468): tests
 * render with `I18nProvider locale=...` — no cookie is ever written or read.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

function renderBand(props: React.ComponentProps<typeof CtaBand> = {}, locale: Locale = 'en') {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CtaBand {...props} />
        </ThemeProvider>
      </NativeThemeProvider>
    </I18nProvider>,
  );
}

/**
 * Unit tests for the menu-page join CTA band (spec sprint-8 §4.2).
 *
 * The default band renders the join headline + a `Get Started`
 * rotating-border link (navigating to the locale-prefixed `/signup` route).
 * Legal pages pass `ctaOverride` to render `Questions about Origin?` with a
 * `Contact us` link to `/contact` (no signup route).
 */

describe('CtaBand', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/';
  });

  it('renders the default join band with an h2 headline', () => {
    renderBand();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Find your people. Start or grow something together.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Join 2,400\+ builders — from first ideas to established companies — on Origin's social collaboration network/i,
      ),
    ).toBeInTheDocument();
    const joinLink = screen.getByTestId('cta-band-join-button');
    expect(joinLink.tagName).toBe('A');
    expect(joinLink).toHaveAttribute('href', '/en/signup');
    expect(joinLink).toHaveTextContent('Get Started');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('prefixes the default join link on a /de/** load (table row 3)', () => {
    mockPathname = '/de/features';
    renderBand({}, 'de');
    expect(screen.getByTestId('cta-band-join-button')).toHaveAttribute('href', '/de/signup');
  });

  it('renders the contact override as a link to /en/contact (no join link)', () => {
    renderBand({
      headline: 'Questions about Origin?',
      subline: 'Our team replies within 2 business days.',
      ctaLabel: 'Contact us',
    });
    expect(
      screen.getByRole('heading', { level: 2, name: 'Questions about Origin?' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Our team replies within 2 business days.')).toBeInTheDocument();
    const contactLink = screen.getByRole('link', { name: 'Contact us' });
    expect(contactLink).toHaveAttribute('href', '/en/contact');
    expect(screen.queryByTestId('cta-band-join-button')).not.toBeInTheDocument();
  });

  it('prefixes the override link with /en on an unprefixed EN load (all-routes-prefixed)', () => {
    mockPathname = '/privacy';
    renderBand(
      {
        headline: 'Questions about Origin?',
        subline: 'Our team replies within 2 business days.',
        ctaLabel: 'Contact us',
      },
      'en',
    );
    expect(screen.getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', '/en/contact');
  });

  it('prefixes the override link on a /de/** load (table row 3)', () => {
    mockPathname = '/de/privacy';
    renderBand(
      {
        headline: 'Fragen zu Origin?',
        subline: 'Unser Team antwortet innerhalb von 2 Werktagen.',
        ctaLabel: 'Kontakt',
      },
      'de',
    );
    expect(screen.getByRole('link', { name: 'Kontakt' })).toHaveAttribute('href', '/de/contact');
  });

  it('prefixes the override link on an unprefixed path with an active de locale (URL-driven)', () => {
    mockPathname = '/privacy';
    renderBand(
      {
        headline: 'Fragen zu Origin?',
        subline: 'Unser Team antwortet innerhalb von 2 Werktagen.',
        ctaLabel: 'Kontakt',
      },
      'de',
    );
    expect(screen.getByRole('link', { name: 'Kontakt' })).toHaveAttribute('href', '/de/contact');
  });
});
