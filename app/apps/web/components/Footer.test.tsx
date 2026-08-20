import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import Footer from './Footer';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';

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
          <WaitlistModalProvider>
            <Footer />
          </WaitlistModalProvider>
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
    expect(screen.getByText('Where teams find their origin')).toBeInTheDocument();
    for (const label of ['Explore', 'Product', 'Company', 'Legal']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(screen.getByTestId('footer-waitlist-button')).toBeInTheDocument();
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
