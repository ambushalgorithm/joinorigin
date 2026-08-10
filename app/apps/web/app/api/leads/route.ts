import fs from 'node:fs/promises';
import path from 'node:path';

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/leads — waitlist capture (spec §9.3).
 *
 * Validates `{ name, email }`, then appends one RFC 4180-quoted CSV row to
 * `apps/web/data/leads.csv` (created with a header row on first write).
 *
 * Guards: POST-only (405), `Content-Type: application/json` (400 on missing),
 * JSON parse errors (400), body > 10 KB (413), per-IP rate limit of 10
 * submissions/minute (429), and CSV write failures mapped to a generic 500.
 * Appends are serialized through an in-process promise queue to avoid
 * interleaved writes.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX_LENGTH = 120;
const MAX_BODY_BYTES = 10 * 1024;
const MAX_SUBMISSIONS_PER_MINUTE = 10;
const RATE_WINDOW_MS = 60_000;
const CSV_HEADER = 'timestamp,name,email';

const CSV_PATH = process.env.LEADS_CSV_PATH ?? path.join(process.cwd(), 'data', 'leads.csv');

/** Serialized write queue so concurrent submissions never interleave rows. */
let writeQueue: Promise<void> = Promise.resolve();

/** Simple in-process rate limiter keyed by client IP. */
const rateMap = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= MAX_SUBMISSIONS_PER_MINUTE) {
    rateMap.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateMap.set(ip, recent);
  return false;
}

/** RFC 4180 quoting: fields with `,`, `"` or newlines are quoted, `"` doubled. */
function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

async function ensureHeaderRow(): Promise<void> {
  try {
    await fs.access(CSV_PATH);
  } catch {
    await fs.mkdir(path.dirname(CSV_PATH), { recursive: true });
    await fs.appendFile(CSV_PATH, `${CSV_HEADER}\n`, 'utf8');
  }
}

function appendRow(row: string): Promise<void> {
  writeQueue = writeQueue
    .catch(() => undefined)
    .then(async () => {
      await ensureHeaderRow();
      await fs.appendFile(CSV_PATH, row, 'utf8');
    });
  return writeQueue;
}

function jsonError(field: 'name' | 'email' | 'form', message: string, status: number) {
  return NextResponse.json({ ok: false, error: { field, message } }, { status });
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return jsonError('form', 'Too many requests. Try again in a minute.', 429);
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return jsonError('form', 'Content-Type must be application/json.', 400);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonError('form', 'Could not read request body.', 400);
  }

  if (rawBody.length > MAX_BODY_BYTES) {
    return jsonError('form', 'Request body too large.', 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonError('form', 'Invalid JSON body.', 400);
  }

  const record = (typeof body === 'object' && body !== null ? body : {}) as Record<string, unknown>;
  const rawName = typeof record.name === 'string' ? record.name.trim() : '';
  const rawEmail = typeof record.email === 'string' ? record.email.trim() : '';

  if (!rawName && !rawEmail) {
    return jsonError('form', 'Name and email are required.', 400);
  }
  if (!rawName || rawName.length > NAME_MAX_LENGTH) {
    return jsonError(
      'name',
      rawName ? 'Name must be 120 characters or fewer.' : 'Name is required.',
      400,
    );
  }
  if (!EMAIL_REGEX.test(rawEmail)) {
    return jsonError('email', 'Enter a valid email address.', 400);
  }

  const timestamp = new Date().toISOString();
  const email = rawEmail.toLowerCase();
  const row = `${timestamp},${csvEscape(rawName)},${csvEscape(email)}\n`;

  try {
    await appendRow(row);
  } catch {
    return jsonError('form', 'Something went wrong.', 500);
  }

  return NextResponse.json({ ok: true });
}

/** Explicit 405 for non-POST methods (spec §9.3 request guards). */
export async function GET() {
  return jsonError('form', 'Method not allowed.', 405);
}

export const runtime = 'nodejs';
