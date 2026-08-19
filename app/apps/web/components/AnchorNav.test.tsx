import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import {
  I18nProvider,
  LOCALE_COOKIE_NAME,
  _resetI18nForTests,
  getDictionary,
  type Locale,
} from '@joinorigin/i18n';

import AnchorNav from './AnchorNav';

/**
 * `next/navigation` is mocked so the nav's `useLocalizePath` works in jsdom
 * (TASK-456). `mockPathname` drives the "current URL"; in-page hash anchors
 * must stay `#id` on every locale surface (they are NOT internal route
 * links, so the prefix table never touches them).
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

const LINKS = [
  { id: 'concepts', label: 'Concepts' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'faq', label: 'Frequently asked questions' },
];

function renderNav(locale: Locale = 'en') {
  setNavigatorLanguage(locale);
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <ThemeProvider theme={theme}>
        <AnchorNav label="Documentation" links={LINKS} />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('AnchorNav', () => {
  beforeEach(() => {
    _resetI18nForTests();
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
    mockPathname = '/';
  });

  it('renders a nav landmark labeled with the page eyebrow key result', () => {
    renderNav();
    const nav = screen.getByRole('navigation', { name: 'Documentation' });
    expect(nav).toBeInTheDocument();
    expect(nav.getAttribute('data-testid')).toBe('anchor-nav');
  });

  it('renders pill links pointing at the on-page h2 ids', () => {
    renderNav();
    for (const link of LINKS) {
      const anchor = screen.getByRole('link', { name: link.label });
      expect(anchor).toHaveAttribute('href', `#${link.id}`);
    }
  });

  it('keeps hash anchors unchanged on a locale-prefixed load (no route prefix)', () => {
    mockPathname = '/de/docs';
    renderNav('de');
    for (const link of LINKS) {
      const anchor = screen.getByRole('link', { name: link.label });
      expect(anchor).toHaveAttribute('href', `#${link.id}`);
    }
  });

  it('keeps hash anchors unchanged on an unprefixed de-cookie load', () => {
    document.cookie = `${LOCALE_COOKIE_NAME}=de; path=/`;
    mockPathname = '/docs';
    renderNav('de');
    expect(screen.getByRole('link', { name: 'Roadmap' })).toHaveAttribute('href', '#roadmap');
  });
});
