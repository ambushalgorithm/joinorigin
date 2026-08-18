'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { Trans, useI18n } from '@joinorigin/i18n';

import MenuPageShell from '../../components/MenuPageShell';
import Reveal from '../../components/Reveal';
import SectionBand from '../../components/SectionBand';
import {
  BodyCopy,
  BulletList,
  Card,
  CardBody,
  CardGrid,
  CardTitle,
  ListItem,
  PageContainer,
  Section,
  SectionTitle,
} from '../../components/menuPagePrimitives';
import { GUIDES_HUB_PATH } from '../../lib/seo/guides';

/**
 * Community OS Glossary hub view (design §6.3 — L2b hub).
 *
 * Sprint 12 ships the hub only (glossary term pages deferred). The hub
 * defines the glossary concept, lists the glossary term set, and cross-links
 * to the guides hub + flagship city pages. Single H1 via `MenuHero`.
 *
 * Sprint 18 (TASK-413): hub cards show the real translated definitions from
 * the `seoContent.glossary.terms.<slug>` dictionary keys — the "coming soon"
 * placeholder is gone. TASK-444: card title/definition render via the
 * `.name`/`.definition` leaf keys (the `terms.<slug>` node is an object and
 * `t()` rejects objects) and the section bodies render from the
 * `whyBody`/`termsIntro`/`goDeeperItem*` keys. Term pages remain deferred
 * (hub cards only).
 */

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

/**
 * Glossary term set (design §6.3 / content-strategy §4.4). Each hub card
 * renders the canonical term name (`terms.<slug>.name`) plus the translated
 * definition (`terms.<slug>.definition`) pulled from
 * `seoContent.glossary.terms.<slug>` (TASK-411/TASK-413 keys, TASK-444
 * object-shape fix).
 */
const GLOSSARY_TERMS = [
  'community',
  'community-manager',
  'community-os',
  'moderation',
  'onboarding',
  'activation',
  'engagement-loop',
  'hybrid-events',
  'co-founder',
] as const;

export function GlossaryHubView() {
  const { t } = useI18n();

  return (
    <MenuPageShell
      hero={{
        eyebrow: t('seoContent.glossary.eyebrow'),
        title: t('seoContent.glossary.title'),
        lead: t('seoContent.glossary.intro'),
        scene: 'docs',
        accent: 'docs',
        cta: { variant: 'waitlist', label: t('seoContent.cta.joinWaitlist') },
      }}
    >
      <SectionBand variant="glass" accent="docs" glow>
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.glossary.whyTitle')}</SectionTitle>
              <BodyCopy>{t('seoContent.glossary.whyBody')}</BodyCopy>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="plain">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.glossary.termsTitle')}</SectionTitle>
              <BodyCopy>{t('seoContent.glossary.termsIntro')}</BodyCopy>
              <CardGrid>
                {GLOSSARY_TERMS.map((slug) => (
                  <Card key={slug}>
                    <CardTitle>{t(`seoContent.glossary.terms.${slug}.name`)}</CardTitle>
                    <CardBody>{t(`seoContent.glossary.terms.${slug}.definition`)}</CardBody>
                  </Card>
                ))}
              </CardGrid>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="glass" accent="docs">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.glossary.goDeeper')}</SectionTitle>
              <BulletList>
                <ListItem>
                  <Trans
                    i18nKey="seoContent.glossary.goDeeperItem1"
                    components={[<StyledLink key="hub" href={GUIDES_HUB_PATH} />]}
                  />
                </ListItem>
                <ListItem>
                  <Trans
                    i18nKey="seoContent.glossary.goDeeperItem2"
                    components={[
                      <StyledLink key="nyc" href="/location/united-states/new-york/new-york" />,
                      <StyledLink key="berlin" href="/location/germany/berlin/berlin" />,
                    ]}
                  />
                </ListItem>
              </BulletList>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>
    </MenuPageShell>
  );
}

export default GlossaryHubView;
