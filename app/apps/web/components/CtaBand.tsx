'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import { useLocalizePath } from '../lib/seo/localePath';
import { ACCENT_GRADIENT } from './landingTokens';
import Reveal from './Reveal';
import RotatingBorderButton from './RotatingBorderButton';
import { useWaitlist } from './WaitlistModal/WaitlistModalProvider';

/**
 * Join CTA band (design spec sprint-8 §4.2) — rendered as the last child of
 * `<main>` on every menu page.
 *
 * Gradient-border panel (same CSS-mask technique as `RotatingBorderButton`):
 * 1px `ACCENT_GRADIENT` border, dark blurred surface, centered headline +
 * subline + CTA. The default CTA opens the shared waitlist modal; legal pages
 * (privacy/terms) pass `ctaOverride` to link to `/contact` instead.
 *
 * Semantics: a `section` with a visible `h2` headline keeps the `h1 → h2`
 * heading hierarchy on every page (spec §10.5).
 */

export interface CtaBandProps {
  /** Headline override (privacy/terms tighten to "Questions about Origin?"). */
  headline?: string;
  /** Subline override ("Our team replies within 2 business days."). */
  subline?: string;
  /** CTA label override ("Contact us"). */
  ctaLabel?: string;
}

const OVERRIDE_CTA_HREF = '/contact';

const Band = styled.section`
  max-width: 880px;
  margin: 64px auto 64px;
  padding: 16px 24px;
`;

/** Gradient-border panel (mask technique mirrored from RotatingBorderButton). */
const Panel = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.lg}px;
  padding: 40px 32px;
  text-align: center;
  background: rgba(20, 29, 60, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    padding: 1px;
    border-radius: inherit;
    background: ${ACCENT_GRADIENT};
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const Headline = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm}px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.heading}px;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.colors.text};
`;

const Subline = styled.p`
  margin: 0 auto ${({ theme }) => theme.spacing.lg}px;
  max-width: 480px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** Gradient pill used for the contact-override CTA (links to /contact). */
const ContactLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 28px;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  background: ${ACCENT_GRADIENT};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.primaryContrast};
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(93, 124, 255, 0.35);
  }
`;

export function CtaBand({ headline, subline, ctaLabel }: CtaBandProps) {
  const { openWaitlist } = useWaitlist();
  const { t } = useI18n();
  const localizePath = useLocalizePath();
  const isOverride = Boolean(headline || subline || ctaLabel);

  const bandHeadline = headline ?? t('ctaBand.headline');
  const bandSubline = subline ?? t('ctaBand.subline');

  return (
    <Band data-testid="cta-band">
      <Reveal>
        <Panel>
          <Headline>{bandHeadline}</Headline>
          <Subline>{bandSubline}</Subline>
          {isOverride ? (
            <ContactLink href={localizePath(OVERRIDE_CTA_HREF)} data-testid="cta-band-contact-link">
              {ctaLabel ?? t('ctaBand.contactLabel')}
            </ContactLink>
          ) : (
            <RotatingBorderButton
              label={ctaLabel ?? t('ctaBand.joinLabel')}
              fillDirection="left"
              onClick={(event) => openWaitlist(event.currentTarget)}
              testID="cta-band-join-button"
            />
          )}
        </Panel>
      </Reveal>
    </Band>
  );
}

export default CtaBand;
