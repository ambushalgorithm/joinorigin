'use client';

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import HubSearchInput from '../../components/HubSearchInput';
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
import { filterByKeyword } from '../../lib/search/hubFilter';
import { useDebouncedValue } from '../../lib/search/useDebouncedValue';
import type { GuidePageEntry } from '../../lib/seo/guides';
import { GLOSSARY_HUB_PATH } from '../../lib/seo/guides';

/**
 * Community Building hub view (design §6.3) — pillar page listing all 7 L1
 * guides as cards, plus links to the glossary and the flagship city pages
 * (topic-cluster backbone). Single H1 via `MenuHero`.
 *
 * TASK-326 — hub copy re-centered on the digital connect→join→room model:
 * finding, joining, and starting groups, then communicating in a
 * creator-controlled room (§6.1); in-person events remain downstream.
 *
 * TASK-317 — the guide card grid is filtered client-side by title/keyword
 * with a debounced search input (~180ms). No new route, no server
 * round-trip; the registry (`GuidePageEntry[]`) is the only data source.
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
  const [guideQuery, setGuideQuery] = useState('');
  const debouncedGuideQuery = useDebouncedValue(guideQuery);
  const filteredEntries = filterByKeyword(
    entries,
    debouncedGuideQuery,
    (entry) => `${entry.title} ${entry.description}`,
  );
  const hasGuideMatches = filteredEntries.length > 0;

  return (
    <MenuPageShell
      hero={{
        eyebrow: t('seoContent.guides.hubEyebrow'),
        title: t('seoContent.guides.hubTitle'),
        lead: 'Seven practical, evergreen how-to guides for finding, joining, and starting groups — and communicating in a creator-controlled room. From the first group to healthy moderation.',
        scene: 'community',
        accent: 'community',
        cta: { variant: 'waitlist', label: t('seoContent.cta.joinWaitlist') },
      }}
    >
      <SectionBand variant="glass" accent="community" glow>
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.guides.allGuides')}</SectionTitle>
              <HubSearchInput
                id="guides-hub-search"
                label="Search guides"
                placeholder="Search by guide title or keyword"
                value={guideQuery}
                onChange={setGuideQuery}
                data-testid="guides-hub-search"
              />
              {hasGuideMatches ? (
                <CardGrid data-testid="guides-hub-grid">
                  {filteredEntries.map((entry) => (
                    <Card key={entry.slug}>
                      <CardTitle>
                        <StyledLink href={entry.path}>{entry.title}</StyledLink>
                      </CardTitle>
                      <CardBody>{entry.description}</CardBody>
                    </Card>
                  ))}
                </CardGrid>
              ) : (
                <BodyCopy data-testid="guides-hub-empty" role="status">
                  No guides match “{debouncedGuideQuery}”.
                </BodyCopy>
              )}
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="plain">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.guides.glossarySection')}</SectionTitle>
              <BodyCopy>
                Learn the core terms behind groups, rooms, moderation, onboarding, and engagement
                loops in the{' '}
                <StyledLink href={GLOSSARY_HUB_PATH}>
                  {t('seoContent.guides.glossarySection')}
                </StyledLink>
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
              <SectionTitle>{t('seoContent.guides.startLocal')}</SectionTitle>
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
                    <CardBody>{t('seoContent.guides.cityCardBody', { city: city.name })}</CardBody>
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
