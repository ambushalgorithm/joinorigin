import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary, type Locale } from '@joinorigin/i18n';

import ChipMarqueeServer from './ChipMarqueeServer';
import type { ExampleCommunityChipKey } from './ChipMarquee';

/**
 * Server wrapper unit tests (Story B, TASK-546).
 *
 * Contract: `ChipMarqueeServer` reads the proxy-forwarded locale
 * (`x-joinorigin-locale`) + country (`x-joinorigin-ip-country`, TASK-479)
 * server-side, resolves the PER-CHIP group-type variant targets
 * (`lib/seo/exampleCommunities.ts` — each chip maps to its own variant page
 * of the closest-largest content-rich community) and renders the client
 * marquee with every chip's registry-exact localized path — so surfaces gain
 * per-chip geo-aware links without any locale page-wrapper changes.
 */

const mockHeaders: { locale: string | null; country: string | null } = {
  locale: 'en',
  country: null,
};

jest.mock('next/headers', () => ({
  headers: () => ({
    get: (name: string) => {
      if (name === 'x-joinorigin-locale') return mockHeaders.locale;
      if (name === 'x-joinorigin-ip-country') return mockHeaders.country;
      return null;
    },
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => '/',
}));

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

/** Per-chip EN targets for New York (locale-language default / US visitor). */
const NEW_YORK_EN_TARGETS: string[] = [
  '/en/location/united-states/new-york/new-york/startup',
  '/en/location/united-states/new-york/new-york/small-business',
  '/en/location/united-states/new-york/new-york/meetup',
  '/en/location/united-states/new-york/new-york/meetup',
  '/en/location/united-states/new-york/new-york/meetup',
  '/en/location/united-states/new-york/new-york/meetup',
  '/en/location/united-states/new-york/new-york/ideas',
];

/** Per-chip EN targets for Copenhagen (closest content-rich country to FI). */
const COPENHAGEN_EN_TARGETS: string[] = [
  '/en/location/denmark/capital-region/copenhagen/startup',
  '/en/location/denmark/capital-region/copenhagen/small-business',
  '/en/location/denmark/capital-region/copenhagen/meetup',
  '/en/location/denmark/capital-region/copenhagen/meetup',
  '/en/location/denmark/capital-region/copenhagen/meetup',
  '/en/location/denmark/capital-region/copenhagen/meetup',
  '/en/location/denmark/capital-region/copenhagen/ideas',
];

/** Per-chip DE targets for Berlin (locale-language default on the de surface). */
const BERLIN_DE_TARGETS: string[] = [
  '/de/location/germany/berlin/berlin/startup',
  '/de/location/germany/berlin/berlin/small-business',
  '/de/location/germany/berlin/berlin/meetup',
  '/de/location/germany/berlin/berlin/meetup',
  '/de/location/germany/berlin/berlin/meetup',
  '/de/location/germany/berlin/berlin/meetup',
  '/de/location/germany/berlin/berlin/ideas',
];

async function renderServerMarquee() {
  const element = await ChipMarqueeServer();
  if (!element) throw new Error('ChipMarqueeServer returned null');
  return render(
    <I18nProvider
      locale={(mockHeaders.locale as Locale) ?? 'en'}
      dictionary={getDictionary((mockHeaders.locale as Locale) ?? 'en')}
    >
      <ThemeProvider theme={theme}>
        <>{element}</>
      </ThemeProvider>
    </I18nProvider>,
  );
}

/** The visible track links in DOM order (the set repeated 2×). */
function trackHrefs(container: HTMLElement): string[] {
  const track = container.querySelector('[aria-hidden="true"]');
  return Array.from(track?.querySelectorAll('a') ?? []).map(
    (link) => link.getAttribute('href') ?? '',
  );
}

/** The sr-only list links in chip order (each community read once). */
function srOnlyHrefs(container: HTMLElement): Array<string | null> {
  const list = container.querySelector('ul');
  return Array.from(list?.querySelectorAll('li') ?? []).map(
    (li) => li.querySelector('a')?.getAttribute('href') ?? null,
  );
}

describe('ChipMarqueeServer', () => {
  beforeEach(() => {
    mockHeaders.locale = 'en';
    mockHeaders.country = null;
  });

  it('resolves each chip to its OWN group-type variant for the visitor country (US → New York)', async () => {
    mockHeaders.country = 'US';
    const { container, getByTestId } = await renderServerMarquee();
    expect(getByTestId('chip-marquee')).toHaveAttribute('data-ip-country', 'US');
    // 7 chips repeated 2×, each linking to its own mapped variant page.
    expect(trackHrefs(container)).toEqual([...NEW_YORK_EN_TARGETS, ...NEW_YORK_EN_TARGETS]);
    // The sr-only list reads each community once with the same per-chip hrefs.
    expect(srOnlyHrefs(container)).toEqual(NEW_YORK_EN_TARGETS);
  });

  it('resolves per-chip targets for the CLOSEST content-rich country (FI → Copenhagen)', async () => {
    // A Finnish visitor (no content-rich community in FI) gets the nearest
    // community — Copenhagen (DK) — with the country passed through.
    mockHeaders.country = 'FI';
    const { container, getByTestId } = await renderServerMarquee();
    expect(getByTestId('chip-marquee')).toHaveAttribute('data-ip-country', 'FI');
    expect(trackHrefs(container)).toEqual([...COPENHAGEN_EN_TARGETS, ...COPENHAGEN_EN_TARGETS]);
  });

  it('falls back to the locale-language default when geo is absent (en → New York)', async () => {
    const { container, getByTestId } = await renderServerMarquee();
    // No geo country → no data-ip-country on the observability hook.
    expect(getByTestId('chip-marquee')).not.toHaveAttribute('data-ip-country');
    expect(trackHrefs(container)).toEqual([...NEW_YORK_EN_TARGETS, ...NEW_YORK_EN_TARGETS]);
  });

  it('falls back to the locale-language default for a malformed geo value', async () => {
    mockHeaders.country = 'USA';
    const { container } = await renderServerMarquee();
    expect(trackHrefs(container)).toEqual([...NEW_YORK_EN_TARGETS, ...NEW_YORK_EN_TARGETS]);
  });

  it('renders the deterministic committed-content fallback on the ACTIVE locale surface (de visitor in the US)', async () => {
    // A US visitor on the German surface resolves New York, which has NO
    // committed German variant/ideas content → every chip falls back to the
    // New York CITY page (never a broken variant URL).
    mockHeaders.locale = 'de';
    mockHeaders.country = 'US';
    const { container } = await renderServerMarquee();
    const fallback = '/de/location/united-states/new-york/new-york';
    expect(trackHrefs(container)).toEqual(Array.from({ length: 14 }, () => fallback));
    expect(srOnlyHrefs(container)).toEqual(CHIP_KEYS.map(() => fallback));
  });

  it('uses the locale-language default on a non-EN surface without geo (de → Berlin)', async () => {
    mockHeaders.locale = 'de';
    const { container } = await renderServerMarquee();
    expect(trackHrefs(container)).toEqual([...BERLIN_DE_TARGETS, ...BERLIN_DE_TARGETS]);
  });
});
