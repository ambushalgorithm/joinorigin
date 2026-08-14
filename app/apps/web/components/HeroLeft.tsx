'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import styled from 'styled-components';

import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

import { useI18n } from '@joinorigin/i18n';

import RotatingBorderButton from './RotatingBorderButton';
import TypewriterHeading from './TypewriterHeading';
import { useWaitlist } from './WaitlistModal/WaitlistModalProvider';

/**
 * Hero — left column (spec §5.3, GSAP entrance sprint-10-menu-anim §5.8).
 *
 * Composes the typewriter heading, Start Project CTA (rotating border, right
 * chevron, hover fill from the right), supporting copy, and the trust row of
 * overlapping avatars. GSAP staggers the Actions / Supporting / Trust
 * entrances via `data-hero` hooks inside `gsap.matchMedia()` under
 * `(prefers-reduced-motion: no-preference)`. The `TypewriterHeading`
 * component is user-kept code — its internals stay byte-identical; it is NOT
 * animated by GSAP.
 */

const TRUST_AVATAR_COUNT = 9;

const ChevronIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M4 9h10m0 0-4-4m4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Column = styled.div`
  flex: 0 1 600px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex: 1 1 auto;
    align-items: center;
    text-align: center;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.xxl}px;
  flex-wrap: wrap;
`;

const Supporting = styled.p`
  margin: ${({ theme }) => theme.spacing.xl}px 0 0;
  max-width: 540px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 18px;
  line-height: 1.6;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

/** Explore hub cross-links row (TASK-316) under the hero CTA. */
const ExploreLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  flex-wrap: wrap;
`;

const ExploreLink = styled(Link)`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

const Trust = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.xxl}px;
  flex-wrap: wrap;
`;

const TrustAvatars = styled.div`
  display: flex;
  align-items: center;
`;

/**
 * `next/image` is styled via `styled-components` for the trust-row avatars
 * (TASK-209). The generated class name is made deterministic app-wide by the
 * SWC `compiler.styledComponents` option in `next.config.mjs`.
 */
const TrustAvatar = styled(Image)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.primaryContrast};
  object-fit: cover;
  margin-inline-start: -12px;

  &:first-child {
    margin-inline-start: 0;
  }
`;

const TrustCopy = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export function HeroLeft() {
  const columnRef = useRef<HTMLDivElement>(null);
  const { openWaitlist } = useWaitlist();
  const { t } = useI18n();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(columnRef);
        gsap.fromTo(
          q('[data-hero="actions"]'),
          { autoAlpha: 0, y: 32 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        );
        gsap.fromTo(
          q('[data-hero="supporting"]'),
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.08, ease: 'power3.out' },
        );
        gsap.fromTo(
          q('[data-hero="trust"]'),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.16, ease: 'power3.out' },
        );
      });
    },
    { scope: columnRef },
  );

  const trustAvatars = Array.from({ length: TRUST_AVATAR_COUNT }, (_, i) => ({
    src: `/assets/avatars/avatar-${String(i + 1).padStart(2, '0')}.png`,
    alt: t('home.hero.trustAvatarsAlt', { number: i + 1 }),
  }));

  return (
    <Column ref={columnRef}>
      <TypewriterHeading />

      <div data-hero="actions">
        <Actions>
          <RotatingBorderButton
            label={t('home.hero.startProject')}
            size="large"
            fillDirection="right"
            icon={ChevronIcon}
            onClick={(event) => openWaitlist(event.currentTarget)}
            testID="start-project-button"
          />
        </Actions>
      </div>

      {/* Explore cross-links (TASK-316): additive nav to the SEO hubs. */}
      <div data-hero="supporting">
        <ExploreLinks>
          <ExploreLink href="/location">{t('common.nav.locations')}</ExploreLink>
          <ExploreLink href="/guides">{t('common.nav.guides')}</ExploreLink>
          <ExploreLink href="/glossary">{t('common.nav.glossary')}</ExploreLink>
        </ExploreLinks>
        <Supporting>{t('home.hero.supporting')}</Supporting>
      </div>

      <div data-hero="trust">
        <Trust>
          <TrustAvatars>
            {trustAvatars.map((avatar) => (
              <TrustAvatar
                key={avatar.src}
                src={avatar.src}
                alt={avatar.alt}
                width={48}
                height={48}
              />
            ))}
          </TrustAvatars>
          <TrustCopy>{t('home.hero.trustCopy')}</TrustCopy>
        </Trust>
      </div>
    </Column>
  );
}

export default HeroLeft;
