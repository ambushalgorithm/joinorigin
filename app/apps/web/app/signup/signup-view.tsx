'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';
import { LoadingIndicator } from '@joinorigin/ui';

import MenuPageShell from '../../components/MenuPageShell';
import {
  localizedErrorKey,
  submitLead,
  type LeadErrorField,
} from '../../components/WaitlistModal/leadsApi';

/**
 * Signup view (Sprint 24 Story C, TASK-555) — the shared `/signup` screen.
 *
 * SSR contract: the initial server-rendered HTML is a clean, indexable
 * signup/login screen — heading `signup.heading` ("Create your account"),
 * subcopy `signup.subcopy`, and a semantic name + email form posting to
 * `POST /api/leads` with submit "Get Started". NO waitlist or in-development
 * language exists in that HTML (crawlers see a normal account-creation page).
 *
 * Hydration swap (JS-only): after mount the heading/subcopy swap to the
 * `signup.waitlist.*` variants ("Join the waitlist") and the in-development
 * disclosure (`signup.waitlist.disclosure`) is revealed — the ONLY place
 * development status is shown on the site. `hydrated` starts `false` on the
 * server AND on the first client render (no hydration mismatch), then flips
 * in an effect.
 *
 * i18n (arch-i18n §7.2): all copy reads the active locale dictionary; server
 * error messages are mapped through `localizedErrorKey` (from the shared
 * `leadsApi`) and rebased onto the `signup.errors.*` namespace (the
 * waitlist/signup error keys are identical content, verified across all 21
 * locales). Form validation mirrors the `/api/leads` contract client-side.
 */

type FormStatus = 'idle' | 'submitting' | 'success';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX_LENGTH = 120;

/** Server message → `signup.errors.*` locale key (reuses the shared map). */
function signupErrorKey(message: string): string {
  return localizedErrorKey(message).replace(/^waitlist\./, 'signup.');
}

const SignupCanvas = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.md}px
    ${({ theme }) => theme.spacing.xxl}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding: ${({ theme }) => theme.spacing.xxl}px ${({ theme }) => theme.spacing.lg}px
      ${({ theme }) => theme.spacing.xxl}px;
  }
`;

const Panel = styled.section`
  width: 100%;
  max-width: 440px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  padding: 32px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
`;

const Heading = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 28px;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.text};
`;

const Subcopy = styled.p`
  margin: ${({ theme }) => theme.spacing.sm}px 0 0;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 15px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Disclosure = styled.p`
  margin: ${({ theme }) => theme.spacing.md}px 0 0;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border: 1px solid rgba(138, 180, 255, 0.25);
  background: ${({ theme }) => theme.colors.surfaceElevated};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const FieldLabel = styled.label`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Input = styled.input<{ $invalid: boolean }>`
  height: 48px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.destructive : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 125, 249, 0.25);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const FieldError = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.destructive};
