import { buildLlmsText, LLMS_ENTRIES } from '../llms';
import { guidePageEntries, GLOSSARY_HUB_PATH } from '../guides';
import { LOCATION_HUB_PATH } from '../locationPages';
import { FLAGSHIP_CITIES } from '../locationData';
import { absoluteUrl } from '../url';

/**
 * fe-sitemap-llms llms.txt unit tests (TASK-311, design §9.3).
 *
 * Enforces the curated-index contract:
 *  - Locations section = hub + the 2 MVP flagships ONLY (never the long
 *    tail — the sitemap is the exhaustive index),
 *  - Guides section = all 7 L1 guides,
 *  - Glossary section = the glossary hub,
 *  - total size ≤ ~2 KB so LLM crawlers hold it in context,
 *  - every link is an absolute LLM-parseable URL; no `/api/*` links.
 */

const KB = 1024;

describe('lib/seo llms.txt — curated sections', () => {
  const text = buildLlmsText();

  it('stays within the ~2 KB context budget', () => {
    expect(Buffer.byteLength(text, 'utf8')).toBeLessThanOrEqual(2 * KB);
  });

  it('has a Locations section listing the hub + exactly the 2 flagships', () => {
    const section = LLMS_ENTRIES.find((entry) => entry.heading === 'Locations');
    expect(section).toBeDefined();
    const paths = section?.links.map((link) => link.path) ?? [];
    expect(paths).toContain(LOCATION_HUB_PATH);
    for (const flagship of FLAGSHIP_CITIES) {
      const expected = `/location/${flagship.countrySlug}/${flagship.regionSlug}/${flagship.slug}`;
      expect(paths).toContain(expected);
    }
    // Hub + 2 flagships — exactly 3 links; the long tail is never enumerated.
    expect(paths).toHaveLength(1 + FLAGSHIP_CITIES.length);
    expect(text).toContain('## Locations');
  });

  it('has a Guides section listing all 7 L1 guides (never partial)', () => {
    const section = LLMS_ENTRIES.find((entry) => entry.heading === 'Guides');
    expect(section).toBeDefined();
    const paths = section?.links.map((link) => link.path) ?? [];
    const guidePaths = guidePageEntries().map((entry) => entry.path);
    expect(paths.sort()).toEqual([...guidePaths].sort());
    expect(guidePageEntries()).toHaveLength(7);
    expect(text).toContain('## Guides');
  });

  it('has a Glossary section linking the glossary hub', () => {
    const section = LLMS_ENTRIES.find((entry) => entry.heading === 'Glossary');
    expect(section).toBeDefined();
    const paths = section?.links.map((link) => link.path) ?? [];
    expect(paths).toContain(GLOSSARY_HUB_PATH);
    expect(text).toContain('## Glossary');
  });

  it('does NOT enumerate the long tail (Tier-3 cities never appear)', () => {
    // Austin is a Tier-3 city in the snapshot — it must not be listed.
    expect(text).not.toContain('/location/united-states/texas/austin');
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

  it('renders absolute URLs via absoluteUrl', () => {
    const text = buildLlmsText();
    expect(text).toContain(absoluteUrl('/about'));
    expect(text).toContain(absoluteUrl('/guides/start-a-community'));
    expect(text).toContain(absoluteUrl(LOCATION_HUB_PATH));
    expect(text).toContain(absoluteUrl(GLOSSARY_HUB_PATH));
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
