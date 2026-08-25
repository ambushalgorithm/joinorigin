import { screen, render, within } from '@testing-library/react';

import {
  I18nProvider,
  _resetI18nForTests,
  getDictionary,
  SUPPORTED_LOCALES,
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

  it('renders core-object and roadmap cards as full-card single wrapping links (Story D)', () => {
    renderWithI18n(<FeaturesPage />);
    // Every core-object card is one semantic focusable <a> covering the
    // entire card, localized to the docs concepts section (TASK-534, Story D).
    const coreObjectLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href') === '/en/docs#concepts');
    expect(coreObjectLinks.length).toBeGreaterThanOrEqual(8);
    // The link is the card itself: it wraps the card title heading.
    for (const link of coreObjectLinks) {
      expect(within(link as HTMLElement).getByRole('heading', { level: 3 })).toBeInTheDocument();
    }
    // Roadmap cards link to the docs roadmap section, same full-card pattern.
    const roadmapLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href') === '/en/docs#roadmap');
    expect(roadmapLinks.length).toBeGreaterThanOrEqual(3);
    for (const link of roadmapLinks) {
      expect(within(link as HTMLElement).getByRole('heading', { level: 3 })).toBeInTheDocument();
    }
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

function renderFeaturesForLocale(locale: Locale) {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <FeaturesPage />
    </I18nProvider>,
  );
}

describe('features view — locale-aware internal links (TASK-460)', () => {
  beforeEach(() => {
    _resetI18nForTests();
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

  it('renders /de/** Explore links on an unprefixed path with an active de locale (URL-driven)', () => {
    mockPathname = '/features';
    renderFeaturesForLocale('de');
    expect(linkByHref('/de/location')).toBeDefined();
    expect(linkByHref('/de/guides')).toBeDefined();
    expect(linkByHref('/de/glossary')).toBeDefined();
  });
});

/**
 * TASK-478 / TASK-481 — the /features copy reads "ten tools" equivalents in
 * BOTH spots (`features.sectionComparison` = "Why Origin instead of ten
 * tools" and `features.hero.lead` = "…instead of ten separate tools") across
 * ALL 21 locale JSONs. These tests pin the exact committed strings for EN +
 * a sample of non-EN locales (dictionary level AND rendered page level), then
 * guard the full 21-locale regression table so the old "five tools" heading
 * can never come back in either key. The FAQ/mission "five tools" copies are
 * intentionally out of scope (TASK-478), so the negative assertions are
 * scoped strictly to the two copy keys.
 */

/** Exact `features.sectionComparison` per locale (TASK-478 committed values). */
const SECTION_COMPARISON_BY_LOCALE: Record<Locale, string> = {
  ar: 'لماذا Origin بدلًا من عشر أدوات',
  de: 'Warum Origin statt zehn Tools',
  en: 'Why Origin instead of ten tools',
  es: 'Por qué Origin en lugar de diez herramientas',
  fa: 'چرا Origin به‌جای ده ابزار',
  fr: 'Pourquoi Origin plutôt que dix outils',
  hi: 'दस टूल की जगह Origin ही क्यों',
  id: 'Mengapa Origin, bukan sepuluh alat',
  it: 'Perché Origin invece di dieci strumenti',
  ja: 'なぜ10のツールではなくOriginなのか',
  ko: '열 개의 도구 대신 Origin을 선택해야 하는 이유',
  nl: 'Waarom Origin in plaats van tien tools',
  pl: 'Dlaczego Origin zamiast dziesięciu narzędzi',
  'pt-BR': 'Por que o Origin em vez de dez ferramentas',
  ru: 'Почему Origin вместо десяти инструментов',
  th: 'ทำไมต้อง Origin แทนเครื่องมือสิบอย่าง',
  tr: 'Neden on araç yerine Origin?',
  uk: 'Чому Origin, а не десять інструментів',
  vi: 'Vì sao lại là Origin thay vì mười công cụ',
  'zh-CN': '为什么选择 Origin 而不是十个工具',
  'zh-TW': '為什麼選擇 Origin 而非十套工具',
};

/** A "ten tools" fragment that must appear inside `features.hero.lead`. */
const HERO_LEAD_TEN_TOOLS_MARKER: Record<Locale, string> = {
  ar: 'عشر أدوات',
  de: 'zehn getrennten Tools',
  en: 'ten separate tools',
  es: 'diez herramientas',
  fa: 'ده ابزار',
  fr: 'dix outils',
  hi: 'दस अलग-अलग टूल',
  id: 'sepuluh alat',
  it: 'dieci strumenti',
  ja: '10の別々のツール',
  ko: '열 개의 분리된 도구',
  nl: 'tien losse tools',
  pl: 'dziesięciu osobnych narzędziach',
  'pt-BR': 'dez ferramentas',
  ru: 'десяти отдельных инструментов',
  th: 'เครื่องมือแยกสิบตัว',
  tr: 'on ayrı araç',
  uk: 'десяти окремих інструментів',
  vi: 'mười công cụ',
  'zh-CN': '十个分散的工具',
  'zh-TW': '十套分開的工具',
};

/** The two TASK-478 copy keys resolved from a locale dictionary. */
function featuresCopyKeys(locale: Locale): { sectionComparison: string; heroLead: string } {
  const features = getDictionary(locale).features as Record<string, unknown>;
  return {
    sectionComparison: features.sectionComparison as string,
    heroLead: (features.hero as Record<string, unknown>).lead as string,
  };
}

describe('features copy — "ten tools" in both spots (TASK-478/TASK-481)', () => {
  it('reads the ten-tools comparison heading + hero lead in EN', () => {
    const en = featuresCopyKeys('en');
    expect(en.sectionComparison).toBe('Why Origin instead of ten tools');
    expect(en.heroLead).toContain('ten separate tools');
    // The old "five tools" copy is gone from both keys.
    expect(en.sectionComparison).not.toContain('five');
    expect(en.heroLead).not.toContain('five');
  });

  it('renders the ten-tools copy on the EN /features page', () => {
    renderWithI18n(<FeaturesPage />);
    expect(screen.getByText('Why Origin instead of ten tools')).toBeInTheDocument();
    expect(screen.getByText(/instead of ten separate tools/)).toBeInTheDocument();
    expect(screen.queryByText(/instead of five separate tools/)).not.toBeInTheDocument();
    expect(screen.queryByText('Why Origin instead of five tools')).not.toBeInTheDocument();
  });

  it('reads ten-tools equivalents in a sample of non-EN locales', () => {
    for (const locale of ['de', 'es', 'fr', 'pt-BR'] as const) {
      const copy = featuresCopyKeys(locale);
      expect(copy.sectionComparison).toBe(SECTION_COMPARISON_BY_LOCALE[locale]);
      expect(copy.heroLead).toContain(HERO_LEAD_TEN_TOOLS_MARKER[locale]);
      // No "five" equivalent left in either key (de "fünf" is the clearest
      // marker; the other sample locales assert their exact ten-tools string).
      if (locale === 'de') {
        expect(copy.sectionComparison).not.toContain('fünf');
        expect(copy.heroLead).not.toContain('fünf');
      }
    }
  });

  it('renders the ten-tools copy on a non-EN /features page (de)', () => {
    renderWithI18n(<FeaturesPage />, 'de');
    expect(screen.getByText('Warum Origin statt zehn Tools')).toBeInTheDocument();
    expect(screen.getByText(/zehn getrennten Tools/)).toBeInTheDocument();
    // The old "five tools" heading is gone; the FAQ/mission "five" copies are
    // intentionally out of scope (TASK-478) and do not render on this page.
    expect(screen.queryByText('Warum Origin statt fünf Tools')).not.toBeInTheDocument();
    expect(screen.queryByText(/statt fünf getrennter Tools/)).not.toBeInTheDocument();
  });

  it('carries ten-tools equivalents in both copy keys for ALL 21 locales', () => {
    expect(SUPPORTED_LOCALES).toHaveLength(21);
    for (const locale of SUPPORTED_LOCALES) {
      const copy = featuresCopyKeys(locale);
      expect(copy.sectionComparison).toBe(SECTION_COMPARISON_BY_LOCALE[locale]);
      expect(copy.heroLead).toContain(HERO_LEAD_TEN_TOOLS_MARKER[locale]);
    }
  });
});
