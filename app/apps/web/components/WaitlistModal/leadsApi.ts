/**
 * Typed fetch wrapper for `POST /api/leads` (spec §9.3).
 *
 * The API route appends `name` + `email` submissions to `apps/web/data/leads.csv`
 * and returns `200 { ok: true }` on success. Field-level validation errors come
 * back as `400 { ok: false, error: { field, message } }`; rate limits as 429
 * and server failures as 500 (both with `field: "form"`).
 *
 * i18n (arch-i18n §7.2): the API route stays English (out of scope); the
 * finite set of server messages is mapped to localized keys client-side via
 * `localizedErrorKey`, so the modal renders `t(key)` instead of the raw
 * English message.
 */

export interface SubmitLeadInput {
  name: string;
  email: string;
}

export type LeadErrorField = 'name' | 'email' | 'form';

export interface LeadErrorPayload {
  field: LeadErrorField;
  message: string;
}

/** Server message → locale key mapping (arch-i18n §7.2 table). */
const SERVER_MESSAGE_KEYS: Record<string, string> = {
  'Something went wrong. Please try again.': 'waitlist.errors.generic',
  'Name and email are required.': 'waitlist.errors.nameEmailRequired',
  'Name is required.': 'waitlist.errors.nameRequired',
  'Name must be 120 characters or fewer.': 'waitlist.errors.nameTooLong',
  'Enter a valid email address.': 'waitlist.errors.emailInvalid',
  'Too many requests. Try again in a minute.': 'waitlist.errors.rateLimited',
};

/** Map an API/network error message to its localized dictionary key. */
export function localizedErrorKey(message: string): string {
  return SERVER_MESSAGE_KEYS[message] ?? 'waitlist.errors.generic';
}

export class LeadSubmitError extends Error {
  readonly field: LeadErrorField;

  constructor(field: LeadErrorField, message: string) {
    super(message);
    this.name = 'LeadSubmitError';
    this.field = field;
  }
}

export async function submitLead(input: SubmitLeadInput): Promise<void> {
  let response: Response;
  try {
    response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  } catch {
    throw new LeadSubmitError('form', 'Something went wrong. Please try again.');
  }

  const payload = (await response.json().catch(() => null)) as {
    ok?: boolean;
    error?: LeadErrorPayload;
  } | null;

  if (!response.ok || !payload?.ok) {
    const error = payload?.error;
    throw new LeadSubmitError(
      error?.field ?? 'form',
      error?.message ?? 'Something went wrong. Please try again.',
    );
  }
}

export default submitLead;
