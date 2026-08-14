/**
 * Key-parity validator (arch-i18n §5) — the translator CI gate.
 *
 * Every locale JSON must:
 *  1. Parse as valid JSON.
 *  2. Carry the reserved top-level `dir` metadata key ('ltr' | 'rtl').
 *  3. Mirror `en.json`'s flattened key set EXACTLY (missing/extra = failure,
 *     ignoring the `dir` *value* but still asserting the key exists).
 *
 * Usage: pnpm --filter @joinorigin/i18n check-keys
 * Exit code 0 = all locales valid; 1 = violations found.
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const LOCALES_DIR = join(__dirname, '..', 'locales');

interface FlattenResult {
  keys: Set<string>;
  dir?: string;
}

function flatten(
  obj: Record<string, unknown>,
  prefix = '',
  keys: Set<string> = new Set(),
): Set<string> {
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flatten(value as Record<string, unknown>, full, keys);
    } else {
      keys.add(full);
    }
  }
  return keys;
}

function loadFlattened(file: string): FlattenResult {
  const raw = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
  const keys = flatten(raw);
  const dir = typeof raw.dir === 'string' ? (raw.dir as string) : undefined;
  return { keys, dir };
}

function main(): void {
  const files = readdirSync(LOCALES_DIR)
    .filter((file) => file.endsWith('.json'))
    .sort();

  const enFile = join(LOCALES_DIR, 'en.json');
  const en = loadFlattened(enFile);
  const enKeys = en.keys;
  let failures = 0;

  // TASK-310: the SEO chrome namespace must exist in the EN source of truth.
  // The exact-parity loop below propagates it to every locale automatically,
  // but this guard makes an accidental wholesale removal impossible.
  const enRaw = JSON.parse(readFileSync(enFile, 'utf8')) as Record<string, unknown>;
  if (!enRaw.seoContent || typeof enRaw.seoContent !== 'object') {
    console.error('✗ en.json: missing "seoContent" namespace (SEO chrome — TASK-310)');
    failures += 1;
  }

  for (const file of files) {
    const localeName = file.replace(/\.json$/, '');
    let result: FlattenResult;
    try {
      result = loadFlattened(join(LOCALES_DIR, file));
    } catch (error) {
      console.error(`✗ ${localeName}: invalid JSON (${(error as Error).message})`);
      failures += 1;
      continue;
    }

    if (result.dir !== 'ltr' && result.dir !== 'rtl') {
      console.error(`✗ ${localeName}: missing/invalid top-level "dir" (got ${String(result.dir)})`);
      failures += 1;
    }
    if (localeName === 'ar' || localeName === 'fa') {
      if (result.dir !== 'rtl') {
        console.error(`✗ ${localeName}: dir must be "rtl"`);
        failures += 1;
      }
    }

    const missing = [...enKeys].filter((key) => !result.keys.has(key));
    const extra = [...result.keys].filter((key) => !enKeys.has(key));
    if (missing.length > 0 || extra.length > 0) {
      console.error(`✗ ${localeName}: key parity broken`);
      if (missing.length > 0) {
        console.error(`    missing: ${missing.slice(0, 10).join(', ')}`);
      }
      if (extra.length > 0) {
        console.error(`    extra: ${extra.slice(0, 10).join(', ')}`);
      }
      failures += 1;
    } else {
      console.log(`✓ ${localeName}: ${result.keys.size} keys, dir=${result.dir} (parity OK)`);
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} locale(s) failed key parity.`);
    process.exit(1);
  }
  console.log(`\nAll ${files.length} locales pass key parity against en.json.`);
}

main();
