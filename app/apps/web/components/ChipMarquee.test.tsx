import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import ChipMarquee, { type ChipTargets, type ExampleCommunityChipKey } from './ChipMarquee';

/**
 * Unit tests for the community-chip marquee (spec sprint-10 §4.6 + Story B).
 *
 * The animated track repeats the 7 example-community chips 2× and is
 * `aria-hidden`; an equivalent visually-hidden static <ul> (aria-label = the
 * intro) lists each community name once, so screen readers never hear
 * duplicates.
 *
 * Story B (TASK-546): `targets` maps each chip key to its OWN group-type
 * variant page (resolved by `ChipMarqueeServer` from
 * `lib/seo/exampleCommunities.ts`). A chip whose key has a target renders as
 * a single wrapping link to that path; when `targets` is absent — or the
 * chip's key is missing from a partial map — the chip stays a
 * non-interactive pill.
 */

const INTRO =
  'These are the kinds of communities growing inside JoinOrigin today. If you share one of these goals, there is already a place for you:';

/** Per-chip targets for the EN locale-language default (New York — matches
 *  the Story B resolver map on a fully-committed surface). */
const TARGETS: Record<ExampleCommunityChipKey, string> = {
  startupFounders: '/en/location/united-states/new-york/new-york/startup',
  smallBusinesses: '/en/location/united-states/new-york/new-york/small-business',
  bookClubs: '/en/location/united-states/new-york/new-york/meetup',
  communityOrganizations: '/en/location/united-states/new-york/new-york/meetup',
  runClubs: '/en/location/united-states/new-york/new-york/meetup',
  peeWeeLeagues: '/en/location/united-states/new-york/new-york/meetup',
  anyoneWithAnIdea: '/en/location/united-states/new-york/new-york/ideas',
};

/** The chips in marquee order — the track repeats this set 2×. */
const CHIP_KEYS: readonly ExampleCommunityChipKey[] = [
  'startupFounders',
  'smallBusinesses',
  'bookClubs',
  'communityOrganizations',
  'runClubs',
  'peeWeeLeagues',
  'anyoneWithAnIdea',
];

// next/navigation is mocked so `next/link` renders in jsdom (same pattern as
// the Footer/Header suites — `mockPathname` drives the "current URL").
let mockPathname = '/';
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => mockPathname,
}));

function renderMarquee(targets?: ChipTargets | null, country?: string | null) {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <ThemeProvider theme={theme}>
        <ChipMarquee intro={INTRO} targets={targets} country={country} />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('ChipMarquee', () => {
  beforeEach(() => {
    mockPathname = '/';
  });

  it('renders the marquee with every example-community label', () => {
    renderMarquee();
    expect(screen.getByTestId('chip-marquee')).toBeInTheDocument();
    for (const label of [
      'Startup Founders',
      'Small Businesses',
      'Book Clubs',
      'Community Organizations',
      'Run Clubs',
      'Pee-wee Leagues',
      'Anyone with an Idea',
    ]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('hides the duplicate track and exposes a static sr-only list labeled with the intro', () => {
    const { container } = renderMarquee();
    // The animated track is aria-hidden (duplicates never read by AT).
    const track = container.querySelector('[aria-hidden="true"]');
    expect(track).not.toBeNull();
    // The static list is visually hidden and labeled with the exact intro.
    const list = container.querySelector('ul');
    expect(list).not.toBeNull();
    expect(list?.getAttribute('aria-label')).toBe(INTRO);
    // Each community name appears exactly once in the static list.
    const items = Array.from(list?.querySelectorAll('li') ?? []);
    expect(items.map((li) => li.textContent)).toEqual([
      'Startup Founders',
      'Small Businesses',
      'Book Clubs',
      'Community Organizations',
      'Run Clubs',
      'Pee-wee Leagues',
      'Anyone with an Idea',
    ]);
  });

  it('renders every visible chip as its OWN link to the per-chip target (Story B)', () => {
    const { container } = renderMarquee(TARGETS);
    const track = container.querySelector('[aria-hidden="true"]');
    const links = track?.querySelectorAll('a') ?? [];
    // 7 chips repeated 2× — each chip is exactly one link to its own page.
    expect(links.length).toBe(14);
    const hrefs = Array.from(links).map((link) => link.getAttribute('href'));
    const expected = CHIP_KEYS.map((key) => TARGETS[key]);
    expect(hrefs).toEqual([...expected, ...expected]);
    for (const link of links) {
      expect(link.querySelector('a')).toBeNull();
    }
  });

  it('keeps every chip label inside its wrapping link (full-chip link contract)', () => {
    const { container } = renderMarquee(TARGETS);
    const labels = [
      'Startup Founders',
      'Small Businesses',
      'Book Clubs',
      'Community Organizations',
      'Run Clubs',
      'Pee-wee Leagues',
      'Anyone with an Idea',
    ];
    const track = container.querySelector('[aria-hidden="true"]');
    const links = track?.querySelectorAll('a') ?? [];
    // The track repeats the set 2× — every label appears twice as link text.
    const linkTexts = Array.from(links).map((link) => link.textContent);
    for (const label of labels) {
      expect(linkTexts.filter((text) => text === label)).toHaveLength(2);
    }
  });

  it('keeps chips without a resolved target as non-interactive pills (partial map)', () => {
    const partial: ChipTargets = { startupFounders: TARGETS.startupFounders };
    const { container } = renderMarquee(partial);
    const track = container.querySelector('[aria-hidden="true"]');
    const links = track?.querySelectorAll('a') ?? [];
    // Only the startupFounders chip (repeated 2×) is a link.
    expect(links.length).toBe(2);
    for (const link of links) {
      expect(link).toHaveAttribute('href', TARGETS.startupFounders);
    }
    // The sr-only list mirrors the per-chip behavior: one link, six plain items.
    const list = container.querySelector('ul');
    const items = Array.from(list?.querySelectorAll('li') ?? []);
    expect(items.map((li) => li.querySelector('a')?.getAttribute('href') ?? null)).toEqual([
      TARGETS.startupFounders,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
  });

  it('keeps chips non-interactive when no targets are provided', () => {
    const { container } = renderMarquee();
    const track = container.querySelector('[aria-hidden="true"]');
    expect(track?.querySelectorAll('a').length).toBe(0);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('links each sr-only list item to its own target (a11y parity)', () => {
    const { container } = renderMarquee(TARGETS);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(7);
    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      CHIP_KEYS.map((key) => TARGETS[key]),
    );
    // The sr-only links target the same paths as the visible track (parity).
    const track = container.querySelector('[aria-hidden="true"]');
    const trackHrefs = Array.from(track?.querySelectorAll('a') ?? []).map((link) =>
      link.getAttribute('href'),
    );
    expect(trackHrefs.slice(0, 7)).toEqual(links.map((link) => link.getAttribute('href')));
  });

  it('exposes the geo country that selected the targets as data-ip-country', () => {
    renderMarquee(TARGETS, 'DE');
    expect(screen.getByTestId('chip-marquee')).toHaveAttribute('data-ip-country', 'DE');
  });

  it('exposes data-ip-country even when no targets resolved (observability)', () => {
    // The server wrapper always passes the geo country through for e2e
    // observability — even when the per-chip targets could not be resolved.
    renderMarquee(null, 'DE');
    expect(screen.getByTestId('chip-marquee')).toHaveAttribute('data-ip-country', 'DE');
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('omits data-ip-country when no geo country selected the targets', () => {
    renderMarquee(TARGETS);
    expect(screen.getByTestId('chip-marquee')).not.toHaveAttribute('data-ip-country');
  });
});
