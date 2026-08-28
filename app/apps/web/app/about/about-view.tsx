'use client';

import { Trans, useI18n } from '@joinorigin/i18n';

import CountUpStat from '../../components/CountUpStat';
import MenuPageShell from '../../components/MenuPageShell';
import Reveal from '../../components/Reveal';
import SectionBand from '../../components/SectionBand';
import {
  AccentLink,
  BodyCopy,
  BulletList,
  Card,
  CardBody,
  CardGrid,
  CardTitle,
  FaqAnswer,
  FaqCard,
  FaqQuestion,
  FaqSection,
  ListItem,
  PageContainer,
  Quote,
  Section,
  SectionTitle,
} from '../../components/menuPagePrimitives';
import { faqEntries, faqNamespace } from '../../lib/faq';
import { useLocalizePath } from '../../lib/seo/localePath';

/**
 * About view (discovery §5.6, redesign spec sprint-8 §8.4, elevated
 * sprint-10 §8.4): mission + principles + founder guidance, wrapped in
 * alternating glass/plain `SectionBand`s with the waitlist count-up stat
 * inside the mission band. One `<h1>` (rendered by `MenuHero`), semantic
 * sections, and the "social collaboration network" definition in the intro
 * for LLM-crawler entity clarity.
 *
 * i18n: all copy reads from the active locale dictionary; inline-link
 * sentences use `<Trans>` numbered tags (arch-i18n §4.1).
 */

const PRINCIPLE_KEYS = [
  'peopleFirst',
  'communitiesDriveGrowth',
  'collaborationCreatesValue',
] as const;

export function AboutView() {
  const { t, dictionary } = useI18n();
  const faq = faqEntries(faqNamespace(dictionary, 'about'));
  // Locale-aware internal links (Sprint 19 Goal 2, TASK-460): the shared
  // helper applies the active locale's prefix per the confirmed table —
  // unprefixed EN load keeps links unprefixed; `/en/**` stays `/en/**`;
  // `/de/**` renders `/de/**`; unprefixed load with a `de` cookie renders
  // `/de/**`.
  const localizePath = useLocalizePath();

  return (
    <MenuPageShell
      hero={{
        eyebrow: t('about.hero.eyebrow'),
        title: t('about.hero.title'),
        lead: t('about.hero.lead'),
        scene: 'about',
        accent: 'about',
        cta: { variant: 'waitlist', label: t('seoContent.cta.joinWaitlist') },
        meta: { avatars: true },
      }}
    >
      <SectionBand variant="glass" accent="about" glow>
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('about.sectionMission')}</SectionTitle>
              <BodyCopy>{t('about.missionParagraph1')}</BodyCopy>
              <CountUpStat
                valueText={t('network.joinStatValue')}
                label={t('network.joinStatLabel')}
              />
              <BodyCopy>{t('about.missionParagraph2')}</BodyCopy>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="plain">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('about.sectionPrinciples')}</SectionTitle>
              <CardGrid>
                {PRINCIPLE_KEYS.map((principle, index) => (
                  <Reveal key={principle} delay={`${index * 0.08}s`}>
                    <Card>
                      <CardTitle>{t(`common.values.${principle}`)}</CardTitle>
                      <CardBody>{t(`about.principles.${principle}.body`)}</CardBody>
                    </Card>
                  </Reveal>
                ))}
                <Reveal delay={`${PRINCIPLE_KEYS.length * 0.08}s`}>
                  <Card>
                    <CardTitle>{t('about.principles.openArchitecture.title')}</CardTitle>
                    <CardBody>{t('about.principles.openArchitecture.body')}</CardBody>
                  </Card>
                </Reveal>
              </CardGrid>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="glass" accent="about">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('about.sectionFounder')}</SectionTitle>
              <Quote>{t('about.founderQuote')}</Quote>
              <BodyCopy>{t('about.founderBody')}</BodyCopy>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="plain">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('about.sectionReading')}</SectionTitle>
              <BulletList>
                <ListItem>
                  <Trans
                    i18nKey="about.readingDocs"
                    components={[<AccentLink key="docs" href={localizePath('/docs')} />]}
                  />
                </ListItem>
                <ListItem>
                  <Trans
                    i18nKey="about.readingNetwork"
                    components={[<AccentLink key="network" href={localizePath('/network')} />]}
                  />
                </ListItem>
                <ListItem>
                  <Trans
                    i18nKey="about.readingContact"
                    components={[<AccentLink key="contact" href={localizePath('/contact')} />]}
                  />
                </ListItem>
              </BulletList>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="glass" accent="about">
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
    </MenuPageShell>
  );
}
