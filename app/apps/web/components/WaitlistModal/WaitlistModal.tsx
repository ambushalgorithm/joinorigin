'use client';

import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { useI18n } from '@joinorigin/i18n';
import { colors } from '@joinorigin/design';
import { LoadingIndicator } from '@joinorigin/ui';

import { LeadErrorField, localizedErrorKey, submitLead } from './leadsApi';

/**
 * Waitlist modal (spec §9.2).
 *
 * Dialog rendered once at page level by `WaitlistModalProvider`. States:
 * Idle → Submitting → Success, with inline field errors and a top-level error
 * banner on failure. Supports ESC / backdrop / ✕ close, focus trap, focus
 * return to the trigger, and a11y attributes.
 *
 * i18n (arch-i18n §7.2): all copy is localized; server error messages are
 * mapped to locale keys via `localizedErrorKey`.
 */

type ModalStatus = 'idle' | 'submitting' | 'success';

export interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
  /** Element that opened the modal — focus is restored to it on close (spec §9.2). */
  trigger?: HTMLElement | null;
}

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme }) => theme.colors.scrim};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  padding: 32px;
  animation: ${scaleIn} 250ms ease-out;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  inset-inline-end: 16px;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surfaceElevated};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Heading = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.text};
`;

const Subcopy = styled.p`
  margin: ${({ theme }) => theme.spacing.sm}px 0 0;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 15px;
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
  margin-top: ${({ theme }) => theme.spacing.md}px;
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

const SuccessIcon = (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="22" stroke={colors.success} strokeWidth="2" />
    <path
      d="M14 24.5l7 7 13-14"
      stroke={colors.success}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

export function WaitlistModal({ open, onClose, trigger }: WaitlistModalProps) {
  const { t } = useI18n();
  const [status, setStatus] = useState<ModalStatus>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<LeadErrorField, string>>>({});
  const [topError, setTopError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const wasOpenRef = useRef(false);

  // Reset content on every open.
  useEffect(() => {
    if (open) {
      setStatus('idle');
      setName('');
      setEmail('');
      setFieldErrors({});
      setTopError(null);
    }
  }, [open]);

  // Focus the first field when opened.
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const frame = requestAnimationFrame(() => firstFieldRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  // Restore focus to the trigger on every close path (ESC, backdrop, ✕, Done).
  // All close paths converge on `onClose` → `open=false`, so this single
  // transition hook covers them (spec §9.2: "returns to trigger on close").
  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        const frame = requestAnimationFrame(() => {
          if (trigger && trigger.isConnected && typeof trigger.focus === 'function') {
            trigger.focus();
          }
        });
        wasOpenRef.current = false;
        return () => cancelAnimationFrame(frame);
      }
      return undefined;
    }
    wasOpenRef.current = true;
    return undefined;
  }, [open, trigger]);

  // ESC + focus trap while open.
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !cardRef.current) {
        return;
      }
      const focusables = Array.from(
        cardRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusables.length === 0) {
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTopError(null);
    setFieldErrors({});
    setStatus('submitting');

    try {
      await submitLead({ name, email });
      setStatus('success');
    } catch (error) {
      setStatus('idle');
      if (error instanceof Error && 'field' in error) {
        const leadError = error as { field: LeadErrorField; message: string };
        const message = t(localizedErrorKey(leadError.message));
        if (leadError.field === 'form') {
          setTopError(message);
        } else {
          setFieldErrors((prev) => ({ ...prev, [leadError.field]: message }));
        }
      } else {
        setTopError(t('waitlist.errors.generic'));
      }
    }
  };

  const close = () => {
    setStatus('idle');
    onClose();
  };

  return (
    <Backdrop
      onPointerDown={(event) => event.target === event.currentTarget && close()}
      data-testid="waitlist-backdrop"
    >
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-modal-heading"
        ref={cardRef}
        data-testid="waitlist-modal"
      >
        <CloseButton
          type="button"
          aria-label={t('waitlist.close')}
          onClick={close}
          data-testid="waitlist-modal-close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </CloseButton>

        {status === 'success' ? (
          <>
            <SuccessContent>
              {SuccessIcon}
              <SuccessHeading>{t('waitlist.successHeading')}</SuccessHeading>
              <SuccessCopy>{t('waitlist.successCopy')}</SuccessCopy>
            </SuccessContent>
            <DoneButton type="button" onClick={close} data-testid="waitlist-done">
              {t('waitlist.done')}
            </DoneButton>
          </>
        ) : (
          <>
            <Heading id="waitlist-modal-heading">{t('waitlist.heading')}</Heading>
            <Subcopy>{t('waitlist.subcopy')}</Subcopy>

            <Form onSubmit={submit} noValidate data-testid="waitlist-form">
              <Field>
                <FieldLabel htmlFor="waitlist-name">{t('waitlist.nameLabel')}</FieldLabel>
                <Input
                  id="waitlist-name"
                  ref={firstFieldRef}
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t('waitlist.namePlaceholder')}
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? 'waitlist-name-error' : undefined}
                  $invalid={Boolean(fieldErrors.name)}
                  data-testid="waitlist-name-input"
                />
                {fieldErrors.name ? (
                  <FieldError id="waitlist-name-error" role="alert">
                    {fieldErrors.name}
                  </FieldError>
                ) : null}
              </Field>

              <Field>
                <FieldLabel htmlFor="waitlist-email">{t('waitlist.emailLabel')}</FieldLabel>
                <Input
                  id="waitlist-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t('waitlist.emailPlaceholder')}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'waitlist-email-error' : undefined}
                  $invalid={Boolean(fieldErrors.email)}
                  data-testid="waitlist-email-input"
                />
                {fieldErrors.email ? (
                  <FieldError id="waitlist-email-error" role="alert">
                    {fieldErrors.email}
                  </FieldError>
                ) : null}
              </Field>

              {topError ? (
                <ErrorBanner role="alert" aria-live="assertive" data-testid="waitlist-top-error">
                  {topError}
                </ErrorBanner>
              ) : null}

              <SubmitButton
                type="submit"
                disabled={status === 'submitting'}
                data-testid="waitlist-submit"
              >
                {status === 'submitting' ? (
                  <LoadingIndicator label={t('waitlist.submitting')} />
                ) : (
                  t('waitlist.submit')
                )}
              </SubmitButton>
            </Form>

            <LegalNote>{t('waitlist.legalNote')}</LegalNote>
          </>
        )}
      </Card>
    </Backdrop>
  );
}

export default WaitlistModal;
