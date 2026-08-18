import type { ReactElement } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getDictionary, I18nProvider } from '@joinorigin/i18n';

import { guidePageEntries } from '../../lib/seo/guides';
import GuidesHubPage, { metadata } from './page';

/**
 * Unit tests for the /guides hub (design §6.3 — L2a pillar page):
 * metadata export + single H1 + links to all 12 guides + glossary + city
 * pages, plus the TASK-317 client-side guide-card search/filter (debounced
 * keyword match + empty state) and the TASK-414 localized chrome (hero lead,
 * search label/placeholder, empty state, glossary band, universal band).
 *
 * The guides chrome keys (TASK-411) are seeded into the test dictionary so
 * the suite is deterministic regardless of merge order with the en-keys role.
 *
 * Note: the debounce itself is unit-tested in `lib/search/__tests__` with
 * fake timers; here the full page render uses real timers + `waitFor`
 * because the page mounts GSAP Reveal/ScrollTrigger, which is flaky under
 * `jest.useFakeTimers()`.
 */

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

  it('renders a single h1', () => {
    renderWithGuidesI18n(<GuidesHubPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Community Building Guides');
  });

  it('renders the hero lead from the dictionary key (TASK-414 MenuPageShell lead plumbing)', () => {
    renderWithGuidesI18n(<GuidesHubPage />);
    expect(screen.getByText(GUIDES_CHROME.hubLead as string)).toBeInTheDocument();
  });

  it('links all 12 guides', () => {
    renderWithGuidesI18n(<GuidesHubPage />);
    for (const entry of guidePageEntries()) {
      expect(screen.getByRole('link', { name: entry.title })).toHaveAttribute('href', entry.path);
    }
  });

  it('links the glossary and the flagship city pages', () => {
    renderWithGuidesI18n(<GuidesHubPage />);
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

  it('renders the BreadcrumbList JSON-LD', () => {
    renderWithGuidesI18n(<GuidesHubPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads.some((p) => p['@type'] === 'BreadcrumbList')).toBe(true);
  });

  it('renders a keyboard-accessible search input with translated label/placeholder (TASK-317 + TASK-414)', () => {
    renderWithGuidesI18n(<GuidesHubPage />);
    const search = screen.getByRole('searchbox', { name: 'Search guides' });
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute('type', 'search');
    expect(search).toHaveAttribute('placeholder', 'Search by guide title or keyword');
  });

  it('renders the localized glossary band and universal band (TASK-414)', () => {
    renderWithGuidesI18n(<GuidesHubPage />);
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
    renderWithGuidesI18n(<GuidesHubPage />);

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
    renderWithGuidesI18n(<GuidesHubPage />);

    const search = screen.getByRole('searchbox', { name: 'Search guides' });
    await user.type(search, 'quantum-community');

    await waitFor(() => {
      expect(screen.queryByTestId('guides-hub-grid')).not.toBeInTheDocument();
      expect(screen.getByTestId('guides-hub-empty')).toHaveTextContent('No guides match');
    });
  });
});
