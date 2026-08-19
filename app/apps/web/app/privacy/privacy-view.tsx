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
import { useLocalizePath } from '../../lib/seo/localePath';

/**
 * Privacy policy view (discovery §5.8, redesign spec sprint-8 §8.6, elevated
 * sprint-10 §8.6): short, plain-English legal copy on a plain canvas
 * (`banded={false}`) with a sticky in-page `AnchorNav` and a ghost
 * "Contact us" hero CTA (never the waitlist modal on legal pages). One
 * `<h1>` (rendered by `MenuHero`) and semantic sections with `id`s for the
 * anchor nav. The hero lead reuses the existing "What we collect" first
 * paragraph verbatim (spec §6 copy table).
 *
 * i18n: all copy reads from the active locale dictionary; the contact body
 * uses `<Trans>` numbered tags (arch-i18n §4.1).
 */

const CONTACT_EMAIL = 'hello@joinorigin.co';

export function PrivacyView() {
  const { t } = useI18n();
  // Locale-aware internal links (Sprint 19 Goal 2, TASK-460): the shared
  // helper applies the active locale's prefix per the confirmed table —
  // unprefixed EN load keeps links unprefixed; `/en/**` stays `/en/**`;
  // `/de/**` renders `/de/**`; unprefixed load with a `de` cookie renders
  // `/de/**`. External `mailto:` hrefs pass through untouched. The hero CTA
  // href is localized by `MenuHero` (chrome) so it stays raw here.
  const localizePath = useLocalizePath();

  return (
    <MenuPageShell
      hero={{
        eyebrow: t('privacy.hero.eyebrow'),
        title: t('privacy.hero.title'),
        lead: t('privacy.hero.lead'),
        scene: 'privacy',
        accent: 'privacy',
        cta: { variant: 'contact', label: t('common.contactUs'), href: '/contact' },
      }}
      subnav={{
        label: t('privacy.hero.eyebrow'),
        links: [
          { id: 'collect', label: t('privacy.sectionCollect') },
          { id: 'use', label: t('privacy.sectionUse') },
          { id: 'identity', label: t('privacy.sectionIdentity') },
          { id: 'rights', label: t('privacy.sectionRights') },
          { id: 'contact', label: t('privacy.sectionContact') },
        ],
      }}
      banded={false}
      ctaOverride={{
        headline: t('common.questionsAboutOrigin'),
        subline: t('common.teamRepliesWithin2Days'),
        ctaLabel: t('common.contactUs'),
      }}
    >
      <PageContainer>
        <Reveal>
          <Section>
            <SectionTitle id="collect">{t('privacy.sectionCollect')}</SectionTitle>
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
            <SectionTitle id="use">{t('privacy.sectionUse')}</SectionTitle>
            <BodyCopy>{t('privacy.useBody')}</BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle id="identity">{t('privacy.sectionIdentity')}</SectionTitle>
            <BodyCopy>{t('privacy.identityBody')}</BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle id="rights">{t('privacy.sectionRights')}</SectionTitle>
            <BodyCopy>{t('privacy.rightsBody')}</BodyCopy>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle id="contact">{t('privacy.sectionContact')}</SectionTitle>
            <BodyCopy>
              <Trans
                i18nKey="privacy.contactBody"
                values={{ email: CONTACT_EMAIL }}
                components={[
                  <AccentLink key="mail" href={`mailto:${CONTACT_EMAIL}`} />,
                  <AccentLink key="contact" href={localizePath('/contact')} />,
                ]}
              />
            </BodyCopy>
          </Section>
        </Reveal>
      </PageContainer>
    </MenuPageShell>
  );
}
