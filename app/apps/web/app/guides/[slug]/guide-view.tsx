'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { Trans, useI18n } from '@joinorigin/i18n';

import MenuPageShell from '../../../components/MenuPageShell';
import Reveal from '../../../components/Reveal';
import RotatingBorderButton from '../../../components/RotatingBorderButton';
import SectionBand from '../../../components/SectionBand';
import {
  BodyCopy,
  BulletList,
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
} from '../../../components/menuPagePrimitives';
import { trackEvent } from '../../../lib/analytics';
import TranslatePageLink from '../../../components/TranslatePageLink';
import { useLocalizePath } from '../../../lib/seo/localePath';
import type { GuideContent } from '../../../lib/seo/content/types';
import type { GuidePageEntry } from '../../../lib/seo/guides';
import {
  GLOSSARY_HUB_PATH,
  guidePageEntry,
  guidePath,
  GUIDES_HUB_PATH,
} from '../../../lib/seo/guides';
import { useWaitlist } from '../../../components/WaitlistModal/WaitlistModalProvider';

/**
 * L1 how-to guide view (design §6.2) — client view rendering a single H1
 * (via `MenuHero`), the definitional intro, step-by-step structure, FAQ
 * block (mirrored 1:1 in the server-rendered `FAQPage` JSON-LD), the
 * "JoinOrigin can help" CTA, and the cross-link mesh (hub + sibling guides +
 * flagship city pages).
 */

export interface GuideViewProps {
  entry: GuidePageEntry;
  content: GuideContent;
}

const StepSection = styled.section`
  margin: 0 0 ${({ theme }) => theme.spacing.xxl}px;
`;

const StepHeading = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.md}px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.title}px;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.colors.text};
`;

const StepNumber = styled.span`
  margin-inline-end: ${({ theme }) => theme.spacing.xs}px;
  color: ${({ theme }) => theme.colors.primary};
`;

/** Per-step "How JoinOrigin helps here" note (TASK-320) — rendered under each
 *  step body so every guide visibly leads with how JoinOrigin solves the
 *  connecting-people problem. */
const JoinOriginNote = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border-inline-start: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.sm}px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.body}px;
  line-height: 1.7;
`;

const JoinOriginNoteLabel = styled.strong`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.body}px;
`;

const RelatedLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

const CityLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

/** Hero-meta row for the secondary "Translate this page" link-out (TASK-318):
 *  guides are EN canonical only, so the link always renders — a small
 *  unobtrusive text link aligned inline-end, never competing with the
 *  language switcher. Mobile-first (Story A): the base padding targets the
 *  minimum viewport and widens at the mobile/desktop breakpoints. */
const TranslateRow = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 20px 0;
  display: flex;
  justify-content: flex-end;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding: 24px 32px 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    padding: 24px 64px 0;
  }
