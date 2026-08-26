import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';

import { getDictionary, I18nProvider } from '@joinorigin/i18n';

import { guidePageEntries, guidePageEntriesWithFallback } from '../../../lib/seo/guides';
import DeGuidesHubPage, { metadata } from './page';

/**
 * fe-guides-locale-routes — `/de/guides` per-locale hub tests (TASK-421,
 * updated TASK-453).
 *
 * After the EN-fallback regeneration the hub lists EVERY guide; each
 * card's title/description resolves the committed de content with EN
 * fallback (`guidePageEntriesWithFallback`), matching the EN-fallback
 * contract on every `/<locale>/**` page. The hub metadata carries the full
 * hreflang set (de self + en + x-default → EN canonical). The guides chrome
 * keys are seeded so the suite is deterministic regardless of the Group 3
 * translation merge order.
 */

/** TASK-411 guides-hub chrome keys in the de surface (deterministic seed —
 *  mirror the de.json values after the i18n-de-s18 merge). */
const GUIDES_CHROME: Record<string, unknown> = {
  hubEyebrow: 'Community Building',
  hubTitle: 'Community-Building-Guides',
  hubLead: 'Zwölf praktische, zeitlose Anleitungen für Gruppen.',
  allGuides: 'Alle Leitfäden',
  searchLabel: 'Leitfäden durchsuchen',
  searchPlaceholder: 'Nach Titel oder Stichwort suchen',
  emptyState: 'Keine Leitfäden passen auf „{{query}}“.',
  glossarySection: 'Glossar',
  glossaryBandCopy: 'Lernen Sie die Grundbegriffe im <1>{{glossary}}</1>.',
  startLocal: 'Lokal starten',
  universalCopy: 'Leitfäden sind universell — Gemeinschaften sind lokal.',
  cityCardBody: 'Finden oder starten Sie eine Gemeinschaft in {{city}}.',
};

function renderWithDeGuideI18n(ui: ReactElement) {
  const de = getDictionary('de');
  const seoContent = (de.seoContent as Record<string, unknown> | undefined) ?? {};
  const guides = (seoContent.guides as Record<string, unknown> | undefined) ?? {};
  const dictionary = {
    ...de,
    seoContent: {
      ...seoContent,
      guides: { ...guides, ...GUIDES_CHROME },
    },
  };
  return render(
    <I18nProvider locale="de" dictionary={dictionary}>
      {ui}
    </I18nProvider>,
  );
}

describe('/de/guides hub (TASK-421)', () => {
  it('exports hub metadata with the de hreflang cluster (x-default → /en/guides)', () => {
    expect(metadata.title).toBe('Community Building Guides | JoinOrigin');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/de/guides');
    expect(metadata.alternates?.languages).toEqual({
      de: 'http://localhost:3100/de/guides',
      en: 'http://localhost:3100/en/guides',
      'x-default': 'http://localhost:3100/en/guides',
    });
  });

  it('renders a single h1 and links every guide to its locale path (EN fallback)', () => {
    renderWithDeGuideI18n(<DeGuidesHubPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    // Every committed de guide card links to the locale-prefixed path…
    for (const entry of guidePageEntries('de')) {
      expect(screen.getByRole('link', { name: entry.heading })).toHaveAttribute('href', entry.path);
    }
    // …and the hub lists ALL guides (untranslated ones fall back to EN).
    for (const entry of guidePageEntriesWithFallback('de')) {
      expect(screen.getByRole('link', { name: entry.heading })).toHaveAttribute('href', entry.path);
    }
  });
});
