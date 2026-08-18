'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

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
 * placeholder is gone. Term pages remain deferred (hub cards only).
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
 * renders the canonical term name plus the translated definition pulled from
 * `seoContent.glossary.terms.<slug>` (TASK-411 keys).
 */
const GLOSSARY_TERMS = [
  { slug: 'community', label: 'Community' },
  { slug: 'community-manager', label: 'Community manager' },
  { slug: 'community-os', label: 'Community OS' },
  { slug: 'moderation', label: 'Moderation' },
  { slug: 'onboarding', label: 'Onboarding' },
  { slug: 'activation', label: 'Activation' },
  { slug: 'engagement-loop', label: 'Engagement loop' },
  { slug: 'hybrid-events', label: 'Hybrid events' },
  { slug: 'co-founder', label: 'Co-founder' },
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
              <BodyCopy>
                Community building has its own language, and the terms are often used loosely. A
                community OS glossary gives organizers, moderators, and founders shared definitions
                they can rely on — from the classic concepts like moderation and onboarding to newer
                ideas like engagement loops and hybrid events.
              </BodyCopy>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="plain">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.glossary.termsTitle')}</SectionTitle>
              <BodyCopy>
                Here are the core terms every organizer, moderator, and founder uses — each one is
                defined in practice across the Community Building guides:
              </BodyCopy>
              <CardGrid>
                {GLOSSARY_TERMS.map(({ slug, label }) => (
                  <Card key={slug}>
                    <CardTitle>{label}</CardTitle>
                    <CardBody>{t(`seoContent.glossary.terms.${slug}`)}</CardBody>
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
                  Work through the{' '}
                  <StyledLink href={GUIDES_HUB_PATH}>Community Building guides</StyledLink> — the
                  step-by-step how-tos behind every term.
                </ListItem>
                <ListItem>
                  See the concepts in practice:{' '}
                  <StyledLink href="/location/united-states/new-york/new-york">
                    New York City
                  </StyledLink>{' '}
                  and <StyledLink href="/location/germany/berlin/berlin">Berlin</StyledLink> city
                  pages.
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
