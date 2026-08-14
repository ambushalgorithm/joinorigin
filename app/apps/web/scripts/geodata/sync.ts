#!/usr/bin/env node
/**
 * geo:sync — geodata pipeline orchestrator (TASK-306).
 *
 * Usage: pnpm --filter @joinorigin/web geo:sync [--fresh] [--skip-wikidata]
 *
 * Flow (design §5.3):
 *   download → CLEAN → DEDUP → JOIN → OVERLAY → LOCALIZE → SNAPSHOT
 *
 * Output: `apps/web/lib/seo/data/locations.json` (committed snapshot).
 * Scope: all countries + all regions + cities with population ≥
 * `GEO_MIN_POPULATION` (default 100_000) OR a capital/admin1 seat, so the
 * hierarchy stays complete for every country/region. Set `GEO_MIN_POPULATION=0`
 * to export the full 235K dump (Tier-3 long tail).
 */

import { readFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { createReadStream } from 'node:fs';

import { ensureSources } from './download';
import { cleanCitiesFromLines } from './clean';
import { dedupCities } from './dedup';
import {
  buildCountries,
  buildCountryTimeZones,
  buildRegions,
  parseAdmin1Line,
  parseCountryLine,
  parseTimeZoneLine,
} from './join';
import { buildAdminNameIndex, buildSimpleMapsIndex, matchSimpleMaps } from './overlay';
import { buildNameResolver, queryWikidataLabels } from './localize';
import { buildSnapshot, writeSnapshot } from './snapshot';
import { DEFAULT_MIN_POPULATION } from './config';
import type { CleanCity, CleanCountry, CleanRegion, GeoCityRow, SimpleMapsRow } from './types';

const args = process.argv.slice(2);
const fresh = args.includes('--fresh');
const skipWikidata = args.includes('--skip-wikidata');
const minPopulation = process.env.GEO_MIN_POPULATION
  ? Number(process.env.GEO_MIN_POPULATION)
  : DEFAULT_MIN_POPULATION;

/** Read a TSV text file as lines. */
function readLines(path: string): string[] {
  return readFileSync(path, 'utf8').split('\n');
}

/** Stream a large file (alternateNamesV2, 19M rows) through a callback. */
async function streamLines(path: string, onLine: (line: string) => void): Promise<void> {
  const rl = createInterface({ input: createReadStream(path), crlfDelay: Infinity });
  for await (const line of rl) {
    onLine(line);
  }
}

async function main() {
  console.log('[geo:sync] downloading sources…');
  const { files } = await ensureSources(undefined, fresh);
  console.log(`[geo:sync] sources ready in cache`);

  // 1. CLEAN — parse cities500, keep P-class.
  console.log('[geo:sync] CLEAN…');
  const cityRows = cleanCitiesFromLines(readLines(files.cities500));
  console.log(`[geo:sync]   ${cityRows.length} P-class city rows after CLEAN`);

  // 2. DEDUP — per (asciiname, country, admin1), keep highest pop.
  console.log('[geo:sync] DEDUP…');
  const { cities: deduped, sameNameAscii } = dedupCities(cityRows);
  console.log(`[geo:sync]   ${deduped.length} cities after DEDUP`);

  // 3. JOIN — countries, regions, timezones.
  console.log('[geo:sync] JOIN…');
  const countryRows = readLines(files.countryInfo)
    .map(parseCountryLine)
    .filter((r): r is NonNullable<typeof r> => r !== null);
  const admin1Rows = readLines(files.admin1CodesASCII)
    .map(parseAdmin1Line)
    .filter((r): r is NonNullable<typeof r> => r !== null);
  const timeZoneRows = readLines(files.timeZones)
    .map(parseTimeZoneLine)
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const countries: CleanCountry[] = buildCountries(countryRows);
  const regions: CleanRegion[] = buildRegions(admin1Rows);
  const countryTz = buildCountryTimeZones(timeZoneRows);

  // 4. OVERLAY — SimpleMaps Basic.
  console.log('[geo:sync] OVERLAY…');
  const adminNameIndex = buildAdminNameIndex(admin1Rows);
  const simpleMapsRows = readLines(files.simplemaps)
    .slice(1)
    .map(parseSimpleMapsLine)
    .filter((r): r is SimpleMapsRow => r !== null);
  const simpleMapsIndex = buildSimpleMapsIndex(simpleMapsRows, adminNameIndex);

  // 4b. Assemble cities (join + overlay) and apply the snapshot scope FIRST
  // (Tier-1/2 core + capital/admin1 seats) so localization only touches the
  // entities actually committed (keeps the Wikidata query small).
  console.log('[geo:sync] ASSEMBLE + SCOPE…');
  const regionIdByCountryAdmin1 = new Map<string, string>();
  for (const region of regions) {
    regionIdByCountryAdmin1.set(`${region.countryIso2}|${region.admin1Code}`, region.id);
  }

  const scopedRows: GeoCityRow[] = [];
  for (const row of deduped) {
    const regionId = regionIdByCountryAdmin1.get(`${row.countryCode}|${row.admin1Code}`);
    if (!regionId) {
      continue; // City without a known admin1 (rare; skip to keep hierarchy clean).
    }
    const isSeat = row.featureCode === 'PPLC' || row.featureCode === 'PPLA';
    if (row.population < minPopulation && !isSeat) {
      continue; // Scope filter: core set (Tier-1/2) + capital/admin seats.
    }
    scopedRows.push(row);
  }
  console.log(`[geo:sync]   ${scopedRows.length} cities in snapshot scope`);

  // 5. LOCALIZE — Wikidata SPARQL (skip flag → GeoNames alternates + EN).
  console.log('[geo:sync] LOCALIZE…');
  const targetIds = new Set<number>();
  for (const c of countries) {
    targetIds.add(c.geonameId);
  }
  for (const r of regions) {
    targetIds.add(r.geonameId);
  }
  for (const row of scopedRows) {
    targetIds.add(row.geonameId);
  }

  const { names: altNames, qids } = await indexAlternateNamesFromFile(
    files.alternateNamesV2,
    targetIds,
  );
  console.log(
    `[geo:sync]   alternate names indexed for ${altNames.size} targets, ${qids.size} QIDs`,
  );

  const qidList = Array.from(qids.values());
  let wikidataByQid = new Map<string, Record<string, string>>();
  if (!skipWikidata && qidList.length > 0) {
    console.log(`[geo:sync]   querying Wikidata for ${qidList.length} QIDs (batched)…`);
    try {
      wikidataByQid = await queryWikidataLabels(qidList);
      console.log(`[geo:sync]   Wikidata returned labels for ${wikidataByQid.size} QIDs`);
    } catch (err) {
      console.warn(
        `[geo:sync]   Wikidata query failed (${(err as Error).message}); falling back to GeoNames alternates + EN`,
      );
    }
  } else {
    console.log('[geo:sync]   skipping Wikidata (flag or no QIDs)');
  }
  const resolveNames = buildNameResolver(wikidataByQid, altNames);

  // 4c. Finalize cities with overlay + localized names.
  const cities: CleanCity[] = [];
  for (const row of scopedRows) {
    const regionId = regionIdByCountryAdmin1.get(`${row.countryCode}|${row.admin1Code}`);
    if (!regionId) {
      continue;
    }
    const overlay = matchSimpleMaps(row, simpleMapsIndex);
    const qid = qids.get(row.geonameId);
    const enName = overlay?.cityAscii || row.asciiName || row.name;
    const names = resolveNames(qid, row.geonameId, enName);

    cities.push({
      id: row.geonameId,
      qid,
      name: overlay?.city || row.name,
      asciiName: enName,
      lat: row.lat,
      lng: row.lng,
      countryIso2: row.countryCode,
      regionId,
      population: row.population > 0 ? row.population : undefined,
      timezone: row.timezone || countryTz.get(row.countryCode) || '',
      featureCode: row.featureCode,
      capital: overlay?.capital ?? '',
      sameName: sameNameAscii.has(row.asciiName.toLowerCase()),
      names,
    });
  }

  // 6. LOCALIZE countries/regions (Wikidata → GeoNames alternates → EN).
  for (const country of countries) {
    country.names = resolveNames(qids.get(country.geonameId), country.geonameId, country.name);
  }
  for (const region of regions) {
    region.names = resolveNames(qids.get(region.geonameId), region.geonameId, region.name);
  }

  // 7. SNAPSHOT.
  const version = process.env.GEO_VERSION ?? new Date().toISOString().slice(0, 10);
  console.log(`[geo:sync] SNAPSHOT (version ${version}, ${cities.length} cities)…`);
  const snapshot = buildSnapshot({
    version,
    sources: {
      geonames: 'https://download.geonames.org/export/dump/ (CC BY 4.0)',
      simplemaps: 'https://simplemaps.com/data/world-cities (worldcities basic, CC BY 4.0)',
      wikidata: 'https://www.wikidata.org/ (CC0, SPARQL labels)',
    },
    countries,
    regions,
    cities,
  });
  writeSnapshot(snapshot);
  console.log('[geo:sync] done.');
}

/** Index alternate names + QIDs only for the target geonameIds (streaming). */
async function indexAlternateNamesFromFile(
  path: string,
  targetIds: Set<number>,
): Promise<{ names: Map<number, Record<string, string>>; qids: Map<number, string> }> {
  const names = new Map<number, Record<string, string>>();
  const qids = new Map<number, string>();
  await streamLines(path, (line) => {
    if (!line) {
      return;
    }
    const f = line.trim().split('\t');
    if (f.length < 4) {
      return;
    }
    const geonameId = Number(f[1]);
    if (!targetIds.has(geonameId)) {
      return;
    }
    const isoLanguage = f[2];
    const name = f[3];
    if (!name) {
      return;
    }
    if (isoLanguage === 'wkdt') {
      if (/^Q\d+$/.test(name) && !qids.has(geonameId)) {
        qids.set(geonameId, name);
      }
      return;
    }
    const entry = names.get(geonameId) ?? {};
    if (!entry[isoLanguage]) {
      entry[isoLanguage] = name;
      names.set(geonameId, entry);
    }
  });
  return { names, qids };
}

/** Parse a SimpleMaps CSV line (quoted CSV with RFC 4180 escaping). */
function parseCsvLine(line: string): string[] | null {
  if (!line) {
    return null;
  }
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

/** Parse a SimpleMaps CSV line into a typed row (11 columns). */
function parseSimpleMapsLine(line: string): SimpleMapsRow | null {
  const fields = parseCsvLine(line);
  if (!fields || fields.length < 11) {
    return null;
  }
  const lat = Number(fields[2]);
  const lng = Number(fields[3]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }
  return {
    city: fields[0],
    cityAscii: fields[1],
    lat,
    lng,
    country: fields[4],
    iso2: fields[5],
    iso3: fields[6],
    adminName: fields[7],
    capital: fields[8] as SimpleMapsRow['capital'],
    population: Number(fields[9] || '0'),
    id: fields[10],
  };
}

main().catch((err) => {
  console.error('[geo:sync] FAILED:', err);
  process.exit(1);
});
