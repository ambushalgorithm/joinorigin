import { screen, render } from '@testing-library/react';

import {
  I18nProvider,
  LOCALE_COOKIE_NAME,
  _resetI18nForTests,
  getDictionary,
  type Locale,
} from '@joinorigin/i18n';

import FeaturesPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * Unit tests for the /features page (discovery §5.2): metadata export per the
 * arch pattern + semantic HTML (single h1, comparison table, FAQ).
 *
 * TASK-412: the comparison table must render the 10 tools from
 * `COMPARISON_KEYS` (slack, discord, whatsapp, linkedin, meetup, eventbrite,
 * notion, asana, patreon, facebook) — the old 4 (linkedin/discord/reddit/
 * github) are replaced. The row-count + removed-tool assertions hold against
 * the real EN dictionary regardless of the i18n-en-keys merge timing; the
 * full-name test injects a dictionary with all 10 comparison entries so the
 * rendered tool names are deterministic.
 */

/** Minimal `features.comparison.*` entries for all 10 tools (TASK-412 keys). */
const TEN_COMPARISON_TOOLS = {
  slack: { tool: 'Slack', strength: 'chats', gap: 'gap' },
  discord: { tool: 'Discord', strength: 'communicates', gap: 'gap' },
  whatsapp: { tool: 'WhatsApp', strength: 'messages', gap: 'gap' },
  linkedin: { tool: 'LinkedIn', strength: 'connects', gap: 'gap' },
  meetup: { tool: 'Meetup', strength: 'meets', gap: 'gap' },
  eventbrite: { tool: 'Eventbrite', strength: 'events', gap: 'gap' },
  notion: { tool: 'Notion', strength: 'organizes', gap: 'gap' },
  asana: { tool: 'Asana', strength: 'tasks', gap: 'gap' },
  patreon: { tool: 'Patreon', strength: 'funds', gap: 'gap' },
  facebook: { tool: 'Facebook', strength: 'connects', gap: 'gap' },
};

/** Render the page with the 10 comparison keys present in the dictionary. */
function renderWithTenComparisonTools() {
  const en = getDictionary('en');
  const features = en.features as Record<string, unknown>;
  const dictionary = {
    ...en,
    features: {
      ...features,
      comparison: { ...(features.comparison as Record<string, unknown>), ...TEN_COMPARISON_TOOLS },
    },
  };
  return render(
    <I18nProvider locale="en" dictionary={dictionary}>
      <FeaturesPage />
    </I18nProvider>,
  );
}

describe('features page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe(
      'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
    );
    expect(metadata.description).toContain('social collaboration network');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/features');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/features');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['community platform features', 'community chat']),
    );
  });

  it('renders a single h1 and the definitional intro', () => {
    renderWithI18n(<FeaturesPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Everything a community needs, in one calm workspace');
    expect(
      screen.getByText(/built around eight core objects: profiles, ideas, communities/i),
    ).toBeInTheDocument();
  });

  it('renders core-object cards, the comparison table, and the roadmap', () => {
    renderWithI18n(<FeaturesPage />);
    // "Core objects" appears twice after the redesign: as the hero eyebrow
    // chip and as the section title (spec sprint-8 §6 eyebrow table).
    expect(screen.getAllByText('Core objects').length).toBeGreaterThanOrEqual(1);
    for (const object of [
      'Profiles',
      'Ideas',
      'Communities',
      'Communication',
      'Feed',
      'Projects',
    ]) {
      expect(screen.getByText(object)).toBeInTheDocument();
    }
    const table = screen.getByTestId('features-comparison-table');
    expect(table.tagName).toBe('TABLE');
    // TASK-412: 10 comparison rows from COMPARISON_KEYS — the tools that
    // remain from the old set (LinkedIn, Discord) still render.
    expect(table.querySelectorAll('tbody tr')).toHaveLength(10);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Discord')).toBeInTheDocument();
    expect(screen.queryByText('Reddit')).not.toBeInTheDocument();
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
    expect(screen.getByText('Roadmap')).toBeInTheDocument();
    expect(screen.getByText(/Phase 1 — Community Foundation/)).toBeInTheDocument();
  });

  it('renders all 10 comparison tools from COMPARISON_KEYS', () => {
    renderWithTenComparisonTools();
    for (const tool of [
      'Slack',
      'Discord',
      'WhatsApp',
      'LinkedIn',
      'Meetup',
      'Eventbrite',
      'Notion',
      'Asana',
      'Patreon',
      'Facebook',
    ]) {
      expect(screen.getByText(tool)).toBeInTheDocument();
    }
    // The old 4 set is gone from the table: only Reddit/GitHub were removed
    // outright (linkedin/discord remain in the 10-tool set).
    expect(screen.queryByText('Reddit')).not.toBeInTheDocument();
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
  });

  it('renders the FAQ block and mirrors it in FAQPage JSON-LD', () => {
    renderWithI18n(<FeaturesPage />);
    expect(screen.getByText('How is JoinOrigin different from Discord?')).toBeInTheDocument();

    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const faq = payloads.find((p) => p['@type'] === 'FAQPage');
    expect(faq?.mainEntity).toHaveLength(4);
    expect(faq?.mainEntity[0].name).toBe('How is JoinOrigin different from Discord?');
    expect(payloads.some((p) => p['@type'] === 'BreadcrumbList')).toBe(true);
  });
});

/**
 * TASK-460 — the features view renders the Explore hub cross-links through
 * the shared locale-aware path helper per the confirmed prefix table.
 * `useLocalizePath` reads the router pathname + active i18n locale, so this
 * suite overrides the `next/navigation` mock with a mutable `mockPathname`.
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

function renderFeaturesForLocale(locale: Locale) {
  setNavigatorLanguage(locale);
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <FeaturesPage />
    </I18nProvider>,
  );
}

describe('features view — locale-aware internal links (TASK-460)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
    mockPathname = '/';
  });

  /** Finds a link with the exact href (nav chrome also links the hubs). */
  function linkByHref(href: string) {
    return screen.getAllByRole('link').find((link) => link.getAttribute('href') === href);
  }

  it('renders /en/** Explore links on an unprefixed EN load (all-routes-prefixed)', () => {
    mockPathname = '/features';
    renderFeaturesForLocale('en');
    expect(linkByHref('/en/location')).toBeDefined();
    expect(linkByHref('/en/guides')).toBeDefined();
    expect(linkByHref('/en/glossary')).toBeDefined();
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/features';
    renderFeaturesForLocale('en');
    expect(linkByHref('/en/location')).toBeDefined();
    expect(linkByHref('/en/guides')).toBeDefined();
    expect(linkByHref('/en/glossary')).toBeDefined();
  });

  it('renders /de/** Explore links on a /de/** load (table row 3)', () => {
    mockPathname = '/de/features';
    renderFeaturesForLocale('de');
    expect(linkByHref('/de/location')).toBeDefined();
    expect(linkByHref('/de/guides')).toBeDefined();
    expect(linkByHref('/de/glossary')).toBeDefined();
  });

  it('renders /de/** Explore links on an unprefixed load with a de cookie (table row 4)', () => {
    mockPathname = '/features';
    renderFeaturesForLocale('de');
    expect(linkByHref('/de/location')).toBeDefined();
    expect(linkByHref('/de/guides')).toBeDefined();
    expect(linkByHref('/de/glossary')).toBeDefined();
  });
});
