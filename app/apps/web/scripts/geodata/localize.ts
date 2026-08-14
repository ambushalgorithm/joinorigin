/**
 * LOCALIZE step (design §5.3, geodata §10).
 *
 * Produce 21-locale localized names for countries/regions/cities.
 *
 * Resolution order per entity:
 *  1. Wikidata label for the locale (CC0, joined via `wkdt` QID from
 *     GeoNames alternateNamesV2) — batched SPARQL with retry.
 *  2. GeoNames alternate name for the locale (`alternateNamesV2.txt`,
 *     isoLanguage → our Locale tags).
 *  3. EN fallback (GeoNames ascii/English name).
 *
 * Pure helpers are exported for unit tests; the SPARQL client itself is
 * only exercised by the sync command.
 */

import type { Locale } from '@joinorigin/i18n';

import { GEONAMES_LANG_TO_LOCALE, WIKIDATA_SPARQL_URL } from './config';

/** All 21 supported locales (mirrors @joinorigin/i18n). */
export const LOCALES: readonly Locale[] = [
  'en',
  'es',
  'pt-BR',
  'fr',
  'de',
  'ru',
  'ja',
  'ko',
  'zh-CN',
  'zh-TW',
  'ar',
  'hi',
  'id',
  'tr',
  'it',
  'pl',
  'nl',
  'vi',
  'th',
  'uk',
  'fa',
];

/** Wikidata language tag for each Locale. */
export const LOCALE_TO_WIKIDATA_LANG: Record<Locale, string> = {
  en: 'en',
  es: 'es',
  'pt-BR': 'pt-br',
  fr: 'fr',
  de: 'de',
  ru: 'ru',
  ja: 'ja',
  ko: 'ko',
  'zh-CN': 'zh-cn',
  'zh-TW': 'zh-tw',
  ar: 'ar',
  hi: 'hi',
  id: 'id',
  tr: 'tr',
  it: 'it',
  pl: 'pl',
  nl: 'nl',
  vi: 'vi',
  th: 'th',
  uk: 'uk',
  fa: 'fa',
};

export type LocalizedNames = Record<Locale, string>;

/** Build an empty names record (all locales empty). */
export function emptyNames(): LocalizedNames {
  return Object.fromEntries(LOCALES.map((l) => [l, ''])) as LocalizedNames;
}

/** Build a name resolver from Wikidata labels + GeoNames alternates. */
export function buildNameResolver(
  wikidataByQid: Map<string, Partial<LocalizedNames>>,
  alternatesByGeonameId: Map<number, Partial<LocalizedNames>>,
) {
  return (qid: string | undefined, geonameId: number, enName: string): LocalizedNames => {
    const names = emptyNames();
    const wikidata = qid ? wikidataByQid.get(qid) : undefined;
    const alternates = alternatesByGeonameId.get(geonameId);
    for (const locale of LOCALES) {
      const wd = wikidata?.[locale];
      if (wd) {
        names[locale] = wd;
        continue;
      }
      const alt = alternates?.[locale];
      if (alt) {
        names[locale] = alt;
        continue;
      }
      names[locale] = enName;
    }
    return names;
  };
}

/** Parse GeoNames alternateNamesV2 into per-geonameId localized names. */
export function indexAlternateNames(lines: Iterable<string>): {
  names: Map<number, Partial<LocalizedNames>>;
  qids: Map<number, string>;
} {
  const names = new Map<number, Partial<LocalizedNames>>();
  const qids = new Map<number, string>();
  for (const line of lines) {
    if (!line) {
      continue;
    }
    const f = line.trim().split('\t');
    if (f.length < 4) {
      continue;
    }
    const geonameId = Number(f[1]);
    const isoLanguage = f[2];
    const name = f[3];
    if (!Number.isFinite(geonameId) || !name) {
      continue;
    }
    if (isoLanguage === 'wkdt') {
      const match = /^Q\d+$/.test(name);
      if (match && !qids.has(geonameId)) {
        qids.set(geonameId, name);
      }
      continue;
    }
    const locale = GEONAMES_LANG_TO_LOCALE[isoLanguage] as Locale | undefined;
    if (!locale) {
      continue;
    }
    const entry = names.get(geonameId) ?? {};
    if (!entry[locale]) {
      entry[locale] = name;
      names.set(geonameId, entry);
    }
  }
  return { names, qids };
}

export interface WikidataLabelRow {
  qid: string;
  locale: Locale;
  label: string;
}

/** One batched SPARQL label query for a list of QIDs (all 21 locales). */
export async function queryWikidataLabels(
  qids: string[],
  maxBatch = 100,
  delayMs = 300,
): Promise<Map<string, Partial<LocalizedNames>>> {
  const result = new Map<string, Partial<LocalizedNames>>();
  const langList = LOCALES.map((l) => LOCALE_TO_WIKIDATA_LANG[l])
    .map((l) => `"${l}"`)
    .join(', ');

  for (let i = 0; i < qids.length; i += maxBatch) {
    const batch = qids.slice(i, i + maxBatch);
    const values = batch.map((q) => `wd:${q}`).join(' ');
    const query = `
      SELECT ?item ?label ?lang WHERE {
        VALUES ?item { ${values} }
        ?item rdfs:label ?label .
        BIND(LANG(?label) AS ?lang)
        FILTER(?lang IN (${langList}))
      }`;

    let body: unknown = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch(
          `${WIKIDATA_SPARQL_URL}?query=${encodeURIComponent(query)}&format=json`,
          {
            headers: {
              Accept: 'application/sparql-results+json',
              'User-Agent': 'JoinOrigin-GeoBot/0.1 (https://joinorigin.com)',
            },
            redirect: 'follow',
          },
        );
        if (!res.ok) {
          throw new Error(`Wikidata HTTP ${res.status}`);
        }
        body = await res.json();
        break;
      } catch (err) {
        if (attempt === 3) {
          throw err;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }

    const rows = (body as { results?: { bindings?: unknown[] } })?.results?.bindings ?? [];
    for (const row of rows as Array<Record<string, { value: string }>>) {
      const qid = row.item?.value?.split('/').pop();
      const lang = row.lang?.value;
      const label = row.label?.value;
      if (!qid || !lang || !label) {
        continue;
      }
      const locale = LOCALES.find((l) => LOCALE_TO_WIKIDATA_LANG[l] === lang);
      if (!locale) {
        continue;
      }
      const entry = result.get(qid) ?? {};
      entry[locale] = label;
      result.set(qid, entry);
    }

    if (delayMs > 0 && i + maxBatch < qids.length) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return result;
}
