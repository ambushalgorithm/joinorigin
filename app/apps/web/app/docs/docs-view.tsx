'use client';

import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

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
 * Docs view (discovery §5.5, redesign spec sprint-8 §8.3, elevated
 * sprint-10 §8.3): concepts (one definitional paragraph per core object),
 * roadmap cards, architecture & standards, and FAQ — with a sticky in-page
 * `AnchorNav` and alternating glass/plain `SectionBand`s. One `<h1>`
 * (rendered by `MenuHero`); each core object keeps an `<h3>` inside its card
 * for LLM extraction; each section `h2` carries an `id` for the anchor nav.
 *
 * i18n: all copy reads from the active locale dictionary (arch-i18n §7.4).
 */

const CONCEPT_KEYS = [
  'profiles',
  'communities',
  'ideas',
  'communication',
  'feed',
  'projects',
  'companies',
  'opportunities',
] as const;

const ROADMAP_PHASE_KEYS = ['phase1', 'phase2', 'phase3'] as const;

/** Explore hub cross-links row (TASK-316) — additive, keeps copy intact. */
const ExploreLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  flex-wrap: wrap;
`;

export function DocsView() {
  const { t, dictionary } = useI18n();
  const faq = faqEntries(faqNamespace(dictionary, 'docs'));

  return (
    <MenuPageShell
      hero={{
        eyebrow: t('docs.hero.eyebrow'),
        title: t('docs.hero.title'),
        lead: t('docs.hero.lead'),
        scene: 'docs',
        accent: 'docs',
        cta: { variant: 'waitlist', label: t('common.joinWaitlist') },
      }}
      subnav={{
        label: t('docs.hero.eyebrow'),
        links: [
          { id: 'architecture', label: t('docs.sectionArchitecture') },
          { id: 'faq', label: t('common.faqHeading') },
          { id: 'concepts', label: t('docs.sectionConcepts') },
          { id: 'roadmap', label: t('docs.sectionRoadmap') },
        ],
      }}
    >
      <SectionBand variant="glass" accent="docs">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle id="architecture">{t('docs.sectionArchitecture')}</SectionTitle>
              <BodyCopy>{t('docs.architectureParagraph1')}</BodyCopy>
              <BodyCopy>{t('docs.architectureParagraph2')}</BodyCopy>
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
              <SectionTitle id="faq">{t('common.faqHeading')}</SectionTitle>
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

      <SectionBand variant="plain">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle id="roadmap">{t('docs.sectionRoadmap')}</SectionTitle>
              <CardGrid>
                {ROADMAP_PHASE_KEYS.map((phase, index) => (
                  <Reveal key={phase} delay={`${index * 0.08}s`}>
                    <Card>
                      <CardTitle>{t(`common.roadmap.${phase}Title`)}</CardTitle>
                      <CardBody>{t(`docs.roadmap.${phase}.body`)}</CardBody>
                    </Card>
                  </Reveal>
                ))}
              </CardGrid>
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
