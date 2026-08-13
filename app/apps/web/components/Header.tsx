'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import { DELAY, EASE, useEntrance } from './motion';
import RotatingBorderButton from './RotatingBorderButton';
import { useWaitlist } from './WaitlistModal/WaitlistModalProvider';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * Sticky header (spec §5.1 + sprint-4-discovery §3.1).
 *
 * - Sticky, blurred (`backdrop-filter: blur(16px)`), hairline bottom border.
 * - Brand mark + `JoinOrigin` wordmark, desktop nav with underline hovers.
 * - Nav links point to the real Sprint 4 pages: Features, Community,
 *   Docs, About (anchor links `/#product` etc. were removed per
 *   discovery Assumption 6). Money is never mentioned — no Pricing page
 *   or pricing link (Facebook approach).
 * - `Log In` link + rotating-border `Get Started` CTA on the right.
 * - Language switcher (Sprint 9): desktop right cluster before `Log In`;
 *   mobile-panel row between the nav links and `Log In`.
 * - Mobile: hamburger toggles a dropdown panel; closes on link click,
 *   outside click, or ESC.
 */

const NAV_LINKS = [
  { key: 'common.nav.features', href: '/features' },
  { key: 'common.nav.community', href: '/community' },
  { key: 'common.nav.docs', href: '/docs' },
  { key: 'common.nav.about', href: '/about' },
];

const fadeDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledHeader = styled.header<{ $entered: boolean }>`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(15, 17, 21, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  animation: ${({ $entered }) =>
    $entered
      ? css`
          ${fadeDown} 0.8s ${EASE} ${DELAY.header} both
        `
      : 'none'};
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xl}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.sm}px;
    gap: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  text-decoration: none;
`;

/**
 * `next/image` is styled via `styled-components` for sizing (TASK-209). The
 * generated class name is made deterministic app-wide by the SWC
 * `compiler.styledComponents` option in `next.config.mjs` (stable
 * `componentId` per file + variable), so server and client class names match
 * during hydration.
 */
const BrandMark = styled(Image)`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

const Wordmark = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 20px;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl}px;
  margin-inline-start: ${({ theme }) => theme.spacing.xxl}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}px) {
    display: flex;
    margin-inline-start: ${({ theme }) => theme.spacing.xl}px;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text};

    &::after {
      transform: scaleX(1);
    }
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const LogInLink = styled(Link)`
  position: relative;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.text};
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hamburger = styled.button`
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}px) {
    display: none;
  }
`;

const MobilePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  margin: 0 20px 16px;
`;

const MobileLink = styled(Link)`
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.spacing.md}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.md}px;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surfaceElevated};
  }
`;

export function Header() {
  const entered = useEntrance();
  const { openWaitlist } = useWaitlist();
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <StyledHeader ref={headerRef} $entered={entered} data-testid="header">
      <Inner>
        <Brand href="/" aria-label={t('header.brandAlt')}>
          <BrandMark src="/assets/logo/joinorigin-mark.svg" alt="" width={32} height={32} />
          <Wordmark>{t('common.brand')}</Wordmark>
        </Brand>

        <Nav aria-label={t('header.navAria')}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {t(link.key)}
            </NavLink>
          ))}
        </Nav>

        <Right>
          <LanguageSwitcher variant="header" />
          <LogInLink href="/#login">{t('header.logIn')}</LogInLink>
          <RotatingBorderButton
            label={t('header.getStarted')}
            onClick={(event) => openWaitlist(event.currentTarget)}
            testID="get-started-button"
          />
          <Hamburger
            type="button"
            aria-label={t('header.mobileMenuToggle')}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            data-testid="mobile-menu-toggle"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {mobileOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </Hamburger>
        </Right>
      </Inner>

      {mobileOpen ? (
        <MobilePanel data-testid="mobile-menu">
          {NAV_LINKS.map((link) => (
            <MobileLink key={link.href} href={link.href} onClick={closeMobile}>
              {t(link.key)}
            </MobileLink>
          ))}
          <LanguageSwitcher variant="mobile-panel" />
          <MobileLink href="/#login" onClick={closeMobile}>
            {t('header.logIn')}
          </MobileLink>
          <RotatingBorderButton
            label={t('header.getStarted')}
            onClick={(event) => {
              closeMobile();
              openWaitlist(event.currentTarget);
            }}
            testID="mobile-get-started-button"
          />
        </MobilePanel>
      ) : null}
    </StyledHeader>
  );
}

export default Header;
