'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';

import { DELAY, useEntrance } from './motion';
import RotatingBorderButton from './RotatingBorderButton';
import { useWaitlist } from './WaitlistModal/WaitlistModalProvider';

/**
 * Slim footer (spec §5.6 + sprint-4-discovery §3.2).
 *
 * Brand mark + wordmark, tagline, grouped nav (Product / Company / Legal),
 * `Join the waitlist` rotating-border CTA, and the copyright line. Stacks
 * vertically on mobile.
 */

const FOOTER_GROUPS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Community', href: '/community' },
      { label: 'Docs', href: '/docs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
] as const;

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
    $entered
      ? css`
          ${fadeIn} 0.5s ease-out ${DELAY.footer} both
        `
      : 'none'};
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
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

/**
 * `next/image` is styled via `styled-components` for sizing (TASK-209). The
 * generated class name is made deterministic app-wide by the SWC
 * `compiler.styledComponents` option in `next.config.mjs`.
 */
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

const Groups = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xxl}px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const GroupTitle = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const FooterLink = styled(Link)`
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
        <div>
          <Brand>
            <BrandMark src="/assets/logo/joinorigin-mark.svg" alt="" width={24} height={24} />
            <Wordmark>JoinOrigin</Wordmark>
          </Brand>
          <Tagline>Where work finds its origin</Tagline>
        </div>
        <Spacer />
        <RotatingBorderButton
          label="Join the waitlist"
          onClick={(event) => openWaitlist(event.currentTarget)}
          testID="footer-waitlist-button"
        />
        <Groups aria-label="Footer">
          {FOOTER_GROUPS.map((group) => (
            <Group key={group.title}>
              <GroupTitle>{group.title}</GroupTitle>
              {group.links.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </Group>
          ))}
        </Groups>
        <Copyright>© 2026 JoinOrigin</Copyright>
      </Inner>
    </StyledFooter>
  );
}

export default Footer;
