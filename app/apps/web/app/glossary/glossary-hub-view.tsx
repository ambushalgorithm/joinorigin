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
 * defines the glossary concept, lists the seeded term set, and cross-links
 * to the guides hub + flagship city pages. Single H1 via `MenuHero`.
 */

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

/** Seeded term set (design §6.3 — term pages deferred; hub lists them). */
const SEEDED_TERMS = [
  'Community',
  'Community manager',
  'Community OS',
  'Moderation',
  'Onboarding',
  'Activation',
  'Engagement loop',
  'Hybrid events',
  'Co-founder',
];

export function GlossaryHubView() {
  const { t } = useI18n();

  return (
    <MenuPageShell
      hero={{
        eyebrow: 'Community OS',
        title: 'Community OS Glossary',
        lead: 'The essential vocabulary of community building — clear definitions for the terms organizers, moderators, and founders use every day.',
        scene: 'docs',
        accent: 'docs',
        cta: { variant: 'waitlist', label: t('common.joinWaitlist') },
      }}
    >
      <SectionBand variant="glass" accent="docs" glow>
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>Why a glossary</SectionTitle>
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
              <SectionTitle>Terms we will define</SectionTitle>
              <BodyCopy>
                The glossary term pages are coming soon. In the meantime, here are the terms we are
                planning to define:
              </BodyCopy>
              <CardGrid>
                {SEEDED_TERMS.map((term) => (
                  <Card key={term}>
                    <CardTitle>{term}</CardTitle>
                    <CardBody>Definition coming soon.</CardBody>
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
              <SectionTitle>Go deeper</SectionTitle>
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
