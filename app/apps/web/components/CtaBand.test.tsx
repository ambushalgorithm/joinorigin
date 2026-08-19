import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import {
  I18nProvider,
  LOCALE_COOKIE_NAME,
  _resetI18nForTests,
  getDictionary,
  type Locale,
} from '@joinorigin/i18n';

import CtaBand from './CtaBand';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';

/**
 * `next/navigation` is mocked so the band's `useLocalizePath` (link
 * locale-prefix table) works in jsdom (TASK-456). `mockPathname` drives the
 * "current URL" for the prefix table.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

/** Aligns the provider's post-mount auto-detect with the render locale. */
function setNavigatorLanguage(language: string): void {
  Object.defineProperty(window.navigator, 'language', {
    value: language,
    configurable: true,
  });
}

function renderBand(props: React.ComponentProps<typeof CtaBand> = {}, locale: Locale = 'en') {
  setNavigatorLanguage(locale);
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <WaitlistModalProvider>
            <CtaBand {...props} />
          </WaitlistModalProvider>
        </ThemeProvider>
      </NativeThemeProvider>
    </I18nProvider>,
  );
}

/**
 * Unit tests for the menu-page join CTA band (spec sprint-8 §4.2).
 *
 * The default band renders the join headline + a `Get discovered`
 * rotating-border button (wired to the shared waitlist modal). Legal pages
 * pass `ctaOverride` to render `Questions about Origin?` with a `Contact us`
 * link to `/contact` (no modal).
 */

describe('CtaBand', () => {
  beforeEach(() => {
    _resetI18nForTests();
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
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
    expect(screen.getByRole('button', { name: 'Get Discovered' })).toBeInTheDocument();
  });

  it('renders the contact override as a link to /contact (no join button)', () => {
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
    expect(contactLink).toHaveAttribute('href', '/contact');
    expect(screen.queryByRole('button', { name: 'Get Discovered' })).not.toBeInTheDocument();
  });

  it('keeps the override link unprefixed on an unprefixed EN load (table row 1)', () => {
    mockPathname = '/privacy';
    renderBand(
      {
        headline: 'Questions about Origin?',
        subline: 'Our team replies within 2 business days.',
        ctaLabel: 'Contact us',
      },
      'en',
    );
    expect(screen.getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', '/contact');
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

  it('prefixes the override link on an unprefixed load with a de cookie (row 4)', () => {
    document.cookie = `${LOCALE_COOKIE_NAME}=de; path=/`;
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
