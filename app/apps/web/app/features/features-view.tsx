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
  CompareTable,
  FaqAnswer,
  FaqCard,
  FaqQuestion,
  FaqSection,
  PageContainer,
  Section,
  SectionTitle,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/menuPagePrimitives';
import { faqEntries, faqNamespace } from '../../lib/faq';
import { JsonLd } from '../../lib/seo/JsonLdScript';
import { faqPage } from '../../lib/seo/jsonLd';

/**
 * Features view (discovery §5.2, redesign spec sprint-8 §8.1, elevated
 * sprint-10 §8.1): Core Objects cards, comparison table, roadmap cards, and
 * FAQ — each wrapped in alternating glass/plain `SectionBand`s. One `<h1>`
 * (rendered by `MenuHero`), a real `<table>` for the comparison, the "social
 * collaboration network" definition in the intro, and the hero CTA + trust
 * row for homepage-standard engagement.
 *
 * i18n: all copy reads from the active locale dictionary (arch-i18n §7.4).
 */

const CORE_OBJECT_KEYS = [
  'ideas',
  'projects',
  'feed',
  'communities',
  'communication',
  'profiles',
  'opportunities',
  'companies',
] as const;

const COMPARISON_KEYS = ['linkedin', 'discord', 'reddit', 'github'] as const;

const ROADMAP_PHASE_KEYS = ['phase1', 'phase2', 'phase3'] as const;

/** Explore hub cross-links row (TASK-316) — additive, keeps copy intact. */
const ExploreLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  margin: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.md}px;
  flex-wrap: wrap;
`;

export function FeaturesView() {
  const { t, dictionary } = useI18n();
  const faq = faqEntries(faqNamespace(dictionary, 'features'));

  return (
    <MenuPageShell
      hero={{
        eyebrow: t('features.hero.eyebrow'),
        title: t('features.hero.title'),
        lead: t('features.hero.lead'),
        scene: 'features',
        accent: 'features',
        cta: { variant: 'waitlist', label: t('common.joinWaitlist') },
        meta: { avatars: true },
      }}
    >
      
      <SectionBand variant="plain">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('features.sectionComparison')}</SectionTitle>
              <BodyCopy>{t('features.comparisonIntro')}</BodyCopy>
              <ExploreLinks>
                <AccentLink href="/location">{t('common.nav.locations')}</AccentLink>
                <AccentLink href="/guides">{t('common.nav.guides')}</AccentLink>
                <AccentLink href="/glossary">{t('common.nav.glossary')}</AccentLink>
              </ExploreLinks>
              <CompareTable data-testid="features-comparison-table">
                <TableHead>
                  <TableRow>
                    <TableHeader scope="col">{t('features.comparison.toolHeader')}</TableHeader>
                    <TableHeader scope="col">{t('features.comparison.greatAtHeader')}</TableHeader>
                    <TableHeader scope="col">{t('features.comparison.addsHeader')}</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {COMPARISON_KEYS.map((row) => (
                    <TableRow key={row}>
                      <TableCell>{t(`features.comparison.${row}.tool`)}</TableCell>
                      <TableCell>{t(`features.comparison.${row}.strength`)}</TableCell>
                      <TableCell>{t(`features.comparison.${row}.gap`)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </CompareTable>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="glass" accent="features" glow>
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('features.sectionCoreObjects')}</SectionTitle>
              <CardGrid>
                {CORE_OBJECT_KEYS.map((object, index) => (
                  <Reveal key={object} delay={`${index * 0.08}s`}>
                    <Card>
                      <CardTitle>{t(`common.objects.${object}`)}</CardTitle>
                      <CardBody>{t(`features.coreObjects.${object}.body`)}</CardBody>
                    </Card>
                  </Reveal>
                ))}
              </CardGrid>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="glass" accent="features">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('features.sectionRoadmap')}</SectionTitle>
              <CardGrid>
                {ROADMAP_PHASE_KEYS.map((phase, index) => (
                  <Reveal key={phase} delay={`${index * 0.08}s`}>
                    <Card>
                      <CardTitle>{t(`common.roadmap.${phase}Title`)}</CardTitle>
                      <CardBody>{t(`features.roadmap.${phase}.body`)}</CardBody>
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
