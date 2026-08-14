'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import MenuPageShell from '../../components/MenuPageShell';
import Reveal from '../../components/Reveal';
import SectionBand from '../../components/SectionBand';
import {
  BodyCopy,
  Card,
  CardBody,
  CardGrid,
  CardTitle,
  PageContainer,
  Section,
  SectionTitle,
} from '../../components/menuPagePrimitives';
import type { GuidePageEntry } from '../../lib/seo/guides';
import { GLOSSARY_HUB_PATH } from '../../lib/seo/guides';

/**
 * Community Building hub view (design §6.3) — pillar page listing all 7 L1
 * guides as cards, plus links to the glossary and the flagship city pages
 * (topic-cluster backbone). Single H1 via `MenuHero`.
 */

export interface GuidesHubViewProps {
  entries: GuidePageEntry[];
}

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

export function GuidesHubView({ entries }: GuidesHubViewProps) {
  const { t } = useI18n();

  return (
    <MenuPageShell
      hero={{
        eyebrow: 'Community building',
        title: 'Community Building Guides',
        lead: 'Seven practical, evergreen how-to guides for starting, growing, and running communities — from the first idea to healthy moderation.',
        scene: 'community',
        accent: 'community',
        cta: { variant: 'waitlist', label: t('common.joinWaitlist') },
      }}
    >
      <SectionBand variant="glass" accent="community" glow>
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>All guides</SectionTitle>
              <CardGrid>
                {entries.map((entry) => (
                  <Card key={entry.slug}>
                    <CardTitle>
                      <StyledLink href={entry.path}>{entry.title}</StyledLink>
                    </CardTitle>
                    <CardBody>{entry.description}</CardBody>
                  </Card>
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
              <SectionTitle>Community OS glossary</SectionTitle>
              <BodyCopy>
                Learn the core terms behind communities, moderation, onboarding, and engagement
                loops in the <StyledLink href={GLOSSARY_HUB_PATH}>Community OS glossary</StyledLink>
                .
              </BodyCopy>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="glass" accent="community">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>Start local</SectionTitle>
              <BodyCopy>
                Guides are universal — communities are local. Find or start a community in a city
                near you:
              </BodyCopy>
              <CardGrid>
                {entries[0]?.cities.map((city) => (
                  <Card key={city.path}>
                    <CardTitle>
                      <StyledLink href={city.path}>{city.name}</StyledLink>
                    </CardTitle>
                    <CardBody>Explore real venues, groups, and how-tos in {city.name}.</CardBody>
                  </Card>
                ))}
              </CardGrid>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>
    </MenuPageShell>
  );
}

export default GuidesHubView;
