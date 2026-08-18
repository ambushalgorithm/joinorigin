import { render, screen, within } from '@testing-library/react';

import { I18nProvider, getDictionary } from '@joinorigin/i18n';

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
 */

const TERM_DEFINITIONS: Record<string, string> = {
  community: 'A group of people connected by shared interests, goals, or place.',
  'community-manager': 'The person who nurtures, grows, and connects the members.',
  'community-os': 'The operating layer for running a community like a product.',
  moderation: 'The practice of keeping community conversations safe and on-topic.',
  onboarding: 'The process of welcoming and activating new members.',
  activation: 'The moment a new member makes their first meaningful contribution.',
  'engagement-loop': 'The repeatable cycle that keeps members returning.',
  'hybrid-events': 'Events that combine in-person and online participation.',
  'co-founder': 'A person who starts and builds an organization together with others.',
};

/** Canonical term names rendered as the card titles (design §6.3 set). */
const TERM_LABELS: Record<string, string> = {
  community: 'Community',
  'community-manager': 'Community manager',
  'community-os': 'Community OS',
  moderation: 'Moderation',
  onboarding: 'Onboarding',
  activation: 'Activation',
  'engagement-loop': 'Engagement loop',
  'hybrid-events': 'Hybrid events',
  'co-founder': 'Co-founder',
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
        terms: TERM_DEFINITIONS,
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
    expect(metadata.description).toContain('community building');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/glossary');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/glossary');
  });

  it('renders a single h1', () => {
    renderWithGlossaryTerms();
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Community OS Glossary');
  });

  it('renders glossary term cards with real definitions from dictionary keys', () => {
    renderWithGlossaryTerms();
    expect(screen.getByText('Core terms')).toBeInTheDocument();

    for (const [slug, definition] of Object.entries(TERM_DEFINITIONS)) {
      const label = TERM_LABELS[slug];
      const title = screen.getByRole('heading', { level: 3, name: label });
      const card = title.closest('article');
      expect(card).not.toBeNull();
      expect(within(card as HTMLElement).getByText(definition)).toBeInTheDocument();
    }
  });

  it('does not render the "coming soon" placeholder on any term card', () => {
    renderWithGlossaryTerms();
    const base = getDictionary('en');
    const baseGlossary = (base.seoContent as Record<string, unknown>).glossary as Record<
      string,
      unknown
    >;
    const comingSoon = baseGlossary.comingSoon as string;
    expect(comingSoon).toBeDefined();
    const cards = screen.getAllByRole('heading', { level: 3 }).map((title) => {
      const card = title.closest('article');
      return card as HTMLElement;
    });
    expect(cards.length).toBeGreaterThanOrEqual(9);
    for (const card of cards) {
      expect(within(card).queryByText(comingSoon)).not.toBeInTheDocument();
    }
  });

  it('cross-links to the guides hub and the flagship city pages', () => {
    renderWithGlossaryTerms();
    expect(screen.getByRole('link', { name: 'Community Building guides' })).toHaveAttribute(
      'href',
      '/guides',
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
    renderWithGlossaryTerms();
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads.some((p) => p['@type'] === 'BreadcrumbList')).toBe(true);
  });
});
