'use client';

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import HubSearchInput from '../HubSearchInput';
import MenuPageShell from '../MenuPageShell';
import Reveal from '../Reveal';
import SectionBand from '../SectionBand';
import { filterByKeyword } from '../../lib/search/hubFilter';
import { useDebouncedValue } from '../../lib/search/useDebouncedValue';
import {
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
  Section,
  SectionTitle,
} from '../menuPagePrimitives';
import LocationCta from './LocationCta';
import TranslatePageLink from '../TranslatePageLink';
import type { LocationViewData } from '../../lib/seo/locationView';

/**
 * Location page view (design §6.4, §8.5) — rendered by the `/location/**`
 * server wrappers from the registry view model (`lib/seo/locationView.ts`).
 *
 * Template anatomy per design §6.4:
 *  1. unique city intro (hero lead — authored content),
 *  2. city data block (data points),
 *  3. group-type links (only committed variants + the idea page),
 *  4. related links (sibling cities + guides — internal-link mesh §8.5),
 *  5. FAQ block (mirrored 1:1 in FAQPage JSON-LD by the server wrapper),
 *  6. honest presence claim ("Find or start a community in {city}"),
 *  7. waitlist CTA wired to `/api/leads` + `trackEvent('signup_click')`.
 *
 * One `<h1>` comes from `MenuHero`; all sections use `h2`/`h3` so the
 * heading hierarchy stays clean for crawlers and LLMs.
 */

const BreadcrumbNav = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 64px 24px;

  @media (max-width: 1024px) {
    padding: 24px 32px 24px;
  }

  @media (max-width: 480px) {
    padding: 20px 20px 20px;
  }
`;

const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
`;

/** Breadcrumb row + the secondary "Translate this page" link-out (TASK-318):
 *  the link sits inline-end of the breadcrumbs, visually unobtrusive and
 *  never competing with the language switcher. */
const BreadcrumbRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
`;

const BreadcrumbItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textMuted};

  &::after {
    content: '/';
    color: ${({ theme }) => theme.colors.border};
  }

  &:last-child::after {
    content: none;
  }
`;

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

const BreadcrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TagItem = styled.li``;

const TagLink = styled(Link)<{ $current?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid
    ${({ theme, $current }) => ($current ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.pill}px;
  background: ${({ theme, $current }) =>
    $current ? `${theme.colors.primary}1A` : theme.colors.surface};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme, $current }) => ($current ? theme.colors.primary : theme.colors.text)};
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 8px 24px rgba(93, 124, 255, 0.25);
  }
`;

const IdeaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const IdeaCard = styled(Card)``;

const IdeaAudience = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xs}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.caption}px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`;

const IdeaPitch = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xs}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const IdeaVenue = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.caption}px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Attribution = styled.p`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 64px 64px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.caption}px;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: 1024px) {
    padding: 0 32px 64px;
  }

  @media (max-width: 480px) {
    padding: 0 20px 48px;
  }
`;

/** Ordered step list for the "How to start" enrichment section (TASK-319). */
const StepList = styled.ol`
  margin: 0;
  padding: 0;
  padding-left: ${({ theme }) => theme.spacing.lg}px;
  list-style: decimal;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};

  li + li {
    margin-top: ${({ theme }) => theme.spacing.sm}px;
  }
`;

/** Human label for a hub-directory entry kind (TASK-317 card body). */
function hubDirectoryKindLabel(kind: string): string {
  switch (kind) {
    case 'country':
      return 'Country';
    case 'region':
      return 'Region';
    case 'city':
      return 'City';
    case 'variant':
      return 'Community type';
    case 'ideas':
      return 'Community event ideas';
    default:
      return 'Location';
  }
}

