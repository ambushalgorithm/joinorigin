import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import Header from './Header';

/**
 * `next/navigation` is mocked so the Header's `useLocalizePath` (link
 * locale-prefix table) and the mounted LanguageSwitcher hooks work in jsdom
 * (TASK-456). `mockPathname` drives the "current URL" for the prefix table;
 * `mockPush` records switcher navigations. Locale is URL-only (TASK-468):
 * tests render with `I18nProvider locale=...` — no cookie is ever read.
 */
const mockPush = jest.fn();
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
}));

function renderHeader(locale: Locale = 'en') {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </NativeThemeProvider>
    </I18nProvider>,
  );
}

describe('Header', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/';
  });

  it('renders the brand, desktop nav, Explore submenu, Log In and Get Started CTA', () => {
    renderHeader();

    expect(screen.getByText('JoinOrigin')).toBeInTheDocument();
    // Explore dropdown (TASK-316) + retained top-level links.
    expect(screen.getByTestId('explore-menu-toggle')).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();
    for (const label of ['Community', 'Guides', 'Locations']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    for (const label of ['Features', 'Docs', 'About']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByTestId('get-started-button')).toBeInTheDocument();
  });

  it('opens the Explore submenu and links to the SEO hubs', async () => {
    const user = userEvent.setup();
    renderHeader();

    const toggle = screen.getByTestId('explore-menu-toggle');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // jsdom's matchMedia reports desktop media queries as inactive, so the
    // desktop `<nav>` is `display:none` here; `hidden: true` scopes the role
    // query to the rendered anchors (real visibility is covered by e2e).
    const menu = screen.getByTestId('explore-menu');
    expect(within(menu).getByRole('link', { name: 'Community', hidden: true })).toHaveAttribute(
      'href',
      '/en/community',
    );
    expect(within(menu).getByRole('link', { name: 'Guides', hidden: true })).toHaveAttribute(
      'href',
      '/en/guides',
    );
    expect(within(menu).getByRole('link', { name: 'Locations', hidden: true })).toHaveAttribute(
      'href',
      '/en/location',
    );
    // ESC closes the dropdown.
    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('routes the Get Started CTA to the locale-prefixed signup page', async () => {
    const user = userEvent.setup();
    renderHeader();

    const cta = screen.getByTestId('get-started-button');
    expect(cta).toHaveAttribute('href', '/en/signup');
    expect(cta).toHaveTextContent('Get Started');
    // A real anchor — navigation works without JS.
    await user.click(cta);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('routes the desktop Log In button to the locale-prefixed signup page (TASK-405)', async () => {
    const user = userEvent.setup();
    renderHeader();

    const login = screen.getByTestId('login-button');
    expect(login).toHaveAttribute('href', '/en/signup');
    await user.click(login);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('routes the mobile panel Log In button to the locale-prefixed signup page (TASK-405)', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByTestId('mobile-menu-toggle'));
    const login = screen.getByTestId('mobile-login-button');
    expect(login).toHaveAttribute('href', '/en/signup');
    await user.click(login);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('routes the mobile panel Get Started CTA to the locale-prefixed signup page', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByTestId('mobile-menu-toggle'));
    const cta = screen.getByTestId('mobile-get-started-button');
    expect(cta).toHaveAttribute('href', '/en/signup');
    expect(cta).toHaveTextContent('Get Started');
    await user.click(cta);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('toggles the mobile menu and closes it on ESC', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByTestId('mobile-menu-toggle'));
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  it('lists the Explore links in the mobile panel (TASK-316)', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByTestId('mobile-menu-toggle'));
    const menu = screen.getByTestId('mobile-menu');

    // The Explore group label + links come first, then the retained links.
    expect(within(menu).getByText('Explore')).toBeInTheDocument();
    expect(within(menu).getByRole('link', { name: 'Community' })).toHaveAttribute(
      'href',
      '/en/community',
    );
    expect(within(menu).getByRole('link', { name: 'Guides' })).toHaveAttribute(
      'href',
      '/en/guides',
    );
    expect(within(menu).getByRole('link', { name: 'Locations' })).toHaveAttribute(
      'href',
      '/en/location',
    );
    for (const label of ['Features', 'Docs', 'About']) {
      expect(within(menu).getByText(label)).toBeInTheDocument();
    }
  });

  it('prefixes links with /en on an unprefixed EN load (all-routes-prefixed)', () => {
    mockPathname = '/features';
    renderHeader('en');

    // Brand + all rendered links (desktop nav + closed Explore dropdown).
    expect(screen.getByLabelText('JoinOrigin home')).toHaveAttribute('href', '/en');
    const hrefs = screen
      .getAllByRole('link', { hidden: true })
      .map((link) => link.getAttribute('href'));
    for (const href of [
      '/en/community',
      '/en/guides',
      '/en/location',
      '/en/features',
      '/en/docs',
      '/en/about',
    ]) {
      expect(hrefs).toContain(href);
    }
    expect(hrefs).not.toContain('/guides');
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/features';
    renderHeader('en');

    expect(screen.getByLabelText('JoinOrigin home')).toHaveAttribute('href', '/en');
    const hrefs = screen
      .getAllByRole('link', { hidden: true })
      .map((link) => link.getAttribute('href'));
    for (const href of ['/en/community', '/en/guides', '/en/location', '/en/features']) {
      expect(hrefs).toContain(href);
    }
    expect(hrefs).not.toContain('/guides');
  });

  it('keeps the /de/** prefix on a /de/** load (table row 3)', () => {
    mockPathname = '/de/features';
    renderHeader('de');

    expect(screen.getByLabelText('Zur Startseite von JoinOrigin')).toHaveAttribute('href', '/de');
    const hrefs = screen
      .getAllByRole('link', { hidden: true })
      .map((link) => link.getAttribute('href'));
    for (const href of ['/de/community', '/de/guides', '/de/location', '/de/features']) {
      expect(hrefs).toContain(href);
    }
    expect(hrefs).not.toContain('/guides');
  });

  it('prefixes links on an unprefixed path with an active de locale (URL-driven)', () => {
    mockPathname = '/features';
    renderHeader('de');

    const hrefs = screen
      .getAllByRole('link', { hidden: true })
      .map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('/de/guides');
    expect(hrefs).toContain('/de/docs');
    expect(hrefs).not.toContain('/guides');
  });

  it('prefixes mobile-panel links too', async () => {
    const user = userEvent.setup();
    mockPathname = '/de/features';
    renderHeader('de');

    await user.click(screen.getByTestId('mobile-menu-toggle'));
    const menu = screen.getByTestId('mobile-menu');
    const hrefs = within(menu)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('/de/community');
    expect(hrefs).toContain('/de/guides');
    expect(hrefs).toContain('/de/location');
    expect(hrefs).toContain('/de/features');
    expect(hrefs).toContain('/de/about');
  });
});

/**
 * Story A (Sprint 22): the Header is mobile-first at the researched 320px
 * minimum viewport (TASK-526) — compact gutters, 44px hamburger tap target,
 * shrinkable right cluster — enhanced at `theme.breakpoints`. jsdom does not
 * apply `@media` to layout, so breakpoint behavior is asserted on the
 * generated stylesheet (same pattern as LanguageSwitcher.test.tsx).
 */
describe('Story A: Header mobile-first breakpoints (min viewport = 320px)', () => {
  /** Renders the header server-side and returns the generated CSS text. */
  function cssForHeader(): string {
    const sheet = new ServerStyleSheet();
    try {
      renderToString(
        sheet.collectStyles(
          <I18nProvider locale="en" dictionary={getDictionary('en')}>
            <NativeThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
                <Header />
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

  it('uses compact 16px gutters at the 320px floor and widens at mobile+', () => {
    const css = cssForHeader();
    expect(css).toContain('padding:16px');
    expect(css).toContain('@media (min-width:480px)');
    expect(css).toContain('padding:16px 32px');
  });

  it('keeps the right cluster shrinkable (min-width:0) at the 320px floor', () => {
    // D2 graceful degradation below 320px: the cluster must never force
    // horizontal page overflow.
    expect(cssForHeader()).toContain('min-width:0');
  });

  it('shows the 44px hamburger at the 320px floor and hides it at desktop+', () => {
    const css = cssForHeader();
    expect(css).toContain('width:44px');
    expect(css).toContain('height:44px');
    expect(css).toContain('@media (min-width:1024px)');
    expect(css).toContain('display:none');
  });

  it('hides the desktop nav below desktop (base display:none)', () => {
    const css = cssForHeader();
    // The `<nav>` is `display:none` at the mobile base and flex at 1024px+.
    expect(css).toContain('display:none');
    expect(css).toContain('@media (min-width:1024px)');
    expect(css).toContain('display:flex');
  });

  it('hides the wordmark below 480px (compact brand on the smallest screens)', () => {
    const css = cssForHeader();
    expect(css).toContain('@media (max-width:480px)');
    expect(css).toContain('display:none');
  });

  it('hides the desktop Log In control below 768px', () => {
    const css = cssForHeader();
    expect(css).toContain('@media (max-width:768px)');
    expect(css).toContain('display:none');
  });

  it('uses 16px mobile-panel gutters at the 320px floor', async () => {
    // The panel only renders when the mobile menu is open, so computed
    // styles exercise the base (no media query = 320px floor) rules.
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByTestId('mobile-menu-toggle'));

    const panel = screen.getByTestId('mobile-menu');
    const style = getComputedStyle(panel);
    expect(style.marginLeft).toBe('16px');
    expect(style.marginRight).toBe('16px');
    expect(style.marginBottom).toBe('16px');
  });
});

/**
 * Story C (Sprint 22): hover/focus animation ONLY on clickable/interactive
 * elements + a visible keyboard focus indicator. The hamburger is the
 * primary mobile navigation control and must expose a focus-visible ring.
 */
describe('Story C: Header interactive focus indicators', () => {
  it('gives the hamburger a visible focus-visible ring (Story C)', () => {
    const sheet = new ServerStyleSheet();
    try {
      renderToString(
        sheet.collectStyles(
          <I18nProvider locale="en" dictionary={getDictionary('en')}>
            <NativeThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
                <Header />
              </ThemeProvider>
            </NativeThemeProvider>
          </I18nProvider>,
        ),
      );
      const css = sheet.getStyleTags();
      expect(css).toContain(':focus-visible');
      expect(css).toContain('outline:2px solid #7C9CFF');
      expect(css).toContain('outline-offset:2px');
    } finally {
      sheet.seal();
    }
  });

  it('keeps focus on the hamburger after opening the mobile menu', async () => {
    const user = userEvent.setup();
    renderHeader();

    const toggle = screen.getByTestId('mobile-menu-toggle');
    await user.click(toggle);
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });
});
