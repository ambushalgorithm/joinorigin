'use client';

import { Trans, useI18n } from '@joinorigin/i18n';

import MenuPageShell from '../../components/MenuPageShell';
import Reveal from '../../components/Reveal';
import {
  AccentLink,
  BodyCopy,
  BulletList,
  ListItem,
  PageContainer,
  Section,
  SectionTitle,
  SubTitle,
} from '../../components/menuPagePrimitives';

/**
 * Privacy policy view (discovery §5.8, redesign spec sprint-8 §8.6): short,
 * plain-English legal copy. One `<h1>` (rendered by `MenuHero`) and semantic
 * sections. The hero lead reuses the existing "What we collect" first
 * paragraph verbatim (spec §6 copy table).
 *
 * i18n: all copy reads from the active locale dictionary; the contact body
 * uses `<Trans>` numbered tags (arch-i18n §4.1).
 */

const CONTACT_EMAIL = 'hello@joinorigin.com';

export function PrivacyView() {
  const { t } = useI18n();

  return (
    <MenuPageShell
      hero={{
        eyebrow: t('privacy.hero.eyebrow'),
        title: t('privacy.hero.title'),
        lead: t('privacy.hero.lead'),
        scene: '/assets/menu/scenes/privacy-scene.svg',
        accent: 'privacy',
      }}
      ctaOverride={{
        headline: t('common.questionsAboutOrigin'),
        subline: t('common.teamRepliesWithin2Days'),
        ctaLabel: t('common.contactUs'),
      }}
    >
      <PageContainer>
        <Reveal>
          <Section>
            <SectionTitle>{t('privacy.sectionCollect')}</SectionTitle>
            <BulletList>
              <ListItem>
                <SubTitle>{t('privacy.collect.waitlistDataTitle')}</SubTitle>
                <BodyCopy>{t('privacy.collect.waitlistDataBody')}</BodyCopy>
              </ListItem>
              <ListItem>
                <SubTitle>{t('privacy.collect.analyticsTitle')}</SubTitle>
                <BodyCopy>{t('privacy.collect.analyticsBody')}</BodyCopy>
              </ListItem>
              <ListItem>
                <SubTitle>{t('privacy.collect.technicalDataTitle')}</SubTitle>
                <BodyCopy>{t('privacy.collect.technicalDataBody')}</BodyCopy>
              </ListItem>
            </BulletList>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('privacy.sectionUse')}</SectionTitle>
            <BodyCopy>{t('privacy.useBody')}</BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('privacy.sectionIdentity')}</SectionTitle>
            <BodyCopy>{t('privacy.identityBody')}</BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('privacy.sectionRights')}</SectionTitle>
            <BodyCopy>{t('privacy.rightsBody')}</BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('privacy.sectionContact')}</SectionTitle>
            <BodyCopy>
              <Trans
                i18nKey="privacy.contactBody"
                values={{ email: CONTACT_EMAIL }}
                components={[
                  <AccentLink key="mail" href={`mailto:${CONTACT_EMAIL}`} />,
                  <AccentLink key="contact" href="/contact" />,
                ]}
              />
            </BodyCopy>
          </Section>
        </Reveal>
      </PageContainer>
    </MenuPageShell>
  );
}
