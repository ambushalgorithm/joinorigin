'use client';

import { useI18n } from '@joinorigin/i18n';

import MenuPageShell from '../../components/MenuPageShell';
import Reveal from '../../components/Reveal';
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
} from '../../components/menuPagePrimitives';
import { faqEntries, faqNamespace } from '../../lib/faq';
import { JsonLd } from '../../lib/seo/JsonLdScript';
import { faqPage } from '../../lib/seo/jsonLd';

/**
 * Docs view (discovery §5.5, redesign spec sprint-8 §8.3): concepts (one
 * definitional paragraph per core object), roadmap cards, architecture &
 * standards, and FAQ. One `<h1>` (rendered by `MenuHero`); each core object
 * keeps an `<h3>` inside its card for LLM extraction.
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

const ROADMAP_PHASE_KEYS = ['phase1', 'phase2', 'phase3', 'phase4', 'phase5'] as const;

export function DocsView() {
  const { t, dictionary } = useI18n();
  const faq = faqEntries(faqNamespace(dictionary, 'docs'));

  return (
    <MenuPageShell
      hero={{
        eyebrow: t('docs.hero.eyebrow'),
        title: t('docs.hero.title'),
        lead: t('docs.hero.lead'),
        scene: '/assets/menu/scenes/docs-scene.svg',
        accent: 'docs',
      }}
    >
      <PageContainer>
        <Reveal>
          <Section>
            <SectionTitle>{t('docs.sectionConcepts')}</SectionTitle>
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

        <Reveal>
          <Section>
            <SectionTitle>{t('docs.sectionRoadmap')}</SectionTitle>
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

        <Reveal>
          <Section>
            <SectionTitle>{t('docs.sectionArchitecture')}</SectionTitle>
            <BodyCopy>{t('docs.architectureParagraph1')}</BodyCopy>
            <BodyCopy>{t('docs.architectureParagraph2')}</BodyCopy>
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
