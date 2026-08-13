'use client';

import styled, { keyframes } from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import { ENTRANCE_EASING } from './landingTokens';
import { CHIP_MARQUEE_DURATION } from './menuTokens';

/**
 * Infinite example-community chip marquee (spec sprint-10-menu-redesign §4.6).
 *
 * Replaces the static `ChipGrid` on /community with a seamless `LogoMarquee`-
 * style ticker: the 7 example-community chips are repeated 2× in a
 * `width: max-content` track translating `0 → -50%` over 28s, paused on
 * hover, with edge fade masks.
 *
 * A11y: the animated track is `aria-hidden`; an equivalent visually-hidden
 * static `<ul>` (labeled with the intro) lists each community name once, so
 * screen readers never hear duplicates. Reduced motion turns the track into a
 * static wrapping flex row (same as `LogoMarquee`) via the CSS media query
 * plus the `MenuPageShell` global kill-switch.
 *
 * RTL: the loop uses a physical `translateX` and repeats identical content,
 * so it stays a seamless closed loop in every direction (spec §10.7).
 */

const EXAMPLE_COMMUNITY_KEYS = [
  'startupFounders',
  'smallBusinesses',
  'bookClubs',
  'communityOrganizations',
  'runClubs',
  'peeWeeLeagues',
  'anyoneWithAnIdea',
] as const;

export interface ChipMarqueeProps {
  /** Localized intro sentence read as the sr-only list aria-label. */
  intro: string;
}

const chipScroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const Wrap = styled.div`
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  width: max-content;
  animation: ${chipScroll} ${CHIP_MARQUEE_DURATION} linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

/** Example-community pill (spec sprint-8 §8.2 styles reused verbatim). */
const Chip = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid rgba(79, 125, 249, 0.4);
  border-radius: ${({ theme }) => theme.radius.pill}px;
  padding: 10px 18px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  flex-shrink: 0;
  white-space: nowrap;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background: rgba(79, 125, 249, 0.9);
    transform: translateY(100%);
    transition: transform 0.4s ${ENTRANCE_EASING};
  }

  &:hover::before {
    transform: translateY(0);
  }
`;

const ChipLabel = styled.span`
  position: relative;
  z-index: 1;
`;

/** Visually-hidden static list for AT (each community read exactly once). */
const SrOnlyList = styled.ul`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

export function ChipMarquee({ intro }: ChipMarqueeProps) {
  const { t } = useI18n();

  const labels = EXAMPLE_COMMUNITY_KEYS.map((key) => t(`community.examples.${key}`));

  return (
    <div data-testid="chip-marquee">
      <Wrap>
        <Track aria-hidden="true">
          {[...labels, ...labels].map((label, index) => (
            <Chip key={`${label}-${index}`}>
              <ChipLabel>{label}</ChipLabel>
            </Chip>
          ))}
        </Track>
      </Wrap>
      <SrOnlyList aria-label={intro}>
        {labels.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </SrOnlyList>
    </div>
  );
}

export default ChipMarquee;
