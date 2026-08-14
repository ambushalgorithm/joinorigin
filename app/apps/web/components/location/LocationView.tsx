'use client';

import Link from 'next/link';
import styled from 'styled-components';

import MenuPageShell from '../MenuPageShell';
import Reveal from '../Reveal';
import SectionBand from '../SectionBand';
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
  padding: 24px 64px 0;

  @media (max-width: 1024px) {
    padding: 24px 32px 0;
  }

  @media (max-width: 480px) {
    padding: 20px 20px 0;
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

export function LocationView({ data }: { data: LocationViewData }) {
  const heroTitle = data.heading;
  const heroLead = data.lead;
  const isIdeas = data.kind === 'ideas';
  const hasGroupLinks = data.groupTypeLinks.length > 0;
  const hasSiblings = data.siblingCities.length > 0;
  const hasFaq = data.faq.length > 0;

  return (
    <MenuPageShell
      hero={{
        eyebrow: data.eyebrow,
        title: heroTitle,
        lead: heroLead,
        scene: 'community',
        accent: 'community',
        meta: { stat: false, avatars: false },
      }}
      showCtaBand={false}
    >
      <BreadcrumbNav aria-label="Breadcrumb" data-testid="location-breadcrumbs">
        <BreadcrumbList>
          {data.breadcrumbs.map((crumb, index) =>
            index === data.breadcrumbs.length - 1 ? (
              <BreadcrumbItem key={crumb.path}>
                <BreadcrumbCurrent aria-current="page">{crumb.name}</BreadcrumbCurrent>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem key={crumb.path}>
                <BreadcrumbLink href={crumb.path}>{crumb.name}</BreadcrumbLink>
              </BreadcrumbItem>
            ),
          )}
        </BreadcrumbList>
      </BreadcrumbNav>

      <SectionBand variant="glass" accent="community" glow>
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>
                {data.locale === 'de'
                  ? `Community in ${data.entityLabel} finden oder gründen`
                  : `Find or start a community in ${data.entityLabel}`}
              </SectionTitle>
              <BodyCopy data-testid="location-intro">{data.intro || data.lead}</BodyCopy>
            </Section>
          </Reveal>

          {data.dataPoints.length > 0 ? (
            <Reveal>
              <Section>
                <SectionTitle>{data.locale === 'de' ? 'Stadt-Fakten' : 'City facts'}</SectionTitle>
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
                    ? data.locale === 'de'
                      ? 'Community-Typen in der Stadt'
                      : 'Community types in the city'
                    : data.locale === 'de'
                      ? 'Community-Typen entdecken'
                      : 'Explore community types'}
                </SectionTitle>
                <TagList data-testid="location-group-type-links">
                  {data.groupTypeLinks.map((link) => (
                    <TagItem key={link.path}>
                      <TagLink href={link.path} $current={link.current}>
                        {link.label}
                      </TagLink>
                    </TagItem>
                  ))}
                </TagList>
              </Section>
            </Reveal>
          ) : null}
        </PageContainer>
      </SectionBand>

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
                    ? data.locale === 'de'
                      ? 'Flagship-Städte'
                      : 'Flagship cities'
                    : data.locale === 'de'
                      ? 'Communities in nahegelegenen Städten'
                      : 'Communities in nearby cities'}
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
                      <CardBody>
                        {data.locale === 'de' ? 'Communities entdecken' : 'Explore communities'}
                      </CardBody>
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
              <SectionTitle>
                {data.locale === 'de'
                  ? 'Anleitungen zum Community-Aufbau'
                  : 'Guides for starting a community'}
              </SectionTitle>
              <CardGrid data-testid="location-guide-links">
                {data.guideLinks.map((guide) => (
                  <Card key={guide.path}>
                    <CardTitle>
                      <Link href={guide.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {guide.title}
                      </Link>
                    </CardTitle>
                    <CardBody>
                      {data.locale === 'de'
                        ? 'Schritt-für-Schritt-Anleitung'
                        : 'Step-by-step guide'}
                    </CardBody>
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
                <SectionTitle>
                  {data.locale === 'de' ? 'Häufig gestellte Fragen' : 'Frequently asked questions'}
                </SectionTitle>
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
