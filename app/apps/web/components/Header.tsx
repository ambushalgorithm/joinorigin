'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import { useLocalizePath } from '../lib/seo/localePath';
import { DELAY, EASE, useEntrance } from './motion';
import RotatingBorderButton from './RotatingBorderButton';
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
 * - Explore dropdown (TASK-316): desktop submenu with Locations (`/location`),
 *   Guides (`/guides`), Glossary (`/glossary`); the mobile panel lists the
 *   same Explore links above the Features/Community/Docs/About links.
 * - `Log In` link + rotating-border `Get Started` CTA on the right. Both
 *   navigate to the locale-prefixed `/signup` route (Sprint 24, TASK-556) —
 *   there is no auth/login route, so account creation starts at signup.
 * - Language switcher (Sprint 9): desktop right cluster before `Log In`;
 *   mobile-panel row between the nav links and `Log In`.
 * - Mobile: hamburger toggles a dropdown panel; closes on link click,
 *   outside click, or ESC.
 * - Mobile-first (Sprint 22 Story A): base styles target the researched
 *   320px minimum viewport (compact gutters, 44px tap targets, shrinkable
 *   right cluster) and are enhanced at `theme.breakpoints`.
 */

const NAV_LINKS = [
  { key: 'common.nav.features', href: '/features' },
  { key: 'common.nav.docs', href: '/docs' },
  { key: 'common.nav.about', href: '/about' },
];

/** Explore submenu links (TASK-316): Locations / Guides / Glossary. */
const EXPLORE_LINKS = [
  { key: 'common.nav.community', href: '/community' },
  { key: 'common.nav.guides', href: '/guides' },
  { key: 'common.nav.locations', href: '/location' },
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
  background: ${({ theme }) => theme.colors.scrim};
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
  /* Mobile-first (Story A): the 320px base uses compact gutters so the brand
     mark, CTA, and hamburger fit the researched minimum viewport without
     overflow; padding grows at the first enhancement breakpoint. */
  padding: ${({ theme }) => theme.spacing.md}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xl}px;
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

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
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

/**
 * Explore dropdown (TASK-316): desktop-only submenu with Locations / Guides /
 * Glossary. The trigger is a button styled like the nav links; the panel
 * opens on hover/focus/click and closes on mouse-leave, outside click, or ESC.
 */
const Dropdown = styled.div`
  position: relative;
`;

const DropdownToggle = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

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
  &:focus-visible,
  &[aria-expanded='true'] {
    color: ${({ theme }) => theme.colors.text};

    &::after {
      transform: scaleX(1);
    }
  }
`;

const Chevron = styled.svg<{ $open: boolean }>`
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const DropdownPanel = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 200px;
  padding: ${({ theme }) => theme.spacing.sm}px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  box-shadow: 0 12px 32px rgba(10, 16, 34, 0.6);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transform: ${({ $open }) =>
    $open ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-6px)'};
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s;
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surfaceElevated};
    color: ${({ theme }) => theme.colors.text};
  }
`;

/** Mobile-panel section label for the Explore group (TASK-316). */
const MobileGroupLabel = styled.span`
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.spacing.md}px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  /* min-width: 0 lets the cluster shrink at sub-320 widths (D2 graceful
     degradation) instead of forcing horizontal page overflow. */
  min-width: 0;
  gap: ${({ theme }) => theme.spacing.sm}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    gap: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const LogInLink = styled(Link)`
  position: relative;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: 0;

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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
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
  border-radius: ${({ theme }) => theme.radius.md}px;

  /* Visible keyboard focus ring (Story C) — the hamburger is the primary
     mobile navigation control and must show focus for keyboard users. */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
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
  /* Mobile-first: 16px gutters at the 320px floor; slightly wider at 480+. */
  margin: 0 ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.md}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    margin: 0 20px 16px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    display: none;
  }
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

/** Mobile-panel `Log In` control — a link to the locale-prefixed signup route. */
const MobileLogInButton = styled(Link)`
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

function ExploreDropdown() {
  const { t } = useI18n();
  const localizePath = useLocalizePath();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <Dropdown
      ref={dropdownRef}
      data-testid="explore-dropdown"
      onMouseEnter={() => {
        hoveringRef.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        setOpen(false);
      }}
    >
      <DropdownToggle
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => {
          // Click toggles only when the pointer is NOT hovering the dropdown
          // (hover already opened it — don't immediately close it). Keyboard
          // and touch users toggle; mouse users open on hover.
          if (!hoveringRef.current) {
            setOpen((current) => !current);
          }
        }}
        data-testid="explore-menu-toggle"
      >
        {t('common.nav.explore')}
        <Chevron
          $open={open}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 5.5 7 9.5 11 5.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Chevron>
      </DropdownToggle>
      <DropdownPanel $open={open} data-testid="explore-menu">
        {EXPLORE_LINKS.map((link) => (
          <DropdownLink
            key={link.href}
            href={localizePath(link.href)}
            onClick={() => setOpen(false)}
          >
            {t(link.key)}
          </DropdownLink>
        ))}
      </DropdownPanel>
    </Dropdown>
  );
}

export function Header() {
  const entered = useEntrance();
  const { t } = useI18n();
  const localizePath = useLocalizePath();
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
        <Brand href={localizePath('/')} aria-label={t('header.brandAlt')}>
          <BrandMark src="/assets/logo/joinorigin-mark.svg" alt="" width={32} height={32} />
          <Wordmark>{t('common.brand')}</Wordmark>
        </Brand>

        <Nav aria-label={t('header.navAria')}>
          <ExploreDropdown />
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={localizePath(link.href)}>
              {t(link.key)}
            </NavLink>
          ))}
        </Nav>

        <Right>
          <LanguageSwitcher variant="header" />
          <LogInLink href={localizePath('/signup')} data-testid="login-button">
            {t('header.logIn')}
          </LogInLink>
          <RotatingBorderButton
            label={t('header.getStarted')}
            href={localizePath('/signup')}
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
          <LanguageSwitcher variant="mobile-panel" />
          <MobileGroupLabel>{t('common.nav.explore')}</MobileGroupLabel>
          {EXPLORE_LINKS.map((link) => (
            <MobileLink key={link.href} href={localizePath(link.href)} onClick={closeMobile}>
              {t(link.key)}
            </MobileLink>
          ))}
          {NAV_LINKS.map((link) => (
            <MobileLink key={link.href} href={localizePath(link.href)} onClick={closeMobile}>
              {t(link.key)}
            </MobileLink>
          ))}
          <MobileLogInButton
            href={localizePath('/signup')}
            data-testid="mobile-login-button"
            onClick={closeMobile}
          >
            {t('header.logIn')}
          </MobileLogInButton>
          <RotatingBorderButton
            label={t('header.getStarted')}
            href={localizePath('/signup')}
            onClick={closeMobile}
            testID="mobile-get-started-button"
          />
        </MobilePanel>
      ) : null}
    </StyledHeader>
  );
}

export default Header;
