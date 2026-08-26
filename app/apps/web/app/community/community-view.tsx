'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import CountUpStat from '../../components/CountUpStat';
import MenuPageShell from '../../components/MenuPageShell';
import Reveal from '../../components/Reveal';
import SectionBand from '../../components/SectionBand';
import {
  AccentLink,
  BodyCopy,
  Card,
  CardBody,
  CardGrid,
  CardTitle,
  FaqAnswer,
  FaqCard,
  FaqQuestion,
  FaqSection,
  PageContainer,
  Section,
  SectionTitle,
} from '../../components/menuPagePrimitives';
import { faqEntries, faqNamespace } from '../../lib/faq';
import { JsonLd } from '../../lib/seo/JsonLdScript';
import { faqPage } from '../../lib/seo/jsonLd';
import { useLocalizePath } from '../../lib/seo/localePath';

/**
 * Community view (discovery §5.3, redesign spec sprint-8 §8.2, elevated
 * sprint-10 §8.2): values, example communities as a scrolling `ChipMarquee`,
 * and trust (2,400+ members) as a count-up stat in the hero meta and the
 * join band. One `<h1>` (rendered by `MenuHero`) and semantic sections; the
 * intro defines the "social collaboration network" category for LLM-crawler
 * entity clarity.
 *
 * i18n: all copy reads from the active locale dictionary (arch-i18n §7.4).
 */

const VALUE_KEYS = ['peopleFirst', 'communitiesDriveGrowth', 'collaborationCreatesValue'] as const;

/**
 * Community view props (Story B, TASK-547). The "Example communities" marquee
 * is server-rendered by `ChipMarqueeServer` in the page wrapper (it reads geo
 * + active locale from `next/headers`) and dropped into this client view
 * through the `marquee` slot — the client never imports the 12 MB geo
 * snapshot.
 */
export interface CommunityViewProps {
  /** Server-rendered `ChipMarqueeServer` element for the Example-communities
   *  section (absent on surfaces whose wrapper hasn't wired the slot yet). */
  marquee?: ReactNode;
}

/**
 * Explore hub cross-links row (TASK-316) — additive, keeps copy intact.
 * Mobile-first (Story A): tighter gap at the minimum viewport, roomier at
 * `theme.breakpoints.mobile`.
 */
const ExploreLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  flex-wrap: wrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    gap: ${({ theme }) => theme.spacing.lg}px;
  }
`;

export function CommunityView({ marquee }: CommunityViewProps) {
  const { t, dictionary } = useI18n();
  const faq = faqEntries(faqNamespace(dictionary, 'community'));
  // Locale-aware internal links (Sprint 19 Goal 2, TASK-460): the shared
  // helper applies the active locale's prefix per the confirmed table —
  // unprefixed EN load keeps links unprefixed; `/en/**` stays `/en/**`;
  // `/de/**` renders `/de/**`; unprefixed load with a `de` cookie renders
  // `/de/**`.
  const localizePath = useLocalizePath();

  return (
    <MenuPageShell
      hero={{
        eyebrow: t('community.hero.eyebrow'),
        title: t('community.hero.title'),
        lead: t('community.hero.lead'),
        scene: 'community',
        accent: 'community',
        cta: { variant: 'waitlist', label: t('common.joinWaitlist') },
        meta: { stat: true },
      }}
    >
      <SectionBand variant="glass" accent="community" glow>
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('community.sectionValues')}</SectionTitle>
              <CardGrid>
                {VALUE_KEYS.map((value, index) => (
                  <Reveal key={value} delay={`${index * 0.08}s`}>
                    <Card>
                      <CardTitle>{t(`common.values.${value}`)}</CardTitle>
                      <CardBody>{t(`community.values.${value}.body`)}</CardBody>
                    </Card>
                  </Reveal>
                ))}
                <Reveal delay={`${VALUE_KEYS.length * 0.08}s`}>
                  <Card>
                    <CardTitle>{t('community.values.ownership.title')}</CardTitle>
                    <CardBody>{t('community.values.ownership.body')}</CardBody>
                  </Card>
                </Reveal>
              </CardGrid>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="plain">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('community.sectionExamples')}</SectionTitle>
              <BodyCopy>{t('community.examplesIntro')}</BodyCopy>
              {/* Story B: the server wrapper passes the geo-aware
                  `ChipMarqueeServer` through this slot. */}
              {marquee}
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="glass" accent="community">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('community.sectionJoin')}</SectionTitle>
              <CountUpStat
                valueText={t('community.joinStatValue')}
                label={t('community.joinStatLabel')}
                testID="community-members-stat"
              />
              <BodyCopy>{t('community.joinCopy')}</BodyCopy>
              <ExploreLinks>
                <AccentLink href={localizePath('/community')}>
                  {t('common.nav.community')}
                </AccentLink>
                <AccentLink href={localizePath('/guides')}>{t('common.nav.guides')}</AccentLink>
                <AccentLink href={localizePath('/location')}>
                  {t('common.nav.locations')}
                </AccentLink>
              </ExploreLinks>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="plain">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('common.faqHeading')}</SectionTitle>
              <FaqSection>
                {faq.map((entry) => (
                  <FaqCard key={entry.question}>
                    <FaqQuestion>{entry.question}</FaqQuestion>
                    <FaqAnswer>{entry.answer}</FaqAnswer>
                  </FaqCard>
                ))}
              </FaqSection>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>
      {/* FAQPage JSON-LD — localized mirror of the visible FAQ block
          (arch-i18n §7.4), rendered into the initial SSR HTML. */}
      <JsonLd data={faqPage(faq)} />
    </MenuPageShell>
  );
}
