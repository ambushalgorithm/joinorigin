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

import Footer from './Footer';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';

/**
 * `next/navigation` is mocked so the Footer's `useLocalizePath` (link
 * locale-prefix table) and the mounted LanguageSwitcher hooks work in jsdom
 * (TASK-456). `mockPathname` drives the "current URL" for the prefix table.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => mockPathname,
}));

/** Aligns the provider's post-mount auto-detect with the render locale. */
function setNavigatorLanguage(language: string): void {
  Object.defineProperty(window.navigator, 'language', {
    value: language,
    configurable: true,
  });
}

function renderFooter(locale: Locale = 'en') {
  setNavigatorLanguage(locale);
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
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
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

    expect(screen.getByRole('link', { name: 'Locations' })).toHaveAttribute('href', '/location');
    expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/guides');
    expect(screen.getByRole('link', { name: 'Glossary' })).toHaveAttribute('href', '/glossary');

    // Community/Docs retained in the Product group.
    expect(screen.getByRole('link', { name: 'Community' })).toHaveAttribute('href', '/community');
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
  });

  it('keeps links unprefixed on an unprefixed EN load (table row 1)', () => {
    mockPathname = '/features';
    renderFooter('en');

    expect(screen.getByRole('link', { name: 'Locations' })).toHaveAttribute('href', '/location');
    expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/guides');
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy');
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

  it('prefixes links on an unprefixed load with a de cookie (table row 4)', () => {
    document.cookie = `${LOCALE_COOKIE_NAME}=de; path=/`;
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
