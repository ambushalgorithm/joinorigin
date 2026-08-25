/**
 * lib/seo locationView — FAQ copy replacement (TASK-495 / TASK-497) tests.
 *
 * Asserts every EN content-rich city venue-suggestion FAQ answer carries
 * the replacement sourcing line, no authored FAQ answer contains the old
 * fabrication line, and the rendered city view-model FAQ never does.
 */

import { buildLocationViewData } from '../locationView';
import { locationPageEntries } from '../locationPages';
import { CONTENT_RICH_CITY_SLUGS } from '../locationData';
import { getCityContent, listContent } from '../content';

describe('lib/seo locationView — FAQ copy replacement (TASK-495 / TASK-497)', () => {
  const OLD_FAQ_LINE = 'We never fabricate member counts, ratings, or local offices';
  const REPLACEMENT_PHRASE = 'compiled from real, publicly known community spaces';

  it('every EN content-rich city venue-suggestion FAQ answer carries the replacement line', () => {
    for (const slug of CONTENT_RICH_CITY_SLUGS) {
      const content = getCityContent(slug, 'en');
      expect(content).toBeDefined();
      const venueFaq = content?.faq.find((entry) =>
        entry.question.includes('venue suggestions on this page real'),
      );
      expect(venueFaq).toBeDefined();
      expect(venueFaq?.answer).toContain(REPLACEMENT_PHRASE);
      expect(venueFaq?.answer).not.toContain(OLD_FAQ_LINE);
    }
  });

  it('no authored FAQ answer in any EN content file contains the old fabrication line', () => {
    const offenders: string[] = [];
    for (const content of listContent('en')) {
      for (const entry of content.faq) {
        if (entry.answer.includes(OLD_FAQ_LINE)) {
          offenders.push(entry.question);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it('the rendered city view-model FAQ never contains the old line (buildLocationViewData)', () => {
    for (const slug of ['jakarta', 'lima', 'berlin', 'new-york', 'tokyo']) {
      const entry = locationPageEntries().find((e) => e.kind === 'city' && e.params.city === slug);
      expect(entry).toBeDefined();
      const data = buildLocationViewData(entry!);
      expect(data.faq.length).toBeGreaterThan(0);
      for (const faqEntry of data.faq) {
        expect(faqEntry.answer).not.toContain(OLD_FAQ_LINE);
      }
    }
  });
});
