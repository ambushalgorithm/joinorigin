'use client';

import { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { useReducedMotion } from './motion';

/**
 * Sticky in-page anchor nav (spec sprint-10-menu-redesign §4.9).
 *
 * Rendered as the first child of `<main>` after the hero on docs/privacy/
 * terms. A `nav` landmark inside `<main>` (allowed — e2e `nav` assertions use
 * `.first()` which resolves to the Header nav). Pill links jump to each
 * on-page `h2` section `id`; the active link gets a primary tint.
 *
 * Smooth scroll is scoped via a `useEffect` that adds
 * `html.anchor-nav-smooth` to `document.documentElement` (skipped when the
 * user prefers reduced motion).
 */

export interface MenuSubnavProps {
  /** Accessible name for the nav (the page's eyebrow key result). */
  label: string;
  /** On-page `h2` section ids + localized titles. */
  links: Array<{ id: string; label: string }>;
}

const SmoothScroll = createGlobalStyle`
  html.anchor-nav-smooth {
    scroll-behavior: smooth;
  }
`;

const Nav = styled.nav`
  position: sticky;
  top: 72px;
  z-index: 20;
  background: rgba(15, 17, 21, 0.82);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-block-end: 1px solid rgba(44, 49, 58, 0.6);
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 12px 64px;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm}px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1024px) {
    padding: 12px 32px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
  }
`;

const Pill = styled.a`
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  white-space: nowrap;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover,
  &:focus-visible,
  &:target {
    color: ${({ theme }) => theme.colors.text};
    background: rgba(79, 125, 249, 0.14);
  }
`;

export function AnchorNav({ label, links }: MenuSubnavProps) {
  const reduced = useReducedMotion();

  // Scoped smooth scroll: add the class only while the nav is mounted, and
  // skip entirely when the user prefers reduced motion (spec §4.9).
  useEffect(() => {
    if (reduced) {
      return undefined;
    }
    document.documentElement.classList.add('anchor-nav-smooth');
    return () => document.documentElement.classList.remove('anchor-nav-smooth');
  }, [reduced]);

  return (
    <>
      <SmoothScroll />
      <Nav aria-label={label} data-testid="anchor-nav">
        <Inner>
          {links.map((link) => (
            <Pill key={link.id} href={`#${link.id}`}>
              {link.label}
            </Pill>
          ))}
        </Inner>
      </Nav>
    </>
  );
}

export default AnchorNav;
