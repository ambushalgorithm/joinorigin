'use client';

import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';

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
 * Story E (TASK-536): the chips are real links — every chip is a single
 * wrapping `<a>` (via `next/link`) to the resolved content-rich community
 * page (`targetPath`, the registry-exact localized path computed
 * server-side by `lib/seo/exampleCommunities.ts` through the
 * `ChipMarqueeServer` wrapper: closest country first, then the largest
 * content-rich community within it; locale-language default when geo is
 * absent). When `targetPath` is absent (a surface renders the bare client
 * component without the server wrapper) chips stay non-interactive pills.
 *
 * A11y: the animated track is `aria-hidden`; an equivalent visually-hidden
 * static `<ul>` (labeled with the intro) lists each community name once as a
 * link to the same target, so screen readers get the same navigation without
 * ever hearing duplicates. Reduced motion turns the track into a static
 * wrapping flex row (same as `LogoMarquee`) via the CSS media query plus the
 * `MenuPageShell` global kill-switch.
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
  /**
   * Registry-exact localized path of the resolved content-rich community
   * page (Story E) — `/${locale}/location/<country>/<region>/<city>` from
   * `lib/seo/exampleCommunities.ts`. The server wrapper `ChipMarqueeServer`
   * supplies it so the client never imports the geo snapshot. When present
   * every chip becomes a single wrapping link to this page; when absent the
   * chips render as non-interactive pills (defensive — surfaces should pass
   * the resolved path).
   */
  targetPath?: string | null;
  /**
   * Visitor country (ISO-3166-1 alpha-2, from `getServerCountry()`/
   * `x-joinorigin-ip-country`, TASK-479) that selected `targetPath`
   * server-side. Kept for observability (`data-ip-country`) so e2e suites
   * can assert the geo-aware closest-country resolution.
   */
  country?: string | null;
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

/** Shared example-community pill surface (spec sprint-8 §8.2 styles
 *  verbatim). Non-interactive pills get NO hover/focus animation (Story C —
 *  only the interactive link variant animates). */
const chipPill = css`
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
`;

/** Non-interactive pill fallback (no `targetPath`) — no hover/focus motion. */
const Chip = styled.span`
  ${chipPill}
`;

/**
 * Interactive chip link (Story D/E): a single wrapping `<a>` covering the
 * whole chip — hover/focus fill + a visible keyboard focus ring apply ONLY
 * to this clickable variant (Story C).
 */
const ChipLink = styled.a`
  ${chipPill}
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background: rgba(79, 125, 249, 0.9);
    transform: translateY(100%);
    transition: transform 0.4s ${ENTRANCE_EASING};
  }

  &:hover::before,
  &:focus-visible::before {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
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

export function ChipMarquee({ intro, targetPath, country }: ChipMarqueeProps) {
  const { t } = useI18n();

  const labels = EXAMPLE_COMMUNITY_KEYS.map((key) => t(`community.examples.${key}`));
  const href = targetPath ?? undefined;

  return (
    <div data-testid="chip-marquee" data-ip-country={country ?? undefined}>
      <Wrap>
        <Track aria-hidden="true">
          {[...labels, ...labels].map((label, index) =>
            href ? (
              <ChipLink as={Link} href={href} key={`${label}-${index}`}>
                <ChipLabel>{label}</ChipLabel>
              </ChipLink>
            ) : (
              <Chip key={`${label}-${index}`}>
                <ChipLabel>{label}</ChipLabel>
              </Chip>
            ),
          )}
        </Track>
      </Wrap>
      <SrOnlyList aria-label={intro}>
        {labels.map((label) => (
          <li key={label}>{href ? <Link href={href}>{label}</Link> : label}</li>
        ))}
      </SrOnlyList>
    </div>
  );
}

export default ChipMarquee;
