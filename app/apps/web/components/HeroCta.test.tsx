import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import HeroCta from './HeroCta';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';

/**
 * `next/navigation` is mocked so the CTA's `useLocalizePath` (link
 * locale-prefix table) works in jsdom (TASK-456). `mockPathname` drives the
 * "current URL" for the prefix table. Locale is URL-only (TASK-468): tests
 * render with `I18nProvider locale=...` — no cookie is ever written or read.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

function renderCta(props: React.ComponentProps<typeof HeroCta>, locale: Locale = 'en') {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <WaitlistModalProvider>
            <HeroCta {...props} />
          </WaitlistModalProvider>
        </ThemeProvider>
      </NativeThemeProvider>
    </I18nProvider>,
  );
}

/**
 * Unit tests for the hero-level join CTA (spec sprint-10 §4.3).
 *
 * - waitlist variant: a RotatingBorderButton that opens the shared waitlist
 *   modal (testID="hero-join-button").
 * - contact variant: a muted ghost link to /contact, never the modal
 *   (testID="hero-contact-link").
 */

describe('HeroCta', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/';
  });

  it('renders a waitlist button and opens the shared modal (spec §4.3)', async () => {
    const user = userEvent.setup();
    renderCta({ variant: 'waitlist', label: 'Join the waitlist' });
    const button = screen.getByTestId('hero-join-button');
    expect(button).toHaveTextContent('Join the waitlist');
    await user.click(button);
    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.queryByTestId('hero-contact-link')).not.toBeInTheDocument();
  });

  it('renders a contact ghost link (never the waitlist modal) on legal pages', async () => {
    const user = userEvent.setup();
    renderCta({ variant: 'contact', label: 'Contact us', href: '/contact' });
    const link = screen.getByTestId('hero-contact-link');
    expect(link).toHaveAttribute('href', '/en/contact');
    expect(link).toHaveTextContent('Contact us');
    expect(screen.queryByTestId('hero-join-button')).not.toBeInTheDocument();
    await user.click(link);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('prefixes the contact href with /en on an unprefixed EN load (all-routes-prefixed)', () => {
    mockPathname = '/privacy';
    renderCta({ variant: 'contact', label: 'Contact us' });
    expect(screen.getByTestId('hero-contact-link')).toHaveAttribute('href', '/en/contact');
  });

  it('prefixes the contact href on a /de/** load (table row 3)', () => {
    mockPathname = '/de/privacy';
    renderCta({ variant: 'contact', label: 'Kontakt' }, 'de');
    expect(screen.getByTestId('hero-contact-link')).toHaveAttribute('href', '/de/contact');
  });

  it('prefixes the contact href on an unprefixed path with an active de locale (URL-driven)', () => {
    mockPathname = '/privacy';
    renderCta({ variant: 'contact', label: 'Kontakt', href: '/contact' }, 'de');
    expect(screen.getByTestId('hero-contact-link')).toHaveAttribute('href', '/de/contact');
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/privacy';
    renderCta({ variant: 'contact', label: 'Contact us', href: '/contact' });
    expect(screen.getByTestId('hero-contact-link')).toHaveAttribute('href', '/en/contact');
  });

  it('does not double-prefix an already-prefixed href (idempotent)', () => {
    mockPathname = '/de/privacy';
    renderCta({ variant: 'contact', label: 'Kontakt', href: '/de/contact' }, 'de');
    expect(screen.getByTestId('hero-contact-link')).toHaveAttribute('href', '/de/contact');
  });
});
