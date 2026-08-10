/**
 * Typed fetch wrapper for `POST /api/leads` (spec §9.3).
 *
 * The API route appends `name` + `email` submissions to `apps/web/data/leads.csv`
 * and returns `200 { ok: true }` on success. Field-level validation errors come
 * back as `400 { ok: false, error: { field, message } }`; rate limits as 429
 * and server failures as 500 (both with `field: "form"`).
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
