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

/** Inline CTA in the join band (spec §8.2 — AccentLink to the home waitlist). */
const JoinLink = styled(AccentLink)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

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
              <JoinLink href="/">{t('common.joinWaitlist')}</JoinLink>
              <ExploreLinks>
                <AccentLink href="/location">{t('common.nav.locations')}</AccentLink>
                <AccentLink href="/guides">{t('common.nav.guides')}</AccentLink>
                <AccentLink href="/glossary">{t('common.nav.glossary')}</AccentLink>
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
