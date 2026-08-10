/**
 * @jest-environment node
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { NextRequest } from 'next/server';

/**
 * Unit tests for POST /api/leads against a temp CSV file.
 * The module reads `process.env.LEADS_CSV_PATH` at import time, so each test
 * resets the module to get a fresh rate-limit map and write queue.
 */

let csvPath: string;

type RouteModule = typeof import('./route');

function loadRoute(): RouteModule {
  jest.resetModules();
  return require('./route') as RouteModule;
}

function post(
  route: RouteModule,
  body: unknown,
  options: { contentType?: string; ip?: string } = {},
) {
  const headers: Record<string, string> = {};
  if (options.contentType !== null) {
    headers['content-type'] = options.contentType ?? 'application/json';
  }
  if (options.ip) {
    headers['x-forwarded-for'] = options.ip;
  }
  const request = new NextRequest('http://localhost/api/leads', {
    method: 'POST',
    headers,
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
  return route.POST(request);
}

describe('POST /api/leads', () => {
  beforeAll(() => {
    csvPath = path.join(os.tmpdir(), `jo-leads-test-${process.pid}.csv`);
    process.env.LEADS_CSV_PATH = csvPath;
  });

  afterAll(() => {
    if (fs.existsSync(csvPath)) {
      fs.rmSync(csvPath, { force: true });
    }
    delete process.env.LEADS_CSV_PATH;
  });

  beforeEach(() => {
    if (fs.existsSync(csvPath)) {
      fs.rmSync(csvPath, { force: true });
    }
  });

  it('appends a valid lead to the CSV with header row and 200 response', async () => {
    const route = loadRoute();
    const response = await post(route, { name: 'Ada Lovelace', email: 'Ada@Example.com' });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });

    const contents = fs.readFileSync(csvPath, 'utf8').trim().split('\n');
    expect(contents[0]).toBe('timestamp,name,email');
    expect(contents).toHaveLength(2);
    // Email is lowercased; timestamp is ISO-8601 UTC.
    expect(contents[1]).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z,Ada Lovelace,ada@example\.com$/,
    );
  });

  it('creates the CSV file with a header row when missing', async () => {
    const route = loadRoute();
    await post(route, { name: 'Grace Hopper', email: 'grace@example.com' });

    const contents = fs.readFileSync(csvPath, 'utf8').trim().split('\n');
    expect(contents[0]).toBe('timestamp,name,email');
    expect(contents).toHaveLength(2);
  });

  it('quotes fields per RFC 4180 when they contain commas or quotes', async () => {
    const route = loadRoute();
    await post(route, { name: 'Ada, Countess of Lovelace', email: 'ada@example.com' });

    const contents = fs.readFileSync(csvPath, 'utf8');
    expect(contents).toContain('"Ada, Countess of Lovelace",ada@example.com');
  });

  it('rejects an invalid email with a field error', async () => {
    const route = loadRoute();
    const response = await post(route, { name: 'Ada', email: 'not-an-email' });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: { field: 'email', message: 'Enter a valid email address.' },
    });
  });

  it('rejects a missing name with a field error', async () => {
    const route = loadRoute();
    const response = await post(route, { name: '', email: 'ada@example.com' });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: { field: 'name', message: 'Name is required.' },
    });
  });

  it('rejects a body over 10 KB', async () => {
    const route = loadRoute();
    const response = await post(
      route,
      { name: 'x'.repeat(11 * 1024), email: 'ada@example.com' },
      { contentType: 'application/json' },
    );

    expect(response.status).toBe(413);
  });

  it('rejects malformed JSON with a form error', async () => {
    const route = loadRoute();
    const response = await post(route, '{not json', { contentType: 'application/json' });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: { field: 'form', message: 'Invalid JSON body.' },
    });
  });

  it('rejects requests without application/json content type', async () => {
    const route = loadRoute();
    const response = await post(
      route,
      { name: 'Ada', email: 'ada@example.com' },
      { contentType: 'text/plain' },
    );

    expect(response.status).toBe(400);
  });

  it('rate-limits at 10 submissions per IP per minute', async () => {
    const route = loadRoute();

    for (let i = 0; i < 10; i += 1) {
      const response = await post(
        route,
        { name: `User ${i}`, email: `user${i}@example.com` },
        { ip: '203.0.113.7' },
      );
      expect(response.status).toBe(200);
    }

    const limited = await post(
      route,
      { name: 'Too Many', email: 'many@example.com' },
      { ip: '203.0.113.7' },
    );
    expect(limited.status).toBe(429);
  });

  it('returns 405 for GET', async () => {
    const route = loadRoute();
    const response = await route.GET();

    expect(response.status).toBe(405);
  });
});
