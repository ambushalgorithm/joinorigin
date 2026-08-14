/**
 * Download step (design §5.3).
 *
 * Fetches the GeoNames dump files + SimpleMaps Basic CSV into a cache dir
 * (default `apps/web/scripts/geodata/.cache/`, gitignored). Re-runs reuse
 * cached files unless `--fresh` forces a re-download.
 */

import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { createUnzip } from 'node:zlib';
import { fetch } from 'undici';

import {
  DEFAULT_CACHE_DIR,
  DOWNLOAD_USER_AGENT,
  GEONAMES_FILES,
  SIMPLEMAPS_CSV_NAME,
  SIMPLEMAPS_WORLDCITIES_URL,
} from './config';

export interface DownloadResult {
  cacheDir: string;
  /** Absolute paths of downloaded files. */
  files: Record<string, string>;
}

async function download(url: string, dest: string, headers: Record<string, string> = {}) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': DOWNLOAD_USER_AGENT,
      'Accept-Language': 'en-US,en;q=0.9',
      ...headers,
    },
    redirect: 'follow',
  });
  if (!res.ok || !res.body) {
    throw new Error(`download failed ${url}: HTTP ${res.status}`);
  }
  await pipeline(Readable.fromWeb(res.body as never), createWriteStream(dest));
}

async function downloadZipped(
  url: string,
  destZip: string,
  destFile: string,
  headers: Record<string, string> = {},
) {
  await download(url, destZip, headers);
  await pipeline(createReadStream(destZip), createUnzip(), createWriteStream(destFile));
}

/**
 * Ensure all source files are present in `cacheDir` (downloading missing
 * ones). Returns absolute paths keyed by the canonical file names used by
 * later steps: cities500, countryInfo, admin1CodesASCII, timeZones,
 * alternateNamesV2, worldcities.csv.
 */
export async function ensureSources(
  cacheDir: string = DEFAULT_CACHE_DIR,
  fresh = false,
): Promise<DownloadResult> {
  mkdirSync(cacheDir, { recursive: true });

  const zip = (name: string) => join(cacheDir, name);
  const out = (name: string) => join(cacheDir, name);

  // GeoNames zipped files → unzip to the same basename (cities500.txt etc.).
  const files: Record<string, string> = {};

  // cities500.zip → cities500.txt
  if (fresh || !existsSync(out('cities500.txt'))) {
    await downloadZipped(GEONAMES_FILES.cities500, zip('cities500.zip'), out('cities500.txt'));
  }
  files.cities500 = out('cities500.txt');

  // alternateNamesV2.zip → alternateNamesV2.txt
  if (fresh || !existsSync(out('alternateNamesV2.txt'))) {
    await downloadZipped(
      GEONAMES_FILES.alternateNamesV2,
      zip('alternateNamesV2.zip'),
      out('alternateNamesV2.txt'),
    );
  }
  files.alternateNamesV2 = out('alternateNamesV2.txt');

  // Plain text files.
  for (const [name, url] of [
    ['countryInfo', GEONAMES_FILES.countryInfo],
    ['admin1CodesASCII', GEONAMES_FILES.admin1CodesASCII],
    ['timeZones', GEONAMES_FILES.timeZones],
  ] as const) {
    if (fresh || !existsSync(out(`${name}.txt`))) {
      await download(url, out(`${name}.txt`));
    }
    files[name] = out(`${name}.txt`);
  }

  // SimpleMaps worldcities.csv (inside a zip).
  if (fresh || !existsSync(out(SIMPLEMAPS_CSV_NAME))) {
    const zipPath = zip(basename(SIMPLEMAPS_WORLDCITIES_URL));
    await downloadZipped(SIMPLEMAPS_WORLDCITIES_URL, zipPath, out(SIMPLEMAPS_CSV_NAME), {
      Referer: 'https://simplemaps.com/data/world-cities',
    });
  }
  files.simplemaps = out(SIMPLEMAPS_CSV_NAME);

  return { cacheDir, files };
}

/** Clear the source cache (used by `--fresh`). */
export async function clearCache(cacheDir: string = DEFAULT_CACHE_DIR) {
  await rm(cacheDir, { recursive: true, force: true });
  mkdirSync(cacheDir, { recursive: true });
}
