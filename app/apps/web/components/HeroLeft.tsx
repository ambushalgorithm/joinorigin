'use client';

import Image from 'next/image';
import styled, { css, keyframes } from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import { DELAY, EASE, useEntrance } from './motion';
import RotatingBorderButton from './RotatingBorderButton';
import TypewriterHeading from './TypewriterHeading';
import { useWaitlist } from './WaitlistModal/WaitlistModalProvider';

/**
 * Hero — left column (spec §5.3).
 *
 * Composes the typewriter heading, Start Project CTA (rotating border, right
 * chevron, hover fill from the right), supporting copy, and the trust row of
 * overlapping avatars. (The floating cursor + `Maya` member badge was removed
 * by the user-pushed tweak 058007e.)
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

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Column = styled.div<{ $entered: boolean }>`
  flex: 0 1 600px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: ${({ $entered }) =>
    $entered
      ? css`
          ${fadeUp} 1s ${EASE} ${DELAY.heroLeft} both
        `
      : 'none'};

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
  const entered = useEntrance();
  const { openWaitlist } = useWaitlist();
  const { t } = useI18n();

  const trustAvatars = Array.from({ length: TRUST_AVATAR_COUNT }, (_, i) => ({
    src: `/assets/avatars/avatar-${String(i + 1).padStart(2, '0')}.png`,
    alt: t('home.hero.trustAvatarsAlt', { number: i + 1 }),
  }));

  return (
    <Column $entered={entered}>
      <TypewriterHeading />

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

      <Supporting>{t('home.hero.supporting')}</Supporting>

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
    </Column>
  );
}

export default HeroLeft;
