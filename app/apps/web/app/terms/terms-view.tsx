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
} from '../../components/menuPagePrimitives';

/**
 * Terms of service view (discovery §5.9, redesign spec sprint-8 §8.7):
 * plain-English legal copy. One `<h1>` (rendered by `MenuHero`) and semantic
 * sections. The hero lead reuses the existing Acceptance paragraph verbatim
 * (spec §6 copy table).
 *
 * i18n: all copy reads from the active locale dictionary; the contact body
 * uses `<Trans>` numbered tags (arch-i18n §4.1).
 */

const CONTACT_EMAIL = 'hello@joinorigin.com';

export function TermsView() {
  const { t } = useI18n();

  return (
    <MenuPageShell
      hero={{
        eyebrow: t('terms.hero.eyebrow'),
        title: t('terms.hero.title'),
        lead: t('terms.hero.lead'),
        scene: '/assets/menu/scenes/terms-scene.svg',
        accent: 'terms',
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
            <SectionTitle>{t('terms.sectionAcceptance')}</SectionTitle>
            <BodyCopy>{t('terms.acceptanceBody')}</BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('terms.sectionAccounts')}</SectionTitle>
            <BodyCopy>{t('terms.accountsBody')}</BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('terms.sectionUserContent')}</SectionTitle>
            <BodyCopy>{t('terms.userContentBody')}</BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('terms.sectionAcceptableUse')}</SectionTitle>
            <BulletList>
              <ListItem>{t('terms.acceptableUse.unlawful')}</ListItem>
              <ListItem>{t('terms.acceptableUse.harassment')}</ListItem>
              <ListItem>{t('terms.acceptableUse.unauthorizedAccess')}</ListItem>
              <ListItem>{t('terms.acceptableUse.scrape')}</ListItem>
            </BulletList>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('terms.sectionIntellectualProperty')}</SectionTitle>
            <BodyCopy>{t('terms.intellectualPropertyBody')}</BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('terms.sectionDisclaimers')}</SectionTitle>
            <BodyCopy>{t('terms.disclaimersBody')}</BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('terms.sectionChanges')}</SectionTitle>
            <BodyCopy>{t('terms.changesBody')}</BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>{t('terms.sectionContact')}</SectionTitle>
            <BodyCopy>
              <Trans
                i18nKey="terms.contactBody"
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
