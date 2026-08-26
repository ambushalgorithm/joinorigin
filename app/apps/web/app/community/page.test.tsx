import { screen, render } from '@testing-library/react';

import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import ChipMarqueeServer from '../../components/ChipMarqueeServer';
import CommunityPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * Unit tests for the /community page (discovery §5.3): metadata export per
 * the arch pattern + semantic HTML (single h1, values, communities, trust).
 *
 * Story B (TASK-547): the wrapper passes the server-rendered `ChipMarqueeServer`
 * into the view's `marquee` slot. The server component reads `next/headers`
 * (geo + locale), so this page suite mocks it — its own behaviour is covered
 * in `components/ChipMarqueeServer.test.tsx` — and asserts the slot wiring
 * through the mock being instantiated by the wrapper.
 */

jest.mock('../../components/ChipMarqueeServer', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

const mockChipMarqueeServer = ChipMarqueeServer as jest.Mock;

describe('community page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe('Community — Find Your People & Build Together | JoinOrigin');
    expect(metadata.description).toContain('social collaboration network');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/community');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/community');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['online communities', 'join a community']),
    );
  });

  it('renders a single h1 and the definitional intro', () => {
    renderWithI18n(<CommunityPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Where people find each other');
    expect(
      screen.getByText(/organized around communities — groups of people who share interests/i),
    ).toBeInTheDocument();
  });

  it('renders values, example communities, and the trust stat', () => {
    mockChipMarqueeServer.mockClear();
    renderWithI18n(<CommunityPage />);
    expect(screen.getByText('How we run the network')).toBeInTheDocument();
    expect(screen.getByText('People First')).toBeInTheDocument();
    expect(screen.getByText('Example communities')).toBeInTheDocument();
    // Story B: the wrapper passes <ChipMarqueeServer /> into the view's
    // marquee slot — the mock is instantiated exactly once (the view renders
    // the slot; the real server component's chip links are covered by its own
    // suite).
    expect(mockChipMarqueeServer).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('community-members-stat')).toHaveTextContent('2,400+');
  });

  it('renders the FAQ block and mirrors it in FAQPage JSON-LD', () => {
    renderWithI18n(<CommunityPage />);
    expect(screen.getByText('What communities can I join?')).toBeInTheDocument();

    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const faq = payloads.find((p) => p['@type'] === 'FAQPage');
    expect(faq?.mainEntity).toHaveLength(5);
    expect(payloads.some((p) => p['@type'] === 'BreadcrumbList')).toBe(true);
  });

  it('keeps the values cards non-interactive (Story C — no hover/focus on informational cards)', () => {
    renderWithI18n(<CommunityPage />);
    // The four values cards are informational surfaces, NOT clickable tiles:
    // the card titles must not be wrapped in a link (Story C/D).
    for (const title of [
      'People First',
      'Communities Drive Growth',
      'Collaboration Creates Value',
      'Ownership & Sovereignty',
    ]) {
      const heading = screen.getByRole('heading', { level: 3, name: title });
      expect(heading.closest('a')).toBeNull();
    }
  });
});

/**
 * TASK-460 — the community view renders the join link + Explore hub
 * cross-links through the shared locale-aware path helper per the confirmed
 * prefix table. `useLocalizePath` reads the router pathname + active i18n
 * locale, so this suite overrides the `next/navigation` mock with a mutable
 * `mockPathname`.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => mockPathname,
}));

function renderCommunityForLocale(locale: Locale) {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <CommunityPage />
    </I18nProvider>,
  );
}

describe('community view — locale-aware internal links (TASK-460)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/';
  });

  /** Finds a link with the exact href (labels are locale-dependent). */
  function linkByHref(href: string) {
    return screen.getAllByRole('link').find((link) => link.getAttribute('href') === href);
  }

  it('renders /en/** join + Explore links on an unprefixed EN load (all-routes-prefixed)', () => {
    mockPathname = '/community';
    renderCommunityForLocale('en');
    // The join band links home; on an unprefixed EN load it becomes `/en`.
    expect(linkByHref('/en')).toBeDefined();
    expect(linkByHref('/en/location')).toBeDefined();
    expect(linkByHref('/en/guides')).toBeDefined();
    expect(linkByHref('/en/glossary')).toBeDefined();
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/community';
    renderCommunityForLocale('en');
    expect(linkByHref('/en')).toBeDefined();
    expect(linkByHref('/en/location')).toBeDefined();
    expect(linkByHref('/en/guides')).toBeDefined();
    expect(linkByHref('/en/glossary')).toBeDefined();
  });

  it('renders /de/** join + Explore links on a /de/** load (table row 3)', () => {
    mockPathname = '/de/community';
    renderCommunityForLocale('de');
    expect(linkByHref('/de')).toBeDefined();
    expect(linkByHref('/de/location')).toBeDefined();
    expect(linkByHref('/de/guides')).toBeDefined();
    expect(linkByHref('/de/glossary')).toBeDefined();
  });

  it('renders /de/** join + Explore links on an unprefixed path with an active de locale (URL-driven)', () => {
    mockPathname = '/community';
    renderCommunityForLocale('de');
    expect(linkByHref('/de')).toBeDefined();
    expect(linkByHref('/de/location')).toBeDefined();
    expect(linkByHref('/de/guides')).toBeDefined();
    expect(linkByHref('/de/glossary')).toBeDefined();
  });
});