`;

const ErrorBanner = styled.div`
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border: 1px solid ${({ theme }) => theme.colors.destructive};
  background: ${({ theme }) => theme.colors.destructiveSoft};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:hover:not(:disabled),
  &:focus-visible {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const LegalNote = styled.p`
  margin: ${({ theme }) => theme.spacing.md}px 0 0;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const SuccessContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg}px 0;
`;

const SuccessHeading = styled.h2`
  margin: ${({ theme }) => theme.spacing.sm}px 0 0;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.text};
`;

const SuccessCopy = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 15px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const DoneButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export function SignupView() {
  const { t } = useI18n();
  // SSR + first client render stay on the clean signup copy; the effect
  // flips `hydrated` after mount → waitlist variants + disclosure appear
  // (JS-only swap, never in the initial HTML).
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<LeadErrorField, string>>>({});
  const [topError, setTopError] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const heading = hydrated ? t('signup.waitlist.heading') : t('signup.heading');
  const subcopy = hydrated ? t('signup.waitlist.subcopy') : t('signup.subcopy');

  const reset = () => {
    setStatus('idle');
    setName('');
    setEmail('');
    setFieldErrors({});
    setTopError(null);
  };

  /** Client-side mirror of the `/api/leads` validation contract. */
  const validate = (): Partial<Record<LeadErrorField, string>> => {
    const errors: Partial<Record<LeadErrorField, string>> = {};
    const trimmedName = name.trim();
    if (!trimmedName) {
      errors.name = t('signup.errors.nameRequired');
    } else if (trimmedName.length > NAME_MAX_LENGTH) {
      errors.name = t('signup.errors.nameTooLong');
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = t('signup.errors.emailInvalid');
    }
    return errors;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTopError(null);
    setFieldErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }
    setStatus('submitting');

    try {
      await submitLead({ name: name.trim(), email: email.trim() });
      setStatus('success');
    } catch (error) {
      setStatus('idle');
      if (error instanceof Error && 'field' in error) {
        const leadError = error as { field: LeadErrorField; message: string };
        const message = t(signupErrorKey(leadError.message));
        if (leadError.field === 'form') {
          setTopError(message);
        } else {
          setFieldErrors((prev) => ({ ...prev, [leadError.field]: message }));
        }
      } else {
        setTopError(t('signup.errors.generic'));
      }
    }
  };

  return (
    <MenuPageShell showCtaBand={false} banded={false}>
      <SignupCanvas>
        <Panel data-testid="signup-panel">
          {status === 'success' ? (
            <>
              <SuccessContent>
                <SuccessHeading>{t('signup.successHeading')}</SuccessHeading>
                <SuccessCopy>{t('signup.successCopy')}</SuccessCopy>
              </SuccessContent>
              <DoneButton type="button" onClick={reset} data-testid="signup-done">
                {t('signup.done')}
              </DoneButton>
            </>
          ) : (
            <>
              <Heading data-testid="signup-heading">{heading}</Heading>
              <Subcopy data-testid="signup-subcopy">{subcopy}</Subcopy>
              {hydrated ? (
                <Disclosure role="note" data-testid="signup-disclosure">
                  {t('signup.waitlist.disclosure')}
                </Disclosure>
              ) : null}

              <Form onSubmit={submit} noValidate data-testid="signup-form">
                <Field>
                  <FieldLabel htmlFor="waitlist-name">{t('signup.nameLabel')}</FieldLabel>
                  <Input
                    id="waitlist-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder={t('signup.namePlaceholder')}
                    autoComplete="name"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'signup-name-error' : undefined}
                    $invalid={Boolean(fieldErrors.name)}
                    data-testid="signup-name-input"
                  />
                  {fieldErrors.name ? (
                    <FieldError id="signup-name-error" role="alert">
                      {fieldErrors.name}
                    </FieldError>
                  ) : null}
                </Field>

                <Field>
                  <FieldLabel htmlFor="waitlist-email">{t('signup.emailLabel')}</FieldLabel>
                  <Input
                    id="waitlist-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={t('signup.emailPlaceholder')}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'signup-email-error' : undefined}
                    $invalid={Boolean(fieldErrors.email)}
                    data-testid="signup-email-input"
                  />
                  {fieldErrors.email ? (
                    <FieldError id="signup-email-error" role="alert">
                      {fieldErrors.email}
                    </FieldError>
                  ) : null}
                </Field>

                {topError ? (
                  <ErrorBanner role="alert" aria-live="assertive" data-testid="signup-top-error">
                    {topError}
                  </ErrorBanner>
                ) : null}

                <SubmitButton
                  type="submit"
                  disabled={status === 'submitting'}
                  data-testid="signup-submit"
                >
                  {status === 'submitting' ? (
                    <LoadingIndicator label={t('signup.submitting')} />
                  ) : (
                    t('signup.submit')
                  )}
                </SubmitButton>
              </Form>

              <LegalNote>{t('signup.legalNote')}</LegalNote>
            </>
          )}
        </Panel>
      </SignupCanvas>
    </MenuPageShell>
  );
}

export default SignupView;
