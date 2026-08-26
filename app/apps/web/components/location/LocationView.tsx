'use client';

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import CountUpStat from '../CountUpStat';
import HubSearchInput from '../HubSearchInput';
import MenuPageShell from '../MenuPageShell';
import Reveal from '../Reveal';
import SectionBand from '../SectionBand';
import { filterByKeyword } from '../../lib/search/hubFilter';
import { useDebouncedValue } from '../../lib/search/useDebouncedValue';
import {
  AccentLink,
  BodyCopy,
  BulletList,
  Card,
  CardBody,
  CardGrid,
  CardLink,
  CardTitle,
  FaqAnswer,
  FaqCard,
  FaqQuestion,
  FaqSection,
  ListItem,
  PageContainer,
  Section,
  SectionTitle,
  SubTitle,
} from '../menuPagePrimitives';
import LocationCta from './LocationCta';
import TranslatePageLink from '../TranslatePageLink';
import { useLocalizePath } from '../../lib/seo/localePath';
import type { HubDirectorySection, LocationViewData } from '../../lib/seo/locationView';

/**
 * Location page view (design §6.4, §8.5) — rendered by the `/location/**`
 * server wrappers from the registry view model (`lib/seo/locationView.ts`).
 *
 * Template anatomy per design §6.4:
 *  1. unique city intro (authored content — each paragraph renders as its
 *     own block; the short registry lead is the fallback),
 *  2. city data block (data points),
 *  3. group-type links ("Explore community types" — committed variants +
 *     the idea page; renders for every content-rich city, tier-irrelevant),
 *  4. related links (sibling cities "Communities in nearby cities" + guides
 *     — internal-link mesh §8.5; sibling cluster renders for every
 *     content-rich city, tier-irrelevant),
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
  padding: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding: 24px 32px 24px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    padding: 24px 64px 24px;
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

  /* Visible keyboard focus indicator (Story C). */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`;

const IdeaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
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
  padding: 0 20px 48px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.caption}px;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding: 0 32px 64px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    padding: 0 64px 64px;
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

/** Explore cross-links row for the inventory banner band (TASK-491) —
 *  mirrors the /community "Join the network" band: Locations/Guides/
 *  Community accent links below the stat + explainer. */
const ExploreLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  flex-wrap: wrap;
`;

