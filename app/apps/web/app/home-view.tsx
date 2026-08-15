'use client';

import { createGlobalStyle } from 'styled-components';
import styled, { ThemeProvider as DomThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { useI18n } from '@joinorigin/i18n';
import { Screen } from '@joinorigin/ui';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import LogoMarquee from '../components/LogoMarquee';
import Reveal from '../components/Reveal';
import { BRAND_MESH } from '../components/landingTokens';
import { WaitlistModalProvider } from '../components/WaitlistModal/WaitlistModalProvider';
import ChipMarquee from '../components/ChipMarquee';
import { faqEntries, faqNamespace } from '../lib/faq';
import { JsonLd } from '../lib/seo/JsonLdScript';
import { faqPage } from '../lib/seo/jsonLd';

import SectionBand from '../components/SectionBand';
import {
  BodyCopy,
  Card,
  CardBody,
  CardGrid,
  CardTitle,
  PageContainer,
  Section,
  SectionTitle,
} from '../components/menuPagePrimitives';


/**
 * JoinOrigin homescreen view (spec `app/docs/design/sprint-3-homescreen-spec.md`,
 * discovery §5.1): sticky header, hero (typewriter H1 + orbit circles viz),
 * visible definition paragraph (exact phrase "social collaboration network"),
 * partner logo ticker, FAQ block (section + h2 per question + p answer),
 * slim footer, and the any-button waitlist modal backed by `POST /api/leads`.
 *
 * i18n (arch-i18n §7.4): the FAQ content and all visible copy come from the
 * active locale dictionary; the server wrapper `app/page.tsx` mirrors the same
 * localized FAQ into the FAQPage JSON-LD.
 *
 * Rendered by the server wrapper `app/page.tsx` which also emits the FAQPage
 * JSON-LD (mirrored 1:1, discovery §8.3) so crawlers and LLMs see the
 * structured data in the initial HTML.
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

/**
 * Full-page hero background with the dark fallback beneath and the Origin
 * Spectrum brand mesh layered over the webp (spec §3, §5.2, sprint-10-menu-anim
 * §3.4 `BRAND_MESH`).
 */
const PageRoot = styled.div`
  min-height: 100svh;
  background-color: ${theme.colors.background};
  background-image: ${BRAND_MESH}, url(/assets/hero/hero-background.webp);
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

const CONCEPT_KEYS = [
  'ideas',
  'projects',
  'feed',
  'communities',
  'communication',
  'profiles',
  'opportunities',
  'companies',
] as const;

export function HomeView() {
  const { t, dictionary } = useI18n();
  const homeFaq = faqEntries(faqNamespace(dictionary, 'home'));

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
                    clarity (discovery §5.1, §6). ScrollTrigger reveal (spec
                    sprint-10-menu-anim §5.8). */}
                <Reveal>
                  <Definition>{t('home.definition')}</Definition>
                </Reveal>
                <SectionBand variant="glass">
                  <PageContainer>
                    <Reveal>
                      <Section>
                        <SectionTitle>{t('community.sectionExamples')}</SectionTitle>
                        <BodyCopy>{t('community.examplesIntro')}</BodyCopy>
                        <ChipMarquee intro={t('community.examplesIntro')} />
                      </Section>
                    </Reveal>
                  </PageContainer>
                </SectionBand>
                <SectionBand variant="glass" accent="docs" glow>
                  <PageContainer>
                    <Reveal>
                      <Section>
                        <SectionTitle id="concepts">{t('docs.sectionConcepts')}</SectionTitle>
                        <CardGrid>
                          {CONCEPT_KEYS.map((concept, index) => (
                            <Reveal key={concept} delay={`${index * 0.08}s`}>
                              <Card>
                                <CardTitle>{t(`common.objects.${concept}`)}</CardTitle>
                                <CardBody>{t(`docs.concepts.${concept}.body`)}</CardBody>
                              </Card>
                            </Reveal>
                          ))}
                        </CardGrid>
                      </Section>
                    </Reveal>
                  </PageContainer>
                </SectionBand>
                <Reveal>
                  <LogoMarquee />
                </Reveal>
                {/* Visible FAQ block, mirrored 1:1 in FAQPage JSON-LD (§8.3). */}
                <Reveal>
                  <FaqSection aria-labelledby="home-faq-heading">
                    <FaqHeading id="home-faq-heading">{t('common.faqHeading')}</FaqHeading>
                    {homeFaq.map((faq) => (
                      <FaqItem key={faq.question}>
                        <FaqQuestion>{faq.question}</FaqQuestion>
                        <FaqAnswer>{faq.answer}</FaqAnswer>
                      </FaqItem>
                    ))}
                  </FaqSection>
                </Reveal>
              </main>
              <Footer />
            </Screen>
          </PageRoot>
          <GlobalStyles />
        </WaitlistModalProvider>
        {/* FAQPage JSON-LD — localized mirror of the visible FAQ block
            (arch-i18n §7.4), rendered into the initial SSR HTML. */}
        <JsonLd data={faqPage(homeFaq)} />
      </DomThemeProvider>
    </NativeThemeProvider>
  );
}

export default HomeView;
