import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import ChipMarquee from './ChipMarquee';

/**
 * Unit tests for the community-chip marquee (spec sprint-10 §4.6 + Story E).
 *
 * The animated track repeats the 7 example-community chips 2× and is
 * `aria-hidden`; an equivalent visually-hidden static <ul> (aria-label = the
 * intro) lists each community name once, so screen readers never hear
 * duplicates.
 *
 * Story E (TASK-536): when `targetPath` (the resolved content-rich community
 * page from `ChipMarqueeServer`) is provided, every visible chip is a single
 * wrapping link to that page and the sr-only items link to the same target;
 * without it the chips stay non-interactive pills.
 */

const INTRO =
  'These are the kinds of communities growing inside JoinOrigin today. If you share one of these goals, there is already a place for you:';

const TARGET_PATH = '/en/location/united-states/new-york/new-york';

// next/navigation is mocked so `next/link` renders in jsdom (same pattern as
// the Footer/Header suites — `mockPathname` drives the "current URL").
let mockPathname = '/';
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => mockPathname,
}));

function renderMarquee(targetPath?: string | null, country?: string | null) {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <ThemeProvider theme={theme}>
        <ChipMarquee intro={INTRO} targetPath={targetPath} country={country} />
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
    // The static list is visually hidden and labeled with the intro.
    const list = container.querySelector('ul');
    expect(list).not.toBeNull();
    expect(list?.getAttribute('aria-label')).toContain('communities growing inside');
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

  it('renders every visible chip as a single wrapping link when targetPath is provided (Story E)', () => {
    const { container } = renderMarquee(TARGET_PATH);
    const track = container.querySelector('[aria-hidden="true"]');
    const links = track?.querySelectorAll('a') ?? [];
    // 7 chips repeated 2× — each chip is exactly one link to the resolved page.
    expect(links.length).toBe(14);
    for (const link of links) {
      expect(link).toHaveAttribute('href', TARGET_PATH);
      expect(link.querySelector('a')).toBeNull();
    }
  });

  it('keeps chips non-interactive when no targetPath is provided', () => {
    const { container } = renderMarquee();
    const track = container.querySelector('[aria-hidden="true"]');
    expect(track?.querySelectorAll('a').length).toBe(0);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('links the sr-only list items to the same resolved page (a11y parity)', () => {
    renderMarquee(TARGET_PATH);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(7);
    for (const link of links) {
      expect(link).toHaveAttribute('href', TARGET_PATH);
    }
  });

  it('exposes the geo country that selected the target as data-ip-country', () => {
    renderMarquee(TARGET_PATH, 'DE');
    expect(screen.getByTestId('chip-marquee')).toHaveAttribute('data-ip-country', 'DE');
  });

  it('omits data-ip-country when no geo country selected the target', () => {
    renderMarquee(TARGET_PATH);
    expect(screen.getByTestId('chip-marquee')).not.toHaveAttribute('data-ip-country');
  });
});
