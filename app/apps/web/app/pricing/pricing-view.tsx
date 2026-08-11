'use client';

import MenuPageShell from '../../components/MenuPageShell';
import {
  BodyCopy,
  BulletList,
  Card,
  CardBody,
  CardGrid,
  CardTitle,
  FaqAnswer,
  FaqItem,
  FaqQuestion,
  FaqSection,
  ListItem,
  PageContainer,
  PageHeader,
  PageLead,
  PageTitle,
  Section,
  SectionTitle,
  SubTitle,
} from '../../components/menuPagePrimitives';
import { PRICING_FAQ } from './pricing-data';

/**
 * Pricing view (discovery §5.4): free during early access + a future plan
 * outline clearly labeled "coming soon" with no invented numbers (honesty +
 * Google sd-policy alignment). One `<h1>` and semantic sections.
 */

const FUTURE_PLANS = [
  {
    title: 'Free',
    body: 'For individuals joining communities: profiles, chat, feed, and opportunities at no cost.',
  },
  {
    title: 'Community',
    body: 'For running a community: chat, feed, events, and projects under one roof.',
  },
  {
    title: 'Organization',
    body: 'For companies and ventures: team management and opportunity sharing across the network.',
  },
];

export function PricingView() {
  return (
    <MenuPageShell>
      <PageContainer>
        <PageHeader>
          <PageTitle>Simple pricing, free while we build</PageTitle>
          <PageLead>
            JoinOrigin is in early access. Joining the waitlist is free, and early members keep free
            access when the community OS launches. Full plan details are announced with the beta.
          </PageLead>
        </PageHeader>

        <Section>
          <SectionTitle>Current offer</SectionTitle>
          <Card data-testid="early-access-card">
            <CardTitle>Early access: free</CardTitle>
            <CardBody>
              Reserve your spot on the waitlist today. No credit card, no spam, no lock-in — early
              members are the first to build communities when the platform opens.
            </CardBody>
          </Card>
        </Section>

        <Section>
          <SectionTitle>Future plan outline — coming soon</SectionTitle>
          <BodyCopy>
            When JoinOrigin launches, plans will mirror the roadmap phases. No prices are published
            yet — we announce them with the beta.
          </BodyCopy>
          <CardGrid>
            {FUTURE_PLANS.map((plan) => (
              <Card key={plan.title}>
                <CardTitle>{plan.title}</CardTitle>
                <CardBody>{plan.body}</CardBody>
              </Card>
            ))}
          </CardGrid>
        </Section>

        <Section>
          <SectionTitle>What you get during early access</SectionTitle>
          <BulletList>
            <ListItem>
              <SubTitle>Free forever for early members</SubTitle>
              <BodyCopy>
                Early-access members keep free access to the community OS when it launches.
              </BodyCopy>
            </ListItem>
            <ListItem>
              <SubTitle>Honest pricing</SubTitle>
              <BodyCopy>
                We do not publish fake prices or fake reviews. Plan details come with the beta.
              </BodyCopy>
            </ListItem>
            <ListItem>
              <SubTitle>No lock-in</SubTitle>
              <BodyCopy>
                Open architecture, portable identity, and self-hosting options keep the network
                accountable to its members.
              </BodyCopy>
            </ListItem>
          </BulletList>
        </Section>

        <Section>
          <SectionTitle>Frequently asked questions</SectionTitle>
          <FaqSection>
            {PRICING_FAQ.map((faq) => (
              <FaqItem key={faq.question}>
                <FaqQuestion>{faq.question}</FaqQuestion>
                <FaqAnswer>{faq.answer}</FaqAnswer>
              </FaqItem>
            ))}
          </FaqSection>
        </Section>
      </PageContainer>
    </MenuPageShell>
  );
}
