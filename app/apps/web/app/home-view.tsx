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
import { HOME_FAQ } from './home-data';

/**
 * JoinOrigin homescreen view (spec `app/docs/design/sprint-3-homescreen-spec.md`,
 * discovery §5.1): sticky header, hero (typewriter H1 + orbit circles viz),
 * visible definition paragraph (exact phrase "social collaboration network"),
 * partner logo ticker, FAQ block (section + h2 per question + p answer),
 * slim footer, and the any-button waitlist modal backed by `POST /api/leads`.
 *
 * Rendered by the server wrapper `app/page.tsx` which also emits the FAQPage
 * JSON-LD (mirrored 1:1 from `HOME_FAQ`, discovery §8.3) so crawlers and LLMs
 * see the structured data in the initial HTML.
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

/** Definition paragraph — directly under the hero (discovery §5.1). */
const Definition = styled.p`
  margin: 0 auto;
  max-width: 720px;
  padding: ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.lg}px
    ${({ theme }) => theme.spacing.xl}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 18px;
  line-height: 1.7;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

/** Visible FAQ block — `<section>` with `<h2>` per question + `<p>` answer. */
const FaqSection = styled.section`
  max-width: 720px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.lg}px
    ${({ theme }) => theme.spacing.xxl}px;
`;

const FaqHeading = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.heading}px;
  color: ${({ theme }) => theme.colors.text};
`;

const FaqItem = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px;
`;

const FaqQuestion = styled.h2`
  margin: ${({ theme }) => theme.spacing.md}px 0 ${({ theme }) => theme.spacing.sm}px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.title}px;
  color: ${({ theme }) => theme.colors.text};
`;

const FaqAnswer = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export function HomeView() {
  return (
    <NativeThemeProvider theme={theme}>
      <DomThemeProvider theme={theme}>
        <WaitlistModalProvider>
          <PageRoot data-testid="home-page">
            <Screen style={{ padding: 0, backgroundColor: 'transparent' }}>
              <Header />
              <main>
                <Hero />
                {/* Visible definition paragraph — exact phrase for LLM entity
                    clarity (discovery §5.1, §6). */}
                <Definition>
                  Origin is a social collaboration network — the community OS where your ideas,
                  projects, and communities come together in one organized space. JoinOrigin is the
                  brand and the network behind it.
                </Definition>
                <LogoMarquee />
                {/* Visible FAQ block, mirrored 1:1 in FAQPage JSON-LD (§8.3). */}
                <FaqSection aria-labelledby="home-faq-heading">
                  <FaqHeading id="home-faq-heading">Frequently asked questions</FaqHeading>
                  {HOME_FAQ.map((faq) => (
                    <FaqItem key={faq.question}>
                      <FaqQuestion>{faq.question}</FaqQuestion>
                      <FaqAnswer>{faq.answer}</FaqAnswer>
                    </FaqItem>
                  ))}
                </FaqSection>
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

export default HomeView;
