'use client';

import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import MenuPageShell from '../../components/MenuPageShell';
import Reveal from '../../components/Reveal';
import { ENTRANCE_EASING } from '../../components/landingTokens';
import {
  BodyCopy,
  Card,
  CardBody,
  CardGrid,
  CardTitle,
  FaqAnswer,
  FaqItem,
  FaqQuestion,
  FaqSection,
  PageContainer,
  Section,
  SectionTitle,
  Stat,
  StatLabel,
  StatValue,
} from '../../components/menuPagePrimitives';
import { faqEntries, faqNamespace } from '../../lib/faq';
import { JsonLd } from '../../lib/seo/JsonLdScript';
import { faqPage } from '../../lib/seo/jsonLd';

/**
 * Community view (discovery §5.3, redesign spec sprint-8 §8.2): values,
 * example communities as gradient-border chips, and trust (2,400+ members).
 * One `<h1>` (rendered by `MenuHero`) and semantic sections; the intro
 * defines the "social collaboration network" category for LLM-crawler
 * entity clarity.
 *
 * i18n: all copy reads from the active locale dictionary (arch-i18n §7.4).
 */

const VALUE_KEYS = ['peopleFirst', 'communitiesDriveGrowth', 'collaborationCreatesValue'] as const;

const EXAMPLE_COMMUNITY_KEYS = [
  'startupFounders',
  'smallBusinesses',
  'bookClubs',
  'communityOrganizations',
  'runClubs',
  'peeWeeLeagues',
  'anyoneWithAnIdea',
] as const;

/**
 * Example-community chip (spec sprint-8 §8.2): pill `span`, gradient-border
 * tint, Urbanist label, hover accent fill slide (EASE 0.4s).
 */
const Chip = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid rgba(79, 125, 249, 0.4);
  border-radius: ${({ theme }) => theme.radius.pill}px;
  padding: 10px 18px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background: rgba(79, 125, 249, 0.9);
    transform: translateY(100%);
    transition: transform 0.4s ${ENTRANCE_EASING};
  }

  &:hover::before {
    transform: translateY(0);
  }
`;

const ChipLabel = styled.span`
  position: relative;
  z-index: 1;
`;

const ChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md}px;
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
        scene: '/assets/menu/scenes/community-scene.svg',
        accent: 'community',
      }}
    >
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

        <Reveal>
          <Section>
            <SectionTitle>{t('community.sectionExamples')}</SectionTitle>
            <BodyCopy>{t('community.examplesIntro')}</BodyCopy>
            <ChipGrid>
              {EXAMPLE_COMMUNITY_KEYS.map((community) => (
                <Chip key={community}>
                  <ChipLabel>{t(`community.examples.${community}`)}</ChipLabel>
                </Chip>
              ))}
            </ChipGrid>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('community.sectionJoin')}</SectionTitle>
            <BodyCopy>{t('community.joinCopy')}</BodyCopy>
            <Stat data-testid="community-members-stat">
              <StatValue>{t('community.joinStatValue')}</StatValue>
              <StatLabel>{t('community.joinStatLabel')}</StatLabel>
            </Stat>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('common.faqHeading')}</SectionTitle>
            <FaqSection>
              {faq.map((entry) => (
                <FaqItem key={entry.question}>
                  <FaqQuestion>{entry.question}</FaqQuestion>
                  <FaqAnswer>{entry.answer}</FaqAnswer>
                </FaqItem>
              ))}
            </FaqSection>
          </Section>
        </Reveal>
      </PageContainer>
      {/* FAQPage JSON-LD — localized mirror of the visible FAQ block
          (arch-i18n §7.4), rendered into the initial SSR HTML. */}
      <JsonLd data={faqPage(faq)} />
    </MenuPageShell>
  );
}
