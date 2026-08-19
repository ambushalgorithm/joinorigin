import type { ReactElement } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  I18nProvider,
  LOCALE_COOKIE_NAME,
  _resetI18nForTests,
  getDictionary,
  type Locale,
} from '@joinorigin/i18n';

import { guidePageEntries } from '../../lib/seo/guides';
import GuidesHubPage, { metadata } from './page';

/**
 * Unit tests for the /guides hub (design §6.3 — L2a pillar page):
 * metadata export + single H1 + links to all 12 guides + glossary + city
 * pages, plus the TASK-317 client-side guide-card search/filter (debounced
 * keyword match + empty state) and the TASK-414 localized chrome (hero lead,
 * search label/placeholder, empty state, glossary band, universal band).
 *
 * TASK-446: the canonical hub resolves entries through the active server
 * locale (proxy-forwarded `x-joinorigin-locale`) — `getServerLocale` is
 * mocked here. With the `de` cookie the hub lists the committed German guide
 * set (locale-prefixed paths + German titles); the default `en` behavior is
 * unchanged.
 *
 * The guides chrome keys (TASK-411) are seeded into the test dictionary so
 * the suite is deterministic regardless of merge order with the en-keys role.
 *
 * Note: the debounce itself is unit-tested in `lib/search/__tests__` with
 * fake timers; here the full page render uses real timers + `waitFor`
 * because the page mounts GSAP Reveal/ScrollTrigger, which is flaky under
 * `jest.useFakeTimers()`.
 */

jest.mock('../../lib/i18n-server', () => ({
  getServerLocale: jest.fn(() => Promise.resolve(mockServerLocale.locale)),
}));

const mockServerLocale: { locale: Locale } = { locale: 'en' };

/** TASK-411 guides-hub keys (EN source values — mirror en.json after the
 *  i18n-en-keys merge; kept here so the view tests run green in isolation). */
const GUIDES_CHROME: Record<string, unknown> = {
  hubLead:
    'Twelve practical, evergreen how-to guides for finding, joining, and starting groups — and communicating in a creator-controlled room. From publishing an idea to healthy moderation.',
  searchLabel: 'Search guides',
  searchPlaceholder: 'Search by guide title or keyword',
  emptyState: 'No guides match “{{query}}”.',
  glossaryBandCopy:
    'Learn the core terms behind groups, rooms, moderation, onboarding, and engagement loops in the <1>{{glossary}}</1>.',
  universalCopy:
    'Guides are universal — communities are local. Find or start a community in a city near you:',
};

function renderWithGuidesI18n(ui: ReactElement) {
  const en = getDictionary('en');
  const seoContent = (en.seoContent as Record<string, unknown> | undefined) ?? {};
  const guides = (seoContent.guides as Record<string, unknown> | undefined) ?? {};
  const dictionary = {
    ...en,
    seoContent: {
      ...seoContent,
      guides: { ...guides, ...GUIDES_CHROME },
    },
  };
  return render(
    <I18nProvider locale="en" dictionary={dictionary}>
      {ui}
    </I18nProvider>,
  );
}

