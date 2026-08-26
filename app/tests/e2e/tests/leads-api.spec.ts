import { expect, test } from '@playwright/test';

import { leadsCsvHasEmail, leadsCsvHeader, leadsCsvRow } from './helpers';

/**
 * `POST /api/leads` contract coverage (spec §9.3), exercised directly against
 * the running dev server.
 *
 * Each test uses a unique `x-forwarded-for` IP so the route's per-IP rate
 * limiter (10/min) is isolated per test — the browser-driven signup-form
 * tests share a different bucket, so this suite never trips the browser flow.
 *
 * Story 3 (Expanded Signup): the route passively captures ip / locale /
 * userAgent / referrer / timestamp server-side, so these specs also assert the
 * expanded CSV schema and that a posted row contains the passive fields.
 */

let ipCounter = 10;

/**
 * Returns a fresh, unique client IP for one test. Includes a run timestamp so
 * the dev server's in-process rate-limit map (which survives server reuse
 * between runs) never collides with a previous run's synthetic IPs.
 */
function uniqueIp(): string {
  ipCounter += 1;
  const run = Date.now() % 100000;
  return `203.0.113.${run}.${ipCounter}`;
}

const PASSIVE_HEADERS = {
  'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8',
  'user-agent': 'JoinOrigin-E2E/1.0 (passive capture check)',
  referer: 'https://joinorigin.example/signup',
};

function postValid(email: string) {
  return {
    headers: {
      'x-forwarded-for': uniqueIp(),
      'content-type': 'application/json',
      ...PASSIVE_HEADERS,
    },
    data: { name: 'Ada Lovelace', email },
  };
}

test.describe('POST /api/leads', () => {
  test('returns 200 {ok:true} for a valid submission and appends a CSV row', async ({
    request,
  }) => {
    const email = `api.${Date.now()}@example.com`;
    const response = await request.post('/api/leads', postValid(email));

    expect(response.status()).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(leadsCsvHasEmail(email)).toBe(true);

    // Story 3 expanded schema: header + row carry the passive capture fields.
    expect(leadsCsvHeader()).toBe('timestamp,name,email,ip,locale,userAgent,referrer');
    const row = leadsCsvRow(email);
    expect(row).toBeDefined();
    expect(row).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z,/);
    expect(row).toContain('Ada Lovelace');
    expect(row).toContain(email.toLowerCase());
    expect(row).toContain('fr');
    expect(row).toContain('JoinOrigin-E2E/1.0');
    expect(row).toContain('https://joinorigin.example/signup');
  });

  test('passively captures a raw client IP on the CSV row', async ({ request }) => {
    const ip = '198.51.100.42';
    const email = `api.ip.${Date.now()}@example.com`;
    const response = await request.post('/api/leads', {
      headers: {
        'x-forwarded-for': ip,
        'content-type': 'application/json',
        ...PASSIVE_HEADERS,
      },
      data: { name: 'Ada Lovelace', email },
    });

    expect(response.status()).toBe(200);
    const row = leadsCsvRow(email);
    expect(row).toBeDefined();
    expect(row).toContain(email.toLowerCase()); // lowercased email matches needle
    expect(row).toContain(ip);
  });

  test('rejects a missing name with a field error', async ({ request }) => {
    const response = await request.post('/api/leads', {
      headers: {
        'x-forwarded-for': uniqueIp(),
        'content-type': 'application/json',
      },
      data: { name: '', email: 'ada@example.com' },
    });

    expect(response.status()).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: { field: 'name', message: 'Name is required.' },
    });
  });

  test('rejects an invalid email with a field error', async ({ request }) => {
    const response = await request.post('/api/leads', {
      headers: {
        'x-forwarded-for': uniqueIp(),
        'content-type': 'application/json',
      },
      data: { name: 'Ada', email: 'not-an-email' },
    });

    expect(response.status()).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: { field: 'email', message: 'Enter a valid email address.' },
    });
  });

  test('rejects a body over 10 KB with 413', async ({ request }) => {
    const response = await request.post('/api/leads', {
      headers: {
        'x-forwarded-for': uniqueIp(),
        'content-type': 'application/json',
      },
      data: { name: 'x'.repeat(11 * 1024), email: 'ada@example.com' },
    });

    expect(response.status()).toBe(413);
  });

  test('rejects non-JSON content-type with 400', async ({ request }) => {
    const response = await request.post('/api/leads', {
      headers: {
        'x-forwarded-for': uniqueIp(),
        'content-type': 'text/plain',
      },
      data: 'name=Ada&email=ada@example.com',
    });

    expect(response.status()).toBe(400);
  });

  test('rejects GET with 405 (POST-only)', async ({ request }) => {
    const response = await request.get('/api/leads', {
      headers: { 'x-forwarded-for': uniqueIp() },
    });

    expect(response.status()).toBe(405);
  });

  test('rate-limits the 11th rapid submission from one IP with 429', async ({ request }) => {
    const ip = uniqueIp();
    const statuses: number[] = [];

    // 11 rapid requests from the same IP; invalid bodies avoid CSV growth but
    // still count toward the rate limiter (it runs before validation).
    for (let i = 0; i < 11; i += 1) {
      const response = await request.post('/api/leads', {
        headers: {
          'x-forwarded-for': ip,
          'content-type': 'application/json',
        },
        data: { name: '', email: '' },
      });
      statuses.push(response.status());
    }

    // First 10 → validation 400; the 11th → 429.
    expect(statuses.slice(0, 10).every((status) => status === 400)).toBe(true);
    expect(statuses[10]).toBe(429);
  });
});