`;

/** "JoinOrigin can help" CTA — rendered INSIDE the shell so the
 *  WaitlistModalProvider context is available (same pattern as CtaBand). */
function GuideJoinCta({ slug }: { slug: string }) {
  const { t } = useI18n();
  const { openWaitlist } = useWaitlist();
  return (
    <RotatingBorderButton
      label={t('seoContent.cta.joinWaitlist')}
      fillDirection="left"
      onClick={(event) => {
        trackEvent({ name: 'signup_click', props: { source: `guide-${slug}` } });
        openWaitlist(event.currentTarget);
      }}
      testID="guide-join-button"
    />
  );
}

export function GuideView({ entry, content }: GuideViewProps) {
  const { t } = useI18n();
  // Locale-aware internal links (Sprint 19 Goal 2, TASK-460): the shared
  // helper applies the active locale's prefix per the confirmed table —
  // unprefixed EN load keeps links unprefixed; `/en/**` stays `/en/**`;
  // `/de/**` renders `/de/**`; unprefixed load with a `de` cookie renders
  // `/de/**`. Server-baked locale-prefixed paths pass through idempotently.
  const localizePath = useLocalizePath();

  const relatedEntries = entry.related
    .map((slug) => ({ slug }))
    .map(({ slug }) => ({
      slug,
      // Related guides resolve through the active locale surface so the
      // EN canonical page links `/guides/<slug>` and a `/de/...` page links
      // `/de/guides/<slug>` (TASK-421/TASK-444).
      href: guidePath(slug, entry.locale),
      title: guidePageEntry(slug, entry.locale)?.title ?? slug,
    }));

  return (
    <MenuPageShell
      hero={{
        eyebrow: t('seoContent.guides.eyebrow'),
        title: content.title ?? entry.title,
        lead: content.description ?? entry.description,
        scene: 'docs',
        accent: 'docs',
        cta: { variant: 'waitlist', label: t('seoContent.cta.joinWaitlist') },
      }}
    >
      <TranslateRow>
        <TranslatePageLink labelKey="seoContent.guides.translatePage" />
      </TranslateRow>

      <SectionBand variant="glass" accent="docs" glow>
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.guides.overview')}</SectionTitle>
              {content.intro.map((paragraph) => (
                <BodyCopy key={paragraph}>{paragraph}</BodyCopy>
              ))}
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="plain">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.guides.stepByStep')}</SectionTitle>
              {content.steps.map((step, index) => (
                <StepSection key={step.title}>
                  <StepHeading>
                    <StepNumber>
                      {t('seoContent.guides.stepNumber', { number: index + 1 })}
                    </StepNumber>
                    {step.title}
                  </StepHeading>
                  <BodyCopy>{step.body}</BodyCopy>
                  <JoinOriginNote>
                    <JoinOriginNoteLabel>
                      {t('seoContent.guides.howJoinOriginHelps')}
                    </JoinOriginNoteLabel>
                    {step.joinOriginNote}
                  </JoinOriginNote>
                </StepSection>
              ))}
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="glass" accent="docs">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.guides.relatedGuides')}</SectionTitle>
              <CardGrid>
                {relatedEntries.map((related) => (
                  <CardLink
                    key={related.slug}
                    as={Link}
                    href={localizePath(related.href)}
                    aria-label={related.title}
                  >
                    <CardTitle>{related.title}</CardTitle>
                    <CardBody>{t('seoContent.guides.continueBuilding')}</CardBody>
                  </CardLink>
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
              <SectionTitle>{t('seoContent.guides.exploreCommunities')}</SectionTitle>
              <BodyCopy>{t('seoContent.guides.practiceInCity')}</BodyCopy>
              <CityLinks>
                {entry.cities.map((city) => (
                  <RelatedLink key={city.path} href={localizePath(city.path)}>
                    {city.name}
                  </RelatedLink>
                ))}
              </CityLinks>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="glass" accent="docs">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.guides.howJoinOriginHelps')}</SectionTitle>
              <BodyCopy>{t('seoContent.guides.howJoinOriginHelpsBody')}</BodyCopy>
              <GuideJoinCta slug={entry.slug} />
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="plain">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('common.faqHeading')}</SectionTitle>
              <FaqSection>
                {content.faq.map((faqEntry) => (
                  <FaqCard key={faqEntry.question}>
                    <FaqQuestion>{faqEntry.question}</FaqQuestion>
                    <FaqAnswer>{faqEntry.answer}</FaqAnswer>
                  </FaqCard>
                ))}
              </FaqSection>
            </Section>
          </Reveal>
        </PageContainer>
      </SectionBand>

      <SectionBand variant="glass" accent="docs">
        <PageContainer>
          <Reveal>
            <Section>
              <SectionTitle>{t('seoContent.guides.keepLearning')}</SectionTitle>
              <BulletList>
                <ListItem>
                  <Trans
                    i18nKey="seoContent.guides.keepLearningGuides"
                    components={[<RelatedLink key="hub" href={localizePath(GUIDES_HUB_PATH)} />]}
                  />
                </ListItem>
                <ListItem>
                  <Trans
                    i18nKey="seoContent.guides.keepLearningGlossary"
                    components={[
                      <RelatedLink key="glossary" href={localizePath(GLOSSARY_HUB_PATH)} />,
                    ]}
                  />
                </ListItem>
                <ListItem>
                  <Trans
                    i18nKey="seoContent.guides.keepLearningLocations"
                    components={[<RelatedLink key="locations" href={localizePath('/location')} />]}
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

export default GuideView;
