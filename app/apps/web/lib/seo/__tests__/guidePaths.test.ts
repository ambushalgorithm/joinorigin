import {
  guideHubPath,
  guidePath,
  glossaryHubPath,
  GUIDES_HUB_PATH,
  GLOSSARY_HUB_PATH,
} from '../guidePaths';

/**
 * Story F shared-mechanism unit tests (TASK-537 / fe-nav-perf-fix, F1):
 * the client-safe guide/glossary path boundary must export the SAME path
 * values as `lib/seo/guides.ts` (server consumers) WITHOUT importing
 * `locationData` / `locations.json` — the RC1 bundle-leak root cause.
 */

describe('guidePaths (Story F F1 shared mechanism)', () => {
  it('exports the identical hub path constants as lib/seo/guides.ts', () => {
    expect(GUIDES_HUB_PATH).toBe('/guides');
    expect(GLOSSARY_HUB_PATH).toBe('/glossary');
  });

  it('builds locale-prefixed guide hub paths (EN canonical at /en/guides)', () => {
    expect(guideHubPath('en')).toBe('/en/guides');
    expect(guideHubPath('de')).toBe('/de/guides');
    expect(guideHubPath()).toBe('/en/guides');
  });

  it('builds locale-prefixed guide detail paths', () => {
    expect(guidePath('start-an-origin', 'en')).toBe('/en/guides/start-an-origin');
    expect(guidePath('start-an-origin', 'de')).toBe('/de/guides/start-an-origin');
    expect(guidePath('start-an-origin')).toBe('/en/guides/start-an-origin');
  });

  it('builds locale-prefixed glossary hub paths', () => {
    expect(glossaryHubPath('en')).toBe('/en/glossary');
    expect(glossaryHubPath('vi')).toBe('/vi/glossary');
    expect(glossaryHubPath()).toBe('/en/glossary');
  });
});
