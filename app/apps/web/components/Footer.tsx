'use client';

import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

import { DELAY, useEntrance } from './motion';
import RotatingBorderButton from './RotatingBorderButton';
import { useWaitlist } from './WaitlistModal/WaitlistModalProvider';

/**
 * Slim footer (spec §5.6).
 *
 * Brand mark + wordmark, tagline, spacer, `Join the waitlist` rotating-border
 * CTA, Privacy / Terms links, and the copyright line. Stacks vertically on
 * mobile.
 */

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledFooter = styled.footer<{ $entered: boolean }>`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 32px 24px;
  animation: ${({ $entered }) =>
    $entered ? `${fadeIn} 0.5s ease-out ${DELAY.footer} both` : 'none'};
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl}px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Brand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const BrandMark = styled(Image)`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const Wordmark = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const Tagline = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Spacer = styled.div`
  flex: 1;
`;

const SmallLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const SmallLink = styled.a`
  position: relative;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover,
  &:focus-visible {
    &::after {
      transform: scaleX(1);
    }
  }
`;

const Copyright = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export function Footer() {
  const entered = useEntrance();
  const { openWaitlist } = useWaitlist();

  return (
    <StyledFooter $entered={entered} data-testid="footer">
      <Inner>
        <Brand>
          <BrandMark src="/assets/logo/joinorigin-mark.svg" alt="" width={24} height={24} />
          <Wordmark>JoinOrigin</Wordmark>
        </Brand>
        <Tagline>Where work finds its origin</Tagline>
        <Spacer />
        <RotatingBorderButton
          label="Join the waitlist"
          onClick={openWaitlist}
          testID="footer-waitlist-button"
        />
        <SmallLinks>
          <SmallLink href="/#privacy">Privacy</SmallLink>
          <SmallLink href="/#terms">Terms</SmallLink>
        </SmallLinks>
        <Copyright>© 2026 JoinOrigin</Copyright>
      </Inner>
    </StyledFooter>
  );
}

export default Footer;
