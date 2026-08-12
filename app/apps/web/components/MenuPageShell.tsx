'use client';

import { createGlobalStyle } from 'styled-components';
import styled, { ThemeProvider as DomThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { Screen } from '@joinorigin/ui';

import CtaBand, { type CtaBandProps } from './CtaBand';
import Footer from './Footer';
import Header from './Header';
import MenuHero, { type MenuHeroProps } from './MenuHero';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';

/**
 * Shared shell for the Sprint 4 menu pages (TASK-215), extended for the
 * Sprint 8 redesign (TASK-247, spec sprint-8-menu-redesign §3).
 *
 * Mirrors the home page (`app/page.tsx`) wrapper pattern: both theme
 * providers (DOM styled-components + styled-components/native for the shared
 * `@joinorigin/ui` components), the any-button `WaitlistModalProvider`,
 * sticky `Header` (with the real page nav), `<main>` content, and the slim
 * grouped `Footer`. Pages render their content inside `<main>` so crawlers
 * and LLMs get a single semantic `<main>` landmark per page (arch §5.1).
 *
 * Sprint 8 additions (backwards compatible — when the props are absent the
 * shell behaves exactly as before):
 *  - `hero` renders the two-column `MenuHero` as the FIRST child of `<main>`
 *    (it owns the page's single `<h1>`; pages must NOT render a second one).
 *  - `showCtaBand` (default `true`) renders the join CTA band as the LAST
 *    child of `<main>`.
 *  - `ctaOverride` tightens the CTA band for legal pages (privacy/terms)
 *    to link to `/contact` instead of opening the waitlist modal.
 */

export interface MenuPageShellProps {
  children: React.ReactNode;
  /** Renders the hero band as the FIRST child of <main> (exactly one h1). */
  hero?: MenuHeroProps;
  /** Renders the join CTA band as the LAST child of <main>. Default true. */
  showCtaBand?: boolean;
  /** Optional headline/subline override for the CTA band (privacy/terms). */
  ctaOverride?: CtaBandProps;
}

const GlobalStyles = createGlobalStyle`
  @property --border-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    background-color: ${theme.colors.background};
  }

  body {
    font-family: ${theme.fontFamilies.sans}, system-ui, sans-serif;
    color: ${theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-delay: 0s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/** Full-page dark background for content pages (no hero image). */
const PageRoot = styled.div`
  min-height: 100svh;
  background-color: ${theme.colors.background};
`;

export function MenuPageShell({
  children,
  hero,
  showCtaBand = true,
  ctaOverride,
}: MenuPageShellProps) {
  return (
    <NativeThemeProvider theme={theme}>
      <DomThemeProvider theme={theme}>
        <WaitlistModalProvider>
          <PageRoot data-testid="menu-page">
            <Screen style={{ padding: 0, backgroundColor: 'transparent' }}>
              <Header />
              <main>
                {hero ? <MenuHero {...hero} /> : null}
                {children}
                {showCtaBand ? <CtaBand {...ctaOverride} /> : null}
              </main>
              <Footer />
            </Screen>
          </PageRoot>
          <GlobalStyles />
        </WaitlistModalProvider>
      </DomThemeProvider>
    </NativeThemeProvider>
  );
}

export default MenuPageShell;
