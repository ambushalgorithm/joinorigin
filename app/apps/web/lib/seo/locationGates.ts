/**
 * Quality gates G1–G5 (design §6.7) + idea-page uniqueness rule (§3.4/§6.6).
 *
 * Every L3 location page must pass ALL of G1–G5 to be `index, follow`:
 *
 * | Gate | Requirement                                        | Enforcement |
 * |------|----------------------------------------------------|-------------|
 * | G1   | ≥3 city-specific data points                        | dataset + content dataPoints count |
 * | G2   | ≥1 unique prose section (≥150 words), not name-swapped | content presence + word count |
 * | G3   | real populated place from the dataset               | dataset lookup only |
 * | G4   | intent match — page answers "communities in <city>" | title/H1/meta include city + type |
 * | G5   | no near-duplicate vs parent template                | word-set similarity threshold |
 *
 * Idea pages additionally enforce the uniqueness rule: their prose must not
 * overlap the same city's variant pages and must not reuse another flagship
 * city's idea page (no NYC↔Berlin reuse).
 *
 * Pages failing any gate are served `robots: { index: false, follow: true }`
 * and omitted from the sitemap (the registry `indexable` flag). No fabricated
 * member counts, ratings, or communities anywhere.
 *
 * Design source: `app/docs/design/sprint-11-seo-content-engine.md` §6.7,
 * §3.4, §6.6 (TASK-303).
 */

import type { LocationCity, LocationCountry, LocationRegion } from './data/types';
import type { CityContent, CountryContent, LocationContent, RegionContent } from './content/types';
import type { GroupTypeKey } from './locationData';

export interface GateResult {
  gate: 'G1' | 'G2' | 'G3' | 'G4' | 'G5';
  pass: boolean;
  /** Short human-readable reason for failures (diagnostics/tests). */
  detail?: string;
}

export type PageKind = 'hub' | 'country' | 'region' | 'city' | 'variant' | 'ideas';

/** Minimum unique prose length (design §6.7 G2). */
export const MIN_PROSE_WORDS = 150;

/** Near-duplicate Jaccard threshold (design §6.7 G5 — registry config). */
export const NEAR_DUPLICATE_THRESHOLD = 0.7;

/* ------------------------------------------------------------------ *
 * Text utilities
 * ------------------------------------------------------------------ */

/** Word count (whitespace tokens) — G2 length check. */
export function wordCount(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

/** English stopwords removed before similarity — keeps topic words meaningful. */
const STOPWORDS = new Set([
  'a',
  'an',
  'the',
  'and',
  'or',
  'but',
  'nor',
  'so',
  'for',
  'of',
  'to',
  'in',
  'on',
  'at',
  'by',
  'with',
  'from',
  'as',
  'into',
  'over',
  'under',
  'about',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'am',
  'it',
  'its',
  'this',
  'that',
  'these',
  'those',
  'your',
  'you',
  'we',
  'our',
  'their',
  'they',
  'he',
  'she',
  'who',
  'which',
  'what',
  'there',
  'here',
  'has',
  'have',
  'had',
  'do',
  'does',
  'did',
  'not',
  'no',
  'yes',
  'if',
  'then',
  'than',
  'when',
  'while',
  'can',
  'could',
  'will',
  'would',
  'shall',
  'should',
  'may',
  'might',
  'must',
  'more',
  'most',
  'some',
  'any',
  'all',
  'each',
  'every',
  'both',
  'few',
]);

/** Normalized tokens (lowercase, punctuation stripped, stopwords removed). */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9äöüß\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => !STOPWORDS.has(token));
}

/**
 * Word-set Jaccard similarity in [0,1] between two texts.
 * 1 = identical sets, 0 = disjoint. Used by G5 + the idea-page rule.
 */
export function similarity(a: string, b: string): number {
  const setA = new Set(tokenize(a));
  const setB = new Set(tokenize(b));
  if (setA.size === 0 && setB.size === 0) return 1;
  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) intersection += 1;
  }
  return intersection / (setA.size + setB.size - intersection);
}

/** True when `b` is a near-duplicate of `a` at the configured threshold. */
export function nearDuplicate(a: string, b: string, threshold = NEAR_DUPLICATE_THRESHOLD): boolean {
  return similarity(a, b) >= threshold;
}

