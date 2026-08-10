'use client';

import { createGlobalStyle } from 'styled-components';
import styled, { ThemeProvider as DomThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { Screen } from '@joinorigin/ui';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import LogoMarquee from '../components/LogoMarquee';
import { WaitlistModalProvider } from '../components/WaitlistModal/WaitlistModalProvider';

/**
 * JoinOrigin homescreen (spec `app/docs/design/sprint-3-homescreen-spec.md`):
 * sticky header, hero (typewriter H1 + orbit circles viz), partner logo
 * ticker, slim footer, and the any-button waitlist modal backed by
 * `POST /api/leads` → CSV capture.
 *
 * Two theme providers are needed: the shared `@joinorigin/ui` components read
 * the `styled-components/native` theme context, while web-local landing
 * components use the DOM `styled-components` context (full CSS support).
 */

const GlobalStyles = createGlobalStyle`
  /* Required to animate the rotating-border custom property (spec §5.1). */
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

  /* Spec §7: disable all entrance/orbit/marquee/blink CSS animations. */
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

/** Full-page hero background with the dark fallback beneath (spec §3, §5.2). */
const PageRoot = styled.div`
  min-height: 100svh;
  background-color: ${theme.colors.background};
  background-image: url(/assets/hero/hero-background.webp);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default function HomePage() {
  return (
    <NativeThemeProvider theme={theme}>
      <DomThemeProvider theme={theme}>
        <WaitlistModalProvider>
          <PageRoot data-testid="home-page">
            <Screen style={{ padding: 0, backgroundColor: 'transparent' }}>
              <Header />
              <main>
                <Hero />
                <LogoMarquee />
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
