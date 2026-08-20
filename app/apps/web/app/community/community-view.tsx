'use client';

import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import ChipMarquee from '../../components/ChipMarquee';
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

/** Explore hub cross-links row (TASK-316) — additive, keeps copy intact. */
const ExploreLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  flex-wrap: wrap;
`;

export function CommunityView() {
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
              <ChipMarquee intro={t('community.examplesIntro')} />
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