/* ------------------------------------------------------------------ *
 * G1 — ≥3 city-specific data points
 * ------------------------------------------------------------------ */

/** True for capital/admin-seat feature codes (a community-signal datapoint). */
export function isCapitalLike(featureCode: string): boolean {
  return /^PPLC|^PPLA/.test(featureCode);
}

/** Distinct data-point signals for a city: dataset fields + content sentences. */
export function countCityDataPoints(
  city: LocationCity | undefined,
  content: Pick<CityContent, 'dataPoints'> | undefined,
): number {
  let count = 0;
  if (!city) return count;
  if ((city.population ?? 0) > 0) count += 1;
  if (city.timezone) count += 1;
  if (city.regionId) count += 1;
  if (city.countryIso2) count += 1;
  if (isCapitalLike(city.featureCode)) count += 1;
  count += content?.dataPoints?.length ?? 0;
  return count;
}

/** Distinct data-point signals for a country page. */
export function countCountryDataPoints(
  country: LocationCountry | undefined,
  content: Pick<CountryContent, 'dataPoints'> | undefined,
): number {
  let count = 0;
  if (!country) return count;
  if (country.population > 0) count += 1;
  if (country.capital) count += 1;
  if (country.languages.length > 0) count += 1;
  if (country.continent) count += 1;
  if (country.currency) count += 1;
  count += content?.dataPoints?.length ?? 0;
  return count;
}

/** Distinct data-point signals for a region page. */
export function countRegionDataPoints(
  region: LocationRegion | undefined,
  content: Pick<RegionContent, 'dataPoints'> | undefined,
): number {
  let count = 0;
  if (!region) return count;
  if (region.name) count += 1;
  if (region.countryIso2) count += 1;
  if ((region.population ?? 0) > 0) count += 1;
  count += content?.dataPoints?.length ?? 0;
  return count;
}

const MIN_DATA_POINTS = 3;

export function gateG1(
  kind: PageKind,
  entity: LocationCity | LocationCountry | LocationRegion | undefined,
  content: LocationContent | undefined,
): GateResult {
  if (kind === 'hub') return { gate: 'G1', pass: true };
  let count = 0;
  if (kind === 'city' || kind === 'variant' || kind === 'ideas') {
    count = countCityDataPoints(entity as LocationCity | undefined, content);
  } else if (kind === 'country') {
    count = countCountryDataPoints(entity as LocationCountry | undefined, content);
  } else if (kind === 'region') {
    count = countRegionDataPoints(entity as LocationRegion | undefined, content);
  }
  return {
    gate: 'G1',
    pass: count >= MIN_DATA_POINTS,
    detail: `${count} data points (need ${MIN_DATA_POINTS})`,
  };
}

/* ------------------------------------------------------------------ *
 * G2 — ≥1 unique prose section (≥150 words)
 * ------------------------------------------------------------------ */

/** The prose G2 checks for a given page kind/group type. */
export function proseForPage(
  kind: PageKind,
  content: LocationContent | undefined,
  groupType?: GroupTypeKey,
): string {
  if (!content) return '';
  if (kind === 'variant' && content.kind === 'city' && groupType) {
    return content.variantIntros[groupType] ?? '';
  }
  if (kind === 'ideas' && content.kind === 'city') {
    const { intro, categories } = content.ideaPage;
    const ideaText = categories
      .map((category) =>
        [
          category.name,
          ...category.ideas.flatMap((idea) => [
            idea.title,
            idea.pitch,
            idea.audience,
            idea.venueType,
          ]),
        ].join(' '),
      )
      .join(' ');
    return `${intro} ${ideaText}`;
  }
  // Guides never flow through the location gates (PageKind has no 'guide'),
  // but the union type allows them — join the paragraph array defensively so
  // the prose gate still sees the full intro text (TASK-351 multi-paragraph).
  // City intros are also multi-paragraph arrays (TASK-410) — join them so G2
  // sums the combined paragraph lengths.
  if (content.kind === 'guide' || content.kind === 'city') return content.intro.join(' ');
  return content.intro;
}