export function LocationView({ data }: { data: LocationViewData }) {
  const { t, locale: activeLocale } = useI18n();
  // Locale-aware internal links (Sprint 19 Goal 2, TASK-460): the shared
  // helper applies the active locale's prefix per the confirmed table —
  // unprefixed EN load keeps links unprefixed; `/en/**` stays `/en/**`;
  // `/de/**` renders `/de/**`; unprefixed load with a `de` cookie renders
  // `/de/**`. Server-baked locale-prefixed paths pass through idempotently.
  const localizePath = useLocalizePath();
  // TASK-477 — the hub H1 is chrome: the registry title is locale-
  // independent EN ("Communities by City — Find or Start a Community Near
  // You"), so it must resolve through the active locale dictionary
  // (`seoContent.breadcrumb.hub`) to re-translate on language toggle.
  // TASK-516 — non-hub kinds (country/region/city/variant/ideas) resolve the
  // hero H1 through the ACTIVE locale via the per-locale `headingLocalized`
  // map (committed content title → localized dataset name → EN registry
  // heading) — a titleKey/titleVars-style re-resolution that needs no new
  // i18n dictionary keys (entity names live in the dataset). The server-baked
  // `data.heading` stays the pre-hydration/SSR fallback.
  const heroTitle = data.headingLocalized?.[activeLocale] ?? data.heading;
  const heroTitleKey = data.kind === 'hub' ? 'seoContent.breadcrumb.hub' : undefined;
  const heroLead = data.lead;
  const isIdeas = data.kind === 'ideas';
  const hasGroupLinks = data.groupTypeLinks.length > 0;
  const hasSiblings = data.siblingCities.length > 0;
  const hasFaq = data.faq.length > 0;

  // TASK-491 — the hub's hero lead + location-intro block resolve through
  // the active locale dictionary (`seoContent.location.hubLead` /
  // `hubIntro`) so `/location` and per-locale hubs fully translate on
  // language toggle (the registry description is locale-independent EN
  // chrome). Fall back gracefully when the keys are absent (older
  // dictionaries / non-hub kinds): the server-baked view-model values win,
  // and a raw key string is never rendered.
  const HUB_LEAD_KEY = 'seoContent.location.hubLead';
  const HUB_INTRO_KEY = 'seoContent.location.hubIntro';
  const hubLeadResolved = data.kind === 'hub' ? t(HUB_LEAD_KEY) : undefined;
  const hubIntroResolved = data.kind === 'hub' ? t(HUB_INTRO_KEY) : undefined;
  const hubLead =
    hubLeadResolved !== undefined && hubLeadResolved !== HUB_LEAD_KEY
      ? hubLeadResolved
      : data.hubLead;
  const hubIntro =
    hubIntroResolved !== undefined && hubIntroResolved !== HUB_INTRO_KEY
      ? hubIntroResolved
      : data.hubIntro;
  const resolvedHeroLead = hubLead ?? heroLead;

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
  //
  // TASK-480 — the directory is split into 5 sections (Countries / Regions /
  // Cities / Community types / Event ideas); the search filters WITHIN each
  // section, so a keyword match in one section never hides another section's
  // matches and sections with no matches collapse.
  //
  // TASK-485 — the per-section filter matches the entry `searchText`
  // (active-locale name + EN name + dataset country/region names), so
  // "Colombia"/"Italy" resolve their country card AND the cities/variants/
  // ideas scoped to them; per-section count badges + the grand total stay
  // static (they describe the full inventory, not the filtered subset).
  const isHub = data.kind === 'hub';
  const hubDirectory = data.hubDirectory ?? [];
  const [hubQuery, setHubQuery] = useState('');
  const debouncedHubQuery = useDebouncedValue(hubQuery);
  const sectionTotals = new Map<HubDirectorySection, number>();
  for (const entry of hubDirectory) {
    sectionTotals.set(entry.section, (sectionTotals.get(entry.section) ?? 0) + 1);
  }
  const directoryTotal = hubDirectory.length;
  const directorySections = (
    [
      { key: 'countries' },
      { key: 'regions' },
      { key: 'cities' },
      { key: 'communityTypes' },
      { key: 'eventIdeas' },
    ] as const
  ).map(({ key }) => ({
    key,
    matches: filterByKeyword(
      hubDirectory.filter((entry) => entry.section === key),
      debouncedHubQuery,
      (entry) => entry.searchText,
    ),
  }));
  const hasDirectoryMatches = directorySections.some((section) => section.matches.length > 0);

  // Hero eyebrow + breadcrumb chrome follow the active cookie locale via the
  // `seoContent` namespace (TASK-310); the server view model still carries
  // the route-locale values as a deterministic fallback for the JSON-LD
  // mirror and for non-hydrated rendering.
  const eyebrow = t(`seoContent.eyebrow.${data.kind}`);
  // TASK-477 — the home + hub crumbs re-resolve through the active locale
  // dictionary so the breadcrumb chrome fully translates on language toggle.
  // TASK-516 — country/region/city crumbs re-resolve through the ACTIVE
  // locale via the per-crumb `nameLocalized` map (localized dataset names);
  // the server-baked `crumb.name` stays the pre-hydration fallback.
  // G-8 — crumbs now carry surface-prefixed paths (`/en`, `/de/location`,
  // …), so the home/hub chrome re-resolves by POSITION (first = home,
  // second = hub) instead of the old unprefixed path values.
  const crumbLabel = (crumb: (typeof data.breadcrumbs)[number], index: number) => {
    if (index === 0) return t('seoContent.breadcrumb.home');
    if (index === 1) return t('seoContent.breadcrumb.hub');
    return crumb.nameLocalized?.[activeLocale] ?? crumb.name;
  };

  // TASK-477 — the honest presence claim ("Find or start a community in
  // {{city}}") resolves the hub entity label through the active locale
  // dictionary (`seoContent.location.hubEntity`) so the claim never mixes
  // the route-locale label with the toggled claim chrome; other kinds use
  // authored/entity labels (proper nouns, unchanged across locales).
  const presenceCity = data.kind === 'hub' ? t('seoContent.location.hubEntity') : data.entityLabel;

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

  /** Plural section-title key for a hub-directory section (TASK-485) —
   *  resolves `seoContent.location.directorySectionTitles.<section>` chrome
   *  ("Countries", "Regions", "Cities", "Community types", "Event ideas"). */
  const directorySectionTitle = (section: HubDirectorySection): string =>
    t(`seoContent.location.directorySectionTitles.${section}`);

  // TASK-496 — the facts data-block label is kind-appropriate: "Country
  // facts" on country pages, "Region facts" on region pages, and "City
  // facts" on city/variant/ideas pages (never a wrong-kind label). The
  // points themselves are authored for committed content and dataset-driven
  // (population/capital/languages) for un-authored country/region pages.
  const factsTitle =
    data.kind === 'country'
      ? t('seoContent.location.countryFacts')
      : data.kind === 'region'
        ? t('seoContent.location.regionFacts')
        : t('seoContent.location.cityFacts');

  return (
    <MenuPageShell
      hero={{
        eyebrow,
        title: heroTitle,
        titleKey: heroTitleKey,
        lead: resolvedHeroLead,
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
                  <BreadcrumbCurrent aria-current="page">
                    {crumbLabel(crumb, index)}
                  </BreadcrumbCurrent>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem key={crumb.path}>
                  <BreadcrumbLink href={localizePath(crumb.path)}>
                    {crumbLabel(crumb, index)}
                  </BreadcrumbLink>
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

      {/* Guides for starting a community, renders on all routes like: /en/location/... */}
      <SectionBand variant="glass" accent="community" glow>
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.location.guidesTitle')}</SectionTitle>
              <CardGrid data-testid="location-guide-links">
                {data.guideLinks.map((guide) => (
                  <CardLink key={guide.path} as={Link} href={localizePath(guide.path)}>
                    <CardTitle>{guide.title}</CardTitle>
                    <CardBody>{t('seoContent.location.stepByStepGuide')}</CardBody>
                  </CardLink>
                ))}
              </CardGrid>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="plain" accent="community" glow>
        <PageContainer>
          {/* Find or start a community in your city, renders on route: /en/location */}
          <Reveal>
            <Section>
              <SectionTitle>
                {t('seoContent.location.presenceClaim', { city: presenceCity })}
              </SectionTitle>
              {/* City intros are paragraph arrays (TASK-410) — each entry
                  renders as its own paragraph block (TASK-416); kinds without
                  authored prose fall back to the short registry lead.
                  TASK-491 — the hub's intro resolves through the active
                  locale dictionary (`seoContent.location.hubIntro`) so
                  `/location` and per-locale hubs translate on toggle; absent
                  keys fall back to the server-baked intro/lead. */}
              <div data-testid="location-intro">
                {isHub && hubIntro ? (
                  <BodyCopy>{hubIntro}</BodyCopy>
                ) : data.intro.length > 0 ? (
                  data.intro.map((paragraph) => <BodyCopy key={paragraph}>{paragraph}</BodyCopy>)
                ) : (
                  <BodyCopy>{resolvedHeroLead}</BodyCopy>
                )}
              </div>
            </Section>
          </Reveal>

          {/* City facts, renders on routes like: /en/location/germany/berlin/berlin OR /en/location/germany/berlin/berlin/berlin
              TASK-496 — the label is kind-appropriate ("Country facts" /
              "Region facts" / "City facts") and the points are authored or
              dataset-driven (population/capital/languages), so EVERY
              country/region/city page renders this data block. */}
          {data.dataPoints.length > 0 ? (
            <Reveal>
              <Section>
                <SectionTitle>{factsTitle}</SectionTitle>
                <BulletList data-testid="location-data-points">
                  {data.dataPoints.map((point) => (
                    <ListItem key={point}>{point}</ListItem>
                  ))}
                </BulletList>
              </Section>
            </Reveal>
          ) : null}

          {/* Explore community types — renders on every content-rich city/
              variant/ideas page (tier-irrelevant, Sprint 20), e.g.
              /en/location/germany/berlin/berlin/berlin */}
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
                      <TagLink href={localizePath(link.path)} $current={link.current}>
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

      {/* Renders on routes like: /en/location/germany/berlin/berlin/small-business

          TASK-319 — variant enrichment: distinct "Where {type} communities
          gather" (venues) / "Typical formats" / "How to start" sections on
          variant pages only. Body copy comes from the per-city content files;
          headings are seoContent.* chrome keys (localized via the active
          locale). */}
      {hasVariantEnrichment && data.variantEnrichment ? (
        <SectionBand variant="plain">
          <PageContainer>
            {/* Where small business communities gather, etc */}
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

            {/* Typical formats, etc */}
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

            {/* How to start */}
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

      {/* Flagship cities, renders on route: /en/location */}
      {hasSiblings && data.kind === 'hub' ? (
        <SectionBand variant={'plain'}>
          <PageContainer>
            <Reveal>
              <Section>
                <SectionTitle>{t('seoContent.location.flagshipCities')}</SectionTitle>
                <CardGrid data-testid="location-flagship-cities">
                  {data.siblingCities.map((sibling) => (
                    <CardLink key={sibling.path} as={Link} href={localizePath(sibling.path)}>
                      <CardTitle>{sibling.name}</CardTitle>
                      <CardBody>{t('seoContent.location.exploreCommunities')}</CardBody>
                    </CardLink>
                  ))}
                </CardGrid>
              </Section>
            </Reveal>
          </PageContainer>
        </SectionBand>
      ) : null}

      {/* Inventory banner (TASK-485, elevated TASK-491): "N Places and
          Communities" stat below the hero / above the Browse-locations
          directory — the total content-rich inventory. The value is computed
          from the directory data (not hardcoded) and localized via
          formatCount. The band mirrors the /community "Join the network"
          section: SectionTitle heading + CountUpStat + BodyCopy explainer +
          ExploreLinks row (Locations/Guides/Community) — all in a glass
          community-accent SectionBand. */}
      {isHub && hubDirectory.length > 0 ? (
        <SectionBand variant="glass" accent="community" glow>
          <PageContainer>
            <Reveal>
              <Section>
                <SectionTitle>{t('seoContent.location.directoryBannerTitle')}</SectionTitle>
                <CountUpStat
                  valueText={String(directoryTotal)}
                  label={t('seoContent.location.directoryBannerLabel')}
                  testID="location-inventory-banner"
                />
                <BodyCopy>{t('seoContent.location.directoryBannerCopy')}</BodyCopy>
                <ExploreLinks data-testid="location-inventory-explore">
                  <AccentLink href={localizePath('/location')}>
                    {t('common.nav.locations')}
                  </AccentLink>
                  <AccentLink href={localizePath('/guides')}>{t('common.nav.guides')}</AccentLink>
                  <AccentLink href={localizePath('/community')}>
                    {t('common.nav.community')}
                  </AccentLink>
                </ExploreLinks>
              </Section>
            </Reveal>
          </PageContainer>
        </SectionBand>
      ) : null}

      {/* Browse locations: renders on route: /en/location */}
      {isHub && hubDirectory.length > 0 ? (
        <SectionBand variant="plain">
          <PageContainer>
            <Section>
              <SectionTitle data-testid="location-hub-directory-title">
                {t('seoContent.location.directoryTotal', { count: directoryTotal })}
              </SectionTitle>
              <HubSearchInput
                id="location-hub-search"
                label={t('seoContent.location.searchLocationsLabel')}
                placeholder={t('seoContent.location.searchLocationsPlaceholder')}
                value={hubQuery}
                onChange={setHubQuery}
                data-testid="location-hub-search"
              />
              {hasDirectoryMatches ? (
                <div data-testid="location-hub-directory">
                  {directorySections.map((section) =>
                    section.matches.length === 0 ? null : (
                      <div key={section.key}>
                        <SubTitle>
                          {directorySectionTitle(section.key)} (
                          {sectionTotals.get(section.key) ?? 0})
                        </SubTitle>
                        <CardGrid data-testid={`location-hub-directory-${section.key}`}>
                          {section.matches.map((entry) => (
                            <CardLink key={entry.path} as={Link} href={localizePath(entry.path)}>
                              <CardTitle>{entry.name}</CardTitle>
                            </CardLink>
                          ))}
                        </CardGrid>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <BodyCopy data-testid="location-hub-empty" role="status">
                  {t('seoContent.location.emptyState', { query: debouncedHubQuery })}
                </BodyCopy>
              )}
            </Section>
          </PageContainer>
        </SectionBand>
      ) : null}

      {/* Idea listicle categories — renders on the ideas page of every
          content-rich city with a committed ideaPage (Sprint 20), e.g.
          /en/location/germany/berlin/berlin/ideas */}
      {isIdeas && data.ideaCategories ? (
        <SectionBand variant="plain">
          <PageContainer>
            <Section>
              <SectionTitle>{t('seoContent.location.ideasLink')}</SectionTitle>
            </Section>
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

      {/* Communities in nearby cities — same-region siblings render on every
          content-rich city/variant/ideas page (tier-irrelevant, Sprint 20),
          e.g. /en/location/germany/berlin/berlin/small-business */}
      {hasSiblings && data.kind !== 'hub' ? (
        <SectionBand variant={isIdeas ? 'glass' : 'plain'}>
          <PageContainer>
            <Reveal>
              <Section>
                <SectionTitle>{t('seoContent.location.nearbyCities')}</SectionTitle>
                <CardGrid data-testid="location-sibling-cities">
                  {data.siblingCities.map((sibling) => (
                    <CardLink key={sibling.path} as={Link} href={localizePath(sibling.path)}>
                      <CardTitle>{sibling.name}</CardTitle>
                      <CardBody>{t('seoContent.location.exploreCommunities')}</CardBody>
                    </CardLink>
                  ))}
                </CardGrid>
              </Section>
            </Reveal>
          </PageContainer>
        </SectionBand>
      ) : null}

      {/* Country mesh (TASK-490, TASK-496): content-rich cities + regions in
          the country, rendered as a content section analogous to "Communities in
          nearby cities". Data-driven for EVERY /location/<country> page —
          tier-irrelevant (un-authored Tier-3 pages stay noindex). The section
          renders only when the country hosts content-rich cities. Card names
          are the localized dataset names (names[locale], EN fallback) and every
          card href is registry-exact on the ACTIVE locale surface. TASK-496 —
          the section heading IS the localized country name (countryMesh.countryName,
          previously computed but never rendered) and the dataset facts
          (countryMesh.facts) render in the "Country facts" data block above
          (same countryFactsFor source). */}
      {data.kind === 'country' && data.countryMesh && data.countryMesh.cities.length > 0 ? (
        <SectionBand variant="plain">
          <PageContainer>
            <Reveal>
              <Section data-testid="location-country-mesh">
                <SectionTitle data-testid="location-country-name">
                  {data.countryMesh.countryName}
                </SectionTitle>
                <SubTitle>{t('seoContent.location.directorySectionTitles.cities')}</SubTitle>
                <CardGrid data-testid="location-country-cities">
                  {data.countryMesh.cities.map((city) => (
                    <CardLink key={city.path} as={Link} href={localizePath(city.path)}>
                      <CardTitle>{city.name}</CardTitle>
                      <CardBody>{t('seoContent.location.exploreCommunities')}</CardBody>
                    </CardLink>
                  ))}
                </CardGrid>
                <SubTitle>{t('seoContent.location.directorySectionTitles.regions')}</SubTitle>
                <CardGrid data-testid="location-country-regions">
                  {data.countryMesh.regions.map((region) => (
                    <CardLink key={region.path} as={Link} href={localizePath(region.path)}>
                      <CardTitle>{region.name}</CardTitle>
                      <CardBody>{t('seoContent.location.exploreCommunities')}</CardBody>
                    </CardLink>
                  ))}
                </CardGrid>
              </Section>
            </Reveal>
          </PageContainer>
        </SectionBand>
      ) : null}

      {/* Region mesh (TASK-496): the data-driven content-rich equivalent of
          the country mesh for EVERY /location/<country>/<region> page —
          un-authored regions (e.g. /location/japan/osaka) included. The
          section heading is the localized region name (regionMesh.regionName),
          the city cards are the region's content-rich cities (registry-exact
          paths — the "Communities in nearby cities" list) and the dataset
          facts (regionMesh.facts) render in the "Region facts" data block
          above. Renders only when the region hosts content-rich cities. */}
      {data.kind === 'region' && data.regionMesh && data.regionMesh.cities.length > 0 ? (
        <SectionBand variant="plain">
          <PageContainer>
            <Reveal>
              <Section data-testid="location-region-mesh">
                <SectionTitle data-testid="location-region-name">
                  {data.regionMesh.regionName}
                </SectionTitle>
                <SubTitle>{t('seoContent.location.nearbyCities')}</SubTitle>
                <CardGrid data-testid="location-region-cities">
                  {data.regionMesh.cities.map((city) => (
                    <CardLink key={city.path} as={Link} href={localizePath(city.path)}>
                      <CardTitle>{city.name}</CardTitle>
                      <CardBody>{t('seoContent.location.exploreCommunities')}</CardBody>
                    </CardLink>
                  ))}
                </CardGrid>
              </Section>
            </Reveal>
          </PageContainer>
        </SectionBand>
      ) : null}

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
      <Attribution>{t('seoContent.location.attribution')}</Attribution>
    </MenuPageShell>
  );
}

export default LocationView;
