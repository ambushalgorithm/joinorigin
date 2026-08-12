'use client';

import styled from 'styled-components';

import MenuPageShell from '../../components/MenuPageShell';
import Reveal from '../../components/Reveal';
import { ENTRANCE_EASING } from '../../components/landingTokens';
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
  Section,
  SectionTitle,
  Stat,
  StatLabel,
  StatValue,
} from '../../components/menuPagePrimitives';
import { COMMUNITY_FAQ } from './community-data';

/**
 * Community view (discovery §5.3, redesign spec sprint-8 §8.2): values,
 * example communities as gradient-border chips, and trust (2,400+ members).
 * One `<h1>` (rendered by `MenuHero`) and semantic sections; the intro
 * defines the "social collaboration network" category for LLM-crawler
 * entity clarity.
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
    body: 'Collaboration is how conversations become projects and projects become companies. Origin is built so collaboration has somewhere to go.',
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

/**
 * Example-community chip (spec sprint-8 §8.2): pill `span`, gradient-border
 * tint, Urbanist label, hover accent fill slide (EASE 0.4s).
 */
const Chip = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid rgba(79, 125, 249, 0.4);
  border-radius: ${({ theme }) => theme.radius.pill}px;
  padding: 10px 18px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background: rgba(79, 125, 249, 0.9);
    transform: translateY(100%);
    transition: transform 0.4s ${ENTRANCE_EASING};
  }

  &:hover::before {
    transform: translateY(0);
  }
`;

const ChipLabel = styled.span`
  position: relative;
  z-index: 1;
`;

const ChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export function CommunityView() {
  return (
    <MenuPageShell
      hero={{
        eyebrow: 'The network',
        title: 'Where people find each other',
        lead: 'Origin is a social collaboration network organized around communities — groups of people who share interests, industries, goals, and opportunities. Communities are the center of engagement.',
        scene: '/assets/menu/scenes/community-scene.svg',
        accent: 'community',
      }}
    >
      <PageContainer>
        <Reveal>
          <Section>
            <SectionTitle>How we run the network</SectionTitle>
            <CardGrid>
              {VALUES.map((value, index) => (
                <Reveal key={value.title} delay={`${index * 0.08}s`}>
                  <Card>
                    <CardTitle>{value.title}</CardTitle>
                    <CardBody>{value.body}</CardBody>
                  </Card>
                </Reveal>
              ))}
            </CardGrid>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <SectionTitle>Example communities</SectionTitle>
            <BodyCopy>
              These are the kinds of communities growing inside JoinOrigin today. If you share one
              of these goals, there&rsquo;s already a place for you:
            </BodyCopy>
            <ChipGrid>
              {EXAMPLE_COMMUNITIES.map((community) => (
                <Chip key={community}>
                  <ChipLabel>{community}</ChipLabel>
                </Chip>
              ))}
            </ChipGrid>
          </Section>
        </Reveal>

        <Reveal>
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
        </Reveal>

        <Reveal>
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
        </Reveal>
      </PageContainer>
    </MenuPageShell>
  );
}