export function gateG2(
  kind: PageKind,
  content: LocationContent | undefined,
  groupType?: GroupTypeKey,
): GateResult {
  if (kind === 'hub') return { gate: 'G2', pass: true };
  const prose = proseForPage(kind, content, groupType);
  const count = wordCount(prose);
  return {
    gate: 'G2',
    pass: count >= MIN_PROSE_WORDS,
    detail: `${count} words (need ≥${MIN_PROSE_WORDS})`,
  };
}

/* ------------------------------------------------------------------ *
 * G3 — real populated place from the dataset (never synthetic)
 * ------------------------------------------------------------------ */

export function gateG3(
  kind: PageKind,
  entity: LocationCity | LocationCountry | LocationRegion | undefined,
): GateResult {
  if (kind === 'hub') return { gate: 'G3', pass: true };
  return {
    gate: 'G3',
    pass: entity !== undefined,
    detail: entity ? 'real place from dataset' : 'not found in dataset',
  };
}

/* ------------------------------------------------------------------ *
 * G4 — intent match (title/H1/meta include city + type)
 * ------------------------------------------------------------------ */

/**
 * Intent phrases per page kind — what the page must answer (design §6.7 G4):
 * "communities in <city>" / "start <group-type> in <city>" / 30 ideas.
 * Variant + idea pages pass the (localized) type phrase — e.g. "Small
 * business communities", "Kreativ- & Design-Communities", "Ideen".
 */
export function intentPhrase(kind: PageKind, typePhrase?: string): string {
  if ((kind === 'variant' || kind === 'ideas') && typePhrase) return typePhrase;
  if (kind === 'ideas') return 'ideas';
  return 'communities';
}

/**
 * G4 check: title + description must include the city name and the page's
 * intent phrase (city page → "communities"/"Origins", variant → the
 * group-type label, idea page → "ideas"/localized). Used by the registry +
 * tested. Accepts both the community-era and Origin-era entity phrases so
 * committed legacy content stays gate-passing during the Wave-3 reframe.
 */
export function intentMatches(
  title: string,
  description: string,
  cityName: string,
  kind: PageKind,
  typePhrase?: string,
): boolean {
  const titleLower = title.toLowerCase();
  const descriptionLower = description.toLowerCase();
  const city = cityName.toLowerCase();

  const hasCity = titleLower.includes(city) || descriptionLower.includes(city);
  if (!hasCity) return false;

  if ((kind === 'variant' || kind === 'ideas') && typePhrase) {
    const phrase = typePhrase.toLowerCase();
    // Wave-3: titles carry the Origin phrasing while the G4 intent phrase
    // chrome key may still resolve the legacy community-era label (or the
    // committed per-locale content titles are still community-era) —
    // accept either so gate-passing pages stay indexable during the reframe.
    const originPhrase =
      kind === 'ideas'
        ? 'origin event ideas'
        : phrase.replace('communities', 'origins').replace('community', 'origin');
    const communityPhrase = phrase.replace('origins', 'communities').replace('origin', 'community');
    return (
      titleLower.includes(phrase) ||
      descriptionLower.includes(phrase) ||
      titleLower.includes(originPhrase) ||
      descriptionLower.includes(originPhrase) ||
      titleLower.includes(communityPhrase) ||
      descriptionLower.includes(communityPhrase)
    );
  }
  if (kind === 'ideas') {
    return titleLower.includes('idea') || descriptionLower.includes('idea');
  }
  return (
    titleLower.includes('commun') ||
    descriptionLower.includes('commun') ||
    titleLower.includes('origin') ||
    descriptionLower.includes('origin')
  );
}

export function gateG4(
  kind: PageKind,
  title: string,
  description: string,
  cityName: string,
  typePhrase?: string,
): GateResult {
  if (kind === 'hub') return { gate: 'G4', pass: true };
  const pass = intentMatches(title, description, cityName, kind, typePhrase);
  const phrase = intentPhrase(kind, typePhrase);
  return {
    gate: 'G4',
    pass,
    detail: pass
      ? `title/meta match "${phrase} in ${cityName}"`
      : `title/meta miss intent "${phrase} in ${cityName}"`,
  };
}

/* ------------------------------------------------------------------ *
 * G5 — no near-duplicate vs parent template
 * ------------------------------------------------------------------ */

