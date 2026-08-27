import { render, screen, within } from '@testing-library/react';

import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import GlossaryHubPage, { metadata } from './page';

/**
 * Unit tests for the /glossary hub (design §6.3 — L2b hub; term pages
 * deferred in Sprint 12): metadata export + single H1 + glossary term cards
 * with real translated definitions from the `seoContent.glossary.terms.*`
 * dictionary keys (TASK-413) + cross-links to guides + city pages.
 *
 * The definition assertions inject a dictionary carrying the TASK-411
 * `seoContent.glossary.terms.<slug>` keys so the cards render real
 * definitions deterministically, independent of locale-role merge order.
 *
 * TASK-444: the fixture mirrors the REAL dictionary shape — each term is an
 * object `{ name, definition }` (TASK-413 had masked the object-shape bug
 * with a flat string fixture, which made the view pass tests while `t()`
 * returned an object at runtime → LG-2). The section bodies render from the
 * `whyBody`/`termsIntro`/`goDeeperItem*` keys.
 */

/** Real term shape from en.json: `terms.<slug>` = `{ name, definition }`. */
const TERM_ENTRIES: Record<string, { name: string; definition: string }> = {
  community: {
    name: 'Community',
    definition: 'A group of people connected by shared interests, goals, or place.',
  },
  'community-manager': {
    name: 'Community manager',
    definition: 'The person who nurtures, grows, and connects the members.',
  },
  'community-os': {
    name: 'Community OS',
    definition: 'The operating layer for running a community like a product.',
  },
  moderation: {
    name: 'Moderation',
    definition: 'The practice of keeping community conversations safe and on-topic.',
  },
  onboarding: {
    name: 'Onboarding',
    definition: 'The process of welcoming and activating new members.',
  },
  activation: {
    name: 'Activation',
    definition: 'The moment a new member makes their first meaningful contribution.',
  },
  'engagement-loop': {
    name: 'Engagement loop',
    definition: 'The repeatable cycle that keeps members returning.',
  },
  'hybrid-events': {
    name: 'Hybrid events',
    definition: 'Events that combine in-person and online participation.',
  },
  'co-founder': {
    name: 'Co-founder',
    definition: 'A person who starts and builds an organization together with others.',
  },
};

/** TASK-444 glossary section-body keys (EN values mirror en.json). */
const GLOSSARY_BODY_CHROME: Record<string, string> = {
  whyBody:
    'Community building has its own language, and the terms are often used loosely. A community OS glossary gives organizers, moderators, and founders shared definitions they can rely on.',
  termsIntro:
    'Here are the core terms every organizer, moderator, and founder uses — each one is defined in practice across the Origin Building guides:',
  goDeeperItem1:
    'Work through the <1>Origin Building guides</1> — the step-by-step how-tos behind every term.',
  goDeeperItem2: 'See the concepts in practice: <1>New York City</1> and <2>Berlin</2> city pages.',
};

function glossaryDictionary() {
  const base = getDictionary('en');
  const seoContent = base.seoContent as Record<string, unknown>;
  const glossary = seoContent.glossary as Record<string, unknown>;
  return {
    ...base,
    seoContent: {
      ...seoContent,
      glossary: {
        ...glossary,
        ...GLOSSARY_BODY_CHROME,
        terms: TERM_ENTRIES,
      },
    },
  };
}

function renderWithGlossaryTerms() {
  return render(
    <I18nProvider locale="en" dictionary={glossaryDictionary()}>
      <GlossaryHubPage />
    </I18nProvider>,
  );
}