describe('guides hub page', () => {
  it('exports hub metadata (title, description, canonical)', () => {
    expect(metadata.title).toBe('Community Building Guides | JoinOrigin');
    expect(metadata.description?.toLowerCase() ?? '').toContain('community building');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/guides');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/guides');
  });

  it('renders a single h1', async () => {
    renderWithGuidesI18n(await GuidesHubPage());
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Community Building Guides');
  });

  it('renders the hero lead from the dictionary key (TASK-414 MenuPageShell lead plumbing)', async () => {
    renderWithGuidesI18n(await GuidesHubPage());
    expect(screen.getByText(GUIDES_CHROME.hubLead as string)).toBeInTheDocument();
  });

  it('links all 12 guides', async () => {
    renderWithGuidesI18n(await GuidesHubPage());
    for (const entry of guidePageEntries()) {
      expect(screen.getByRole('link', { name: entry.title })).toHaveAttribute('href', entry.path);
    }
  });

  it('links the glossary and the flagship city pages', async () => {
    renderWithGuidesI18n(await GuidesHubPage());
    expect(screen.getByRole('link', { name: 'Community OS glossary' })).toHaveAttribute(
      'href',
      '/glossary',
    );
    expect(screen.getByRole('link', { name: 'New York City' })).toHaveAttribute(
      'href',
      '/location/united-states/new-york/new-york',
    );
    expect(screen.getByRole('link', { name: 'Berlin' })).toHaveAttribute(
      'href',
      '/location/germany/berlin/berlin',
    );
  });

  it('renders the BreadcrumbList JSON-LD', async () => {
    renderWithGuidesI18n(await GuidesHubPage());
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads.some((p) => p['@type'] === 'BreadcrumbList')).toBe(true);
  });

  it('renders a keyboard-accessible search input with translated label/placeholder (TASK-317 + TASK-414)', async () => {
    renderWithGuidesI18n(await GuidesHubPage());
    const search = screen.getByRole('searchbox', { name: 'Search guides' });
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute('type', 'search');
    expect(search).toHaveAttribute('placeholder', 'Search by guide title or keyword');
  });

  it('renders the localized glossary band and universal band (TASK-414)', async () => {
    renderWithGuidesI18n(await GuidesHubPage());
    expect(
      screen.getByText(/Learn the core terms behind groups, rooms, moderation/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Guides are universal — communities are local. Find or start a community in a city near you:',
      ),
    ).toBeInTheDocument();
  });

  it('filters guide cards by keyword, case-insensitively, after the debounce (TASK-317)', async () => {
    const user = userEvent.setup();
    renderWithGuidesI18n(await GuidesHubPage());

    const search = screen.getByRole('searchbox', { name: 'Search guides' });
    await user.type(search, 'meetup');

    // All 7 cards render initially; after the debounce only the matching
    // guide remains.
    await waitFor(() => {
      const grid = screen.getByTestId('guides-hub-grid');
      const cards = within(grid).getAllByRole('link');
      expect(cards).toHaveLength(1);
      expect(cards[0]).toHaveAttribute('href', '/guides/organize-a-meetup');
    });
  });

  it('shows an empty state when no guide card matches (TASK-317)', async () => {
    const user = userEvent.setup();
    renderWithGuidesI18n(await GuidesHubPage());

    const search = screen.getByRole('searchbox', { name: 'Search guides' });
    await user.type(search, 'quantum-community');

    await waitFor(() => {
      expect(screen.queryByTestId('guides-hub-grid')).not.toBeInTheDocument();
      expect(screen.getByTestId('guides-hub-empty')).toHaveTextContent('No guides match');
    });
  });

  it('renders the committed guide set for the active locale on the canonical route (TASK-446)', async () => {
    mockServerLocale.locale = 'de';
    try {
      renderWithGuidesI18n(await GuidesHubPage());
      // The canonical hub resolves the forwarded locale's guide set: every
      // committed de guide card links to its locale-prefixed path with the
      // German registry title (no EN hardcode).
      const deEntries = guidePageEntries('de');
      expect(deEntries.length).toBeGreaterThan(0);
      for (const entry of deEntries) {
        expect(screen.getByRole('link', { name: entry.title })).toHaveAttribute('href', entry.path);
      }
      // German titles are visibly different from EN — assert one marker.
      const enTitle = guidePageEntries().find((e) => e.slug === 'start-a-community')?.title;
      const deTitle = deEntries.find((e) => e.slug === 'start-a-community')?.title;
      expect(deTitle).toBeDefined();
      expect(deTitle).not.toBe(enTitle);
      expect(screen.getByRole('link', { name: deTitle! })).toHaveAttribute(
        'href',
        '/de/guides/start-a-community',
      );
    } finally {
      mockServerLocale.locale = 'en';
    }
  });
});

/**
 * TASK-460 — the guides hub renders internal links through the shared
 * locale-aware path helper per the confirmed prefix table. `useLocalizePath`
 * reads the router pathname + active i18n locale, so this suite overrides the
 * `next/navigation` mock with a mutable `mockPathname` (the setup-level mock
 * returns `/` and takes no locale into account).
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

async function renderHubForLocale(locale: Locale) {
  setNavigatorLanguage(locale);
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      {await GuidesHubPage()}
    </I18nProvider>,
  );
}

describe('guides hub — locale-aware internal links (TASK-460)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
    mockPathname = '/';
  });

  /** Finds a link with the exact href (link text is locale-dependent). */
  function linkByHref(href: string) {
    return screen.getAllByRole('link').find((link) => link.getAttribute('href') === href);
  }

  it('keeps links unprefixed on an unprefixed EN load (table row 1)', async () => {
    mockServerLocale.locale = 'en';
    mockPathname = '/guides';
    await renderHubForLocale('en');
    expect(linkByHref('/glossary')).toBeDefined();
    const first = guidePageEntries()[0];
    expect(linkByHref(first.path)).toBeDefined();
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', async () => {
    mockServerLocale.locale = 'en';
    mockPathname = '/en/guides';
    await renderHubForLocale('en');
    expect(linkByHref('/en/glossary')).toBeDefined();
    const first = guidePageEntries()[0];
    expect(linkByHref(`/en${first.path}`)).toBeDefined();
  });

  it('renders /de/** links on a /de/** load (table row 3)', async () => {
    mockServerLocale.locale = 'de';
    mockPathname = '/de/guides';
    await renderHubForLocale('de');
    // The de surface serves the committed German guide set (de entries are
    // already locale-prefixed server-side; the helper passes them through).
    const deFirst = guidePageEntries('de')[0];
    expect(linkByHref(deFirst.path)).toBeDefined();
    expect(linkByHref('/de/glossary')).toBeDefined();
  });

  it('renders /de/** links on an unprefixed load with a de cookie (table row 4)', async () => {
    // Canonical route stays EN server-side (unprefixed entries); the client
    // de cookie makes the shared helper prefix every internal link.
    mockServerLocale.locale = 'en';
    mockPathname = '/guides';
    await renderHubForLocale('de');
    const enFirst = guidePageEntries()[0];
    expect(linkByHref(`/de${enFirst.path}`)).toBeDefined();
    expect(linkByHref('/de/glossary')).toBeDefined();
  });
});