export function gateG5(kind: PageKind, prose: string, parentProse: string): GateResult {
  if (kind === 'hub') return { gate: 'G5', pass: true };
  if (wordCount(prose) === 0 || wordCount(parentProse) === 0) {
    return { gate: 'G5', pass: true, detail: 'nothing to compare' };
  }
  const sim = similarity(prose, parentProse);
  return {
    gate: 'G5',
    pass: sim < NEAR_DUPLICATE_THRESHOLD,
    detail: `similarity ${sim.toFixed(3)} vs parent (threshold ${NEAR_DUPLICATE_THRESHOLD})`,
  };
}

/* ------------------------------------------------------------------ *
 * Idea-page uniqueness rule (§3.4, §6.6)
 *
 * The idea page must (1) not overlap its own city's variant prose and
 * (2) not reuse another flagship city's idea page (no NYC↔Berlin reuse).
 * ------------------------------------------------------------------ */

/** Concatenated idea-page prose (intro + categories) for comparisons. */
export function ideaPageProse(content: Pick<CityContent, 'ideaPage'>): string {
  return proseForPage('ideas', content as LocationContent);
}

export function ideaPageUnique(
  ideaContent: Pick<CityContent, 'ideaPage'>,
  cityContent: Pick<CityContent, 'variantIntros'>,
  otherCityIdeaProse?: string,
): boolean {
  const prose = ideaPageProse(ideaContent);
  for (const variantIntro of Object.values(cityContent.variantIntros)) {
    if (variantIntro && nearDuplicate(prose, variantIntro)) return false;
  }
  if (otherCityIdeaProse && nearDuplicate(prose, otherCityIdeaProse)) return false;
  return true;
}

/* ------------------------------------------------------------------ *
 * Orchestration — the `indexable` flag (design §6.7)
 * ------------------------------------------------------------------ */

export interface PageGateContext {
  kind: PageKind;
  /** Tier from the registry (1/2/3) — Tier-3 long tail is never indexed. */
  tier: 1 | 2 | 3;
  entity?: LocationCity | LocationCountry | LocationRegion;
  content?: LocationContent;
  title?: string;
  description?: string;
  cityName?: string;
  groupType?: GroupTypeKey;
  /** Localized group-type label for G4 (e.g. "Small business communities"). */
  typePhrase?: string;
  /** Parent page prose for G5 (variant → city intro; city → sibling flagship). */
  parentProse?: string;
  /** Other flagship idea prose for the idea-page uniqueness rule. */
  otherCityIdeaProse?: string;
}

/**
 * Evaluate ALL gates for one page. `indexable` = tier ≤ 2 AND every gate
 * passes (hub is exempt by construction). Pages failing any gate render
 * with `robots: { index: false, follow: true }` and are omitted from the
 * sitemap (design §6.7, §8.3).
 */
export function evaluatePageGates(ctx: PageGateContext): {
  gates: GateResult[];
  indexable: boolean;
} {
  if (ctx.kind === 'hub') {
    return { gates: [], indexable: true };
  }

  const gates: GateResult[] = [
    gateG1(ctx.kind, ctx.entity, ctx.content),
    gateG2(ctx.kind, ctx.content, ctx.groupType),
    gateG3(ctx.kind, ctx.entity),
    gateG4(ctx.kind, ctx.title ?? '', ctx.description ?? '', ctx.cityName ?? '', ctx.typePhrase),
  ];

  const prose = proseForPage(ctx.kind, ctx.content, ctx.groupType);
  if (ctx.parentProse !== undefined) {
    gates.push(gateG5(ctx.kind, prose, ctx.parentProse));
  }

  if (ctx.kind === 'ideas' && ctx.content?.kind === 'city') {
    const unique = ideaPageUnique(ctx.content, ctx.content, ctx.otherCityIdeaProse);
    gates.push({
      gate: 'G5',
      pass: unique,
      detail: unique
        ? 'idea prose unique vs variants + sibling city'
        : 'idea prose overlaps variants or sibling city',
    });
  }

  const allGatesPass = gates.every((g) => g.pass);
  return {
    gates,
    indexable: ctx.tier <= 2 && allGatesPass,
  };
}
