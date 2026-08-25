'use client';

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { Trans, useI18n } from '@joinorigin/i18n';

import HubSearchInput from '../../components/HubSearchInput';
import MenuPageShell from '../../components/MenuPageShell';
import Reveal from '../../components/Reveal';
import SectionBand from '../../components/SectionBand';
import {
  BodyCopy,
  CardBody,
  CardGrid,
  CardLink,
  CardTitle,
  PageContainer,
  Section,
  SectionTitle,
} from '../../components/menuPagePrimitives';
import { filterByKeyword } from '../../lib/search/hubFilter';
import { useDebouncedValue } from '../../lib/search/useDebouncedValue';
import { useLocalizePath } from '../../lib/seo/localePath';
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
  // Locale-aware internal links (Sprint 19 Goal 2, TASK-460): the shared
  // helper applies the active locale's prefix per the confirmed table —
  // unprefixed EN load keeps links unprefixed; `/en/**` stays `/en/**`;
  // `/de/**` renders `/de/**`; unprefixed load with a `de` cookie renders
  // `/de/**`. Server-baked locale-prefixed paths pass through idempotently.
  const localizePath = useLocalizePath();
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
        scene: 'community',
        accent: 'community',
        cta: { variant: 'waitlist', label: t('seoContent.cta.joinWaitlist') },
      }}
      leadKey="seoContent.guides.hubLead"
    >
      <SectionBand variant="glass" accent="community" glow>
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.guides.allGuides')}</SectionTitle>
              <HubSearchInput
                id="guides-hub-search"
                label={t('seoContent.guides.searchLabel')}
                placeholder={t('seoContent.guides.searchPlaceholder')}
                value={guideQuery}
                onChange={setGuideQuery}
                data-testid="guides-hub-search"
              />
              {hasGuideMatches ? (
                <CardGrid data-testid="guides-hub-grid">
                  {filteredEntries.map((entry) => (
                    <CardLink
                      key={entry.slug}
                      as={Link}
                      href={localizePath(entry.path)}
                      aria-label={entry.title}
                    >
                      <CardTitle>{entry.title}</CardTitle>
                      <CardBody>{entry.description}</CardBody>
                    </CardLink>
                  ))}
                </CardGrid>
              ) : (
                <BodyCopy data-testid="guides-hub-empty" role="status">
                  {t('seoContent.guides.emptyState', { query: debouncedGuideQuery })}
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
                <Trans
                  i18nKey="seoContent.guides.glossaryBandCopy"
                  values={{ glossary: t('seoContent.guides.glossarySection') }}
                  components={[
                    <StyledLink key="glossary" href={localizePath(GLOSSARY_HUB_PATH)} />,
                  ]}
                />
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
              <BodyCopy>{t('seoContent.guides.universalCopy')}</BodyCopy>
              <CardGrid data-testid="guides-hub-start-local">
                {entries[0]?.cities.slice(0, 6).map((city) => (
                  <CardLink
                    key={city.path}
                    as={Link}
                    href={localizePath(city.path)}
                    aria-label={city.name}
                  >
                    <CardTitle>{city.name}</CardTitle>
                    <CardBody>{t('seoContent.guides.cityCardBody', { city: city.name })}</CardBody>
                  </CardLink>
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