export function LocationView({ data }: { data: LocationViewData }) {
  const { t } = useI18n();
  const heroTitle = data.heading;
  const heroLead = data.lead;
  const isIdeas = data.kind === 'ideas';
  const hasGroupLinks = data.groupTypeLinks.length > 0;
  const hasSiblings = data.siblingCities.length > 0;
  const hasFaq = data.faq.length > 0;

  // TASK-319 — variant enrichment: only variant pages with committed
  // venues/formats/howToStart render the distinct "Where {type} communities
  // gather" / "Typical formats" / "How to start" sections. The heading label
  // reuses the group-type chrome dictionary so it stays localized.
  const hasVariantEnrichment =
    data.kind === 'variant' && !!data.groupType && !!data.variantEnrichment;
  const currentGroupLabel = hasVariantEnrichment
    ? t(
        `seoContent.groupTypes.${
          data.groupType === 'small-business' ? 'smallBusiness' : data.groupType
        }`,
      )
    : '';

  // TASK-317 — the `/location` hub search/filter: a browsable directory of
  // every indexable location page (country/region/city/group-type/ideas),
  // filtered client-side by keyword with a debounced input (~180ms). No new
  // route, no server round-trip, no separate index — the registry already
  // carries the entries (`hubDirectory` is populated for the hub only).
  const isHub = data.kind === 'hub';
  const hubDirectory = data.hubDirectory ?? [];
  const [hubQuery, setHubQuery] = useState('');
  const debouncedHubQuery = useDebouncedValue(hubQuery);
  const filteredDirectory = filterByKeyword(hubDirectory, debouncedHubQuery, (entry) => entry.name);
  const hasDirectoryMatches = filteredDirectory.length > 0;

  // Hero eyebrow + breadcrumb chrome follow the active cookie locale via the
  // `seoContent` namespace (TASK-310); the server view model still carries
  // the route-locale values as a deterministic fallback for the JSON-LD
  // mirror and for non-hydrated rendering.
  const eyebrow = t(`seoContent.eyebrow.${data.kind}`);
  const crumbLabel = (crumb: (typeof data.breadcrumbs)[number]) => {
    if (crumb.path === '/') return t('seoContent.breadcrumb.home');
    if (crumb.path === '/location') return t('seoContent.breadcrumb.hub');
    return crumb.name;
  };

  /** Group-type link label — prefers the client chrome dictionary (cookie
   *  locale), falls back to the server-baked label. */
  const groupLinkLabel = (link: (typeof data.groupTypeLinks)[number]) => {
    if (link.key === 'ideas') return t('seoContent.location.ideasLink');
    if (link.key) {
      const chromeKey = link.key === 'small-business' ? 'smallBusiness' : link.key;
      return t(`seoContent.groupTypes.${chromeKey}`);
    }
    return link.label;
  };

  return (
    <MenuPageShell
      hero={{
        eyebrow,
        title: heroTitle,
        lead: heroLead,
        scene: 'community',
        accent: 'community',
        meta: { stat: false, avatars: false },
      }}
      showCtaBand={false}
    >
      <BreadcrumbNav aria-label="Breadcrumb" data-testid="location-breadcrumbs">
        <BreadcrumbRow>
          <BreadcrumbList>
            {data.breadcrumbs.map((crumb, index) =>
              index === data.breadcrumbs.length - 1 ? (
                <BreadcrumbItem key={crumb.path}>
                  <BreadcrumbCurrent aria-current="page">{crumbLabel(crumb)}</BreadcrumbCurrent>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem key={crumb.path}>
                  <BreadcrumbLink href={crumb.path}>{crumbLabel(crumb)}</BreadcrumbLink>
                </BreadcrumbItem>
              ),
            )}
          </BreadcrumbList>
          {/* EN canonical pages only — the de Berlin surface is already
              translated (TASK-318). */}
          {data.locale === 'en' ? (
            <TranslatePageLink labelKey="seoContent.location.translatePage" />
          ) : null}
        </BreadcrumbRow>
      </BreadcrumbNav>

      <SectionBand variant="glass" accent="community" glow>
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>
                {t('seoContent.location.presenceClaim', { city: data.entityLabel })}
              </SectionTitle>
              <BodyCopy data-testid="location-intro">{data.intro || data.lead}</BodyCopy>
            </Section>
          </Reveal>

          {data.dataPoints.length > 0 ? (
            <Reveal>
              <Section>
                <SectionTitle>{t('seoContent.location.cityFacts')}</SectionTitle>
                <BulletList data-testid="location-data-points">
                  {data.dataPoints.map((point) => (
                    <ListItem key={point}>{point}</ListItem>
                  ))}
                </BulletList>
              </Section>
            </Reveal>
          ) : null}

          {hasGroupLinks ? (
            <Reveal>
              <Section>
                <SectionTitle>
                  {isIdeas
                    ? t('seoContent.location.groupTypesInCity')
                    : t('seoContent.location.exploreGroupTypes')}
                </SectionTitle>
                <TagList data-testid="location-group-type-links">
                  {data.groupTypeLinks.map((link) => (
                    <TagItem key={link.path}>
                      <TagLink href={link.path} $current={link.current}>
                        {groupLinkLabel(link)}
                      </TagLink>
                    </TagItem>
                  ))}
                </TagList>
              </Section>
            </Reveal>
          ) : null}
        </PageContainer>
      </SectionBand>

      {/* TASK-319 — variant enrichment: distinct "Where {type} communities
          gather" (venues) / "Typical formats" / "How to start" sections on
          variant pages only. Body copy comes from the per-city content files;
          headings are seoContent.* chrome keys (localized via the active
          locale). */}
      {hasVariantEnrichment && data.variantEnrichment ? (
        <SectionBand variant="plain">
          <PageContainer>
            <Reveal>
              <Section data-testid="variant-enrichment">
                <SectionTitle data-testid="variant-enrichment-venues-title">
                  {t('seoContent.location.variantVenuesTitle', { type: currentGroupLabel })}
                </SectionTitle>
                <BulletList data-testid="variant-enrichment-venues">
                  {data.variantEnrichment.venues.map((venue) => (
                    <ListItem key={venue}>{venue}</ListItem>
                  ))}
                </BulletList>
              </Section>
            </Reveal>
            <Reveal>
              <Section>
                <SectionTitle data-testid="variant-enrichment-formats-title">
                  {t('seoContent.location.variantFormatsTitle')}
                </SectionTitle>
                <BulletList data-testid="variant-enrichment-formats">
                  {data.variantEnrichment.formats.map((format) => (
                    <ListItem key={format}>{format}</ListItem>
                  ))}
                </BulletList>
              </Section>
            </Reveal>
            <Reveal>
              <Section>
                <SectionTitle data-testid="variant-enrichment-howto-title">
                  {t('seoContent.location.variantHowToTitle')}
                </SectionTitle>
                <StepList data-testid="variant-enrichment-howto">
                  {data.variantEnrichment.howToStart.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </StepList>
              </Section>
            </Reveal>
          </PageContainer>
        </SectionBand>
      ) : null}

      {isHub && hubDirectory.length > 0 ? (
        <SectionBand variant="plain">
          <PageContainer>
            <Section>
              <SectionTitle data-testid="location-hub-directory-title">
                Browse locations
              </SectionTitle>
              <HubSearchInput
                id="location-hub-search"
                label="Search locations"
                placeholder="Search by city, country, or community type"
                value={hubQuery}
                onChange={setHubQuery}
                data-testid="location-hub-search"
              />
              {hasDirectoryMatches ? (
                <CardGrid data-testid="location-hub-directory">
                  {filteredDirectory.map((entry) => (
                    <Card key={entry.path}>
                      <CardTitle>
                        <Link
                          href={entry.path}
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {entry.name}
                        </Link>
                      </CardTitle>
                      <CardBody>{hubDirectoryKindLabel(entry.kind)}</CardBody>
                    </Card>
                  ))}
                </CardGrid>
              ) : (
                <BodyCopy data-testid="location-hub-empty" role="status">
                  No locations match “{debouncedHubQuery}”.
                </BodyCopy>
              )}
            </Section>
          </PageContainer>
        </SectionBand>
      ) : null}

      {isIdeas && data.ideaCategories ? (
        <SectionBand variant="plain">
          <PageContainer>
            {data.ideaCategories.map((category, categoryIndex) => (
              <Reveal key={category.name}>
                <Section>
                  <SectionTitle>{category.name}</SectionTitle>
                  <IdeaGrid data-testid="location-idea-grid">
                    {category.ideas.map((idea) => (
                      <IdeaCard key={idea.title}>
                        <CardTitle>{idea.title}</CardTitle>
                        <IdeaAudience>{idea.audience}</IdeaAudience>
                        <IdeaPitch>{idea.pitch}</IdeaPitch>
                        <IdeaVenue>{idea.venueType}</IdeaVenue>
                      </IdeaCard>
                    ))}
                  </IdeaGrid>
                  {categoryIndex === 0 ? null : null}
                </Section>
              </Reveal>
            ))}
          </PageContainer>
        </SectionBand>
      ) : null}

      {hasSiblings ? (
        <SectionBand variant={isIdeas ? 'glass' : 'plain'}>
          <PageContainer>
            <Reveal>
              <Section>
                <SectionTitle>
                  {data.kind === 'hub'
                    ? t('seoContent.location.flagshipCities')
                    : t('seoContent.location.nearbyCities')}
                </SectionTitle>
                <CardGrid data-testid="location-sibling-cities">
                  {data.siblingCities.map((sibling) => (
                    <Card key={sibling.path}>
                      <CardTitle>
                        <Link
                          href={sibling.path}
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {sibling.name}
                        </Link>
                      </CardTitle>
                      <CardBody>{t('seoContent.location.exploreCommunities')}</CardBody>
                    </Card>
                  ))}
                </CardGrid>
              </Section>
            </Reveal>
          </PageContainer>
        </SectionBand>
      ) : null}

      <SectionBand variant="plain">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.location.guidesTitle')}</SectionTitle>
              <CardGrid data-testid="location-guide-links">
                {data.guideLinks.map((guide) => (
                  <Card key={guide.path}>
                    <CardTitle>
                      <Link href={guide.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {guide.title}
                      </Link>
                    </CardTitle>
                    <CardBody>{t('seoContent.location.stepByStepGuide')}</CardBody>
                  </Card>
                ))}
              </CardGrid>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      {hasFaq ? (
        <SectionBand variant="glass">
          <PageContainer>
            <Reveal>
              <Section>
                <SectionTitle>{t('seoContent.location.faqHeading')}</SectionTitle>
                <FaqSection data-testid="location-faq">
                  {data.faq.map((entry) => (
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
      ) : null}

      <LocationCta source={data.waitlistSource} />
      <Attribution>{data.attribution}</Attribution>
    </MenuPageShell>
  );
}

export default LocationView;
