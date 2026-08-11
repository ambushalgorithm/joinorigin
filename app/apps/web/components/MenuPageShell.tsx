'use client';

import { createGlobalStyle } from 'styled-components';
import styled, { ThemeProvider as DomThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { Screen } from '@joinorigin/ui';

import Footer from './Footer';
import Header from './Header';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';

/**
 * Shared shell for the Sprint 4 menu pages (TASK-215).
 *
 * Mirrors the home page (`app/page.tsx`) wrapper pattern: both theme
 * providers (DOM styled-components + styled-components/native for the shared
 * `@joinorigin/ui` components), the any-button `WaitlistModalProvider`,
 * sticky `Header` (with the real page nav), `<main>` content, and the slim
 * grouped `Footer`. Pages render their content inside `<main>` so crawlers
 * and LLMs get a single semantic `<main>` landmark per page (arch §5.1).
 */

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

export function MenuPageShell({ children }: { children: React.ReactNode }) {
  return (
    <NativeThemeProvider theme={theme}>
      <DomThemeProvider theme={theme}>
        <WaitlistModalProvider>
          <PageRoot data-testid="menu-page">
            <Screen style={{ padding: 0, backgroundColor: 'transparent' }}>
              <Header />
              <main>{children}</main>
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
