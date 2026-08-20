import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import Header from './Header';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';

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
          <WaitlistModalProvider>
            <Header />
          </WaitlistModalProvider>
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

  it('opens the waitlist modal from the Get Started CTA', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByTestId('get-started-button'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Join the waitlist')).toBeInTheDocument();
  });

  it('opens the waitlist modal from the desktop Log In button (TASK-405)', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByTestId('login-button'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Join the waitlist')).toBeInTheDocument();
  });

  it('opens the waitlist modal from the mobile panel Log In button (TASK-405)', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByTestId('mobile-menu-toggle'));
    await user.click(screen.getByTestId('mobile-login-button'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Join the waitlist')).toBeInTheDocument();
  });

  it('restores focus to the trigger button when the modal closes (spec §9.2)', async () => {
    const user = userEvent.setup();
    renderHeader();

    const trigger = screen.getByTestId('get-started-button');
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // ESC closes the modal; the provider restores focus to the recorded trigger.
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
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
