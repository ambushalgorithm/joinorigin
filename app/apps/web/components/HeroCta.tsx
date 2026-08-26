'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { useLocalizePath } from '../lib/seo/localePath';
import RotatingBorderButton from './RotatingBorderButton';

/**
 * Hero-level join CTA (spec sprint-10-menu-redesign §4.3).
 *
 * - `waitlist` variant: the shared `RotatingBorderButton` ("Get Started",
 *   `size="large"`, `fillDirection="left"`) rendered as a real link to the
 *   locale-prefixed `/signup` route (Sprint 24, TASK-556 — the waitlist modal
 *   is retired). `testID="hero-join-button"`.
 * - `contact` variant: a muted ghost link to `/contact` (legal pages never
 *   open the waitlist modal). `testID="hero-contact-link"`.
 *
 * Semantics: both variants are real anchors. No headings are rendered.
 */

export interface HeroCtaProps {
  variant: 'waitlist' | 'contact';
  label: string;
  /** Only used for the contact variant (defaults to the contact page). */
  href?: string;
}

/** Muted ghost link used on legal pages (spec §4.3). */
const ContactLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  padding: 0 24px;
  border: 1px solid rgba(138, 180, 255, 0.35);
  border-radius: ${({ theme }) => theme.radius.pill}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text};
    border-color: rgba(79, 125, 249, 0.6);
  }
`;

export function HeroCta({ variant, label, href = '/contact' }: HeroCtaProps) {
  const localizePath = useLocalizePath();

  if (variant === 'contact') {
    return (
      <ContactLink href={localizePath(href)} data-testid="hero-contact-link">
        {label}
      </ContactLink>
    );
  }

  return (
    <RotatingBorderButton
      label={label}
      size="large"
      fillDirection="left"
      href={localizePath('/signup')}
      testID="hero-join-button"
    />
  );
}

export default HeroCta;
