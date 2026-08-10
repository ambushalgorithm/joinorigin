'use client';

import Image from 'next/image';
import styled, { css, keyframes } from 'styled-components';

import { DELAY, EASE, useEntrance } from './motion';
import RotatingBorderButton from './RotatingBorderButton';
import TypewriterHeading from './TypewriterHeading';
import { useWaitlist } from './WaitlistModal/WaitlistModalProvider';

/**
 * Hero — left column (spec §5.3).
 *
 * Composes the typewriter heading, Start Project CTA (rotating border, right
 * chevron, hover fill from the right), the floating cursor + `Maya` member
 * badge, supporting copy, and the trust row of overlapping avatars.
 */

const TRUST_AVATARS = Array.from({ length: 9 }, (_, i) => ({
  src: `/assets/avatars/avatar-${String(i + 1).padStart(2, '0')}.png`,
  alt: `JoinOrigin member ${i + 1}`,
}));

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

const CursorIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 3l14 7-6 2-3 6-5-15z" fill="currentColor" />
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

const badgeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
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
  color: ${({ theme }) => theme.colors.textMuted};

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
  margin-left: -12px;

  &:first-child {
    margin-left: 0;
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

  return (
    <Column $entered={entered}>
      <TypewriterHeading />

      <Actions>
        <RotatingBorderButton
          label="Start Project"
          size="large"
          fillDirection="right"
          icon={ChevronIcon}
          onClick={(event) => openWaitlist(event.currentTarget)}
          testID="start-project-button"
        />
      </Actions>

      <Supporting>
        JoinOrigin brings your community, projects, and conversations into one calm workspace — so
        your best work finally has a home.
      </Supporting>

      <Trust>
        <TrustAvatars>
          {TRUST_AVATARS.map((avatar) => (
            <TrustAvatar
              key={avatar.src}
              src={avatar.src}
              alt={avatar.alt}
              width={48}
              height={48}
            />
          ))}
        </TrustAvatars>
        <TrustCopy>Join 2,400+ builders already collaborating</TrustCopy>
      </Trust>
    </Column>
  );
}

export default HeroLeft;
