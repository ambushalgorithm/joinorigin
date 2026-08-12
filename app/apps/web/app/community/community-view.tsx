'use client';

import MenuPageShell from '../../components/MenuPageShell';
import {
  BodyCopy,
  Card,
  CardBody,
  CardGrid,
  CardTitle,
  FaqAnswer,
  FaqItem,
  FaqQuestion,
  FaqSection,
  PageContainer,
  PageHeader,
  PageLead,
  PageTitle,
  Section,
  SectionTitle,
  Stat,
  StatLabel,
  StatValue,
} from '../../components/menuPagePrimitives';
import { COMMUNITY_FAQ } from './community-data';

/**
 * Community view (discovery §5.3): values, example communities, and trust
 * (2,400+ members). One `<h1>` and semantic sections; the intro defines the
 * "social collaboration network" category for LLM-crawler entity clarity.
 */

const VALUES = [
  {
    title: 'People First',
    body: 'Members are people, not profiles in a database. Every design decision protects the relationships that make the network worth joining.',
  },
  {
    title: 'Communities Drive Growth',
    body: 'Communities are the center of engagement. When a community thrives, the people in it find each other and build together.',
  },
  {
    title: 'Collaboration Creates Value',
    body: 'Collaboration is how conversations become projects and projects become companies. JoinOrigin is built so collaboration has somewhere to go.',
  },
  {
    title: 'Ownership & Sovereignty',
    body: 'You own your identity, your data, and your communities. Open architecture and portable identity keep the network accountable to its members.',
  },
];

const EXAMPLE_COMMUNITIES = [
  'Startup Founders',
  'Small Businesses',
  'Book Clubs',
  'Community Organizations',
  'Run Clubs',
  'Pee-wee Leagues',
  'Anyone with an Idea',
];

export function CommunityView() {
  return (
    <MenuPageShell>
      <PageContainer>
        <PageHeader>
          <PageTitle>Where people find each other</PageTitle>
          <PageLead>
            Origin is a social collaboration network organized around communities — groups of people
            who share interests, industries, goals, and opportunities. Communities are the center of
            engagement.
          </PageLead>
        </PageHeader>

        <Section>
          <SectionTitle>How we run the network</SectionTitle>
          <CardGrid>
            {VALUES.map((value) => (
              <Card key={value.title}>
                <CardTitle>{value.title}</CardTitle>
                <CardBody>{value.body}</CardBody>
              </Card>
            ))}
          </CardGrid>
        </Section>

        <Section>
          <SectionTitle>Example communities</SectionTitle>
          <BodyCopy>
            These are the kinds of communities growing inside JoinOrigin today. If you share one of
            these goals, there&rsquo;s already a place for you:
          </BodyCopy>
          <CardGrid>
            {EXAMPLE_COMMUNITIES.map((community) => (
              <Card key={community}>
                <CardTitle>{community}</CardTitle>
              </Card>
            ))}
          </CardGrid>
        </Section>

        <Section>
          <SectionTitle>Join the network</SectionTitle>
          <BodyCopy>
            The community is built by the people in it. Join the waitlist to be part of the first
            wave of builders shaping how people find each other online.
          </BodyCopy>
          <Stat data-testid="community-members-stat">
            <StatValue>2,400+</StatValue>
            <StatLabel>Members building together</StatLabel>
          </Stat>
        </Section>

        <Section>
          <SectionTitle>Frequently asked questions</SectionTitle>
          <FaqSection>
            {COMMUNITY_FAQ.map((faq) => (
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
