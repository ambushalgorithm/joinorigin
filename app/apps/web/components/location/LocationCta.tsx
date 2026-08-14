'use client';

import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import { trackEvent } from '../../lib/analytics';
import { ACCENT_GRADIENT } from '../landingTokens';
import Reveal from '../Reveal';
import RotatingBorderButton from '../RotatingBorderButton';
import { useWaitlist } from '../WaitlistModal/WaitlistModalProvider';

/**
 * Location-page waitlist CTA band (design §6.4 #7, §8.4).
 *
 * Mirrors the shared `CtaBand` visuals but is wired to the location-page
 * analytics contract: clicking the join button fires
 * `trackEvent('signup_click', { source: 'location-…' })` (the per-page source
 * comes from the registry entry, e.g. `location-city-berlin`) before opening
 * the shared waitlist modal (which posts to `/api/leads`).
 *
 * Semantics: a `section` with a visible `h2` headline keeps the `h1 → h2`
 * heading hierarchy on every location page.
 */

export interface LocationCtaProps {
  /** `trackEvent('signup_click', { source })` value (registry-derived). */
  source: string;
  /** Optional headline override (used on de pages). */
  headline?: string;
  /** Optional subline override. */
  subline?: string;
  /** Optional CTA label override. */
  ctaLabel?: string;
}

const Band = styled.section`
  max-width: 880px;
  margin: 0 auto 64px;
  padding: 16px 24px;
`;

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
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.heading}px;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
`;

const Subline = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export function LocationCta({ source, headline, subline, ctaLabel }: LocationCtaProps) {
  const { openWaitlist } = useWaitlist();
  const { t } = useI18n();

  const bandHeadline = headline ?? t('ctaBand.headline');
  const bandSubline = subline ?? t('ctaBand.subline');

  return (
    <Band data-testid="location-cta-band">
      <Reveal>
        <Panel>
          <Headline>{bandHeadline}</Headline>
          <Subline>{bandSubline}</Subline>
          <RotatingBorderButton
            label={ctaLabel ?? t('ctaBand.joinLabel')}
            fillDirection="left"
            onClick={(event) => {
              trackEvent({ name: 'signup_click', props: { source } });
              openWaitlist(event.currentTarget);
            }}
            testID="location-cta-join-button"
          />
        </Panel>
      </Reveal>
    </Band>
  );
}

export default LocationCta;
