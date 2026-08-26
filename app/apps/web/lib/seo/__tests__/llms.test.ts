import { buildLlmsFullText, buildLlmsText, LLMS_ENTRIES } from '../llms';
import { guidePageEntries } from '../guides';
import { FLAGSHIP_CITIES } from '../locationData';
import { absoluteUrl } from '../url';

/**
 * fe-sitemap-llms llms.txt unit tests (TASK-311, design §9.3).
 *
 * Enforces the curated-index contract:
 *  - Locations section = hub + the 2 MVP flagships ONLY (never the long
 *    tail — the sitemap is the exhaustive index),
 *  - Guides section = all 12 L1 guides,
 *  - Glossary section = the glossary hub,
 *  - total size ≤ ~3 KB so LLM crawlers hold it in context (12-guide set,
 *    TASK-353 — the original ~2 KB budget assumed 7 guides),
 *  - every link is an absolute LLM-parseable URL at the EN canonical
 *    `/en/**` surface (all-prefixed, TASK-466); no `/api/*` links.
 */

const KB = 1024;

describe('lib/seo llms.txt — curated sections', () => {
  const text = buildLlmsText();

  it('stays within the ~3 KB context budget', () => {
    expect(Buffer.byteLength(text, 'utf8')).toBeLessThanOrEqual(3 * KB);
  });

  it('has a Locations section listing the hub + exactly the 2 flagships (at /en/)', () => {
    const section = LLMS_ENTRIES.find((entry) => entry.heading === 'Locations');
    expect(section).toBeDefined();
    const paths = section?.links.map((link) => link.path) ?? [];
    expect(paths).toContain('/en/location');
    for (const flagship of FLAGSHIP_CITIES) {
      const expected = `/en/location/${flagship.countrySlug}/${flagship.regionSlug}/${flagship.slug}`;
      expect(paths).toContain(expected);
    }
    // Hub + 2 flagships — exactly 3 links; the long tail is never enumerated.
    expect(paths).toHaveLength(1 + FLAGSHIP_CITIES.length);
    expect(text).toContain('## Locations');
  });

  it('has a Guides section listing all 12 L1 guides (never partial)', () => {
    const section = LLMS_ENTRIES.find((entry) => entry.heading === 'Guides');
    expect(section).toBeDefined();
    const paths = section?.links.map((link) => link.path) ?? [];
    const guidePaths = guidePageEntries().map((entry) => entry.path);
    expect(paths.sort()).toEqual([...guidePaths].sort());
    expect(guidePageEntries()).toHaveLength(12);
    expect(text).toContain('## Guides');
  });

  it('has a Glossary section linking the glossary hub at /en/', () => {
    const section = LLMS_ENTRIES.find((entry) => entry.heading === 'Glossary');
    expect(section).toBeDefined();
    const paths = section?.links.map((link) => link.path) ?? [];
    expect(paths).toContain('/en/glossary');
    expect(text).toContain('## Glossary');
  });

  it('does NOT enumerate the long tail (Tier-3 cities never appear)', () => {
    // Dallas is a Tier-3 city in the snapshot — it must not be listed.
    expect(text).not.toContain('/location/united-states/texas/dallas');
    expect(text).not.toContain('/en/location/united-states/texas/dallas');
    // No locale-prefixed long-tail URLs either.
    expect(text).not.toContain('/de/location');
  });

  it('every link is an absolute, LLM-parseable URL with no /api/* or modal links', () => {
    for (const section of LLMS_ENTRIES) {
      for (const link of section.links) {
        expect(link.path.startsWith('/')).toBe(true);
        expect(link.description.length).toBeGreaterThan(0);
      }
    }
    const lines = text.split('\n');
    const linkLines = lines.filter((line) => line.startsWith('- ['));
    for (const line of linkLines) {
      const urlMatch = line.match(/\]\((https?:\/\/[^)]+)\)/);
      expect(urlMatch).not.toBeNull();
      expect(line).not.toContain('/api/');
    }
  });

  it('contains the Overview/Features/Docs/Contact sections still (llms.txt v2 shape)', () => {
    for (const heading of ['## Overview', '## Features', '## Docs', '## Contact']) {
      expect(text).toContain(heading);
    }
  });
});

describe('lib/seo llms.txt — serialization shape', () => {
  it('is deterministic (no new Date / Math.random)', () => {
    expect(buildLlmsText()).toBe(buildLlmsText());
  });
  it('renders absolute URLs at the /en/** canonical surface via absoluteUrl', () => {
    const text = buildLlmsText();
    expect(text).toContain(absoluteUrl('/en/about'));
    expect(text).toContain(absoluteUrl('/en/guides/start-a-community'));
    expect(text).toContain(absoluteUrl('/en/location'));
    expect(text).toContain(absoluteUrl('/en/glossary'));
  });

  it('keeps the H1 + blockquote summary header', () => {
    const text = buildLlmsText();
    expect(text.startsWith('# JoinOrigin\n')).toBe(true);
    expect(text).toContain('\n> ');
  });

  it('no trailing blank lines (llms.txt v2)', () => {
    const text = buildLlmsText();
    expect(text.trimEnd()).not.toMatch(/\n\n$/);
  });
});

describe('lib/seo llms-full.txt — full-text companion (G-16)', () => {
  const text = buildLlmsFullText();

  it('is deterministic and carries the same sections as llms.txt', () => {
    expect(buildLlmsFullText()).toBe(buildLlmsFullText());
    for (const heading of ['## Overview', '## Guides', '## Locations']) {
      expect(text).toContain(heading);
    }
  });

  it('expands guide pages with their full intro + steps + FAQ', () => {
    // The start-a-community guide's intro sentence appears in full.
    expect(text).toContain('The hardest part of starting a community');
    // A guide step title appears with its body.
    expect(text).toContain('Define a clear purpose');
  });

  it('expands flagship city pages with their authored intro', () => {
    for (const flagship of FLAGSHIP_CITIES) {
      expect(text).toContain(
        `### /en/location/${flagship.countrySlug}/${flagship.regionSlug}/${flagship.slug}`,
      );
    }
    expect(text).toContain('New York City is a place');
  });

  it('stays plain-text with /en/** headings and no API links', () => {
    expect(text).toContain('### /en/about');
    expect(text).toContain("Origin's mission: a social collaboration network");
    expect(text).not.toMatch(/\/api\//);
    expect(text.trimEnd()).not.toMatch(/\n\n$/);
  });
});