describe('glossary hub page', () => {
  it('exports hub metadata (title, description, canonical)', () => {
    expect(metadata.title).toBe('Community OS Glossary | JoinOrigin');
    expect(metadata.description).toContain('core terms of Origin');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/glossary');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/glossary');
  });

  it('renders a single h1', () => {
    renderWithGlossaryTerms();
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Community OS Glossary');
  });

  it('renders glossary term cards with .name titles + .definition bodies from dictionary keys', () => {
    renderWithGlossaryTerms();
    expect(screen.getByText('Core terms')).toBeInTheDocument();

    for (const entry of Object.values(TERM_ENTRIES)) {
      const title = screen.getByRole('heading', { level: 3, name: entry.name });
      const card = title.closest('article');
      expect(card).not.toBeNull();
      expect(within(card as HTMLElement).getByText(entry.definition)).toBeInTheDocument();
    }
  });

  it('renders the why/terms-intro section bodies from dictionary keys (TASK-444)', () => {
    renderWithGlossaryTerms();
    expect(screen.getByText('Why a glossary')).toBeInTheDocument();
    expect(screen.getByText(GLOSSARY_BODY_CHROME.whyBody)).toBeInTheDocument();
    expect(screen.getByText(GLOSSARY_BODY_CHROME.termsIntro)).toBeInTheDocument();
  });

  it('does not render the "coming soon" placeholder on any term card', () => {
    renderWithGlossaryTerms();
    const cards = screen.getAllByRole('heading', { level: 3 }).map((title) => {
      const card = title.closest('article');
      return card as HTMLElement;
    });
    expect(cards.length).toBeGreaterThanOrEqual(9);
    for (const card of cards) {
      expect(within(card).queryByText(/coming soon/i)).not.toBeInTheDocument();
    }
  });

  it('cross-links to the guides hub and the flagship city pages (via Trans keys)', () => {
    renderWithGlossaryTerms();
    expect(screen.getByRole('link', { name: 'Origin Building guides' })).toHaveAttribute(
      'href',
      '/en/guides',
    );
    expect(screen.getByRole('link', { name: 'New York City' })).toHaveAttribute(
      'href',
      '/en/location/united-states/new-york/new-york',
    );
    expect(screen.getByRole('link', { name: 'Berlin' })).toHaveAttribute(
      'href',
      '/en/location/germany/berlin/berlin',
    );
  });

  it('renders the BreadcrumbList JSON-LD', () => {
    renderWithGlossaryTerms();
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads.some((p) => p['@type'] === 'BreadcrumbList')).toBe(true);
  });
});

/**
 * TASK-460 — the glossary hub renders internal links through the shared
 * locale-aware path helper per the confirmed prefix table. `useLocalizePath`
 * reads the router pathname + active i18n locale, so this suite overrides the
 * `next/navigation` mock with a mutable `mockPathname`.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => mockPathname,
}));

function renderGlossaryForLocale(locale: Locale) {
  return render(
    <I18nProvider locale={locale} dictionary={glossaryDictionary()}>
      <GlossaryHubPage />
    </I18nProvider>,
  );
}

describe('glossary hub — locale-aware internal links (TASK-460)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/';
  });

  /** Finds a link with the exact href (Trans link text is locale-dependent). */
  function linkByHref(href: string) {
    return screen.getAllByRole('link').find((link) => link.getAttribute('href') === href);
  }

  it('renders /en/** cross-links on an unprefixed EN load (all-routes-prefixed)', () => {
    mockPathname = '/glossary';
    renderGlossaryForLocale('en');
    expect(linkByHref('/en/guides')).toBeDefined();
    expect(linkByHref('/en/location/united-states/new-york/new-york')).toBeDefined();
    expect(linkByHref('/en/location/germany/berlin/berlin')).toBeDefined();
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/glossary';
    renderGlossaryForLocale('en');
    expect(linkByHref('/en/guides')).toBeDefined();
    expect(linkByHref('/en/location/united-states/new-york/new-york')).toBeDefined();
    expect(linkByHref('/en/location/germany/berlin/berlin')).toBeDefined();
  });

  it('renders /de/** cross-links on a /de/** load (table row 3)', () => {
    mockPathname = '/de/glossary';
    renderGlossaryForLocale('de');
    expect(linkByHref('/de/guides')).toBeDefined();
    expect(linkByHref('/de/location/united-states/new-york/new-york')).toBeDefined();
    expect(linkByHref('/de/location/germany/berlin/berlin')).toBeDefined();
  });

  it('renders /de/** cross-links on an unprefixed path with an active de locale (URL-driven)', () => {
    mockPathname = '/glossary';
    renderGlossaryForLocale('de');
    expect(linkByHref('/de/guides')).toBeDefined();
    expect(linkByHref('/de/location/united-states/new-york/new-york')).toBeDefined();
    expect(linkByHref('/de/location/germany/berlin/berlin')).toBeDefined();
  });
});
